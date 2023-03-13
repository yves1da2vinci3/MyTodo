package main

import (
	"fmt"
	"time"
	"todoManager/database"
	"todoManager/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html"
	"go.mongodb.org/mongo-driver/mongo"
)

var Client *mongo.Client

func main() {
	app := fiber.New(fiber.Config{
		Views: html.New("./public/views", ".html"),
	})
	// Initialize the Database
	Client, err := database.InitDB()
	if err != nil {
		panic(err)
	}
	fmt.Print("connecting to", Client)
	// Rate Limiteer
	app.Use(limiter.New(limiter.Config{
		Max:        10,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			// Use the client's IP address as the rate limiting key
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			// Return a 429 (Too Many Requests) status code if the limit is reached
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"message": "Too many requests. Please try again later.",
			})
		},
	}))
	app.Static("/", "./public")
	app.Use(logger.New())
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{"message": "Request"})
	})
	routes.AuthRoutes(app)
	routes.TodoRoutes(app)
	app.Listen(":3000")
}
