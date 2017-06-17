const BootBot = require('bootbot');
const bot = new BootBot({
    accessToken: 'EAARcsewgLngBAGRC5ynGZC1iZBAtxV18O4HcDHfCPZBIpqT8WNNqZBg7GJrQj5bBwA6cMHobqMo8vf9xhfyH3UGUbKChKZBhTG9NJMy9qzvNLfNXeqPmPaSkNzwbq6ptcWMmAYnZC0zBUg6ddtlMG5cKRDnJ22qbtbiERzwWMlqAYOkb5ZBj3ZBa',
    verifyToken: 'VERIFY_ME_I_WANT_KNOW_WEATHER',
    appSecret: 'a899a90fec70d3b368b49ab8b230e944'
});
const weather = require('weather-js');

bot.hear(/weather (.*)/i, (payload, chat, data) => {
    const query = data.match[1];
    weather.find({search: query, degreeType: 'C'}, function(err, result) {
        if (err || !result || result.length == 0) {
            chat.say(`Unable to find weather for ${query}`);
            return;
        }
        chat.say({
            attachment: 'image',
            url: getWeatherImage(result[0])
        });
        chat.say(getMessage(result[0]));
    });
});

function getMessage(queryResult) {
    return `${queryResult.location.name} ${queryResult.current.temperature}${queryResult.location.degreetype}, ${queryResult.current.skytext}`;
}

function getWeatherImage(queryResult) {
    return queryResult.current.imageUrl
}

bot.start();