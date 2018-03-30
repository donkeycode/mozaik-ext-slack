'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const buildApiRequest = (path, params) => {
        const url = config.get('slack.baseUrl')
        const token = config.get('slack.token');

        const options = {
            uri: `${url}${path}`,
            qs: {
                token: token,
                pretty: 1
            },
            json: true,
            resolveWithFullResponse: true
        }

        if (params) {
            options.qs = Object.assign(options.qs, params);
        }

        console.log(options);
        return request(options)
    }

    const apiCalls = {
        dailySong(params) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            params = Object.assign({ oldest: date.getTime() / 1000}, params);
            return buildApiRequest(`/conversations.history`, params).then((res) => {
                return res.body.messages.filter(message => message.text.match(/^Le son du jour[\r?\n|\r]?.+/gi))
            })
        }
    }

    return apiCalls
}

module.exports = client
