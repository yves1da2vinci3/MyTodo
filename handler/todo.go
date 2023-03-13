package handler

import (
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {

	c.SendString("create todos")
	return nil
}

func DeleteTodo(c *fiber.Ctx) error {
	c.SendString("delete todo")
	return nil
}

func GetTodo(c *fiber.Ctx) error {
	c.SendString("thanks to lord")
	return nil
}

func UpdateTodo(c *fiber.Ctx) error {
	c.SendString("update todo")
	return nil
}

func GetTodos(c *fiber.Ctx) error {
	c.SendString("get todos")
	return nil
}
