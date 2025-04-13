package main

func Map[T, U any](slice []T, fn func(T) U) []U {
	result := make([]U, len(slice))
	for i, v := range slice {
		result[i] = fn(v)
	}
	return result
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
