import React from 'react';
import Table from 'antd/lib/table';

/* eslint-disable react/prop-types */
const TreeView = ({
  rowKey,
  columns,
  data,
  onExpand,
  expandedRowKeys,
  loading,
}) => {
  return (
    <Table
      size="small"
      showHeader={false}
      bordered={false}
      pagination={false}
      columns={columns}
      loading={loading}
      dataSource={data}
      scroll={{ x: false, y: false }}
      rowKey={rowKey}
      onExpand={onExpand}
      expandedRowKeys={expandedRowKeys}
      locale={{ emptyText: '无数据' }}
    />
  );
};

export default TreeView;
