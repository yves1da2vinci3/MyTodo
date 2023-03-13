package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func GetLoginPage(c *fiber.Ctx) error {
	c.Render("login", fiber.Map{"message": "yves"})
	return nil
}
func GetSignupPage(c *fiber.Ctx) error {
	c.Render("signup", fiber.Map{"message": "yves"})
	return nil
}
func GetProfilePage(c *fiber.Ctx) error {
	c.Render("user", fiber.Map{"message": "yves"})
	return nil
}

func Login(c *fiber.Ctx) error {
	fmt.Println("login ")
	return nil
}

func Logout(c *fiber.Ctx) error {
	fmt.Println("logout ")
	return nil
}

func Register(c *fiber.Ctx) error {
	fmt.Println("register")
	return nil
}
func ModifyProfile(c *fiber.Ctx) error {
	fmt.Println("profile updated")
	return nil

}
