# discord-reddit-feed-bot [![Build Status](https://travis-ci.org/zikeji/discord-reddit-feed-bot.svg?branch=master)](https://travis-ci.org/zikeji/discord-reddit-feed-bot)

**Table of Contents**

- [Installation](#installation)
    - [Installing as a service (Linux)](#installing-as-a-service-linux)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
        - [Getting your server ID and channel ID](#getting-your-server-id-and-channel-id)
        - [Getting your new bot into your server.](#getting-your-new-bot-into-your-server)
        - [Error: Bad Request](#error-bad-request)
        - [Error: Forbidden](#error-forbidden)

### Installation

 - `git clone https://github.com/zikeji/discord-reddit-feed-bot`
 - `cd discord-reddit-feed-bot`
 - `npm install`
 - Ensure the environment variables are set. See **Environment Variables** below. Optionally you can use a .env file to populate these environment variables (see [.env.example](https://github.com/zikeji/discord-reddit-feed-bot/blob/master/.env.example))
 - Ensure the bot token you're using is in the server you want to post updates to and has permissions to use the channel.
 - You're ready to launch the bot using `npm start`

#### Installing as a service (Linux)

I recommend using [pm2](https://github.com/Unitech/pm2) to run the bot.
 - `pm2 start app.js --name discord-reddit-feed-bot`

See their documentation for instructions on auto-launching apps on boot.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
| `DISCORD_TOKEN` | the bot API token you've created, get one [here](https://discordapp.com/developers/applications/me) |
| `DISCORD_SERVERID` | the server ID you want to post new links and selftexts to |
| `DISCORD_CHANNELID` | the specific channel in the server they'll be posted to |
| `SUBREDDIT` | the subreddit name (examples: `news`, `gaming`, etc.) |
| `EMBED_COLOR` | the hex color code you want to use to color the embed (the leftmost portion of the message), defaults to `#007cbf` |
| `LOGGING_LEVEL` | everything is logged to console only, which is why I recommend PM2. Options are `debug`, `info`, `warn`, or `error` |

### Troubleshooting

#### Getting your server ID and channel ID

You need to enable "Developer Mode" in the Discord app. Go to your settings, then the "Appearance" section, now check "Developer Mode" and hit "done". Now you cna right click a server in your list on the right and click "Copy ID", then right click the channel in the server and hit "Copy ID" (after you've pasted the previous ID).

#### Getting your new bot into your server.

Giving a bot permission to use your server can be a bit frustrating. You need to generate an OAuth link and use that to invite it to your server.

At this point I assume you have a bot and you're on the page, and you've created the bot user. If you want someone else to add this bot be sure to tick "Public Bot", at least temporarily.

Now you want to get your "Client ID" on that page and add it to the `[CLIENTID]` part of this URL:
`https://discordapp.com/api/oauth2/authorize?client_id=[CLIENTID]&scope=bot&permissions=0`

So it should look like:
`https://discordapp.com/api/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=0`

Then you can launch that URL (or have someone launch it) and add it to your server. You'll notice I left the permissions at "0". That's because I prefer to assign permissions manually on the server itself. So be sure to give the bot permissions to at the very least "send messages" & "embed links" on the channel.

#### Error: Bad Request

Incorrect permissions - please ensure the bot has the ability to `Send Messages` and `Embed Links` on the channel.

#### Error: Forbidden

Could be an invalid bot token, however please ensure the bot has the ability to view the channel it's posting to.