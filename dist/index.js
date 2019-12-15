"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _input = _interopRequireDefault(require("antd/lib/input"));

var _TreeView = _interopRequireDefault(require("./TreeView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Search = _input["default"].Search;
/* eslint-disable react/no-deprecated */

var SelectBox =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectBox, _Component);

  function SelectBox(props) {
    var _this;

    _classCallCheck(this, SelectBox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectBox).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "filter", (0, _memoizeOne["default"])(function (list, filterKey) {
      var displayField = _this.props.displayField;
      return list.filter(function (item) {
        return item[displayField].toLowerCase().indexOf(filterKey.toLowerCase()) >= 0;
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "getSelectedChildTotal", (0, _memoizeOne["default"])(function (list) {
      var _this$props = _this.props,
          childCountField = _this$props.childCountField,
          expandable = _this$props.expandable;
      var childCount = 0;

      if (expandable) {
        for (var i = 0; i < list.length; i += 1) {
          var p = list[i];

          if (p.children && p.children.length > 0) {
            childCount += p.children.length;
          } else if (p[childCountField]) {
            childCount += p[childCountField];
          } else {
            childCount = 0;
            break;
          }
        }
      } else {
        childCount += list.length;
      }

      return childCount;
    }));

    _defineProperty(_assertThisInitialized(_this), "getChildTotal", (0, _memoizeOne["default"])(function (list) {
      var _this$props2 = _this.props,
          childCountField = _this$props2.childCountField,
          expandable = _this$props2.expandable;
      var childCount = 0;

      if (expandable) {
        for (var i = 0; i < list.length; i += 1) {
          var p = list[i];

          if (p[childCountField]) {
            childCount += p[childCountField];
          } else {
            childCount = 0;
            break;
          }
        }
      } else {
        childCount = list.length;
      }

      return childCount;
    }));

    _defineProperty(_assertThisInitialized(_this), "initColumns", function () {
      var labelRenderFunc = _this.props.labelRenderFunc;
      return [{
        dataIndex: _this.props.displayField,
        key: _this.props.displayField,
        render: function render(text, record, index) {
          return labelRenderFunc ? labelRenderFunc(text, record, index) : _react["default"].createElement("span", null, text);
        }
      }];
    });

    _defineProperty(_assertThisInitialized(_this), "initLeftColumn", function () {
      var _this$props3 = _this.props,
          childCountField = _this$props3.childCountField,
          disabledPropsKey = _this$props3.disabledPropsKey;

      var columns = _toConsumableArray(_this.initColumns());

      if (childCountField) {
        columns.push({
          dataIndex: childCountField,
          key: childCountField,
          width: 100,
          render: function render(text) {
            return text && _react["default"].createElement("span", null, "(", text, ")");
          }
        });
      }

      columns.push({
        dataIndex: '',
        key: 'op',
        width: 50,
        render: function render(text, record) {
          var _this$props4 = _this.props,
              parentSelectable = _this$props4.parentSelectable,
              expandable = _this$props4.expandable;

          if (expandable && !parentSelectable && record.children) {
            return null;
          } else {
            var clsName = 'btnSelect';

            if (record[disabledPropsKey]) {
              clsName = 'btnSelectDisabled';
            }

            return _react["default"].createElement("span", {
              className: clsName,
              href: "javascript:;"
            }, "\u6DFB\u52A0");
          }
        },
        onCell: _this.handleOnCellLeft
      });
      return columns;
    });

    _defineProperty(_assertThisInitialized(_this), "initRightColumn", function () {
      var childCountField = _this.props.childCountField;

      var columns = _toConsumableArray(_this.initColumns());

      if (childCountField) {
        columns.push({
          dataIndex: 'selectedChildCount',
          key: 'selectedChildCount',
          width: 100,
          render: function render(text, record) {
            var count;

            if (text) {
              count = text * 1;
            } else if (record.children && record.children.length != 0) {
              count = record.children.length;
            }

            return count ? _react["default"].createElement("span", null, "(", count, ")") : null;
          }
        });
      }

      columns.push({
        dataIndex: '',
        key: 'op',
        width: 50,
        render: function render() {
          return _react["default"].createElement("span", {
            className: "btnSelect",
            href: "javascript:;"
          }, "\u5220\u9664");
        },
        onCell: _this.handleOnCellRight
      });
      return columns;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnCellLeft", function (record) {
      var disabledPropsKey = _this.props.disabledPropsKey;
      return {
        onClick: function onClick(e) {
          if (e.target.tagName.toLowerCase() != 'span') {
            return;
          }

          if (record[disabledPropsKey]) {
            return;
          }

          _this.onTransferToR(record);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnCellRight", function (record) {
      return {
        onClick: function onClick(e) {
          if (e.target.tagName.toLowerCase() != 'span') {
            return;
          }

          _this.onTransferToL(record);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onTransferToR", function (record) {
      var _this$props5 = _this.props,
          keyField = _this$props5.keyField,
          expandable = _this$props5.expandable;
      var res;
      var newExpandKeysR;

      if (!_this.validateSelectedCount(record)) {
        return;
      }

      if (expandable && record.children || !expandable) {
        // 选中父级
        res = _this.parentSelected(record);
      } else {
        // 选中子级
        res = _this.childSelected(record);

        if (res.selectP) {
          newExpandKeysR = [res.selectP[keyField]];
        }
      }

      var newRight = _this.massageSelectedData(res.newRight);

      _this.setState(function (preState) {
        return {
          left: res.newLeft,
          right: newRight,
          expandKeysR: newExpandKeysR || preState.expandKeysR
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "outOfRangeCB", function () {
      var maxSelectedCount = _this.props.maxSelectedCount;
      alert("\u8D85\u8FC7\u6700\u5927\u53EF\u9009\u6570\u91CF[".concat(maxSelectedCount, "]\uFF01"));
    });

    _defineProperty(_assertThisInitialized(_this), "validateSelectedCount", function (record) {
      var _this$props6 = _this.props,
          keyField = _this$props6.keyField,
          maxSelectedCount = _this$props6.maxSelectedCount,
          maxErrorCB = _this$props6.maxErrorCB,
          childCountField = _this$props6.childCountField;
      var right = _this.state.right;
      var errFunc;
      var res = true;
      var isParent = !!record.children;

      if (maxErrorCB) {
        errFunc = maxErrorCB;
      } else {
        errFunc = _this.outOfRangeCB;
      }

      if (maxSelectedCount) {
        if (isParent) {
          // 是否已经存在该节点，存在的话，计算数量需要先减去已选择的child数量
          var existCount = 0;

          if (right) {
            for (var i = 0; i < right.length; i += 1) {
              var item = right[i];

              if (record[keyField] == item[keyField]) {
                if (item.children && item.children.length > 0) {
                  existCount = item.children.length;
                } else if (item[childCountField]) {
                  // 理论上不存在此场景——左侧父节点可点击，此时右侧相同父节点下无子节点
                  existCount = item[childCountField];
                } else {
                  console.error("[@comb/select-box]: \u5B57\u6BB5\"".concat(childCountField, "\"\u4E0D\u5B58\u5728!"));
                  return true;
                }

                break;
              }
            }
          }

          if (record.children.length > 0) {
            res = _this.selectedCount - existCount + record.children.length <= maxSelectedCount;
          } else if (childCountField && record[childCountField]) {
            res = _this.selectedCount - existCount + record[childCountField] <= maxSelectedCount;
          } else {
            console.error('[@comb/select-box]: 未设置"childCountField"属性，或该字段不存在，无法计算子节点数量!');
            return true;
          }
        } else {
          res = _this.selectedCount + 1 <= maxSelectedCount;
        }

        if (!res) {
          errFunc();
          return false;
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "onTransferToL", function (record) {
      var _this$props7 = _this.props,
          keyField = _this$props7.keyField,
          expandable = _this$props7.expandable;
      var res;
      var newExpandKeysL; // 取消父级

      if (expandable && record.children || !expandable) {
        res = _this.parentCanceled(record);

        if (res.selectP) {
          newExpandKeysL = [res.selectP[keyField]];
        }
      } else {
        // 取消子级
        res = _this.childCanceled(record);
      }

      var newRight = _this.massageSelectedData(res.newRight);

      _this.setState(function (preState) {
        return {
          left: res.newLeft,
          right: newRight,
          expandKeysL: newExpandKeysL || preState.expandKeysL
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "parentSelected", function (record) {
      var _this$props8 = _this.props,
          keyField = _this$props8.keyField,
          disabledPropsKey = _this$props8.disabledPropsKey;
      var isSelectedPar = false;
      var newNode = Object.assign({}, record); // 将选中节点下所有子节点的选中标记置为true

      if (record.children) {
        for (var i = 0; i < record.children.length; i += 1) {
          record.children[i][disabledPropsKey] = true;
        }
      } // 将该节点选中标记置为true


      record[disabledPropsKey] = true; // 生成新的左侧树数据源

      var newLeft = _this.state.left.map(function (item) {
        if (item[keyField] == record[keyField]) {
          return record;
        }

        return item;
      }); // 生成新的右侧树数据源


      var newRight = _toConsumableArray(_this.state.right); // 判断该父节点是否已经存在


      for (var _i = 0; _i < newRight.length; _i += 1) {
        if (newRight[_i][keyField] == record[keyField]) {
          isSelectedPar = true;
          newRight[_i] = newNode;
          break;
        }
      } // 如果右侧不存在该节点


      if (!isSelectedPar) {
        newRight.push(newNode);
      }

      return {
        newLeft: newLeft,
        newRight: newRight
      };
    });

    _defineProperty(_assertThisInitialized(_this), "parentCanceled", function (record) {
      var _this$props9 = _this.props,
          keyField = _this$props9.keyField,
          disabledPropsKey = _this$props9.disabledPropsKey; // step1 更新左侧树选中标记

      var newLeft = _this.state.left.map(function (item) {
        if (item[keyField] == record[keyField]) {
          item[disabledPropsKey] = false;

          if (item.children) {
            for (var i = 0; i < item.children.length; i += 1) {
              item.children[i][disabledPropsKey] = false;
            }
          }
        }

        return item;
      }); // step2 删除右侧树中该节点


      var newRight = [];

      for (var i = 0; i < _this.state.right.length; i += 1) {
        var p = _this.state.right[i];

        if (p[keyField] !== record[keyField]) {
          newRight.push(p);
        }
      }

      return {
        newLeft: newLeft,
        newRight: newRight
      };
    });

    _defineProperty(_assertThisInitialized(_this), "childSelected", function (record) {
      var keyField = _this.props.keyField;
      var _this$state = _this.state,
          left = _this$state.left,
          right = _this$state.right; // 遍历左侧树，查找节点

      var _this$massageDataSour = _this.massageDataSource(record, true),
          selectP = _this$massageDataSour.selectP,
          selectC = _this$massageDataSour.selectC;

      if (!selectP || !selectC) {
        return {
          newLeft: left,
          newRight: right,
          selectP: selectP
        };
      } // 将节点插入右侧树


      var newP = right && right.find(function (item) {
        return item[keyField] == selectP[keyField];
      });

      if (newP) {
        // 右侧已经存在父级节点
        newP.children.push(selectC);
      } else {
        // 右侧不存在父级节点
        newP = Object.assign({}, selectP);
        newP.children = [selectC];
        right.push(newP);
      }

      var newLeft = _toConsumableArray(left);

      var newRight = _toConsumableArray(right);

      return {
        newLeft: newLeft,
        newRight: newRight,
        selectP: selectP
      };
    });

    _defineProperty(_assertThisInitialized(_this), "childCanceled", function (record) {
      var keyField = _this.props.keyField;
      var _this$state2 = _this.state,
          left = _this$state2.left,
          right = _this$state2.right; // 遍历左侧树，查找节点

      var _this$massageDataSour2 = _this.massageDataSource(record, false),
          selectP = _this$massageDataSour2.selectP,
          selectC = _this$massageDataSour2.selectC;

      if (!selectP || !selectC) {
        return {
          newLeft: left,
          newRight: right,
          selectP: selectP
        };
      } // 处理右侧数据源


      var newRight = [];

      for (var i = 0; i < right.length; i += 1) {
        var p = right[i];

        if (p[keyField] == selectP[keyField]) {
          var arr = [];

          for (var j = 0; j < p.children.length; j += 1) {
            var c = p.children[j];

            if (c[keyField] != selectC[keyField]) {
              arr.push(c);
            }
          }

          if (arr.length != 0) {
            p.children = arr;
            newRight.push(p);
          }
        } else {
          newRight.push(p);
        }
      }

      var newLeft = _toConsumableArray(left);

      return {
        newLeft: newLeft,
        newRight: newRight,
        selectP: selectP
      };
    });

    _defineProperty(_assertThisInitialized(_this), "massageDataSource", function (record, doSelect) {
      var _this$props10 = _this.props,
          keyField = _this$props10.keyField,
          disabledPropsKey = _this$props10.disabledPropsKey;
      var source = _this.state.left;
      var selectP;
      var selectC;

      for (var i = 0; i < source.length; i += 1) {
        var p = source[i];
        var selectedCount = 0;

        for (var j = 0; j < p.children.length; j += 1) {
          var c = p.children[j];

          if (c[keyField] == record[keyField]) {
            c[disabledPropsKey] = doSelect;
            selectP = p;
            selectC = c;
          }

          if (c[disabledPropsKey]) {
            selectedCount += 1;
          }
        } // 找到节点，退出循环


        if (selectP) {
          if (selectedCount != 0 && selectedCount == p.children.length) {
            p[disabledPropsKey] = true;
          } else {
            p[disabledPropsKey] = false;
          }

          break;
        }
      }

      return {
        selectP: selectP,
        selectC: selectC
      };
    });

    _defineProperty(_assertThisInitialized(_this), "massageSelectedData", function (source) {
      var childCountField = _this.props.childCountField;

      if (!source) {
        return [];
      }

      var res = _toConsumableArray(source);

      for (var i = 0; i < res.length; i += 1) {
        var p = res[i];

        if (!p.children || p.children.length == 0) {
          if (p[childCountField]) {
            p.selectedChildCount = p[childCountField];
          } else {// do nothing
          }
        } else {
          var n = 0;

          for (var j = 0; j < p.children.length; j += 1) {
            n += 1;
          }

          p.selectedChildCount = n;
        }
      }

      return res;
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpandL", function (expanded, record) {
      var _this$props11 = _this.props,
          keyField = _this$props11.keyField,
          expandable = _this$props11.expandable;

      if (!expandable) {
        return;
      }

      _this.onExpand(expanded, record, 'expandKeysL');

      if (!expanded || (record.children && record.children.length) > 0) {
        return;
      }

      var cb = function cb(grps) {
        _this.setState(function (preState) {
          var newLeft = _this.appendGroupToPlan(preState.left, grps, record[keyField], true);

          return {
            left: newLeft
          };
        });
      };

      _this.fetch(record[keyField], 'left', cb);
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpandR", function (expanded, record) {
      var _this$props12 = _this.props,
          keyField = _this$props12.keyField,
          expandable = _this$props12.expandable;

      if (!expandable) {
        return;
      }

      _this.onExpand(expanded, record, 'expandKeysR');

      var leftRecord = _this.state.left.find(function (r) {
        return r[keyField] == record[keyField];
      }); // 以下状态时，函数直接退出。
      // 1.关闭状态
      // 2.被点击的右侧树父节点的子节点数大于0，并且相对应的左侧树该节点的子节点数也大于0


      if (!expanded || record.children && record.children.length > 0 && leftRecord && leftRecord.children.length > 0) {
        return;
      }

      var cb = function cb(grps) {
        _this.setState(function (preState) {
          // 更新左侧树
          var newLeft = _this.appendGroupToPlan(preState.left, grps, record[keyField], true);

          var newRight = _toConsumableArray(preState.right); // 如果右侧树节点下无子节点，更新右侧树


          if (record.children && record.children.length == 0) {
            newRight = _this.appendGroupToPlan(preState.right, grps, record[keyField]);
          }

          return {
            left: newLeft,
            right: newRight
          };
        });
      };

      _this.fetch(record[keyField], 'right', cb);
    });

    _defineProperty(_assertThisInitialized(_this), "transferAllToRight", function () {
      var _this$props13 = _this.props,
          disabledPropsKey = _this$props13.disabledPropsKey,
          maxSelectedCount = _this$props13.maxSelectedCount,
          maxErrorCB = _this$props13.maxErrorCB;
      var left = _this.state.left;

      if (maxSelectedCount && _this.totalCount > maxSelectedCount) {
        if (maxErrorCB) {
          maxErrorCB();
        } else {
          _this.outOfRangeCB();
        }

        return;
      }

      var newLeft = _toConsumableArray(left); // const displayData = this.filter(left, filterKey);


      var newRight = _this.massageSelectedData(newLeft);

      for (var i = 0; i < newLeft.length; i += 1) {
        var p = newLeft[i];
        p[disabledPropsKey] = true;

        if (p.children) {
          for (var j = 0; j < p.children.length; j += 1) {
            p.children[j][disabledPropsKey] = true;
          }
        }
      }

      _this.setState({
        left: newLeft,
        right: newRight
      });
    });

    _defineProperty(_assertThisInitialized(_this), "transferAllToLeft", function () {
      _this.setState(function (preState) {
        var disabledPropsKey = _this.props.disabledPropsKey;

        var newLeft = _toConsumableArray(preState.left);

        var newRight = [];

        for (var i = 0; i < newLeft.length; i += 1) {
          var p = newLeft[i];
          p[disabledPropsKey] = false;

          if (p.children) {
            for (var j = 0; j < p.children.length; j += 1) {
              p.children[j][disabledPropsKey] = false;
            }
          }
        }

        return {
          left: newLeft,
          right: newRight
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onExpand", function (expanded, record, expandKeyName) {
      _this.setState(function (preState) {
        var keyField = _this.props.keyField;
        var expandKeys = preState[expandKeyName] || [];

        if (expanded) {
          expandKeys.push(record[keyField]);
        } else {
          expandKeys.splice(expandKeys.findIndex(function (item) {
            return item == record[keyField];
          }), 1);
        }

        return _defineProperty({}, expandKeyName, expandKeys);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fetch", function (queryValue, leftOrRight, cb) {
      // 外界给额外的请求参数
      var _this$props14 = _this.props,
          childrenLoadQueryKey = _this$props14.childrenLoadQueryKey,
          childrenLoadParam = _this$props14.childrenLoadParam,
          childrenLoadUrl = _this$props14.childrenLoadUrl,
          headers = _this$props14.headers;

      if (!childrenLoadUrl) {
        console.error('[biz-rc-selectbox]Props of childrenLoadUrl is null'); //eslint-disable-line

        return;
      }

      var stateLoading = leftOrRight == 'left' ? 'loadingL' : 'loadingR';

      _this.setState(_defineProperty({}, stateLoading, true));

      (0, _axios["default"])({
        url: childrenLoadUrl,
        method: 'get',
        headers: headers || {},
        params: _objectSpread(_defineProperty({}, childrenLoadQueryKey, queryValue), childrenLoadParam)
      }).then(function (data) {
        var grps = data.data.data[0].children;

        _this.setState(_defineProperty({}, stateLoading, false));

        if (cb) {
          return cb(grps);
        }
      })["catch"](function (err) {
        return Promise.reject(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "appendGroupToPlan", function (plans, groups, targetPlanId, isLeft) {
      if (!plans || !groups || groups.length == 0) {
        return plans;
      }

      var _this$props15 = _this.props,
          keyField = _this$props15.keyField,
          disabledPropsKey = _this$props15.disabledPropsKey;

      var res = _toConsumableArray(plans);

      for (var i = 0; i < res.length; i += 1) {
        if (res[i][keyField] == targetPlanId) {
          if (isLeft && res[i][disabledPropsKey]) {
            for (var j = 0; j < groups.length; j += 1) {
              groups[j][disabledPropsKey] = true;
            }
          }

          res[i].children = groups;
          break;
        }
      }

      return res;
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (e) {
      var value = e.target.value;

      _this.setState({
        filterKey: value,
        selectedAllDisabled: !!value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "formatSourceData", function (data) {
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i += 1) {
          if (!data[i].children) {
            data[i].children = [];
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectAllButton", function (disabled) {
      if (disabled) {
        return _react["default"].createElement("span", {
          href: "javascript:;",
          className: "btnAllSelect"
        }, "\u5168\u90E8\u6DFB\u52A0");
      } else {
        return _react["default"].createElement("span", {
          onClick: _this.transferAllToRight,
          href: "javascript:;",
          className: ['btnSelect', 'btnAllSelect'].join(' ')
        }, "\u5168\u90E8\u6DFB\u52A0");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectedCountArea", function () {
      var _this$props16 = _this.props,
          title = _this$props16.title,
          maxSelectedCount = _this$props16.maxSelectedCount; // 没有设置maxSelectedCount时，显示节点总数
      // 如果没有设置childCountField，会导致计算totalCount失败，此时只返回空

      var max = maxSelectedCount || _this.totalCount;
      var content = "".concat(_this.selectedCount, " / ").concat(max);
      return _react["default"].createElement("span", null, title.r, " ", max > 0 ? content : '');
    });

    _defineProperty(_assertThisInitialized(_this), "getSelection", function () {
      return {
        left: _this.state.left,
        right: _this.state.right
      };
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this.setState({
        left: [],
        right: [],
        expandKeysL: [],
        expandKeysR: [],
        loadingL: false,
        loadingR: false,
        // totalCount: 0,
        filterKey: ''
      });

      _this.totalCount = 0;
    });

    _this.state = {
      left: _toConsumableArray(props.dataSourceL || []),
      right: _toConsumableArray(props.dataSourceR || []),
      expandKeysL: [],
      expandKeysR: [],
      loadingL: props.loadingL,
      loadingR: props.loadingR,
      // totalCount: 0,
      filterKey: ''
    };
    return _this;
  }

  _createClass(SelectBox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var dataSourceL = nextProps.dataSourceL,
          dataSourceR = nextProps.dataSourceR,
          loadingL = nextProps.loadingL,
          loadingR = nextProps.loadingR,
          childCountField = nextProps.childCountField,
          parentSelectable = nextProps.parentSelectable;

      if (!(0, _shallowequal["default"])(dataSourceL, this.props.dataSourceL)) {
        if (parentSelectable && childCountField && dataSourceL.length > 0 && !dataSourceL[0][childCountField]) {
          console.error("[@comb/select-box]: \u5B57\u6BB5\"".concat(childCountField, "\"\u4E0D\u5B58\u5728!"));
        }

        this.setState({
          left: dataSourceL // totalCount: this.getChildTotal(dataSourceL),

        });
      }

      if (!(0, _shallowequal["default"])(dataSourceR, this.props.dataSourceR)) {
        this.setState({
          right: dataSourceR
        });
      }

      if (loadingL != this.props.loadingL) {
        this.setState({
          loadingL: loadingL
        });
      }

      if (loadingR != this.props.loadingR) {
        this.setState({
          loadingR: loadingR
        });
      }
    }
    /**
     * 已经选择的节点数
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props17 = this.props,
          keyField = _this$props17.keyField,
          height = _this$props17.height,
          width = _this$props17.width,
          allSelect = _this$props17.allSelect,
          expandable = _this$props17.expandable,
          searchPlaceholder = _this$props17.searchPlaceholder,
          style = _this$props17.style;
      var _this$state3 = this.state,
          loadingL = _this$state3.loadingL,
          loadingR = _this$state3.loadingR,
          expandKeysL = _this$state3.expandKeysL,
          expandKeysR = _this$state3.expandKeysR,
          left = _this$state3.left,
          right = _this$state3.right,
          filterKey = _this$state3.filterKey,
          selectedAllDisabled = _this$state3.selectedAllDisabled;
      var displayData = left;

      if (filterKey) {
        displayData = this.filter(left, filterKey);
      }

      if (expandable) {
        this.formatSourceData(displayData);
        this.selectedCount = this.getSelectedChildTotal(right);
      } else {
        this.selectedCount = right.length;
      }

      this.totalCount = this.getChildTotal(left);
      return _react["default"].createElement("div", {
        className: "select-box",
        style: _objectSpread({
          height: height,
          width: width
        }, style)
      }, _react["default"].createElement("div", {
        className: "transferContainer"
      }, _react["default"].createElement("div", {
        className: "treeViewWrapper"
      }, _react["default"].createElement("div", {
        className: "boxTitle"
      }, _react["default"].createElement("div", {
        className: "search"
      }, _react["default"].createElement(Search, {
        placeholder: searchPlaceholder,
        onChange: this.onSearch
      })), allSelect && this.renderSelectAllButton(selectedAllDisabled)), _react["default"].createElement("div", {
        className: "treeViewContainer"
      }, _react["default"].createElement(_TreeView["default"], {
        rowKey: keyField,
        columns: this.initLeftColumn(),
        data: displayData,
        onExpand: this.handleExpandL,
        expandedRowKeys: expandKeysL,
        loading: loadingL
      }))), _react["default"].createElement("span", {
        className: "arrow"
      }), _react["default"].createElement("div", {
        className: "treeViewWrapper"
      }, _react["default"].createElement("div", {
        className: "boxTitle"
      }, this.renderSelectedCountArea(), _react["default"].createElement("span", {
        onClick: this.transferAllToLeft,
        href: "javascript:;",
        className: ['btnSelect', 'btnAllSelect'].join(' ')
      }, "\u5168\u90E8\u5220\u9664")), _react["default"].createElement("div", {
        className: "treeViewContainer"
      }, _react["default"].createElement(_TreeView["default"], {
        rowKey: keyField,
        columns: this.initRightColumn(),
        data: right,
        onExpand: this.handleExpandR,
        expandedRowKeys: expandKeysR,
        loading: loadingR
      })))));
    }
  }]);

  return SelectBox;
}(_react.Component);

_defineProperty(SelectBox, "propTypes", {
  style: _propTypes["default"].object,
  childrenLoadQueryKey: _propTypes["default"].string,
  childrenLoadUrl: _propTypes["default"].string,
  childrenLoadParam: _propTypes["default"].object,
  disabledPropsKey: _propTypes["default"].string,
  height: _propTypes["default"].number,
  width: _propTypes["default"].number,
  loadingL: _propTypes["default"].bool,
  loadingR: _propTypes["default"].bool,
  parentSelectable: _propTypes["default"].bool,
  // 默认为true，只有expandable为true时，设置成false才生效，
  allSelect: _propTypes["default"].bool,
  expandable: _propTypes["default"].bool,
  dataSourceL: _propTypes["default"].array,
  dataSourceR: _propTypes["default"].array,
  keyField: _propTypes["default"].string,
  displayField: _propTypes["default"].string,
  childCountField: _propTypes["default"].string,
  searchPlaceholder: _propTypes["default"].string,
  title: _propTypes["default"].object,
  maxSelectedCount: _propTypes["default"].number,
  maxErrorCB: _propTypes["default"].func,
  labelRenderFunc: _propTypes["default"].func
});

_defineProperty(SelectBox, "defaultProps", {
  childrenLoadQueryKey: 'planId',
  disabledPropsKey: 'isSelected',
  height: 450,
  parentSelectable: true,
  allSelect: false,
  expandable: true,
  dataSourceL: [],
  dataSourceR: [],
  keyField: 'id',
  displayField: 'name',
  searchPlaceholder: '',
  title: {
    l: '',
    r: ''
  }
});

var _default = SelectBox;
exports["default"] = _default;