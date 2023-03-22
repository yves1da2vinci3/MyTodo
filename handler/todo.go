package handler

import (
	"context"
	"strconv"
	"time"
	"todoManager/database"

	"todoManager/model"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetLists(c *fiber.Ctx) error {
	client, err := database.InitDB()
	if err != nil {
		return nil
	}
	defer client.Disconnect(context.Background())

	userId := ""

	err = c.BodyParser(&userId)
	if err != nil {
		return c.Status(fiber.StatusNotAcceptable).JSON(fiber.Map{"message": "the user id is not valid"})
	}

	collection := client.Database("todoManager").Collection("lists")
	filter := bson.M{"user_id": userId}

	var lists []model.List
	cur, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var list model.List
		if err := cur.Decode(&list); err != nil {
			return err
		}
		lists = append(lists, list)
	}

	if err := cur.Err(); err != nil {
		return err
	}

	c.Status(fiber.StatusAccepted).JSON(fiber.Map{"lists": lists})
	return nil
}
func GetList(c *fiber.Ctx) error {
	client, err := database.InitDB()
	if err != nil {
		return err
	}
	defer client.Disconnect(context.Background())

	listId := c.Params("id")

	collection := client.Database("todoManager").Collection("lists")
	filter := bson.M{"_id": listId}

	var list model.List
	err = collection.FindOne(context.Background(), filter).Decode(&list)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}
	c.Status(fiber.StatusFound).JSON(fiber.Map{"list": list})
	return nil

}

func DeleteList(c *fiber.Ctx) error {
	client, err := database.InitDB()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}
	defer client.Disconnect(context.Background())
	listId := c.Params("id")
	collection := client.Database("todoManager").Collection("lists")
	filter := bson.M{"_id": listId}

	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	c.Status(fiber.StatusAccepted).JSON(fiber.Map{"messsage": "List successfully deleted"})
	return nil
}
func UpdateList(c *fiber.Ctx) error {
	client, err := database.InitDB()
	if err != nil {
		return err
	}
	var list *model.List
	defer client.Disconnect(context.Background())
	if err := c.BodyParser(&list); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "message": "Request body not valid"})

	}
	collection := client.Database("todoManager").Collection("lists")
	filter := bson.M{"_id": c.Params("id")}

	update := bson.D{
		{"$set", bson.D{
			{"title", list.Title},
			{"date", list.Date},
			{"todos", list.Todos},
		}},
	}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return nil
}

func CreateList(c *fiber.Ctx) error {
	client, err := database.InitDB()
	if err != nil {
		return err
	}
	defer client.Disconnect(context.Background())

	collection := client.Database("todoManager").Collection("lists")

	var list *model.List

	if err := c.BodyParser(&list); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "message": "Request body not valid"})

	}
	_, err = collection.InsertOne(context.Background(), list)
	if err != nil {
		return err
	}

	c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Todo successfully added"})
	return nil
}

func UpdateTodo(listID string, todoIndex int, update *model.Todo) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clt, err := database.InitDB()
	if err != nil {
		return err
	}

	collection := clt.Database("database_name").Collection("lists")
	filter := bson.M{"_id": listID, "todos": bson.M{"$exists": true}}
	updateDoc := bson.M{"$set": bson.M{"todos." + strconv.Itoa(todoIndex): update}}
	_, err = collection.UpdateOne(ctx, filter, updateDoc)
	if err != nil {
		return err
	}

	return nil
}
