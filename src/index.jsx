/* eslint-disable no-console */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import shallowequal from 'shallowequal';
import Input from 'antd/lib/input';
import TreeView from './TreeView';

const Search = Input.Search;

/* eslint-disable react/no-deprecated */
class SelectBox extends Component {
  filter = memoizeOne((list, filterKey) => {
    const { displayField } = this.props;
    return list.filter(item => item[displayField].toLowerCase().indexOf(filterKey.toLowerCase()) >= 0);
  });

  static propTypes = {
    style: PropTypes.object,
    childrenLoadQueryKey: PropTypes.string,
    childrenLoadUrl: PropTypes.string,
    childrenLoadParam: PropTypes.object,
    disabledPropsKey: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    loadingL: PropTypes.bool,
    loadingR: PropTypes.bool,
    parentSelectable: PropTypes.bool, // 默认为true，只有expandable为true时，设置成false才生效，
    allSelect: PropTypes.bool,
    expandable: PropTypes.bool,
    dataSourceL: PropTypes.array,
    dataSourceR: PropTypes.array,
    keyField: PropTypes.string,
    displayField: PropTypes.string,
    childCountField: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    title: PropTypes.object,
    maxSelectedCount: PropTypes.number,
    maxErrorCB: PropTypes.func,
    labelRenderFunc: PropTypes.func,
  };

  static defaultProps = {
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
    title: { l: '', r: '' },
  };

  constructor(props) {
    super(props);

    this.state = {
      left: [...(props.dataSourceL || [])],
      right: [...(props.dataSourceR || [])],
      expandKeysL: [],
      expandKeysR: [],
      loadingL: props.loadingL,
      loadingR: props.loadingR,
      // totalCount: 0,
      filterKey: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      dataSourceL, dataSourceR, loadingL, loadingR, childCountField, parentSelectable,
    } = nextProps;

    if (!shallowequal(dataSourceL, this.props.dataSourceL)) {
      if (parentSelectable && childCountField && dataSourceL.length > 0 && !dataSourceL[0][childCountField]) {
        console.error(`[@comb/select-box]: 字段"${childCountField}"不存在!`);
      }
      this.setState({
        left: dataSourceL,
        // totalCount: this.getChildTotal(dataSourceL),
      });
    }
    if (!shallowequal(dataSourceR, this.props.dataSourceR)) {
      this.setState({
        right: dataSourceR,
      });
    }

    if (loadingL != this.props.loadingL) {
      this.setState({
        loadingL,
      });
    }
    if (loadingR != this.props.loadingR) {
      this.setState({
        loadingR,
      });
    }
  }

