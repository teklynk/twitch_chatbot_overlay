function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

let botName = getUrlParameter('bot').toLowerCase().trim();
let channelName = getUrlParameter('channel').toLowerCase().trim();

if (channelName === '') {
    alert('channel is not set in the URL');
}

if (botName === '') {
    alert('bot is not set in the URL');
}

let timer = setInterval(timeSleep, 1000); //seconds
let timer_timeOut = setInterval(timeOut, 1000); //seconds

function timeSleep() {

    idleTime = idleTime + 1;

    if (idleTime === 300) { //5mins

        document.getElementById('imgSrc').src = 'assets/images/robot-sleep.gif';

    }

}

function timeOut() {

    if (idleTime === 5) { //5 seconds

        document.getElementById('notif').innerHTML = '';
        document.getElementById('notif').classList.remove('visible');
        document.getElementById('arrow').classList.remove('visible');
        document.getElementById('imgSrc').classList.remove('visible');
        document.getElementById('imgSrc').src = 'assets/images/robot.gif';

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
            if (typeof mote === 'string') {
                mote = mote.split('-');
                mote = [parseInt(mote[0]), parseInt(mote[1])];
                let length = mote[1] - mote[0],
                    empty = Array.apply(null, new Array(length + 1)).map(function () {
                        return ''
                    });
                splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                splitText.splice(mote[0], 1, '<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v2/' + i + '/default/dark/3.0">');
            }
        }
    }
    return htmlEntities(splitText).join('')
}

const client = new tmi.Client({
    connection: {reconnect: true},
    channels: [channelName]
});

client.connect().catch(console.error);

let idleTime = 0;
let msgCount = 0;
let showEmotes = true;

client.on('message', (channel, tags, message, self) => {

    // Ignore echoed messages.
    if (self) {
        return false;
    }

    // Ignore if currently playing an alert
    if (document.getElementById('notif').classList.contains('visible')) {
        console.log('currently playing alert');
        return false;
    }

    let chatname = `${tags['display-name']}`;
    let chatmessage = message.replace(/(<([^>]+)>)/ig, "");
    let chatemotes = tags.emotes;

    msgCount = msgCount + 1;

    if (chatname === botName) {

        idleTime = 0;
        timer = 0;
        timer_timeOut = 0;
        clearInterval(timer);
        clearInterval(timer_timeOut);

        document.getElementById('notif').innerHTML = showEmotes ? formatEmotes(chatmessage, chatemotes) : htmlEntities(chatmessage);
        document.getElementById('notif').classList.add('visible');
        document.getElementById('imgSrc').classList.add('visible');
        document.getElementById('arrow').classList.add('visible');

        if (msgCount % 10 === 0) {
            document.getElementById('imgSrc').src = 'assets/images/robot-fire.gif';
        } else {
            document.getElementById('imgSrc').src = 'assets/images/robot-run.gif';
        }

    } else {

        idleTime = 0;
        timer = 0;
        timer_timeOut = 0;
        clearInterval(timer);
        clearInterval(timer_timeOut);

        document.getElementById('notif').innerHTML = '';
        document.getElementById('notif').classList.remove('visible');
        document.getElementById('arrow').classList.remove('visible');
        document.getElementById('imgSrc').classList.remove('visible');
        document.getElementById('imgSrc').src = 'assets/images/robot.gif';
    }
});