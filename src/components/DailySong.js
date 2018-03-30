import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

const request = require('request-promise-native')

export default class DailySong extends Component {
    static PropTypes = {
        title: PropTypes.string,
        channel: PropTypes.string.isRequired,
        apiData: PropTypes.shape({
            DailySong: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ channel }) {
        console.log('channel', channel);
        return {
            id: `slack.dailySong`,
            params: { channel }
        }
    }

    render() {
        const { apiData, apiError, title } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        console.log('apiData', apiData);
        if (apiData) {
            body = (
                <div id="slack">

                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Le son du jour'}
                    count={count}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
