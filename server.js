var express = require("express")
var app = express()

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require("socket.io")(server)

server.listen(3000)
app.get("/", (req, res) => {
    res.render("trangchu")
})

// var user = {}
// var arrChat = []
io.on("connection", socket => {
    //SERVER RECEIVE FROM CLIENT
    //login to chat Room
    socket.on("client-send-loginChat", data => {
        socket.join(data)
        socket.User = data
        var arrUsers = []

        for (i in socket.adapter.rooms) { //save new User in arrUsers
            arrUsers.push(i);
        }
        io.sockets.emit("server-send-loginChat", arrUsers)
        socket.emit("server-send-yournameChat", socket.User)
        console.log(arrUsers)

    })

    socket.on("client-send-message", data => {
        socket.broadcast.in(socket.User).emit("server-send-message", data)
    })
})