'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const buildApiRequest = (path) => {
        const url = config.get('slack.baseUrl')
        const token = config.get('slack.token');

        const options = {
            uri: `${url}${path}`,
            qs: {
                token: token
            },
            json: true,
            resolveWithFullResponse: true
        }

        return request(options)
    }

    const apiCalls = {

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

        dailySong({}, params) {
            params = Object.assign({ oldest: Date.now() / 1000}, params);
            return buildApiRequest(`/conversations.history`, params).then((res) => {
                return res.filter(message => message.text.match(/^.?Le son du jour.+/gi))[0];
            })
        }
    }

    return apiCalls
}

module.exports = client
