/** Routes for todos. */

const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");


/** GET / => {todos: [todo, ...]} */

router.get("/:id", async function(req, res, next) {
	const eventId= req.params.id;
  try {
			let todos= await Todo.getAll(eventId);
			return res.json({todos});
  } catch (err) {
    return next(err);
  }
});

router.post("/additem", async function(req, res, next){
	const {eventId,newTodo} = req.body;
	try {
		let todo = await Todo.addItem(eventId,newTodo);
		return res.json({todo});
	} catch (err) {
		return next(err);
	}
	console.log(eventId, newTodo);
});

router.delete("/:id", async function(req,res,next){
	const {id} = req.params;
	try {
		await Todo.removeItem(id);
		return res.send({message: 'deleted'});
	} catch (err) {
		return next(err);
	}
})

router.delete("/clear/:id", async function(req,res,next){
	const {id} = req.params;
	try {
		await Todo.clearItems(id);
		let todos = await Todo.getAll(id);
		return res.json({todos});
	} catch (err) {
		return next(err);
	}
})

router.patch("/:id", async function(req,res,next){
	const {id} = req.params;
	console.log(id);
	try {
		await Todo.updateItem(id);
		return res.send({message: 'updated'});
	} catch (err) {
		return next(err);
	}
})


module.exports = router;