(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("app.js", function(exports, require, module, __filename, __dirname){

"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require("./containers/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById("app"));
});
___scope___.file("containers/App.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n    ", ";\n\n    html,\n    body {\n      width: 100%;\n      height: 100%;\n      padding: 0;\n      margin: 0;\n      font-family: \"Open Sans\", \"Menlo\", sans-serif;\n      font-size: 12px;\n      overflow: hidden;\n    }\n\n    #app {\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n    }\n  "], ["\n    ", ";\n\n    html,\n    body {\n      width: 100%;\n      height: 100%;\n      padding: 0;\n      margin: 0;\n      font-family: \"Open Sans\", \"Menlo\", sans-serif;\n      font-size: 12px;\n      overflow: hidden;\n    }\n\n    #app {\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n    }\n  "]),
    _templateObject2 = _taggedTemplateLiteral(["\n  width: 100vw;\n  height: 100vh;\n  background-color: #eee;\n  position: absolute;\n"], ["\n  width: 100vw;\n  height: 100vh;\n  background-color: #eee;\n  position: absolute;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  background-color: white;\n  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  border: 1px solid rgb(50, 75, 155);\n  margin: 20px;\n  width: calc(100% - 40px);\n  max-height: calc(100% - 40px);\n  position: relative;\n"], ["\n  background-color: white;\n  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  border: 1px solid rgb(50, 75, 155);\n  margin: 20px;\n  width: calc(100% - 40px);\n  max-height: calc(100% - 40px);\n  position: relative;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledReset = require("styled-reset");

var _styledReset2 = _interopRequireDefault(_styledReset);

var _Nav = require("../components/Nav");

var _routes = require("../routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var baseStyles = function baseStyles() {
  return (0, _styledComponents.injectGlobal)(_templateObject, _styledReset2.default);
};

var Container = _styledComponents2.default.div(_templateObject2);

var Content = _styledComponents2.default.div(_templateObject3);

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      baseStyles();
      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          _reactRouterDom.HashRouter,
          null,
          _react2.default.createElement(
            Content,
            null,
            _react2.default.createElement(
              _Nav.Nav,
              null,
              _react2.default.createElement(
                _Nav.NavBrand,
                null,
                "ThanQueue"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/" },
                "Overview"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/jobs/pending" },
                "Pending Jobs"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/jobs/active" },
                "Active Jobs"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/jobs/failed" },
                "Failed Jobs"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/jobs/complete" },
                "Completed Jobs"
              ),
              _react2.default.createElement(
                _Nav.NavLink,
                { to: "/logs" },
                "Logs"
              )
            ),
            _react2.default.createElement(_routes2.default, null)
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
});
___scope___.file("components/Nav.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = exports.NavBrand = exports.NavLink = undefined;

var _templateObject = _taggedTemplateLiteral(["\n  padding: 8px 20px;\n  line-height: 40px;\n  font-weight: bold;\n  text-decoration: none;\n  color: white;\n  margin-right: 4px;\n\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.25);\n  }\n"], ["\n  padding: 8px 20px;\n  line-height: 40px;\n  font-weight: bold;\n  text-decoration: none;\n  color: white;\n  margin-right: 4px;\n\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.25);\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  padding: 8px 30px 8px 20px;\n  line-height: 22px;\n  font-size: 18px;\n  font-weight: bold;\n  display: inline-block;\n  margin: 0;\n  float: left;\n"], ["\n  padding: 8px 30px 8px 20px;\n  line-height: 22px;\n  font-size: 18px;\n  font-weight: bold;\n  display: inline-block;\n  margin: 0;\n  float: left;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  background-color: rgb(50, 75, 155);\n  color: white;\n  height: 42px;\n  text-align: right;\n"], ["\n  width: 100%;\n  background-color: rgb(50, 75, 155);\n  color: white;\n  height: 42px;\n  text-align: right;\n"]);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NavLink = exports.NavLink = (0, _styledComponents2.default)(_reactRouterDom.Link)(_templateObject);

var NavBrand = exports.NavBrand = _styledComponents2.default.h1(_templateObject2);

var Nav = exports.Nav = _styledComponents2.default.div(_templateObject3);
});
___scope___.file("routes/index.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  padding: 8px;\n  font-size: 14px;\n  width: calc(100% - 16px);\n  height: calc(100% - 59px);\n  overflow: auto;\n"], ["\n  padding: 8px;\n  font-size: 14px;\n  width: calc(100% - 16px);\n  height: calc(100% - 59px);\n  overflow: auto;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Overview = require("./Overview");

var _Overview2 = _interopRequireDefault(_Overview);

var _Job = require("./Job");

var _Job2 = _interopRequireDefault(_Job);

var _Jobs = require("./Jobs");

var _Jobs2 = _interopRequireDefault(_Jobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Wrapper = _styledComponents2.default.div(_templateObject);

exports.default = function () {
  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Overview2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: "/job/:id", component: _Job2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: "/jobs/:status?", component: _Jobs2.default })
    )
  );
};
});
___scope___.file("routes/Overview.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _Table = require("../components/Table");

var _reactRouterDom = require("react-router-dom");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overview = function (_Component) {
  _inherits(Overview, _Component);

  function Overview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Overview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Overview.__proto__ || Object.getPrototypeOf(Overview)).call.apply(_ref, [this].concat(args))), _this), _this.interval = false, _this.state = {
      loading: true
    }, _this.loadStatus = function () {
      return _axios2.default.get("/api/status").then(function (res) {
        var data = res.data;

        _this.setState({
          loading: false,
          data: data
        });
      }).catch(function (err) {
        _this.setState({
          loading: false,
          error: err
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Overview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadStatus();
      this.interval = setInterval(this.loadStatus, 2000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        this.state.loading ? _react2.default.createElement(
          "strong",
          null,
          "Loading"
        ) : _react2.default.createElement(
          _Table.Table,
          { cellPadding: 8, cellSpacing: 0, border: 1 },
          _react2.default.createElement(
            _Table.TBody,
            null,
            _react2.default.createElement(
              _Table.Row,
              null,
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Next Job ID"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.index
              )
            ),
            _react2.default.createElement(
              _Table.Row,
              { onClick: function onClick(e) {
                  return _this2.props.history.push("/pending");
                } },
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Pending Jobs"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.pending
              )
            ),
            _react2.default.createElement(
              _Table.Row,
              { onClick: function onClick(e) {
                  return _this2.props.history.push("/active");
                } },
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Active Jobs"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.active
              )
            ),
            _react2.default.createElement(
              _Table.Row,
              { onClick: function onClick(e) {
                  return _this2.props.history.push("/failed");
                } },
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Failed Jobs"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.failed
              )
            ),
            _react2.default.createElement(
              _Table.Row,
              { onClick: function onClick(e) {
                  return _this2.props.history.push("/completed");
                } },
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Completed Jobs"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.complete
              )
            ),
            _react2.default.createElement(
              _Table.Row,
              { onClick: function onClick(e) {
                  return _this2.props.history.push("/workers");
                } },
              _react2.default.createElement(
                _Table.HCol,
                null,
                "Workers"
              ),
              _react2.default.createElement(
                _Table.Col,
                null,
                this.state.data.workers
              )
            )
          )
        )
      );
    }
  }]);

  return Overview;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(Overview);
});
___scope___.file("components/Table.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HCol = exports.Col = exports.THead = exports.TBody = exports.Row = exports.Table = undefined;

var _templateObject = _taggedTemplateLiteral(["\n  height: ", ";\n  border: 1px solid #ccc;\n  margin: 0;\n  padding: 0;\n  word-break: break-word;\n"], ["\n  height: ", ";\n  border: 1px solid #ccc;\n  margin: 0;\n  padding: 0;\n  word-break: break-word;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  background: ", ";\n"], ["\n  cursor: pointer;\n  background: ", ";\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  ", ":hover {\n    background: #eee;\n  }\n"], ["\n  ", ":hover {\n    background: #eee;\n  }\n"]),
    _templateObject4 = _taggedTemplateLiteral([""], [""]),
    _templateObject5 = _taggedTemplateLiteral(["\n  padding: 8px 20px;\n  white-space: normal;\n  border-bottom: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  line-height: 24px;\n  max-height: 48px;\n  white-space: nowrap;\n  &:last-child {\n    word-wrap: break-word;\n  }\n"], ["\n  padding: 8px 20px;\n  white-space: normal;\n  border-bottom: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  line-height: 24px;\n  max-height: 48px;\n  white-space: nowrap;\n  &:last-child {\n    word-wrap: break-word;\n  }\n"]),
    _templateObject6 = _taggedTemplateLiteral(["font-weight: bold;"], ["font-weight: bold;"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Table = exports.Table = _styledComponents2.default.table(_templateObject, function (props) {
  return props.fullHeight ? "100%" : "auto";
});

var Row = exports.Row = _styledComponents2.default.tr(_templateObject2, function (props) {
  return props.tinted ? "#ececec" : "#fff";
});
var TBody = exports.TBody = _styledComponents2.default.tbody(_templateObject3, Row);
var THead = exports.THead = _styledComponents2.default.thead(_templateObject4);

var Col = exports.Col = _styledComponents2.default.td(_templateObject5);

var HCol = exports.HCol = Col.extend(_templateObject6);
});
___scope___.file("routes/Job.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  padding: 4px 10px;\n  background: rgb(0, 43, 54);\n"], ["\n  padding: 4px 10px;\n  background: rgb(0, 43, 54);\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactJsonTree = require("react-json-tree");

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TreeContainer = _styledComponents2.default.div(_templateObject);

var Job = function (_Component) {
  _inherits(Job, _Component);

  function Job() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Job);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Job.__proto__ || Object.getPrototypeOf(Job)).call.apply(_ref, [this].concat(args))), _this), _this.interval = false, _this.state = {
      loading: true
    }, _this.load = function () {
      return _axios2.default.get("/api/job/" + _this.props.match.params.id).then(function (res) {
        var data = res.data;

        _this.setState({
          loading: false,
          data: data
        });
      }).catch(function (err) {
        _this.setState({
          loading: false,
          error: err
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Job, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load();
      this.interval = setInterval(this.load, 5000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading) {
        return _react2.default.createElement(
          "strong",
          null,
          "Loading"
        );
      }

      var _state$data = this.state.data,
          id = _state$data.id,
          type = _state$data.type,
          status = _state$data.status,
          data = _state$data.data;

      var _ref2 = data ? data : this.state.data,
          result = _ref2.result,
          started_at = _ref2.started_at,
          completed_at = _ref2.completed_at;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h1",
          null,
          "Job #",
          id
        ),
        _react2.default.createElement(
          "h2",
          null,
          "Type: ",
          type
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Status: ",
          status
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("hr", null),
          _react2.default.createElement(
            "h4",
            null,
            "Data"
          ),
          _react2.default.createElement(
            TreeContainer,
            null,
            _react2.default.createElement(_reactJsonTree2.default, { data: data.data ? data.data : data })
          )
        ),
        status === "complete" ? _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("hr", null),
          _react2.default.createElement(
            "h4",
            null,
            "Result"
          ),
          _react2.default.createElement(
            TreeContainer,
            null,
            _react2.default.createElement(_reactJsonTree2.default, { data: result })
          ),
          _react2.default.createElement("hr", null),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "strong",
              null,
              "Completed at"
            ),
            "\xA0",
            _react2.default.createElement(
              "em",
              null,
              _moment2.default.unix(completed_at).format("h:mmA")
            ),
            "\xA0",
            _react2.default.createElement(
              "strong",
              null,
              "on"
            ),
            "\xA0",
            _react2.default.createElement(
              "em",
              null,
              _moment2.default.unix(completed_at).format("MM/DD/YYYY")
            )
          )
        ) : null
      );
    }
  }]);

  return Job;
}(_react.Component);

