const { format } = require('date-fns');
const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, `Err_${format(new Date(), 'yyyyMMdd')}.txt`);
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errorHandler;