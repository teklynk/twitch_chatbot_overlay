function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

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

function htmlEntities(html) {
    function it() {
        return html.map(function (n, i, arr) {

            if (n.length === 1) {
                return n.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
                    return '&#' + i.charCodeAt(0) + ';';
                });
            }

            return n;
        });
    }

    let isArray = Array.isArray(html);

    if (!isArray) {
        html = html.split('');
    }

    html = it(html);

    if (!isArray) html = html.join('');

    return html;
}

function formatEmotes(text, emotes) {
    let splitText = text.split('');
    for (let i in emotes) {
        let e = emotes[i];
        for (let j in e) {
            let mote = e[j];
            if (typeof mote == 'string') {
                mote = mote.split('-');
                mote = [parseInt(mote[0]), parseInt(mote[1])];
                let length = mote[1] - mote[0],
                    empty = Array.apply(null, new Array(length + 1)).map(function () {
                        return ''
                    });
                splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">');
            }
        }
    }
    return htmlEntities(splitText).join('')
}

const client = new tmi.Client({
    connection: {reconnect: true},
    channels: [channelName]
});

client.connect();

let idleTime = 0;
let msgCount = 0;
let showEmotes = true;

client.on('message', (channel, tags, message, self) => {

    let chatname = `${tags['display-name']}`;
    let chatmessage = message.replace(/(<([^>]+)>)/ig, "");
    let chatemotes = tags.emotes;

    msgCount = msgCount + 1;

    if (chatname === botName) {

        idleTime = 0;
        timer = 0;
        clearInterval(timer);

        document.getElementById('notif').innerHTML = showEmotes ? formatEmotes(chatmessage, chatemotes) : htmlEntities(chatmessage);
        document.getElementById('notif').classList.add('visible');
        document.getElementById('imgSrc').classList.add('visible');

        if (msgCount % 5 === 0) {
            document.getElementById('imgSrc').src = 'assets/images/robot-fire.gif';
        } else {
            document.getElementById('imgSrc').src = 'assets/images/robot-run.gif';
        }

        setTimeout(function () {
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