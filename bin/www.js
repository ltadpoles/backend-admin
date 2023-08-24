#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app'
import debug from 'debug'
import http from 'http'
import { CONFIG } from '../config'

/**
 * Get port from environment and store in Express.
 */

app.set('port', CONFIG.PORT)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(CONFIG.PORT, () => {
  console.log('服务启动成功')
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof CONFIG.PORT === 'string'
    ? 'Pipe ' + CONFIG.PORT
    : 'Port ' + CONFIG.PORT

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
