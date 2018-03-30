'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var request = require('request-promise-native');

var DailySong = function (_Component) {
    _inherits(DailySong, _Component);

    function DailySong() {
        _classCallCheck(this, DailySong);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    DailySong.getApiRequest = function getApiRequest(_ref) {
        var channel = _ref.channel;

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


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = 0;
        console.log('apiData', apiData);
        if (apiData) {
            body = _react2.default.createElement('div', { id: 'slack' });
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Le son du jour',
                count: count
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
    apiData: _propTypes2.default.shape({
        DailySong: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = DailySong;