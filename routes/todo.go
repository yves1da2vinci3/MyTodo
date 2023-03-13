package routes

import (
	"todoManager/handler"
	"todoManager/middleware"

	"github.com/gofiber/fiber/v2"
)

// TodoRoutes contains all routes relative to /todo
func TodoRoutes(app fiber.Router) {
	r := app.Group("/todo").Use(middleware.Auth)

	r.Post("/create", handler.CreateTodo)
	r.Get("/list", handler.GetTodos)
	r.Get("/:todoID", handler.GetTodo)
	r.Patch("/:todoID", handler.UpdateTodo)
	r.Delete("/:todoID", handler.DeleteTodo)
}
