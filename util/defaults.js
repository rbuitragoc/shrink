require('dotenv').config();

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = function(val) {
  const port = parseInt(val, 10);
  
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  
  if (port >= 0) {
    // port number
    return port;
  }
  
  return false;
}

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/shrink';

const DOMAIN = process.env.DOMAIN || 'shri.nk';

const PORT = normalizePort(process.env.PORT || '80');

const PROTOCOL = process.env.PROTOCOL || 'http';

const PORT_URL_SUFFIX = PORT !== 80 ? `:${PORT}` : '';

const BASE_URL = `${PROTOCOL}://${DOMAIN}${PORT_URL_SUFFIX}/`;

module.exports = {
  BASE_URL,
  DB_URL,
  PORT,
  PROTOCOL,
}