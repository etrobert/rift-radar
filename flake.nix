{
  description = "rift-radar — League of Legends champion-draft analysis";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs { inherit system; }));
    in
    {
      packages = forEachSystem (pkgs: {
        backend = pkgs.buildGoModule {
          pname = "rift-radar-backend";
          version = "1.0.0";
          src = ./backend;
          vendorHash = "sha256-tPfbzyi7C3MHn+kTCl7FTu91y6XcJaxstvP8DasOrfI=";
        };

        frontend = pkgs.buildNpmPackage {
          pname = "rift-radar-frontend";
          version = "1.0.0";
          src = ./frontend;
          npmDeps = pkgs.importNpmLock { npmRoot = ./frontend; };
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;

          installPhase = ''
            runHook preInstall
            cp -r dist $out
            runHook postInstall
          '';
        };
      });

      # Self-contained deployment: serves the frontend and proxies /api/* to the
      # backend on a single origin via Caddy, with a local Redis match cache.
      # Host-specific concerns (the domain, the Riot API key secret, DNS) are
      # left to the consumer via the options below.
      nixosModules.default =
        {
          config,
          lib,
          pkgs,
          ...
        }:
        let
          inherit (pkgs.stdenv.hostPlatform) system;
          cfg = config.services.rift-radar;
        in
        {
          options.services.rift-radar = {
            enable = lib.mkEnableOption "rift-radar League of Legends draft analysis";

            hostName = lib.mkOption {
              type = lib.types.str;
              example = "rift.example.com";
              description = "Domain Caddy serves the rift-radar frontend and API on.";
            };

            riotKey = lib.mkOption {
              type = lib.types.raw;
              description = ''
                The agenix secret holding the Riot API key — i.e.
                `config.age.secrets.<name>`, whose decrypted file is a single
                line `RIOT_API_KEY=<key>` (use a persistent Personal/Production
                key; development keys expire every 24h).

                Its `.path` is used as the systemd EnvironmentFile, and its
                `.file` (the encrypted source) as a restartTrigger so the
                backend restarts automatically when the key is rotated.
              '';
            };

            redisPort = lib.mkOption {
              type = lib.types.port;
              default = 6379;
              description = "Port for the local Redis match cache.";
            };
          };

          config = lib.mkIf cfg.enable {
            services.redis.servers.rift-radar = {
              enable = true;
              port = cfg.redisPort;
            };

            systemd.services.rift-radar = {
              description = "rift-radar backend";
              wantedBy = [ "multi-user.target" ];
              after = [
                "network.target"
                "redis-rift-radar.service"
              ];
              environment = {
                REDISHOST = "127.0.0.1";
                REDISPORT = toString cfg.redisPort;
                REDISPASSWORD = "";
              };
              # EnvironmentFile is read once at start from a fixed runtime path,
              # so the unit is otherwise blind to key rotations; trigger a
              # restart on the encrypted secret's store path (agenix re-encrypts
              # on every edit, changing it) so `switch` picks up a new key.
              restartTriggers = [ cfg.riotKey.file ];
              serviceConfig = {
                # The Go backend listens on a fixed :8080.
                ExecStart = "${self.packages.${system}.backend}/bin/rift-radar";
                EnvironmentFile = cfg.riotKey.path;
                Restart = "on-failure";
                DynamicUser = true;
              };
            };

            services.caddy = {
              enable = true;
              virtualHosts.${cfg.hostName}.extraConfig = ''
                handle /api/* {
                  reverse_proxy localhost:8080
                }
                handle {
                  root * ${self.packages.${system}.frontend}
                  encode zstd gzip
                  try_files {path} /index.html
                  file_server
                }
              '';
            };
          };
        };

      formatter = forEachSystem (pkgs: pkgs.nixfmt);
    };
}
