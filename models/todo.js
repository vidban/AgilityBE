const db = require('../db');
const moment = require('moment');

class Todo{

	static async getAll(id){
		const result = await db.query(
			`select id,todo_name,completed from todos where eventId = $1`, [id]);
		return result.rows;
	}

	static async addItem(id,todo){
		const duplicateCheck = await db.query(
			`SELECT  todo_name FROM todos WHERE eventid=$1 AND todo_name=$2`, [id,todo]
		);

		if (duplicateCheck.rows[0]){
			let duplicateError = new Error('This todo item has already been added!');
			duplicateError.status = 409;
			throw duplicateError;
		}

		const result = await db.query(
			`INSERT INTO todos (eventId, todo_name, completed) VALUES ($1, $2, 'f') RETURNING id, eventId, todo_name,completed`, [id,todo]);
		return result.rows[0];
	}

	static async removeItem(id){
		await db.query(`DELETE FROM todos WHERE id=$1`, [id]);
	}

	static async clearItems(id){
		console.log('clearing completed items');
		await db.query(`DELETE FROM todos WHERE eventid=$1 AND completed=true`, [id]);
		
	}

	static async updateItem(id){
		await db.query(`UPDATE todos SET completed = NOT completed WHERE id = $1`, [id]);
	}
}

module.exports = Todo;