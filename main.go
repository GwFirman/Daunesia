package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "./client/dist",
		Browse: false,
	}))

	e.GET("/*", func(c echo.Context) error {
		return c.File("./client/dist/index.html")
	})

	e.Logger.Fatal(e.Start(":3000"))
}
