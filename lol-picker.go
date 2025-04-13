package main

import (
	"fmt"
	"log"
	"net/http"
	"rsc.io/quote"
)

func main() {
	fmt.Println(quote.Go())
	resp, err := http.Get("https://www.google.com")

	if err != nil {
		log.Fatal(err);
	}

	fmt.Println(resp.Status)
}
