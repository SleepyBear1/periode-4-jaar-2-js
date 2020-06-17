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
        let user = localStorage.getItem('username');

        socket.emit('message', {msg, room, user });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        let user = localStorage.getItem('userName');

        socket.emit('join', { room: room, user:user });

    });


    socket.on('message', (data) => {
        let user = localStorage.getItem('userName');
        console.log(data);
        if(user == data.user){
            $('#messages').append($('<le class="mine">').text(data.msg+' _ '+data.user));
        }else{
            $('#messages').append($('<le class="other">').text(data.msg+' _ '+data.user));
        }

    });

    socket.on('singleMessage', (msg) => {
        $('#messages').append($('<li class="other">').text(msg));
    });

    socket.on('historyChats', (data) => {
        let user = localStorage.getItem('userName');

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

        localStorage.setItem('userName',userName);

        window.location.href = '/rooms';
    });
});