'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _electronPrompt = require('electron-prompt');

var _electronPrompt2 = _interopRequireDefault(_electronPrompt);

var _electronNotificationDesktop = require('electron-notification-desktop');

var _electronNotificationDesktop2 = _interopRequireDefault(_electronNotificationDesktop);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactYoutube = require('react-youtube');

var _reactYoutube2 = _interopRequireDefault(_reactYoutube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var remote = require("electron").remote;

var LeftBox = function (_React$Component) {
  _inherits(LeftBox, _React$Component);

  function LeftBox(props) {
    _classCallCheck(this, LeftBox);

    var _this = _possibleConstructorReturn(this, (LeftBox.__proto__ || Object.getPrototypeOf(LeftBox)).call(this, props));

    _this.stopVideo = function () {
      _this.frame.current.pauseVideo();
    };

    _this.startVideo = function () {
      _this.frame.current.playVideo();
    };

    _this.skipVideo = function () {
      var len = _this.props.musicList.length - 1;
      if (len >= _this.state.currentPlayIdx + 1) {
        _this.setState({
          currentPlayIdx: _this.state.currentPlayIdx + 1
        });
      } else if (len < _this.state.currentPlayIdx + 1) {
        _this.setState({
          currentPlayIdx: 0
        });
      } else {
        console.log("asdf");
      }
    };

    _this.chkVideo = function () {
      if (!_this.props.musicList[0]) {
        return;
      }

      if (_this.props.musicList[0] && !_this.state.playing) {
        _this.setState({
          currentPlayIdx: 0,
          playing: true
        });
      }
    };

    _this.frame = _react2.default.createRef();

    _this.state = {
      currentPlayIdx: -1,
      playing: false
    };
    return _this;
  }

  _createClass(LeftBox, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.chkVideo();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentPlayIdx = this.state.currentPlayIdx;

      var frameOptions = {
        playerVars: {
          autoplay: 1
        }
      };
      return _react2.default.createElement(
        'div',
        { className: 'leftBox' },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          'Youtube Viewer'
        ),
        _react2.default.createElement(
          'div',
          { className: 'musicListBox' },
          _react2.default.createElement(
            'div',
            { className: 'musicList' },
            _react2.default.createElement(
              'table',
              null,
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    { width: '20%', height: '70' },
                    '#'
                  ),
                  _react2.default.createElement(
                    'th',
                    { width: '80%', height: '70' },
                    'Title'
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                this.props.musicList.map(function (item, idx) {
                  return _react2.default.createElement(
                    'tr',
                    { key: idx, className: _this2.state.currentPlayIdx == idx ? "currentPlaying" : "" },
                    _react2.default.createElement(
                      'td',
                      { width: '20%', height: '50' },
                      idx + 1
                    ),
                    _react2.default.createElement(
                      'td',
                      { width: '80%', height: '50' },
                      item.snippet.title
                    )
                  );
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'frameBox' },
          _react2.default.createElement(_reactYoutube2.default, { ref: this.frame,
            videoId: currentPlayIdx == -1 ? "" : this.props.musicList[currentPlayIdx].id.videoId,
            opts: frameOptions,
            onEnd: this.skipVideo
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'buttonBox' },
          _react2.default.createElement(
            'button',
            { onClick: this.stopVideo },
            '||'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.startVideo },
            '\u25B6'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.skipVideo },
            'Skip'
          )
        )
      );
    }
  }]);

  return LeftBox;
}(_react2.default.Component);

var RightBox = function (_React$Component2) {
  _inherits(RightBox, _React$Component2);

  function RightBox(props) {
    _classCallCheck(this, RightBox);

    var _this3 = _possibleConstructorReturn(this, (RightBox.__proto__ || Object.getPrototypeOf(RightBox)).call(this, props));

    _this3.searchChange = function (e) {
      _this3.setState({
        key: e.target.value
      });
    };

    _this3.search = function () {
      _axios2.default.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBKb3i3heKckuSAHP32TmeBqSRczXukJQo&part=snippet&q=' + _this3.state.key).then(function (data) {
        _this3.setState({
          list: data.data.items
        });
      }).catch(function (err) {
        console.log(err);
      });
    };

    _this3.musicAdd = function (idx) {
      var data = _this3.state.list[idx];
      _this3.props.musicAdd(data);
    };

    _this3.state = {
      list: [],
      key: ""
    };
    return _this3;
  }

  _createClass(RightBox, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'rightBox' },
        _react2.default.createElement(
          'div',
          { className: 'searchBox' },
          _react2.default.createElement('input', { type: 'text', onChange: this.searchChange, value: this.state.key }),
          _react2.default.createElement(
            'button',
            { onClick: this.search },
            '\uAC80\uC0C9'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'listBox' },
          this.state.list.map(function (item, idx) {
            return _react2.default.createElement(
              'div',
              { className: 'searchList', key: idx },
              _react2.default.createElement(
                'div',
                { className: 'searchListImg' },
                _react2.default.createElement('img', { src: item.snippet.thumbnails.medium.url })
              ),
              _react2.default.createElement(
                'div',
                { className: 'searchTitle' },
                _react2.default.createElement(
                  'p',
                  null,
                  item.snippet.title
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'musicAdd' },
                _react2.default.createElement(
                  'button',
                  { onClick: function onClick() {
                      return _this4.musicAdd(idx);
                    } },
                  '\uCD94\uAC00'
                )
              )
            );
          })
        )
      );
    }
  }]);

  return RightBox;
}(_react2.default.Component);

// Main Component


var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this5.musicAdd = function (data) {
      _this5.setState(function (prevState) {
        return {
          currentMusicList: [].concat(_toConsumableArray(prevState.currentMusicList), [data])
        };
      });
    };

    _this5.state = {
      currentMusicList: []
    };
    return _this5;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'wrap' },
        _react2.default.createElement(LeftBox, { musicList: this.state.currentMusicList }),
        _react2.default.createElement(RightBox, { musicAdd: this.musicAdd })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

window.onload = function () {
  var root = document.getElementById("root");
  _reactDom2.default.render(_react2.default.createElement(App, null), root);
};
