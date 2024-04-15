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
import {memberList,surveyStageLabel} from '../../language/marathi'
import Popup from '../common/popup'
import { useLocation } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";

const { Text } = Typography;
const { TextArea } = Input;


const SurveyDetails = ({}) => {

  const { user } = AuthData();

  var id = user.id

    const location = useLocation();
    const survey = location.state;
    const [surveyId,setSurveyId] = useState();
    const [originalSurvey,setSurvey] = useState(survey);


    const [searchText, setSearchText] = useState("");
    const [searchTextDareNumber, setSearchTextDareNumber] = useState("");
  const [searchTextGatNumber, setSearchTextGatNumber] = useState("");
    const [members,setMembers] = useState([]); 
    const [initialData,setInitialData] = useState([]); 
    const [isPopupOpen,setIsPopupOpen] = useState(false); 
    const [isFileAvailable,setIsFileAvailable] = useState(false); 
    const [memberName,setMemberName] = useState(false); 

    useEffect(() => {
        async function fetchData() {
          try {
           var result = await get(`admin/${id}/survey/${originalSurvey.surveyId}/member`);
           console.log("user in survey",user);
        //    setIsDataLoaded(false);
          //  document.getElementById('spin').classList.remove('loader-overlay')
            setSurveyId(survey.surveyId)
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
        var res = await download(`admin/${id}/downloadbill/${rec.billFileName}`,rec.billFileName)
        console.log("download response:",res);
        if (res.errorMsg != undefined) {
          setIsFileAvailable(true);
          setMemberName(rec.farmerFirstName + " " + rec.farmerLastName)
        }
      }

    const handleSearch = (searchInput) => {
        // Perform filtering logic based on your requirements'
        setSearchText(searchInput)
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
      const handleDareNumberClear = () => {
        setSearchTextDareNumber('')
        setMembers(initialData); // Resetting to initial data when clearing search
      };
      const handleGatNumberClear = () => {
        setSearchTextGatNumber('');
        setMembers(initialData); // Resetting to initial data when clearing search
      };
    
      const handleDareNumberSearch = (searchInput) => {
        setSearchTextDareNumber(searchInput);
        const filteredData = searchTextDareNumber ? members.filter(item =>
          item.farmerDhareNumber.includes(searchInput)
        ) : members;
        setMembers(filteredData);
      };
      const handleGatSearch = value => {
        setSearchTextGatNumber(value);
        const filteredData = searchTextGatNumber ? members.filter(item =>
          item.farmerGatNumber.includes(value)
        ) : members;
        setMembers(filteredData);
      };


      const FilterByDareNumber = (
        <div>
          <label htmlFor="">दारे नंबर</label>
          <div style={{display:'flex'}}>
            <Search
            placeholder="Search name"
            value={searchTextDareNumber}
            onChange={e => handleDareNumberSearch(e.target.value)}
          />
          { searchTextDareNumber.length >0 && 
          <button onClick={handleDareNumberClear} className="clear-btn">
          <CloseCircleOutlined></CloseCircleOutlined>
          </button>}
          
          </div>
        </div>
          
        );
        const FilterByGatNumber = (
          <div>
            <label htmlFor="">गट नंबर</label>
              <div style={{display:'flex'}}>
              <Search
              placeholder="Search name"
              value={searchTextGatNumber}
              onChange={e => handleGatSearch(e.target.value)}
            />
            { searchTextGatNumber.length >0 && 
           <button onClick={handleGatNumberClear} className="clear-btn">
           <CloseCircleOutlined></CloseCircleOutlined>
           </button>}
       
          </div>
          </div>
          
         
        );
    
     
      const FilterByFirstNameInput = (
        // <div>
        //     <label htmlFor="">गट नंबर</label>
        //       <div style={{display:'flex'}}>
        //       <Search
        //       placeholder="Search name"
        //       value={searchText}
        //       onChange={e => handleSearch(e.target.value)}
        //     />
        //     { searchText.length >0 && 
        //    <button onClick={handleClear} className="clear-btn">
        //    <CloseCircleOutlined></CloseCircleOutlined>
        //    </button>}
       
        //   </div>
        //   </div>
         <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={{color:'#fff'}}>नेम</Text>
          <Input.Search
            placeholder="नेम"
            //  enterButton
             allowClear
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            // suffix={searchText && <CloseCircleOutlined onClick={handleClear} />}
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
          title: FilterByDareNumber,
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
          title:FilterByGatNumber,
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
            dataIndex: "billFileName",
            key: "billFileName",
            width: "2.5%",
            // sorter: (a, b) => a.name > b.name,
            render: (text,record) => (
              <Tooltip>
                 {console.log(text)}
                {/* <Text ellipsis={true}>{text}</Text> */}
                {/* {survey.surveyStatus >= 2 ? */}
                {text.length > 0 ?
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

      async function sendSurveyToNextStage(){
        var result = await put(`admin/${id}/survey/${surveyId}/status/3`);
        // console.log(result);
         setIsPopupOpen(true);
       }

  return (
    <div className="page">

    <RenderMenu />
   
       <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
        <h3>{originalSurvey.surveyDescription} : {memberList}</h3>
        </div>
            <div className="btn-container">
              {/* <button className="btn"><i className="fa-solid fa-hourglass-half"></i> Generate Minutes</button> */}
              { (originalSurvey.surveyStatus >= 2 && originalSurvey.surveyStatus < 4) ? <button className="btn" onClick={sendSurveyToNextStage}><i class="fa-solid fa-diagram-next" style={{marginRight:'1rem'}}></i>{surveyStageLabel}</button> : <button className="disabled" onClick={sendSurveyToNextStage} disabled><i class="fa-solid fa-diagram-next" style={{marginRight:'1rem'}}></i>{surveyStageLabel}</button>}
                {/* <button className="btn" onClick={sendSurveyToNextStage}><i class="fa-solid fa-diagram-next" style={{marginRight:'1rem'}}></i>{surveyStageLabel}</button> */}
            </div>
        </div>
        {
          isPopupOpen && <p className="long-msg survey-Stage-msg"> सर्व्हे पुढच्या स्टेजला गेला आहे! </p>
        }
        {
          isFileAvailable && <p className="long-msg survey-Stage-msg survey-Stage-error-msg"> {memberName} यांच्यासाठी बीलाची फाइल बनली नाहीये त्यामुळे फाइल डाउनलोड होऊ शकत नाही.  </p>
        }
   <DataTable dataSource={members} columns={columns}></DataTable>
 
</div>
  )
}

export default SurveyDetails