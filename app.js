'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const request = require('request');
const entities = require('entities');
const logger = require('./logger');
const validUrl = require('valid-url');

const bot = new Discord.Client();

bot.login(process.env.DISCORD_TOKEN);

let botReady = false;
let lastTimestamp = Math.floor(Date.now() / 1000);

let Guild;
let Channel;
bot.on('ready', () => {
  // bot.user.setStatus('online', `Spamming F5 on /r/${process.env.SUBREDDIT}`).then(logger.info('Changed status!')).catch('ready failed to change status', logger.error); // if you want to change the status of the bot and set the game playing to something specific you may uncomment this

  Guild = bot.guilds.get(process.env.DISCORD_SERVERID);
  if (Guild) {
    Channel = Guild.channels.get(process.env.DISCORD_CHANNELID);
  }

  if (!Channel) {
    logger.error('A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.');
    process.exit(1);
  } else {
    logger.info('Ready');
    botReady = true;
  }
});

bot.on('error', (error) => {
  logger.error('Connection error', error);
  botReady = false;
});

bot.on('reconnecting', () => {
  logger.debug('Reconnecting');
});

const subredditUrl = `https://www.reddit.com/r/${process.env.SUBREDDIT}/new.json?limit=10`;

setInterval(() => {
  if (botReady) {
    request({
      url: subredditUrl,
      json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        logger.debug('Request succeeded, lastTimestamp = ', lastTimestamp);
        for (const post of body.data.children.reverse()) {
          if (lastTimestamp <= post.data.created_utc) {
            lastTimestamp = post.data.created_utc;

            const embed = new Discord.RichEmbed();
            embed.setColor(process.env.EMBED_COLOR || '#007cbf');
            embed.setTitle(`${post.data.link_flair_text ? `[${post.data.link_flair_text}] ` : ''}${entities.decodeHTML(post.data.title)}`);
            embed.setURL(`https://redd.it/${post.data.id}`);
            embed.setDescription(`${post.data.is_self ? entities.decodeHTML(post.data.selftext.length > 253 ? post.data.selftext.slice(0, 253).concat('...') : post.data.selftext) : ''}`);
            embed.setThumbnail(validUrl.isUri(post.data.thumbnail) ? entities.decodeHTML(post.data.thumbnail) : null);
            embed.setFooter(`${post.data.is_self ? 'self post' : 'link post'} by ${post.data.author}`);
            embed.setTimestamp(new Date(post.data.created_utc * 1000));

            Channel.sendEmbed(embed).then(() => {
              logger.debug(`Sent message for new post https://redd.it/${post.data.id}`);
            }).catch(err => {
              logger.error(embed, err);
            });
          }
        }
        ++lastTimestamp;
      } else {
        logger.warn('Request failed - reddit could be down or subreddit doesn\'t exist. Will continue.');
        logger.debug(response, body);
      }
    });
  }
}, 30 * 1000); // 30 seconds

function onExit() {
  logger.info('Logging out before exiting');
  bot.destroy().then(error => {
    if (error) {
      logger.error('Unknown error during logout', error);
      process.exit(-1);
    } else {
      logger.info('Logout success');
      process.exit(0);
    }
  });
}

process.on('SIGINT', onExit);
process.on('SIGTERM', onExit);
process.on('uncaughtException', onExit);