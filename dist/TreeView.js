"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _table = _interopRequireDefault(require("antd/lib/table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable react/prop-types */
var TreeView = function TreeView(_ref) {
  var rowKey = _ref.rowKey,
      columns = _ref.columns,
      data = _ref.data,
      onExpand = _ref.onExpand,
      expandedRowKeys = _ref.expandedRowKeys,
      loading = _ref.loading;
  return _react["default"].createElement(_table["default"], {
    size: "small",
    showHeader: false,
    bordered: false,
    pagination: false,
    columns: columns,
    loading: loading,
    dataSource: data,
    scroll: {
      x: false,
      y: false
    },
    rowKey: rowKey,
    onExpand: onExpand,
    expandedRowKeys: expandedRowKeys,
    locale: {
      emptyText: '无数据'
    }
  });
};

var _default = TreeView;
exports["default"] = _default;