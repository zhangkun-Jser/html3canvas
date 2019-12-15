# transfer-box
[![NPM](https://nodei.co/npm/transfer-box.png)](https://nodei.co/npm/transfer-box/)

## 安装
```
npm install "transfer-box"
```

## 使用
- 引入组件，因为selectbox依赖于antd的table，所以如果发现样式缺失，说明项目启动后从没引用过antd的table，此时需要手动引用
```
import SelectBox from 'transfer-box';
import 'antd/lib/table/style'; //如果需要的话引用antd的table样式
```

- 引入selectbox样式

在项目入口引入“transfer-box/lib/index.less” 或 “transfer-box/lib/index.css”

```
@import '~transfer-box/lib/index.less';
```

## 参数

 Prop | Type | Description | default
 ---|---|---|---
style | object | 样式，如果此处设置了width或height会覆盖掉上边的width，height | -
childrenLoadQueryKey | string | 请求子节点key名称 | `planId`
childrenLoadUrl | string | 请求子节点的url, `expandable`为true时，该属性必须设置 | -
childrenLoadParam | object | 请求子节点参数 | -
disabledPropsKey |  string | 用于判断选中状态的key | `isSelected`
height | number | 高度 | 450
width | number | 宽度 | -
loadingL | bool | 左侧显示loading | -
loadingR | bool | 右侧显示loading | -
parentSelectable | bool | 父节点是否可选中 | true
allSelect | bool | 是否显示全部添加 | false
expandable | bool | 是否可展开 | true
dataSourceL | array | 左侧数据源 | []
dataSourceR | array | 右侧数据源 | []
keyField | string | id字段名 | `id`
displayField | string | 展示字段名 | `name`
childCountField | string | 表示子节点数量的字段名称 | -
searchPlaceholder | string | 搜索框提示语 | -
title | string | 左右两侧box标题，左侧目前无效 | { l: '', r: '' }
maxSelectedCount | number | 最大可选择数量 | -
maxErrorCB | function | 超出最大数量的回调函数 | 弹框提示
labelRenderFunc | function | 标签渲染函数 | -

## API

方法名 | Description | params
 ---|---|---
getSelection | 返回当前selectbox的状态 | 无
clear | 清空box状态 | 无

## 图示

  <div display="inline">
        <img src="https://bizimg.sogoucdn.com/201911/06/16/47/58/atlas-fe/apmzMiJUeH.gif">
  </div>
