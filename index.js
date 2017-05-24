var slack = require("slack");
var botName = "InterTeamBot";
var messageNumber = 0;
var teams = require("./teams");

function forward(team, message, prefix) {
	console.log(prefix, "Forwarding");
	for (var i = 0; i < teams.length; i++) {
		var t = teams[i];
		if (t.id !== team.id) {
			var params = {
				token: t.token,
				username: "inter-team",
				channel: t.channel,
				text: team.users[message.user].name + ": " + message.text
			};
			slack.chat.postMessage(params, function(err, data) {
				if (!err && data) {
					console.log(prefix, "Sent", '"' + params.text + '"', "to", t.id, "-", t.channel);
				} else {console.error(prefix, err);}
			});
		}
	}
}

function prefix(type, num) {
	return "[" + type + num + "] -";
}

teams.forEach(function(team, teamInd) {
	let bot = slack.rtm.client();
	team.users = {};
	var teamPrefix = prefix("t", teamInd);
	console.log(teamPrefix, "Fetching team info");
	slack.team.info({token: team.token}, function(err, data) {
		if (!err && data) {
			console.log(teamPrefix, "Team info found");
			team.id = data.team.id;
			bot.message(function(message) {
				if (message.subtype || message.type !== "message") {return;}
				var messagePrefix = prefix("m", messageNumber++);
				console.log(messagePrefix, "Received message:", message.text);
				if (team.users[message.user]) {
					console.log(messagePrefix, "User already known");
					forward(team, message, messagePrefix);
				} else {
					console.log(messagePrefix, "Looking up user");
					slack.users.info({
						token: team.token,
						user: message.user
					}, function(err, data) {
						if (!err && data) {
							team.users[message.user] = data.user;
							forward(team, message, messagePrefix);
						} else {console.error(messagePrefix, err);}
					});
				}
			});
			bot.listen({token: team.token});
		} else {
			console.error("Couldn't retrieve team into for team:", team);
		}
	});
});
