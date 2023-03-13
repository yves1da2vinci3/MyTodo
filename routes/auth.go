package routes

import (
	"todoManager/handler"

	"github.com/gofiber/fiber/v2"
)

// AuthRoutes containes all the auth routes
func AuthRoutes(app fiber.Router) {
	r := app.Group("/auth")

	// Get the routes
	r.Get("/login", handler.GetLoginPage)
	r.Get("/signup", handler.GetSignupPage)
	r.Get("/profile", handler.GetSignupPage)
	// post the routes
	r.Post("/signup", handler.Register)
	r.Post("/login", handler.Login)
	r.Post("/logout", handler.Logout)
	// Put
	r.Put("/modify", handler.ModifyProfile)

}
