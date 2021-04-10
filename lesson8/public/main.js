const socket = io();

socket.on('userName', function(userName){
    console.log('Your username is => ' + userName);
    $('textarea').val($('textarea').val() + 'Your username => ' + userName + '\n');
});
    
socket.on('newUser', function(userName){
    console.log('New user has been connected to chat | ' + userName);
    $('textarea').val($('textarea').val() + userName + ' connected!\n');
});

socket.on('room', function(msg, name){
    console.log(name + ' | => ' + msg);
    $('textarea').val($('textarea').val() + name + ' : '+ msg +'\n');
});

$(document).on('click', 'button', function(){
    const message = $('input').val();
    socket.emit('message', message);
    $('input').val(null);
});