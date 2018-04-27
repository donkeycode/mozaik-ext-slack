function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o';

var request = require('request-promise-native');

var DailySong = function (_Component) {
    _inherits(DailySong, _Component);

    function DailySong(props) {
        _classCallCheck(this, DailySong);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.play = _this.play.bind(_this);
        return _this;
    }

    DailySong.getApiRequest = function getApiRequest(_ref) {
        var channel = _ref.channel;

        console.log('channel', channel);
        return {
            id: 'slack.dailySong',
            params: { channel: channel }
        };
    };

    DailySong.prototype.getHtml = function getHtml(html) {
        return { __html: html };
    };

    DailySong.prototype.play = function play() {
        this.props.playing = true;
        this.setState();
    };

    DailySong.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        console.log('update component', this.props.apiData, !this.props.apiData);
        return !this.props.apiData || this.props.playing || nextProps.apiData.ts != this.props.apiData.ts;
    };

    DailySong.prototype.componentDidUpdate = function componentDidUpdate() {
        this.props.playing = false;
    };

    DailySong.prototype.render = function render() {
        var _props = this.props,
            apiData = _props.apiData,
            apiError = _props.apiError,
            title = _props.title;


        var body = void 0;
        var songTitle = "";
        var videoBody = void 0;
        if (apiData) {
            var video = apiData.attachments[0];
            songTitle = video ? " - " + video.title : "";
            if (!this.props.playing) {
                videoBody = React.createElement(
                    'div',
                    { className: 'thumb' },
                    React.createElement('img', { src: video.thumb_url, alt: video.title, width: video.thumb_width, height: video.thumb_height }),
                    React.createElement(
                        'a',
                        { className: 'play-icon', onClick: this.play },
                        React.createElement(FaPlayCircleO, null)
                    )
                );
            } else if (this.props.playing) {
                videoBody = React.createElement('div', { id: 'video', dangerouslySetInnerHTML: this.getHtml(video.video_html) });
            }
        } else {
            videoBody = React.createElement(
                'div',
                { className: 'noSong' },
                React.createElement(
                    'p',
                    null,
                    'Envoyez le son du jour sur le channel entre-nous'
                )
            );
        }
        body = React.createElement(
            'div',
            { id: 'slack' },
            React.createElement(
                'div',
                { id: 'sonDuJour' },
                videoBody
            )
        );

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: (title || 'Le son du jour') + songTitle
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
    playing: PropTypes.bool,
    apiData: PropTypes.shape({
        DailySong: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
DailySong.defaultProps = {
    playing: false
};
export default DailySong;