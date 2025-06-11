package main

import (
	"fmt"
)

func Map[T, U any](slice []T, fn func(T) U) []U {
	result := make([]U, len(slice))
	for i, v := range slice {
		result[i] = fn(v)
	}
	return result
}

func ErrorMap[T, U any](slice []T, fn func(T) (U, error)) ([]U, error) {
	result := make([]U, len(slice))
	for i, v := range slice {
		res, err := fn(v)
		if err != nil {
			return nil, err
		}
		result[i] = res
	}
	return result, nil
}

func Must[T, U any](fn func(T) (U, error)) func(T) U {
	return func(t T) U {
		result, err := fn(t)
		if err != nil {
			panic(err)
		}
		return result
	}
}

func Must2[A, B, R any](fn func(A, B) (R, error)) func(A, B) R {
	return func(a A, b B) R {
		result, err := fn(a, b)
		if err != nil {
			panic(err)
		}
		return result
	}
}

func Count[T any](slice []T, predicate func(T) bool) int {
	count := 0
	for _, v := range slice {
		if predicate(v) {
			count++
		}
	}
	return count
}

func Identity[T any](t T) T {
	return t
}

func Find[T any](slice []T, predicate func(T) bool) (T, error) {
	for _, v := range slice {
		if predicate(v) {
			return v, nil
		}
	}
	var zero T
	return zero, fmt.Errorf("not found")
}
