import React , { useState , useEffect } from 'react';
import { Link, json } from "react-router-dom";
import { Button, Card, Badge,Tooltip, Space, Table, Typography, Input,Switch } from "antd";
import Search from "antd/es/transfer/search";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined } from "@ant-design/icons";
const { Text } = Typography;

function DataTable({ dataSource, columns}) {
   
  return (
    <div className='list-container' style={{width:'80%',marginLeft:'20%'}}>

      
        
        <Space style={{ display: "flex", justifyContent: "space-between" }}></Space>

      <Table
        className="centerdiv"
        sticky={true}
        size="middle"
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        // loading={}
        pagination={{
          pageSize: 10,
        }}
        
      />
    </div>
  )
}

export default DataTable