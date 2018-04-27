'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _playCircleO = require('react-icons/lib/fa/play-circle-o');

var _playCircleO2 = _interopRequireDefault(_playCircleO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                videoBody = _react2.default.createElement(
                    'div',
                    { className: 'thumb' },
                    _react2.default.createElement('img', { src: video.thumb_url, alt: video.title, width: video.thumb_width, height: video.thumb_height }),
                    _react2.default.createElement(
                        'a',
                        { className: 'play-icon', onClick: this.play },
                        _react2.default.createElement(_playCircleO2.default, null)
                    )
                );
            } else if (this.props.playing) {
                videoBody = _react2.default.createElement('div', { id: 'video', dangerouslySetInnerHTML: this.getHtml(video.video_html) });
            }
        } else {
            videoBody = _react2.default.createElement(
                'div',
                { className: 'noSong' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Envoyez le son du jour sur le channel entre-nous'
                )
            );
        }
        body = _react2.default.createElement(
            'div',
            { id: 'slack' },
            _react2.default.createElement(
                'div',
                { id: 'sonDuJour' },
                videoBody
            )
        );

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: (title || 'Le son du jour') + songTitle
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return DailySong;
}(_react.Component);

DailySong.PropTypes = {
    title: _propTypes2.default.string,
    channel: _propTypes2.default.string.isRequired,
    playing: _propTypes2.default.bool,
    apiData: _propTypes2.default.shape({
        DailySong: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
DailySong.defaultProps = {
    playing: false
};
exports.default = DailySong;