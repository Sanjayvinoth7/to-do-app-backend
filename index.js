const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;
const uri = process.env.MONGO;

mongoose.set("strictQuery", true);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected successfully..."))
  .catch((err) => console.log("mongobd connection failed", err.message));

const Todo = require('./models/Todo');


//Get
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});


//Post
app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

//Delete
app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});


//Get all 

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
});

//Update
app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(port, () => console.log(`App has Started in port ${port} `));
