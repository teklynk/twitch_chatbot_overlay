function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

let botName = getUrlParameter('bot');
let channelName = getUrlParameter('channel');

//console.log(channelName);

let timer = setInterval(timerIncrement, 1000); //seconds

function timerIncrement() {

    idleTime = idleTime + 1;

    //console.log(idleTime);

    if (idleTime === 600) { //600 seconds = 10mins

        document.getElementById('imgSrc').src = 'assets/images/robot-sleep.gif';
        
    }

}

const client = new tmi.Client({
    connection: {reconnect: true},
    channels: [channelName]
});

client.connect();

let idleTime = 0;
let msgCount = 0;

client.on('message', (channel, tags, message, self) => {

    let chatname = `${tags['display-name']}`;
    let chatmessage = message.replace(/(<([^>]+)>)/ig, "");
    
    msgCount = msgCount + 1;
    
    if (chatname === botName) {
    
        idleTime = 0;
        timer = 0;
        clearInterval(timer);
  
        document.getElementById('notif').innerHTML = chatmessage;
        document.getElementById('notif').classList.add('visible');
        document.getElementById('imgSrc').classList.add('visible');
        
        if (msgCount % 5 == 0) {
            document.getElementById('imgSrc').src = 'assets/images/robot-fire.gif';
        } else {
            document.getElementById('imgSrc').src = 'assets/images/robot-run.gif';
        }
        
        setTimeout(function() { 
            document.getElementById('notif').innerHTML = '';
            document.getElementById('notif').classList.remove('visible');
            document.getElementById('imgSrc').classList.remove('visible');
            document.getElementById('imgSrc').src = 'assets/images/robot.gif'; 
        }, 5500);
        
    } else {
  
        idleTime = 0;
        timer = 0;
        clearInterval(timer);
        
        document.getElementById('notif').innerHTML = '';
        document.getElementById('notif').classList.remove('visible');
        document.getElementById('imgSrc').classList.remove('visible');
        document.getElementById('imgSrc').src = 'assets/images/robot.gif';
        
    }

});