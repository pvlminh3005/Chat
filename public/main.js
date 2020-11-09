var socket = io("http://localhost:3000")

//SEVER SEND CLIENT
//login to chat Room
socket.on("server-send-loginChat", data => {
    $("#conversation-list").html("")
    data.forEach(element => {
        appendListUsers(element)
    })
})

socket.on("server-send-message", (data) => {
    appendMessage(data)
})

socket.on("server-send-yournameChat", (data) => {
    $("#spanName").text(data)
})

/////
$(document).ready(() => {
    //Main views
    $("#loginChat").show()
    $("#chat-container").hide()

    //CLIENT SEND SERVER
    //login to chat Room
    $("#btnCreate").click(() => {
        var nameChat = $("#txtName").val()
        socket.emit("client-send-loginChat", nameChat)

        $("#txtName").val('')

        //
        $("#loginChat").hide(1500)
        $("#chat-container").show(1200)
    })

    //send message
    $("#imgSendMessage").click(() => {
        var message = $("#txtMessage").val()
        socket.emit("client-send-message", message)

        setMessage(message)

        $("#txtMessage").val('')
    })

    //logout chat Room
    $("#logoutChat").click(() => {
        if (confirm("Are you sure Logout?")) {

            $("#chat-title").html("")

            //show Main views
            $("#chat-container").hide(1500)
            $("#loginChat").show(2000)
        } else
            return
    })
})

//FUNCTION
//yourChat
function createDivChat(a) {
    const divChatElement = document.createElement('div')
    divChatElement.setAttribute("id", "blockChat")
    $("#chat-message-list").append(divChatElement)

    divChatElement.append(a)
}

//friendChat
function createDivFriendChat(a) {
    const divChatElement = document.createElement('div')
    divChatElement.setAttribute("id", "blockFriendChat")
    $("#chat-message-list").append(divChatElement)

    divChatElement.append(a)
}


function createListUser(a, b) {
    const listUserElement = document.createElement('div')
    listUserElement.setAttribute("id", "listUsers")
    $("#conversation-list").append(listUserElement)
    listUserElement.append(a)
    listUserElement.append(b)
}

function appendListUsers(message) {
    const userElement = document.createElement('div')
    const imgUserElement = document.createElement('img')

    imgUserElement.setAttribute("src", "person.png")
    userElement.setAttribute("id", "user")

    userElement.innerText = message
    createListUser(userElement, imgUserElement)
}

//show friendChat
function appendMessage(message) { //append a div when send message
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.setAttribute("id", "friendChat")

    createDivFriendChat(messageElement)
}

//show yourChat
function setMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute("id", "chat")
    messageElement.innerText = message

    createDivChat(messageElement)
}

function createSpanElement(message) {
    const messageElement = document.createElement('span')
        // messageElement.setAttribute("id", "chat")
    messageElement.innerText = message
    $("#chat-title").append(messageElement)
}