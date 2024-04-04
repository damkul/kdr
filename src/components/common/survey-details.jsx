import React, { useState, useEffect } from "react";
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post, put,deleteItem, download} from '../../context/rest';
import { Link} from "react-router-dom";
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker,Spin } from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined,SearchOutlined,CloseCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import {capitalizeFirstLetter,validateNumbersOnly} from '../common/validations'
import {memberList} from '../../language/marathi'
import Popup from '../common/popup'
import { useLocation } from "react-router-dom";

const { Text } = Typography;
const { TextArea } = Input;


const SurveyDetails = ({}) => {

    const location = useLocation();
    const survey = location.state;
    const [surveyId,setSurveyId] = useState(survey.surveyId);

    const [searchText, setSearchText] = useState("");
    const [members,setMembers] = useState([]); 
    const [initialData,setInitialData] = useState([]); 

    useEffect(() => {
        async function fetchData() {
          try {
           var result = await get(`admin/1/survey/${surveyId}/member`);
        //    setIsDataLoaded(false);
          //  document.getElementById('spin').classList.remove('loader-overlay')
            setMembers(result);
            setInitialData(result);
          } catch (error) {
            console.log(error);
            console.error(error);
          }
        }
        
        fetchData();
      }, [searchText]);


      async function printSurveyBill(rec) {
        console.log(rec.billFileName);
        var res = await download(`admin/1/downloadbill/${rec.billFileName}`,rec.billFileName)
      }

    const handleSearch = (searchInput) => {
        // Perform filtering logic based on your requirements
        const filteredData = members.filter(item =>
          item.farmerFirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.farmerLastName.toLowerCase().includes(searchInput.toLowerCase())
        );
        setMembers(filteredData);
      };
      const handleClear = () => {
        setSearchText('');
        setMembers(initialData); // Resetting to initial data when clearing search
      };
    
     
      const FilterByFirstNameInput = (
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={{color:'#fff'}}>नेम</Text>
          <Input.Search
            placeholder="नेम"
            // enterButton={<SearchOutlined/>}
            // allowClear
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={searchText && <CloseCircleOutlined onClick={handleClear} />}
          />
        </Space>
      );


    const columns = [
        {
          title: FilterByFirstNameInput,
          // title:"फर्स्ट नेम",
          dataIndex: "farmerFirstName",
          key: "farmerFirstName",
          width:"20%",
          // sorter: (a, b) => a.name > b.name,
          render: (text,record) => (
            <Tooltip title={text}>
              <Text ellipsis={true}>{record.farmerFirstName + " " + record.farmerLastName}</Text>
            </Tooltip>
          ),
        },
        {
          title: "फोन नंबर",
          dataIndex: "farmerPhoneNumber",
          key: "farmerPhoneNumber",
          width: "8%",
          // sorter: (a, b) => a.name > b.name,
          render: (text) => (
            <Tooltip title={text}>
              <Text ellipsis={true}>{text}</Text>
            </Tooltip>
          ),
        },
        {
          title: "दारे नंबर",
          dataIndex: "farmerDhareNumber",
          key: "farmerDhareNumber",
          width: "8%",
          // sorter: (a, b) => a.name > b.name,
          render: (text) => (
            <Tooltip title={text}>
              <Text ellipsis={true}>{text}</Text>
            </Tooltip>
          ),
        },
        {
          title: "एकूण क्षेत्र",
          dataIndex: "farmarTotalLand",
          key: "farmarTotalLand",
          width: "8%",
          // sorter: (a, b) => a.name > b.name,
          render: (text) => (
            <Tooltip title={text}>
              <Text ellipsis={true}>{text}</Text>
            </Tooltip>
          ),
        },
        {
          title:"गट नंबर",
          dataIndex: "farmerGatNumber",
          key: "farmerGatNumber",
          width: "8%",
          // sorter: (a, b) => a.name > b.name,
          render: (text) => (
            <Tooltip title={text}>
              <Text ellipsis={true}>{text}</Text>
            </Tooltip>
          ),
        },
        {
          title: "स्टेटस",
          dataIndex: "isActive",
          key: "isActive",
          width: "6%",
          // sorter: (a, b) => a.name > b.name,
          render: (text) => (
            <Tooltip title={text}>
              {/* <Text ellipsis={true}>{text}</Text> */}
              { text == 1 ?  <Badge status="success" text="Active" /> :  <Badge status="error" text="In-active" />}
            </Tooltip>
          ),
        },
        {
            title: "प्रिंट",
            dataIndex: "surveyStatus",
            key: "surveyStatus",
            width: "2.5%",
            // sorter: (a, b) => a.name > b.name,
            render: (text,record) => (
              <Tooltip title={"Survey Stage: "+text}>
                 
                {/* <Text ellipsis={true}>{text}</Text> */}
                {record.billFileName ?
                <a href="javascript:;" onClick={() => printSurveyBill(record)}>
                  <PrinterOutlined />
                </a>
                : ""}
              </Tooltip>
            ),
          },
        // {
        //   title: "ऍक्शन",
        //   dataIndex: "actions",
        //   key: "actions",
        //   width: "4%",
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <Tooltip title="Edit">
        //       <a href="javascript:;" onClick={() => handleOpenPopup(record)}>
        //        <EditOutlined></EditOutlined>
        //       </a>
        //       </Tooltip>
        //       <Tooltip title="Delete company">
        //       <a href="javascript:;" onClick={() => deleteRecord(record)}>
        //       <DeleteOutlined/>
        //       </a>
        //       </Tooltip>
        //     </Space>
        //   ),
        // }
      ];


  return (
    <div className="page">

    <RenderMenu />
   
    <div className="header-container" style={{marginLeft:'20%'}}>
       
           <h3>{survey.surveyDescription} : {memberList}</h3>
      
       </div>
  
   <DataTable dataSource={members} columns={columns}></DataTable>
  
</div>
  )
}

export default SurveyDetails