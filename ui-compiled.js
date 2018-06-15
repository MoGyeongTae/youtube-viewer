'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftBox = function (_React$Component) {
  _inherits(LeftBox, _React$Component);

  function LeftBox(props) {
    _classCallCheck(this, LeftBox);

    var _this = _possibleConstructorReturn(this, (LeftBox.__proto__ || Object.getPrototypeOf(LeftBox)).call(this, props));

    _this.stopVideo = function () {
      _this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "pauseVideo", "args" : ""}', "*");
    };

    _this.startVideo = function () {
      _this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "playVideo", "args" : ""}', "*");
    };

    _this.skipVideo = function () {};

    _this.chkVideo = function () {
      if (!_this.props.musicList[0]) {
        return;
      }

      if (_this.props.musicList[0] && !_this.state.playing) {
        _this.frame.current.src = 'https://www.youtube.com/embed/' + _this.props.musicList[0].id.videoId + '?autoplay=1&version=3&enablejsapi=1&playerapiid=ytplayer';
        _this.setState({
          playing: true
        });
      }
    };

    _this.frame = React.createRef();

    _this.state = {
      currentPlayIdx: 0,
      playing: false
    };
    return _this;
  }

  _createClass(LeftBox, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.chkVideo();
      var a = this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "getPlayerState", "args" : ""}', "*");
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'leftBox' },
        React.createElement(
          'div',
          { className: 'title' },
          'Youtube Viewer'
        ),
        React.createElement(
          'div',
          { className: 'musicListBox' },
          React.createElement(
            'div',
            { className: 'musicList' },
            React.createElement(
              'table',
              null,
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    { width: '20%', height: '70' },
                    '#'
                  ),
                  React.createElement(
                    'th',
                    { width: '80%', height: '70' },
                    'Title'
                  )
                )
              ),
              React.createElement(
                'tbody',
                null,
                this.props.musicList.map(function (item, idx) {
                  return React.createElement(
                    'tr',
                    { key: idx, className: _this2.state.currentPlayIdx == idx ? "currentPlaying" : "" },
                    React.createElement(
                      'td',
                      { width: '20%', height: '50' },
                      idx + 1
                    ),
                    React.createElement(
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
        React.createElement(
          'div',
          { className: 'frameBox' },
          React.createElement('iframe', { frameBorder: '0', src: '', ref: this.frame })
        ),
        React.createElement(
          'div',
          { className: 'buttonBox' },
          React.createElement(
            'button',
            { onClick: this.stopVideo },
            '||'
          ),
          React.createElement(
            'button',
            { onClick: this.startVideo },
            '\u25B6'
          ),
          React.createElement(
            'button',
            { onClick: this.skipVideo },
            'Skip'
          )
        )
      );
    }
  }]);

  return LeftBox;
}(React.Component);

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
      axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBKb3i3heKckuSAHP32TmeBqSRczXukJQo&part=snippet&q=' + _this3.state.key).then(function (data) {
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

      return React.createElement(
        'div',
        { className: 'rightBox' },
        React.createElement(
          'div',
          { className: 'searchBox' },
          React.createElement('input', { type: 'text', onChange: this.searchChange, value: this.state.key }),
          React.createElement(
            'button',
            { onClick: this.search },
            '\uAC80\uC0C9'
          )
        ),
        React.createElement(
          'div',
          { className: 'listBox' },
          this.state.list.map(function (item, idx) {
            return React.createElement(
              'div',
              { className: 'searchList', key: idx },
              React.createElement(
                'div',
                { className: 'searchListImg' },
                React.createElement('img', { src: item.snippet.thumbnails.medium.url })
              ),
              React.createElement(
                'div',
                { className: 'searchTitle' },
                React.createElement(
                  'p',
                  null,
                  item.snippet.title
                )
              ),
              React.createElement(
                'div',
                { className: 'musicAdd' },
                React.createElement(
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
}(React.Component);

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
      return React.createElement(
        'div',
        { className: 'wrap' },
        React.createElement(LeftBox, { musicList: this.state.currentMusicList }),
        React.createElement(RightBox, { musicAdd: this.musicAdd })
      );
    }
  }]);

  return App;
}(React.Component);

window.onload = function () {
  var root = document.getElementById("root");
  ReactDOM.render(React.createElement(App, null), root);
};
