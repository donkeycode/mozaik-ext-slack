function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

var request = require('request-promise-native');

var DailySong = function (_Component) {
    _inherits(DailySong, _Component);

    function DailySong() {
        _classCallCheck(this, DailySong);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    DailySong.getApiRequest = function getApiRequest(_ref) {
        var channel = _ref.channel;

        console.log('channel', channel);
        return {
            id: 'slack.dailySong',
            params: { channel: channel }
        };
    };

    DailySong.prototype.render = function render() {
        var _props = this.props,
            apiData = _props.apiData,
            apiError = _props.apiError,
            title = _props.title;


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        console.log('apiData', apiData);
        if (apiData) {
            body = React.createElement('div', { id: 'slack' });
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Le son du jour',
                count: count
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return DailySong;
}(Component);

DailySong.PropTypes = {
    title: PropTypes.string,
    channel: PropTypes.string.isRequired,
    apiData: PropTypes.shape({
        DailySong: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
export default DailySong;