  /**
   * 已经选择的节点数
   */
  getSelectedChildTotal = memoizeOne(list => {
    const { childCountField, expandable } = this.props;
    let childCount = 0;
    if (expandable) {
      for (let i = 0; i < list.length; i += 1) {
        const p = list[i];
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
  });

  /**
   * 节点总数
   */
  getChildTotal = memoizeOne(list => {
    const { childCountField, expandable } = this.props;
    let childCount = 0;
    if (expandable) {
      for (let i = 0; i < list.length; i += 1) {
        const p = list[i];
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
  });

  /**
   * 初始化列
   */
  initColumns = () => {
    const { labelRenderFunc } = this.props;
    return [
      {
        dataIndex: this.props.displayField,
        key: this.props.displayField,
        render: (text, record, index) => {
          return labelRenderFunc ? labelRenderFunc(text, record, index) : <span>{text}</span>;
        },
      },
    ];
  };

  /**
   * 初始化左侧列
   */
  initLeftColumn = () => {
    const { childCountField, disabledPropsKey } = this.props;
    const columns = [...this.initColumns()];

    if (childCountField) {
      columns.push({
        dataIndex: childCountField,
        key: childCountField,
        width: 100,
        render: text => text && <span>({text})</span>,
      });
    }

    columns.push({
      dataIndex: '',
      key: 'op',
      width: 50,
      render: (text, record) => {
        const { parentSelectable, expandable } = this.props;
        if (expandable && !parentSelectable && record.children) {
          return null;
        } else {
          let clsName = 'btnSelect';
          if (record[disabledPropsKey]) {
            clsName = 'btnSelectDisabled';
          }
          return (
            <span className={clsName} href="javascript:;">
              添加
            </span>
          );
        }
      },
      onCell: this.handleOnCellLeft,
    });
    return columns;
  };

  /**
   * 初始化右侧列
   */
  initRightColumn = () => {
    const { childCountField } = this.props;
    let columns = [...this.initColumns()];

    if (childCountField) {
      columns.push({
        dataIndex: 'selectedChildCount',
        key: 'selectedChildCount',
        width: 100,
        render: (text, record) => {
          let count;
          if (text) {
            count = text * 1;
          } else if (record.children && record.children.length != 0) {
            count = record.children.length;
          }
          return count ? <span>({count})</span> : null;
        },
      });
    }
    columns.push({
      dataIndex: '',
      key: 'op',
      width: 50,
      render: () => (
        <span className="btnSelect" href="javascript:;">
          删除
        </span>
      ),
      onCell: this.handleOnCellRight,
    });
    return columns;
  };

  handleOnCellLeft = record => {
    const { disabledPropsKey } = this.props;
    return {
      onClick: e => {
        if (e.target.tagName.toLowerCase() != 'span') {
          return;
        }
        if (record[disabledPropsKey]) {
          return;
        }
        this.onTransferToR(record);
      },
    };
  };

  handleOnCellRight = record => {
    return {
      onClick: e => {
        if (e.target.tagName.toLowerCase() != 'span') {
          return;
        }
        this.onTransferToL(record);
      },
    };
  };

  /**
   * 选中节点
   */
  onTransferToR = record => {
    const { keyField, expandable } = this.props;
    let res;
    let newExpandKeysR;
    if (!this.validateSelectedCount(record)) {
      return;
    }

    if ((expandable && record.children) || !expandable) {
      // 选中父级
      res = this.parentSelected(record);
    } else {
      // 选中子级
      res = this.childSelected(record);
      if (res.selectP) {
        newExpandKeysR = [res.selectP[keyField]];
      }
    }
    const newRight = this.massageSelectedData(res.newRight);
    this.setState(preState => {
      return {
        left: res.newLeft,
        right: newRight,
        expandKeysR: newExpandKeysR || preState.expandKeysR,
      };
    });
  };

  outOfRangeCB = () => {
    const { maxSelectedCount } = this.props;
    alert(`超过最大可选数量[${maxSelectedCount}]！`);
  };

  /**
   * 验证是否超出设定的最大可选择节点数
   */
  validateSelectedCount = record => {
    const {
      keyField, maxSelectedCount, maxErrorCB, childCountField,
    } = this.props;
    const { right } = this.state;
    let errFunc;
    let res = true;
    const isParent = !!record.children;
    if (maxErrorCB) {
      errFunc = maxErrorCB;
    } else {
      errFunc = this.outOfRangeCB;
    }
    if (maxSelectedCount) {
      if (isParent) {
        // 是否已经存在该节点，存在的话，计算数量需要先减去已选择的child数量
        let existCount = 0;
        if (right) {
          for (let i = 0; i < right.length; i += 1) {
            const item = right[i];
            if (record[keyField] == item[keyField]) {
              if (item.children && item.children.length > 0) {
                existCount = item.children.length;
              } else if (item[childCountField]) {
                // 理论上不存在此场景——左侧父节点可点击，此时右侧相同父节点下无子节点
                existCount = item[childCountField];
              } else {
                console.error(`[@comb/select-box]: 字段"${childCountField}"不存在!`);
                return true;
              }
              break;
            }
          }
        }
        if (record.children.length > 0) {
          res = this.selectedCount - existCount + record.children.length <= maxSelectedCount;
        } else if (childCountField && record[childCountField]) {
          res = this.selectedCount - existCount + record[childCountField] <= maxSelectedCount;
        } else {
          console.error('[@comb/select-box]: 未设置"childCountField"属性，或该字段不存在，无法计算子节点数量!');
          return true;
        }
      } else {
        res = this.selectedCount + 1 <= maxSelectedCount;
      }
      if (!res) {
        errFunc();
        return false;
      }
    }
    return true;
  };

  /**
   * 取消选中节点
   */
  onTransferToL = record => {
    const { keyField, expandable } = this.props;
    let res;
    let newExpandKeysL;
    // 取消父级
    if ((expandable && record.children) || !expandable) {
      res = this.parentCanceled(record);
      if (res.selectP) {
        newExpandKeysL = [res.selectP[keyField]];
      }
    } else {
      // 取消子级
      res = this.childCanceled(record);
    }
    const newRight = this.massageSelectedData(res.newRight);
    this.setState(preState => {
      return {
        left: res.newLeft,
        right: newRight,
        expandKeysL: newExpandKeysL || preState.expandKeysL,
      };
    });
  };

  /**
   * 选中父节点
   */
  parentSelected = record => {
    const { keyField, disabledPropsKey } = this.props;
    let isSelectedPar = false;
    const newNode = Object.assign({}, record);

    // 将选中节点下所有子节点的选中标记置为true
    if (record.children) {
      for (let i = 0; i < record.children.length; i += 1) {
        record.children[i][disabledPropsKey] = true;
      }
    }
    // 将该节点选中标记置为true
    record[disabledPropsKey] = true;

    // 生成新的左侧树数据源
    const newLeft = this.state.left.map(item => {
      if (item[keyField] == record[keyField]) {
        return record;
      }
      return item;
    });

    // 生成新的右侧树数据源
    const newRight = [...this.state.right];
    // 判断该父节点是否已经存在
    for (let i = 0; i < newRight.length; i += 1) {
      if (newRight[i][keyField] == record[keyField]) {
        isSelectedPar = true;
        newRight[i] = newNode;
        break;
      }
    }
    // 如果右侧不存在该节点
    if (!isSelectedPar) {
      newRight.push(newNode);
    }
    return { newLeft, newRight };
  };

  /**
   * 取消父节点选中状态
   */
  parentCanceled = record => {
    const { keyField, disabledPropsKey } = this.props;
    // step1 更新左侧树选中标记
    const newLeft = this.state.left.map(item => {
      if (item[keyField] == record[keyField]) {
        item[disabledPropsKey] = false;
        if (item.children) {
          for (let i = 0; i < item.children.length; i += 1) {
            item.children[i][disabledPropsKey] = false;
          }
        }
      }
      return item;
    });
    // step2 删除右侧树中该节点
    const newRight = [];
    for (let i = 0; i < this.state.right.length; i += 1) {
      const p = this.state.right[i];
      if (p[keyField] !== record[keyField]) {
        newRight.push(p);
      }
    }
    return { newLeft, newRight };
  };

  /**
   * 选中子节点
   */
  childSelected = record => {
    const { keyField } = this.props;
    const { left, right } = this.state;
    // 遍历左侧树，查找节点
    let { selectP, selectC } = this.massageDataSource(record, true);
    if (!selectP || !selectC) {
      return { newLeft: left, newRight: right, selectP };
    }
    // 将节点插入右侧树
    let newP = right && right.find(item => item[keyField] == selectP[keyField]);
    if (newP) {
      // 右侧已经存在父级节点
      newP.children.push(selectC);
    } else {
      // 右侧不存在父级节点
      newP = Object.assign({}, selectP);
      newP.children = [selectC];
      right.push(newP);
    }
    const newLeft = [...left];
    const newRight = [...right];
    return { newLeft, newRight, selectP };
  };

  /**
   * 取消选中子节点
   */
  childCanceled = record => {
    const { keyField } = this.props;
    const { left, right } = this.state;
    // 遍历左侧树，查找节点
    let { selectP, selectC } = this.massageDataSource(record, false);
    if (!selectP || !selectC) {
      return { newLeft: left, newRight: right, selectP };
    }
    // 处理右侧数据源
    const newRight = [];
    for (let i = 0; i < right.length; i += 1) {
      const p = right[i];
      if (p[keyField] == selectP[keyField]) {
        const arr = [];
        for (let j = 0; j < p.children.length; j += 1) {
          const c = p.children[j];
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

    const newLeft = [...left];
    return { newLeft, newRight, selectP };
  };

  /**
   * 操作子节点是根据处理各层节点选中状态
   * 返回操作的父子节点
   * @param {*} record: 被操作的数据
   * @param {bool} doSelect: 选中/取消
   */
  massageDataSource = (record, doSelect) => {
    const { keyField, disabledPropsKey } = this.props;
    const { left: source } = this.state;
    let selectP;
    let selectC;
    for (let i = 0; i < source.length; i += 1) {
      const p = source[i];
      let selectedCount = 0;
      for (let j = 0; j < p.children.length; j += 1) {
        const c = p.children[j];
        if (c[keyField] == record[keyField]) {
          c[disabledPropsKey] = doSelect;
          selectP = p;
          selectC = c;
        }
        if (c[disabledPropsKey]) {
          selectedCount += 1;
        }
      }
      // 找到节点，退出循环
      if (selectP) {
        if (selectedCount != 0 && selectedCount == p.children.length) {
          p[disabledPropsKey] = true;
        } else {
          p[disabledPropsKey] = false;
        }
        break;
      }
    }
    return { selectP, selectC };
  };

  /**
   * 计算每个父节点下选中多少子节点
   * 为右侧树父节点增加属性“selectedChildCount”，用来显示选中子节点数
   */
  massageSelectedData = source => {
    const { childCountField } = this.props;
    if (!source) {
      return [];
    }
    const res = [...source];
    for (let i = 0; i < res.length; i += 1) {
      const p = res[i];
      if (!p.children || p.children.length == 0) {
        if (p[childCountField]) {
          p.selectedChildCount = p[childCountField];
        } else {
          // do nothing
        }
      } else {
        let n = 0;
        for (let j = 0; j < p.children.length; j += 1) {
          n += 1;
        }
        p.selectedChildCount = n;
      }
    }
    return res;
  };

  /**
   * 展开左侧树节点
   */
  handleExpandL = (expanded, record) => {
    const { keyField, expandable } = this.props;
    if (!expandable) {
      return;
    }
    this.onExpand(expanded, record, 'expandKeysL');
    if (!expanded || (record.children && record.children.length) > 0) {
      return;
    }
    const cb = grps => {
      this.setState(preState => {
        const newLeft = this.appendGroupToPlan(preState.left, grps, record[keyField], true);
        return {
          left: newLeft,
        };
      });
    };
    this.fetch(record[keyField], 'left', cb);
  };

  /**
   * 展开右侧树节点
   */
  handleExpandR = (expanded, record) => {
    const { keyField, expandable } = this.props;
    if (!expandable) {
      return;
    }
    this.onExpand(expanded, record, 'expandKeysR');
    const leftRecord = this.state.left.find(r => r[keyField] == record[keyField]);
    // 以下状态时，函数直接退出。
    // 1.关闭状态
    // 2.被点击的右侧树父节点的子节点数大于0，并且相对应的左侧树该节点的子节点数也大于0
    if (!expanded || (record.children && record.children.length > 0 && leftRecord && leftRecord.children.length > 0)) {
      return;
    }
    const cb = grps => {
      this.setState(preState => {
        // 更新左侧树
        const newLeft = this.appendGroupToPlan(preState.left, grps, record[keyField], true);
        let newRight = [...preState.right];
        // 如果右侧树节点下无子节点，更新右侧树
        if (record.children && record.children.length == 0) {
          newRight = this.appendGroupToPlan(preState.right, grps, record[keyField]);
        }
        return {
          left: newLeft,
          right: newRight,
        };
      });
    };
    this.fetch(record[keyField], 'right', cb);
  };

  /**
   * 全部选中
   */
  transferAllToRight = () => {
    const { disabledPropsKey, maxSelectedCount, maxErrorCB } = this.props;
    const { left /* , filterKey */ } = this.state;

    if (maxSelectedCount && this.totalCount > maxSelectedCount) {
      if (maxErrorCB) {
        maxErrorCB();
      } else {
        this.outOfRangeCB();
      }
      return;
    }
    const newLeft = [...left];
    // const displayData = this.filter(left, filterKey);
    const newRight = this.massageSelectedData(newLeft);
    for (let i = 0; i < newLeft.length; i += 1) {
      const p = newLeft[i];
      p[disabledPropsKey] = true;
      if (p.children) {
        for (let j = 0; j < p.children.length; j += 1) {
          p.children[j][disabledPropsKey] = true;
        }
      }
    }
    this.setState({
      left: newLeft,
      right: newRight,
    });
  };

  /**
   * 全部取消选中
   */
  transferAllToLeft = () => {
    this.setState(preState => {
      const { disabledPropsKey } = this.props;
      const newLeft = [...preState.left];
      const newRight = [];
      for (let i = 0; i < newLeft.length; i += 1) {
        const p = newLeft[i];
        p[disabledPropsKey] = false;
        if (p.children) {
          for (let j = 0; j < p.children.length; j += 1) {
            p.children[j][disabledPropsKey] = false;
          }
        }
      }
      return {
        left: newLeft,
        right: newRight,
      };
    });
  };

  /**
   * 组建中节点展开采用受控方式，此处控制展开状态数组
   */
  onExpand = (expanded, record, expandKeyName) => {
    this.setState(preState => {
      const { keyField } = this.props;
      const expandKeys = preState[expandKeyName] || [];
      if (expanded) {
        expandKeys.push(record[keyField]);
      } else {
        expandKeys.splice(expandKeys.findIndex(item => item == record[keyField]), 1);
      }
      return {
        [expandKeyName]: expandKeys,
      };
    });
  };

  /**
   * 展开节点时查询子节点
   */
  fetch = (queryValue, leftOrRight, cb) => {
    // 外界给额外的请求参数
    let {
      childrenLoadQueryKey, childrenLoadParam, childrenLoadUrl, headers,
    } = this.props;
    if (!childrenLoadUrl) {
      console.error('[biz-rc-selectbox]Props of childrenLoadUrl is null'); //eslint-disable-line
      return;
    }
    const stateLoading = leftOrRight == 'left' ? 'loadingL' : 'loadingR';
    this.setState({ [stateLoading]: true });

    axios({
      url: childrenLoadUrl,
      method: 'get',
      headers: headers || {},
      params: { [childrenLoadQueryKey]: queryValue, ...childrenLoadParam },
    })
      .then(data => {
        const grps = data.data.data[0].children;

        this.setState({
          [stateLoading]: false,
        });

        if (cb) {
          return cb(grps);
        }
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };

  /**
   * 将组信息追加到相对应的计划下
   * @param {*} plans
   * @param {*} groups
   * @param {*} targetPlanId
   */
  appendGroupToPlan = (plans, groups, targetPlanId, isLeft) => {
    if (!plans || !groups || groups.length == 0) {
      return plans;
    }
    const { keyField, disabledPropsKey } = this.props;
    let res = [...plans];
    for (let i = 0; i < res.length; i += 1) {
      if (res[i][keyField] == targetPlanId) {
        if (isLeft && res[i][disabledPropsKey]) {
          for (let j = 0; j < groups.length; j += 1) {
            groups[j][disabledPropsKey] = true;
          }
        }
        res[i].children = groups;
        break;
      }
    }
    return res;
  };

  onSearch = e => {
    const { value } = e.target;
    this.setState({
      filterKey: value,
      selectedAllDisabled: !!value,
    });
  };

  /**
   * 为父节点添加一个值为空数组的“children”属性，
   * 有了该属性，父节点前才可现实用于操作展开(关闭)的按钮图标
   */
  formatSourceData = data => {
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        if (!data[i].children) {
          data[i].children = [];
        }
      }
    }
  };

  renderSelectAllButton = disabled => {
    if (disabled) {
      return (
        <span href="javascript:;" className="btnAllSelect">
          全部添加
        </span>
      );
    } else {
      return (
        <span onClick={this.transferAllToRight} href="javascript:;" className={['btnSelect', 'btnAllSelect'].join(' ')}>
          全部添加
        </span>
      );
    }
  };

  renderSelectedCountArea = () => {
    const { title, maxSelectedCount } = this.props;
    // 没有设置maxSelectedCount时，显示节点总数
    // 如果没有设置childCountField，会导致计算totalCount失败，此时只返回空
    const max = maxSelectedCount || this.totalCount;
    let content = `${this.selectedCount} / ${max}`;
    return (
      <span>
        {title.r} {max > 0 ? content : ''}
      </span>
    );
  };

  /**
   * api 返回当前selectbox的状态
   * @param {*} left: 左侧树
   * @param {*} right: 右侧树，即选择状态
   */
  getSelection = () => {
    return { left: this.state.left, right: this.state.right };
  };

  /**
   * api 清空box状态
   */
  clear = () => {
    this.setState({
      left: [],
      right: [],
      expandKeysL: [],
      expandKeysR: [],
      loadingL: false,
      loadingR: false,
      // totalCount: 0,
      filterKey: '',
    });
    this.totalCount = 0;
  };

  render() {
    const {
      keyField, height, width, allSelect, expandable, searchPlaceholder, style,
    } = this.props;

    const {
      loadingL, loadingR, expandKeysL, expandKeysR, left, right, filterKey, selectedAllDisabled,
    } = this.state;

    let displayData = left;
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

    return (
      <div className="select-box" style={{ height, width, ...style }}>
        <div className="transferContainer">
          <div className="treeViewWrapper">
            <div className="boxTitle">
              {/* {title.l && <span className={"titleText"}>{title.l}</span>} */}
              <div className="search">
                <Search placeholder={searchPlaceholder} onChange={this.onSearch} />
              </div>
              {allSelect && this.renderSelectAllButton(selectedAllDisabled)}
            </div>
            <div className="treeViewContainer">
              <TreeView rowKey={keyField} columns={this.initLeftColumn()} data={displayData} onExpand={this.handleExpandL} expandedRowKeys={expandKeysL} loading={loadingL} />
            </div>
          </div>
          <span className="arrow" />
          <div className="treeViewWrapper">
            <div className="boxTitle">
              {this.renderSelectedCountArea()}
              <span onClick={this.transferAllToLeft} href="javascript:;" className={['btnSelect', 'btnAllSelect'].join(' ')}>
                全部删除
              </span>
            </div>
            <div className="treeViewContainer">
              <TreeView rowKey={keyField} columns={this.initRightColumn()} data={right} onExpand={this.handleExpandR} expandedRowKeys={expandKeysR} loading={loadingR} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectBox;