exports.default = Job;
});
___scope___.file("routes/Jobs.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _JobList = require("../components/JobList");

var _JobList2 = _interopRequireDefault(_JobList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Jobs = function (_Component) {
  _inherits(Jobs, _Component);

  function Jobs() {
    _classCallCheck(this, Jobs);

    return _possibleConstructorReturn(this, (Jobs.__proto__ || Object.getPrototypeOf(Jobs)).apply(this, arguments));
  }

  _createClass(Jobs, [{
    key: "render",
    value: function render() {
      var match = this.props.match;

      return _react2.default.createElement(_JobList2.default, {
        status: match.params.status || null,
        columns: [{
          field: "type",
          label: "Type"
        }, {
          field: "status",
          label: "Status"
        }, {
          field: "data.started_at",
          label: "Start Time",
          format: function format(f) {
            return (0, _moment2.default)(f.started_at).format("h:mm:ssA MM/DD/YYYY");
          }
        }, {
          field: "data.completed_at",
          label: "End Time",
          format: function format(f) {
            return (0, _moment2.default)(f.completed_at).format("h:mm:ssA MM/DD/YYYY");
          }
        }, {
          feld: "data.result",
          label: "Result",
          width: "50%",
          format: function format(f) {
            return JSON.stringify(f.result).substr(0, 55);
          }
        }],
        endpoint: "/api/jobs"
      });
    }
  }]);

  return Jobs;
}(_react.Component);

exports.default = Jobs;
});
___scope___.file("components/JobList.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  width: calc(100vw - 56px);\n  height: calc(100vh - 96px);\n"], ["\n  width: calc(100vw - 56px);\n  height: calc(100vh - 96px);\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  height: 42px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: calc(100% - 2px);\n  background: #efefef;\n  border: 1px solid #ccc;\n  z-index: 1;\n"], ["\n  height: 42px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: calc(100% - 2px);\n  background: #efefef;\n  border: 1px solid #ccc;\n  z-index: 1;\n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 36px;\n  width: calc(100% - 2px);\n  background: #efefef;\n  border: 1px solid #ccc;\n  z-index: 1;\n"], ["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 36px;\n  width: calc(100% - 2px);\n  background: #efefef;\n  border: 1px solid #ccc;\n  z-index: 1;\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: 43px;\n  height: calc(100% - 78px);\n  width: 100%;\n  overflow: auto;\n"], ["\n  position: absolute;\n  left: 0;\n  top: 43px;\n  height: calc(100% - 78px);\n  width: 100%;\n  overflow: auto;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _debounce = require("debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Paginator = require("./Paginator");

var _Paginator2 = _interopRequireDefault(_Paginator);

var _Table = require("./Table");

var _Form = require("./Form");

var _gridStyled = require("grid-styled");

var _Loading = require("./Loading");

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BaseContainer = _styledComponents2.default.div(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2);

var Header = _styledComponents2.default.div(_templateObject3);

var Footer = _styledComponents2.default.div(_templateObject4);

var Content = _styledComponents2.default.div(_templateObject5);

var JobList = function (_Component) {
  _inherits(JobList, _Component);

  function JobList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JobList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JobList.__proto__ || Object.getPrototypeOf(JobList)).call.apply(_ref, [this].concat(args))), _this), _this.interval = false, _this.state = {
      data: {},
      loading: true,
      sorting: {},
      filters: {},
      search: "",
      page: 1,
      pageSize: 25
    }, _this.loadJobs = (0, _debounce2.default)(function () {
      var _this$state = _this.state,
          status = _this$state.status,
          search = _this$state.search,
          sorting = _this$state.sorting,
          filters = _this$state.filters,
          page = _this$state.page,
          pageSize = _this$state.pageSize;
      var endpoint = _this.props.endpoint;

      var suffix = status ? "/" + status : "";

      return _axios2.default.get(endpoint + suffix, {
        params: {
          page: page,
          pageSize: pageSize,
          search: search,
          sorting: sorting,
          filters: filters
        }
      }).then(function (res) {
        var data = res.data;

        data.page = parseInt(data.page);
        data.pages = parseInt(data.pages);
        _this.setState({
          loading: false,
          data: data
        });
      }).catch(function (err) {
        _this.setState({
          loading: false,
          error: err
        });
      });
    }, 200), _this.onSearchChange = function (e) {
      _this.setState({
        page: 1,
        loading: true,
        search: e.target.value
      }, function () {
        if (_this.props.onSearchChange) {
          _this.props.onSearchChange(e);
        }
        _this.loadJobs();
      });
    }, _this.onStatusChange = function (e) {
      _this.setState({
        status: e.target.value,
        loading: true
      });
      if (_this.props.onStatusChange) {
        _this.props.onStatusChange(e);
      }
      _this.props.history.push("/jobs/" + e.target.value);
    }, _this.onPageChange = function (page) {
      _this.setState({ page: page, loading: true }, function () {
        _this.loadJobs();
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JobList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.status) {
        this.setState({
          status: this.props.status
        });
      }
      this.loadJobs();
      this.interval = setInterval(this.loadJobs, 5000);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref2) {
      var status = _ref2.status;

      if (status) {
        this.setState({
          status: status
        });
        this.loadJobs();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "formatCol",
    value: function formatCol(col, job) {
      return col.format ? col.format(job, col) : job[col.field];
    }
  }, {
    key: "sortToggle",
    value: function sortToggle(field) {
      var sorting = this.state.sorting;

      sorting[field] = sorting[field] === "asc" ? "desc" : "asc";
      this.setState({
        sorting: sorting
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var colCount = this.props.columns ? this.props.columns.length + 1 : 1;
      return _react2.default.createElement(
        BaseContainer,
        { loading: this.state.loading },
        _react2.default.createElement(
          Container,
          null,
          _react2.default.createElement(
            Header,
            null,
            _react2.default.createElement(
              _gridStyled.Flex,
              null,
              _react2.default.createElement(
                _gridStyled.Box,
                { p: 1 },
                _react2.default.createElement(_Form.Input, {
                  label: "Search",
                  type: "text",
                  name: "search",
                  value: this.state.search,
                  onChange: this.onSearchChange
                })
              ),
              _react2.default.createElement(
                _gridStyled.Box,
                { p: 1 },
                _react2.default.createElement(
                  _Form.Select,
                  {
                    label: "Status",
                    name: "status",
                    value: this.state.status,
                    onChange: this.onStatusChange
                  },
                  _react2.default.createElement(
                    "option",
                    { readOnly: true, value: "" },
                    "All Statuses"
                  ),
                  _react2.default.createElement(
                    "option",
                    { readOnly: true, value: "pending" },
                    "Pending"
                  ),
                  _react2.default.createElement(
                    "option",
                    { readOnly: true, value: "active" },
                    "Active"
                  ),
                  _react2.default.createElement(
                    "option",
                    { readOnly: true, value: "failed" },
                    "Failed"
                  ),
                  _react2.default.createElement(
                    "option",
                    { readOnly: true, value: "complete" },
                    "Complete"
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            Content,
            null,
            _react2.default.createElement(
              _Table.Table,
              {
                fullHeight: this.state.loading,
                cellPadding: 8,
                cellSpacing: 0,
                border: 1,
                width: "100%"
              },
              _react2.default.createElement(
                _Table.THead,
                null,
                _react2.default.createElement(
                  _Table.Row,
                  null,
                  _react2.default.createElement(
                    _Table.HCol,
                    { onClick: function onClick(e) {
                        return _this2.sortToggle("id");
                      } },
                    "Job ID"
                  ),
                  this.props.columns.map(function (col) {
                    return _react2.default.createElement(
                      _Table.HCol,
                      {
                        key: "heading." + col.field,
                        width: col.width || "auto",
                        onClick: function onClick(e) {
                          return _this2.sortToggle(col.field);
                        }
                      },
                      col.label
                    );
                  })
                )
              ),
              this.state.loading ? _react2.default.createElement(
                _Table.TBody,
                null,
                _react2.default.createElement(
                  "tr",
                  null,
                  _react2.default.createElement(
                    _Table.Col,
                    { colSpan: colCount },
                    _react2.default.createElement(_Loading2.default, null)
                  )
                )
              ) : _react2.default.createElement(
                _Table.TBody,
                null,
                this.state.data.records && this.state.data.records.length ? [this.state.data.records.map(function (job) {
                  return job ? _react2.default.createElement(
                    _Table.Row,
                    {
                      key: "job." + job.id,
                      onClick: function onClick(e) {
                        _this2.props.history.push("/job/" + job.id);
                      }
                    },
                    _react2.default.createElement(
                      _Table.HCol,
                      { key: "job." + job.id + ".id" },
                      job.id
                    ),
                    _this2.props.columns.map(function (col) {
                      return _react2.default.createElement(
                        _Table.Col,
                        { key: "job." + job.id + "." + col.field },
                        _this2.formatCol(col, job)
                      );
                    })
                  ) : null;
                }), _react2.default.createElement(_Table.Row, null)] : _react2.default.createElement(
                  _Table.Row,
                  null,
                  _react2.default.createElement(
                    _Table.HCol,
                    { colSpan: colCount },
                    "Oops! There are no records to display..."
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            Footer,
            null,
            _react2.default.createElement(_Paginator2.default, {
              onPageChange: this.onPageChange,
              page: this.state.data.page,
              pages: this.state.data.pages
            })
          )
        )
      );
    }
  }]);

  return JobList;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)(JobList);
});
___scope___.file("components/Paginator.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  line-height: 16px;\n  position: relative;\n"], ["\n  line-height: 16px;\n  position: relative;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  padding: 4px 10px;\n  margin: 4px;\n  cursor: pointer;\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  background: #fff;\n  color: ", ";\n  user-select: none;\n"], ["\n  display: inline-block;\n  padding: 4px 10px;\n  margin: 4px;\n  cursor: pointer;\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  background: #fff;\n  color: ", ";\n  user-select: none;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  float: left;\n  width: 33%;\n"], ["\n  float: left;\n  width: 33%;\n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n  float: left;\n  width: 33%;\n  line-height: 18px;\n  text-align: center;\n"], ["\n  float: left;\n  width: 33%;\n  line-height: 18px;\n  text-align: center;\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\n  line-height: 35px;\n  display: inline-block;\n"], ["\n  line-height: 35px;\n  display: inline-block;\n"]),
    _templateObject6 = _taggedTemplateLiteral(["\n  float: right;\n  width: 33%;\n  text-align: right;\n"], ["\n  float: right;\n  width: 33%;\n  text-align: right;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Form = require("./Form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div(_templateObject);

var Page = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.active ? "blue" : "black";
});

var Left = _styledComponents2.default.div(_templateObject3);

var Center = _styledComponents2.default.div(_templateObject4);

var InputContainer = _styledComponents2.default.div(_templateObject5);

var Right = _styledComponents2.default.div(_templateObject6);

var Paginator = function (_Component) {
  _inherits(Paginator, _Component);

  function Paginator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Paginator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call.apply(_ref, [this].concat(args))), _this), _this.onPageInput = function (e) {
      return _this.setPage(parseInt(e.target.value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Paginator, [{
    key: "setPage",
    value: function setPage(page) {
      if (!page || isNaN(page)) {
        page = "";
      }

      this.setState({
        page: page
      });

      if (this.props.onPageChange) {
        return this.props.onPageChange(page);
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        page: this.props.page
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var left = [];
      var right = [];

      // Populate the pages on the left
      for (var i = 1; i <= Math.min(3, this.props.pages); i++) {
        left.push(i);
      }

      // If there are more than 3 pages, populate the pages on the right
      if (this.props.pages > 3) {
        for (var _i = Math.max(4, this.props.pages - 3); _i <= this.props.pages; _i++) {
          right.push(_i);
        }
      }

      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          Left,
          null,
          left.map(function (num) {
            return _react2.default.createElement(
              Page,
              {
                key: num,
                active: num === _this2.props.page,
                onClick: function onClick(e) {
                  return _this2.setPage(num);
                }
              },
              num
            );
          })
        ),
        _react2.default.createElement(
          Center,
          null,
          this.props.page > 1 ? _react2.default.createElement(
            Page,
            { onClick: function onClick(e) {
                return _this2.setPage(_this2.props.page - 1);
              } },
            "Previous"
          ) : null,
          _react2.default.createElement(
            InputContainer,
            null,
            _react2.default.createElement(_Form.Input, {
              type: "text",
              value: this.state.page,
              onChange: this.onPageInput
            })
          ),
          this.props.pages > this.props.page ? _react2.default.createElement(
            Page,
            { onClick: function onClick(e) {
                return _this2.setPage(_this2.props.page + 1);
              } },
            "Next"
          ) : null
        ),
        _react2.default.createElement(
          Right,
          null,
          right.map(function (num) {
            return _react2.default.createElement(
              Page,
              {
                key: num,
                active: num === _this2.props.page,
                onClick: function onClick(e) {
                  return _this2.setPage(num);
                }
              },
              num
            );
          })
        )
      );
    }
  }]);

  return Paginator;
}(_react.Component);

exports.default = Paginator;
});
___scope___.file("components/Form.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = exports.Input = exports.StyledSelect = exports.StyledInput = exports.Label = exports.InputContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  line-height: 24px;\n"], ["\n  display: inline-block;\n  line-height: 24px;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  padding: 0 20px 0 0;\n  font-weight: bold;\n"], ["\n  padding: 0 20px 0 0;\n  font-weight: bold;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  padding: 4px 8px;\n"], ["\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  padding: 4px 8px;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var InputContainer = exports.InputContainer = _styledComponents2.default.div(_templateObject);
var Label = exports.Label = _styledComponents2.default.label(_templateObject2);
var StyledInput = exports.StyledInput = _styledComponents2.default.input(_templateObject3);

var StyledSelect = exports.StyledSelect = _styledComponents2.default.select(_templateObject3);

var Input = function Input(_ref) {
  var name = _ref.name,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ["name", "label", "value", "onChange"]);

  return _react2.default.createElement(
    InputContainer,
    null,
    _react2.default.createElement(
      Label,
      { htmlFor: name },
      label
    ),
    _react2.default.createElement(StyledInput, _extends({ name: name, value: value, onChange: onChange }, props))
  );
};

exports.Input = Input;
var Select = function Select(_ref2) {
  var name = _ref2.name,
      label = _ref2.label,
      value = _ref2.value,
      onChange = _ref2.onChange,
      props = _objectWithoutProperties(_ref2, ["name", "label", "value", "onChange"]);

  return _react2.default.createElement(
    InputContainer,
    null,
    _react2.default.createElement(
      Label,
      { htmlFor: name },
      label
    ),
    _react2.default.createElement(StyledSelect, _extends({ name: name, value: value, onChange: onChange }, props))
  );
};
exports.Select = Select;
});
___scope___.file("components/Loading.jsx", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  text-align: center;\n\n  span {\n    position: relative;\n    top: 156px;\n    font-size: 18px;\n    font-weight: bold;\n    color: rgba(255, 255, 255, 0.45);\n    z-index: 1;\n  }\n"], ["\n  text-align: center;\n\n  span {\n    position: relative;\n    top: 156px;\n    font-size: 18px;\n    font-weight: bold;\n    color: rgba(255, 255, 255, 0.45);\n    z-index: 1;\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledSpinkit = require("styled-spinkit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div(_templateObject);

exports.default = function () {
  return _react2.default.createElement(
    Container,
    null,
    _react2.default.createElement(
      "span",
      null,
      "LOADING"
    ),
    _react2.default.createElement(_styledSpinkit.RotaingPlaneLoading, { color: "#ddd", size: 100 })
  );
};
});
return ___scope___.entry = "app.js";
});
FuseBox.target = "browser"

FuseBox.import("default/app.js");
FuseBox.main("default/app.js");
})
(FuseBox)