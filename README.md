# Inter-Team Bot

This is a slackbot that allows you to share a channel between teams. It's  
basically a message bouncer.

## Setup

```bash
git clone https://github.com/414owen/Inter-Team-Slackbot.git
cd Inter-Team-Slackbot
```

Now you're going to want to add the relevant teams to `teams.js`. The format is  
self-explanatory. The token it's looking for is a 'Custom Integration' token.  
You can add Inter-Team Slackbot as an integration by going to  
`https://<your-team-name>.slack.com/apps/new/A0F7YS25R-bots`. This will present  
you with a token.

The channel is the name of the channel you'll be sharing with other teams.

```bash
npm install
npm run start
```

## What works

* Text
* Links
* Emoji
* Formatting

## Planned Work

* Add (optional) support for bouncing shared files/snippets/whatever
* (If possible) find solution for launching slack commands cross-channel
  * It seems this used to be possible via the undocumented API method
	`chat.command`, but I wrote an SDK wrapper for this, but when using it got
	the response `body: { ok: false, error: 'user_is_bot' }`, my guess is that
	chat.command supports the `as_user` parameter, so it is possible, but
	setting up the bot as a user adds a lot of hassle to the setup...
* Replace hard-coding channels in `teams.js` with commands for manipulating
  who's connected to who.
