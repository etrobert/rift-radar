{
  description = "rift-radar — League of Legends champion-draft analysis";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
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

      formatter = forEachSystem (pkgs: pkgs.nixfmt);
    };
}
