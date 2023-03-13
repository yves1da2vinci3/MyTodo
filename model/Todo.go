package model

import (
	"time"
)

type List struct {
	ID     string    `bson:"_id,omitempty" json:"id,omitempty"`
	Title  string    `bson:"title"`
	Date   time.Time `bson:"date"`
	Todos  []Todo    `bson:"todos"`
	UserID string    `bson:"user_id"`
}
type Todo struct {
	Title  string `bson:"title"`
	status bool   `bson:"status"`
}
