package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	resp, err := http.Get("https://www.google.com")

	if err != nil {
		log.Fatal(err);
	}

	fmt.Println(resp.Status)
}
