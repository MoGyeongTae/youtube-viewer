"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftBox = function (_React$Component) {
  _inherits(LeftBox, _React$Component);

  function LeftBox(props) {
    _classCallCheck(this, LeftBox);

    return _possibleConstructorReturn(this, (LeftBox.__proto__ || Object.getPrototypeOf(LeftBox)).call(this, props));
  }

  _createClass(LeftBox, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { className: "leftBox" });
    }
  }]);

  return LeftBox;
}(React.Component);

var RightBox = function (_React$Component2) {
  _inherits(RightBox, _React$Component2);

  function RightBox(props) {
    _classCallCheck(this, RightBox);

    return _possibleConstructorReturn(this, (RightBox.__proto__ || Object.getPrototypeOf(RightBox)).call(this, props));
  }

  _createClass(RightBox, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { className: "rightBox" });
    }
  }]);

  return RightBox;
}(React.Component);

// Main Component


var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "wrap" },
        React.createElement(LeftBox, null),
        React.createElement(RightBox, null)
      );
    }
  }]);

  return App;
}(React.Component);

window.onload = function () {
  var root = document.getElementById("root");
  ReactDOM.render(React.createElement(App, null), root);
};
