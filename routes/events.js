/** Routes for events. */

const express = require("express");
const router = express.Router();

const Event = require("../models/event");
const { ensureCorrectUser} = require("../middleware/auth");


/** GET / => {events: [event, ...]} */

router.get("/:id/day/:currDate", ensureCorrectUser , async (req, res, next) => {
	const {id,currDate} = req.params;
  try {
    const events = await Event.getDaysEvents(id,currDate);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id/month/:currMonth", ensureCorrectUser , async (req, res, next) => {
	const {id,currMonth} = req.params;
  try {
    const events = await Event.getMonthsEvents(id,currMonth);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id/week/:start/:end", ensureCorrectUser , async (req, res, next) => {
	const {id,start,end} = req.params;
  try {
    const events = await Event.getWeeksEvents(id,start,end);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});

router.post("/:id/add", ensureCorrectUser, async (req,res,next) => {
	const id = req.params.id;
	const data = req.body;
	try {
		const event = await Event.addEvent(id,data);
		return res.json({event});
	} catch (err) {
		return next(err);
	}
})

router.delete("/:id/remove", async (req,res,next) => {
	const id = req.params.id;
	try {
		await Event.removeEvent(id);
		return res.send({message: 'Event Deleted'});
	} catch (err) {
		return next(err);
	}
})

module.exports = router;