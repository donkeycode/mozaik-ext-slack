'use strict';

var request = require('request-promise-native');
// const chalk = require('chalk')
var config = require('./config');

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var buildApiRequest = function buildApiRequest(path, params) {
        var url = config.get('slack.baseUrl');
        var token = config.get('slack.token');

        var options = {
            uri: '' + url + path,
            qs: {
                token: token,
                pretty: 1
            },
            json: true,
            resolveWithFullResponse: true
        };

        if (params) {
            options.qs = Object.assign(options.qs, params);
        }

        return request(options);
    };

    var apiCalls = {
        dailySong: function dailySong(params) {
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            params = Object.assign({ oldest: date.getTime() / 1000 }, params);
            return buildApiRequest('/conversations.history', params).then(function (res) {
                return res.body.messages.filter(function (message) {
                    return message.text.match(/^Le son du jour[\r?\n|\r]?.+/gi);
                })[0];
            });
        }
    };

    return apiCalls;
};

module.exports = client;