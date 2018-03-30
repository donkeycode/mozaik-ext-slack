const convict = require('convict')

const config = convict({
    slack: {
        baseUrl: {
            doc: 'The Slack API base url.',
			default: 'https://slack.com/api/',
            format: String,
            env: 'SLACK_BASE_URL',
        },
        token: {
            doc: 'The Slack API token.',
            default: '',
            format: String,
            env: 'SLACK_API_TOKEN',
        },
    },
})

module.exports = config
