'use strict';

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var request = require('request-promise-native');
var chalk = require('chalk');
var config = require('./config');

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var buildApiRequest = function buildApiRequest(path) {
        var url = config.get('slack.baseUrl');
        var token = config.get('slack.token');

        var options = {
            uri: '' + url + path,
            qs: {
                token: token
            },
            json: true,
            resolveWithFullResponse: true
        };

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

        dailySong: function dailySong(_ref, params) {
            _objectDestructuringEmpty(_ref);

            params = Object.assign({ oldest: Date.now() / 1000 }, params);
            return buildApiRequest('/conversations.history', params).then(function (res) {
                console.log(res);
                return res.filter(function (message) {
                    return message.text.match(/^.?Le son du jour.+/gi);
                })[0];
            });
        }
    };

    return apiCalls;
};

module.exports = client;