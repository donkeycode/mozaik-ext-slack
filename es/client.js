'use strict';

var request = require('request-promise-native');
var chalk = require('chalk');
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

        console.log(options);
        return request(options);
    };

    var apiCalls = {

        // return buildApiRequest(`/repos/${params.repository}/commits`, params).then(res => {
        //     buffer.commits = buffer.commits.concat(res.body)

        //     // checks if there's an available next page in response link http header
        //     if (
        //         res.headers.link &&
        //         /&page=(\d+)> rel="next"/.test(res.headers.link) === true &&
        //         buffer.commits.length < buffer.max
        //     ) {
        //         buffer.page = Number(/&page=(\d+)> rel="next"/.exec(res.headers.link)[1])

        //         return repositoryCommits(params, buffer)
        //     } else {
        //         return buffer.commits
        //     }
        // })

        dailySong: function dailySong(params) {
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            params = Object.assign({ oldest: date.getTime() / 1000 }, params);
            return buildApiRequest('/conversations.history', params).then(function (res) {
                return res.body.messages.filter(function (message) {
                    return message.text.match(/^Le son du jour[\r?\n|\r]?.+/gi);
                });
            });
        }
    };

    return apiCalls;
};

module.exports = client;