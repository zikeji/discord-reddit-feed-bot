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

I recommend installing pm2 to run the feed bot. It can be found here: https://github.com/Unitech/pm2
 - `pm2 start app.js --name discord-feed-bot`
