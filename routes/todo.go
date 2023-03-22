package routes

import (
	"todoManager/handler"
	"todoManager/middleware"

	"github.com/gofiber/fiber/v2"
)

// TodoRoutes contains all routes relative to /todo
func TodoRoutes(app fiber.Router) {
	r := app.Group("/todo").Use(middleware.Auth)

	r.Post("/create", handler.CreateList)
	r.Get("/list", handler.GetLists)
	r.Get("/:todoID", handler.GetList)
	r.Patch("/:todoID", handler.UpdateList)
	r.Delete("/:todoID", handler.DeleteList)
}
