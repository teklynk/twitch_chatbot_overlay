# Twitch chat bot overlay

**URL parameters:**

bot=your bot name

channel=your main twitch channel

http://example.com/bot.html?bot=coolbot&channel=MrStreamer

### Over-write the CSS of your OBS browser source by adding this CSS.

```
#notif {
    width: 600px;
    color: #eee;
    border-radius: 5px;
    text-shadow: 1px 1px #000 !important;
    background: #33127d;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 12px;
    right: 95px;
    overflow: hidden;
    text-align: left;
    visibility: hidden;
    padding: 12px;
}

#arrow {
    display: inline-block;
    background: transparent;
    vertical-align: top;
    margin-top: 30px;
    position: absolute;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #33127d;
    visibility: hidden;
}
```

# Sample
![sample1](https://github.com/teklynk/twitch_chatbot_overlay/blob/main/sample-gif.gif?raw=true)


# Try it!
[https://twitch-chatbot-overlay.pages.dev/bot?bot=coolbot&channel=MrStreamer](https://twitch-chatbot-overlay.pages.dev/bot?bot=coolbot&channel=MrStreamer)