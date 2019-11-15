const server = require('./server.js')

const PORT = process.env.PORT || 1234

server.listen(PORT,() => {
    console.log(`!@@!@!@!@! ~ Server Running on ${PORT}  ~`)
})