# discord-feed-bot [![Build Status](https://travis-ci.org/zikeji/discord-feed-bot.svg?branch=master)](https://travis-ci.org/zikeji/discord-feed-bot)

### Installation

 - `git clone https://git.zynados.com/homelab/discord-feed-bot`
 - `cd discord-feed-bot`
 - `npm install`
 - Set the following environment variables. Preferably just make a .env file with them (`VARIABLE=VALUE`)
    - `DISCORD_TOKEN` // the bot API token you've created
    - `DISCORD_SERVERID` // the server ID of the server you want to use this one (Server Settings -> Widget -> "SERVER ID")
    - `DISCORD_CHANNEL` // the channel you want feed updates to be posted to
    - `SUBREDDIT` // the subreddit you want to notify on
    - `LOGGING_LEVEL` // what you want to log, can be either: debug, info, warn, error
- Now start the bot using `npm start`

#### Installing as a service (Linux)

If you would like to run the bot as a service, I've included a systemd example file (`discordfeedbot.service.example`). Configure it and install it as `discordfeedbot.service` to `/etc/systemd/system`.

You can now run `systemctl start discordfeedbot.service` to start the bot in the background. To enable it on bootup, simply `systemctl enable discordfeedbot.service`. To review application logs, simply `journalctl -t discordfeedbot`.
