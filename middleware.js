const ExpressError = require("./expressError");

function logger(req, res, next){
    console.log(`Sending ${req.method} request to ${req.path}.`);
    return next();
}

function checkForPassword(req, res, next){
    try {
        if (req.query.password !== '123'){
            throw new ExpressError("Missing Password", 402);
        }else{
            return next();
        }
    } catch (e) {
        return next(e);
    }

}

module.exports = {logger, checkForPassword};
