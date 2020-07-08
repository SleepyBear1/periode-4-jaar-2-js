var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["css", "javascript", "swift"];
var isCurrentRoom = validRooms.includes(roomName);

if (isCurrentRoom) {
    const room = roomName;
    const socket = io('/tech');
    $('form').submit(() => {
        let msg = $('#m').val();
        let user = localStorage.getItem('user');
        console.log(user);

        socket.emit('message', {msg, room, user });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        let user = localStorage.getItem('user');

        socket.emit('join', { room: room, user: user });

    });
    
    socket.on("historychats", (data) => {
      data.forEach(data => {
        $('#messages').append($('<li class="other">').text(data.user_name+' '+data.chat_text));
        console.log(data);
      });
    });


    socket.on('message', (data) => {
        let user = localStorage.getItem('user');
        console.log(data);
        if(user == data.user){
            $('#messages').append($('<li class="mine">').text(data.user+' '+data.msg));
        }else{
            $('#messages').append($('<li class="other">').text(data.user+' '+data.msg));
        }

    });

    socket.on('singleMessage', (msg) => {
        $('#messages').append($('<li class="other">').text(msg));
    });

    socket.on('historyChats', (data) => {
        let user = localStorage.getItem('user');

        for(var i = 0; 1 , data.length; i++) {
            if(user == data[i].user_name){
                $('#messages').append($('<le class="mine">').text(data[i].chat_text+' _ '+data[i].user_name));
            }else{
                $('#messages').append($('<le class="other">').text(data[i].chat_text+' _ '+data[i].user_name));
            }
        }

    });
}


$( document ).ready(function() {
    $('.room-name').text(roomName);
    var title = $('title').html();
    $('title').html(title.replace("{{room}}",roomName));

    $('body').on('click','._saveUsername', (event) => {
        event.preventDefault();
        var userName = $('._userName',userName);

        localStorage.setItem('user',userName);

        window.location.href = '/rooms';
    });
});
