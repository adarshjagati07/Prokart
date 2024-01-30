import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true
	},
	{
		name: "Aman",
		email: "aman@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: false
	},
	{
		name: "Aditya",
		email: "aditya@gmail.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: false
	}
];

export default users;
