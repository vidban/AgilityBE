const db = require('../db');
class Event {


	 /** Find all events. */

	 static async getDaysEvents(userId,currDate) {
    const result = await db.query(
        `SELECT id, title, _start as start, _end as end, allday, color
          FROM events 
					WHERE userId = $1 AND EXTRACT(DAY FROM _start at time zone 'pdt')=$2`, [userId, currDate]);
		return result.rows;
  }

	static async getMonthsEvents(userId,currMonth) {
    const result = await db.query(
        `SELECT id, title, _start as start, _end as end,allday,color
          FROM events 
					WHERE userId = $1 AND EXTRACT(MONTH FROM _start at time zone 'pdt')=$2`, [userId, currMonth]);
		return result.rows;
  }

	static async getWeeksEvents(userId,start,end) {
		let startOfWeek  = new Date(start).toLocaleDateString();
		let endOfWeek = new Date(end).toLocaleDateString();
    const result = await db.query(
        `SELECT id, title, _start at time zone 'pdt' as start, _end at time zone 'pdt' as end,allday,color
          FROM events 
					WHERE userId = $1 AND _start>=$2 AND _end<=$3`, [userId,startOfWeek,endOfWeek]);
		return result.rows;
  }

	static async addEvent(userId,newEvent){
		
		const result = await db.query(
			`INSERT INTO events (userid, title, _start, _end, allday, color) VALUES ($1, $2, $3, $4, $5, $6) returning id, userid, title, _start as start, _end as end, allday, color`, [userId,newEvent.title,newEvent.start,newEvent.end,newEvent.allDay, newEvent.color]);
		return result.rows[0];
	}

  static async updateEvent(userId,event){
    const result = await db.query(
      `UPDATE events SET _start=$1, _end=$2, allday=$3 WHERE id=$4 AND userid=$5 RETURNING id,title,_start as start,_end as end,allday,color`,[event.start,event.end,event.allday,event.id,userId]);
    return result.rows[0];
  }

	static async removeEvent(eventId){
		const response = await db.query(
			`DELETE FROM events WHERE id=$1`, [eventId]);
		return response;
	}
}

module.exports = Event;