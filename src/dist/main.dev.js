"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _bootstrapVue = _interopRequireDefault(require("bootstrap-vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].use(_bootstrapVue["default"]);

new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');