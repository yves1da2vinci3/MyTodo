package model

type User struct {
	ID        string `bson:"_id,omitempty"`
	Email     string `bson:"email"`
	Password  string `bson:"password"`
	FirstName string `bson:"first_name"`
	LastName  string `bson:"last_name"`
	Lists     []List `bson:"lists"`
}
