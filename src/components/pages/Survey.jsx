import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import CommonTable from '../../components/common/table';
import {CardHeading, Paragraph,PageHeading,Hr} from '../../components/common/headings';
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post, put,deleteItem} from '../../context/rest';
import { Link} from "react-router-dom";
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker,Spin } from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined,SearchOutlined,CloseCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import {capitalizeFirstLetter,validateNumbersOnly} from '../common/validations'
import {surveyList,addSurveyPopupLabel,surveyDescriptionLabel,surveyDateLabel,kharipPikLabel,rabiPikLabel,unhaliPikLabel,updateSurveyPopupLabel,addSurveyLabel} from '../../language/marathi'
import Popup from '../common/popup'


const { Text } = Typography;
const { TextArea } = Input;
function Survey() {
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [survey,setSurvey] = useState();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isPrintPopupOpen, setIsPrintPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  
  // Form fields
  const [surveyDescription,setSurveyDescription] = useState("");
  const [surveyDate,setSurveyDate] = useState();
  const [kharipCropRate,setKharipCropRate] = useState();
  const [rabiCropRate,setRabiCropRate] = useState();
  const [summerCropRate,setSummerCropRate] = useState();
  const [surveyId,setSurveyId] = useState();


  const [currentSurvey,setCurrentSurvey] = useState();

  // validations
  const [invalidKharifCropRate,setInvalidKharifCropRate] = useState(false)
  const [invalidRabiRate,setInvalidRabiCropRate] = useState(false)
  const [invalidSummerCropRate,setInvalidSummerCropRate] = useState(false)

  const [initialData,setInitialData] = useState([]); 

  const handleOpenPopup = (survey) => {
    console.log(survey);
    setSurveyDescription(survey.surveyDescription);
    setSurveyDate(survey.surveyDate);
    setKharipCropRate(survey.surveyKharifCropRate);
    setRabiCropRate(survey.surveyRabiCropRate);
    setSummerCropRate(survey.surveySummerCropRate);
    setSurveyId(survey.surveyId)
    setIsPopupOpen(true);
  };
  const handlePrintOpenPopup = (survey) => {
    setCurrentSurvey(survey)
    setIsPrintPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleClosePopupPrint = () => {
    setIsPrintPopupOpen(false);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/survey');
       setDataSource(result);
       console.log("survey",result);
       setIsDataLoaded(false);
      setSurvey(result);
        setInitialData(result);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
    
    fetchData();
  }, []);

  function formatDate(date){
    let today = new Date(date);
   
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
  function formatDateMM(date){
    let today = new Date(date);
   
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today =yyyy + '/'   + mm  + '/' + dd  ;
    return today;
  }
  // const onChange = (checked) => {
  //   console.log(`switch to ${checked}`);
  //   setEnablePrint(checked)
  // };


  async function deleteRecord(survey){
    var result = await deleteItem(`admin/1/survey/${survey.surveyId}`);
    var surveys = await get('admin/1/survey');
       setDataSource(surveys);
       console.log("survey",surveys);
       setIsDataLoaded(false);
      setSurvey(surveys);
  }


  const handleSearch = (searchInput) => {
    // Perform filtering logic based on your requirements
    const filteredData = survey.filter(item =>
      item.surveyDescription.toLowerCase().includes(searchInput.toLowerCase()) 
    );
    setSurvey(filteredData);
  };
  const handleClear = () => {
    setSearchText('');
    setSurvey(initialData); // Resetting to initial data when clearing search
  };

 
  const FilterBySurveyDescriptionInput = (
    <Space style={{ display: "flex", justifyContent: "space-between" }}>
      <Text>नेम</Text>
      <Input.Search
        placeholder="नेम"
        enterButton={<SearchOutlined/>}
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
      // title: FilterByNameInput,
      title:FilterBySurveyDescriptionInput,
      dataIndex: "surveyDescription",
      key: "surveyDescription",
      width:"25%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "सर्व्हेची तारीख",
      dataIndex: "surveyDate",
      key: "surveyDate",
      width:"10%",
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{formatDate(text)}</Text>
        </Tooltip>
      ),
    },
    {
      title: "खरीप पीक दर",
      dataIndex: "surveyKharifCropRate",
      key: "surveyKharifCropRate",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "रब्बी पीक दर",
      dataIndex: "surveyRabiCropRate",
      key: "surveyRabiCropRate",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "उन्हाळी पीक दर",
      dataIndex: "surveySummerCropRate",
      key: "surveySummerCropRate",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "ऍक्शन",
      dataIndex: "actions",
      key: "actions",
      width: "4%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
          <a href="javascript:;" onClick={() => handleOpenPopup(record)}>
           <EditOutlined></EditOutlined>
          </a>
          </Tooltip>
          <Tooltip title="Delete company">
          <a href="javascript:;" onClick={() => deleteRecord(record)}>
          <DeleteOutlined/>
          </a>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "प्रिंट",
      dataIndex: "surveyStatus",
      key: "surveyStatus",
      width: "4%",
      // sorter: (a, b) => a.name > b.name,
      render: (text,record) => (
        <Tooltip title={"Survey Stage: "+text}>
           
          {/* <Text ellipsis={true}>{text}</Text> */}
          {text >= 2 ?
          <a href="javascript:;" onClick={() => handlePrintOpenPopup(record)}>
            <PrinterOutlined />
          </a>
          : ""}
        </Tooltip>
      ),
    },
  ];
 
function handleDescriptionChange(event){
    setSurveyDescription(event.target.value);
}
function handleKharipRateChange(event){
  var isNumber = validateNumbersOnly(event.target.value);
  if (isNumber) {
    setKharipCropRate(event.target.value);
    setInvalidKharifCropRate(false);
  }
  else{
    setInvalidKharifCropRate(true);
    setKharipCropRate();
  }
}
function handleRabiRateChange(event){
  var isNumber = validateNumbersOnly(event.target.value);
  if (isNumber) {
    setRabiCropRate(event.target.value);
    setInvalidRabiCropRate(false)
  }
  else{
    setInvalidRabiCropRate(true)
    setRabiCropRate();
  }
    
}
function handleSummerRateChange(event){
  var isNumber = validateNumbersOnly(event.target.value);
  if (isNumber) {
    setSummerCropRate(event.target.value);
    setInvalidSummerCropRate(false);
  }
  else{
    setInvalidSummerCropRate(true);
    setSummerCropRate();
  }
   
}



async function handleAddFormSubmit(e) {
  e.preventDefault();
  setSpinner(true);
  var formData = {
    surveyDescription: surveyDescription,
    surveyDate: formatDateMM(surveyDate),
    surveyKharifCropRate: kharipCropRate,
    surveyRabiCropRate: rabiCropRate,
    surveySummerCropRate: summerCropRate
  }

  var result = await post('admin/1/survey',formData);
  setSpinner(false);
}
const addSurvey = () => {
  return(
    <div>
    <form onSubmit={(e)=> handleAddFormSubmit(e)}> 
        <div className="popup-header">
        <label>{addSurveyPopupLabel}</label>
        <button onClick={handleCloseAddPopup} className="btn popup-close-btn">X</button>
        </div>
        <div className="popup-body">
        {spinner &&     
      <Spin></Spin>
}
        <div className="input-container">
            <label htmlFor="input2">{surveyDescriptionLabel}</label>
            <TextArea value={surveyDescription}  id="input2" rows="10" cols="15" className="form-input" onChange={handleDescriptionChange}/>
          </div>
          <div className="input-container">
          <label htmlFor="input1">{surveyDateLabel}</label><br></br>
            <DatePicker htmlFor="input1" size="100" onChange={(e) => setSurveyDate(e.toDate())}></DatePicker>
          </div>
          <div className="rate-container">
          <div className="input-container">
            <label htmlFor="input1">{kharipPikLabel}</label>
            <Input type='text' value={kharipCropRate}  id="input1" onChange={handleKharipRateChange} />
            { invalidKharifCropRate && <span>Please neter numbers only!</span>}
          </div>
          <div className="input-container">
            <label htmlFor="input1">{rabiPikLabel}</label>
            <Input type='text' value={rabiCropRate}  id="input1" onChange={handleRabiRateChange} />
            { invalidRabiRate && <span>Please neter numbers only!</span>}
          </div>
          <div className="input-container">
            <label htmlFor="input1">{unhaliPikLabel}</label>
            <Input type='text' value={summerCropRate}  id="input1" onChange={handleSummerRateChange}/>
            { invalidSummerCropRate && <span>फक्त अंक लिहा!</span>}
          </div>
          </div>
         
          <p id="success-message" className="success-message"></p>
          <div className="btn-container">
           <button type="submit" className="btn popup-btn">Save</button>
           <button type="submit" className="btn popup-btn-sec">Cancel</button>
        </div>
        </div>
   </form>
  </div>
  )
  
}
const  handleFormSubmit = async (e) => {
  e.preventDefault();
  setSpinner(true);
  var formData = {
    surveyDescription: surveyDescription,
    surveyDate: formatDateMM(surveyDate),
    surveyKharifCropRate: kharipCropRate,
    surveyRabiCropRate: rabiCropRate,
    surveySummerCropRate: summerCropRate
  }
  var result = await put(`admin/1/survey/${surveyId}`,formData);
  setSpinner(false);
  console.log("result",result);
}

function openPopup(){
 resetPopupForm();
  setIsAddPopupOpen(true);
}
function resetPopupForm(){
  setSurveyDescription("");
  setSurveyDate();
  setKharipCropRate();
  setRabiCropRate();
  setSummerCropRate();
}
const updateSurvey = () => {
  return (
      
    <div>
       <form onSubmit={(e)=> handleFormSubmit(e)} id="subTemplateForm"> 
        <div className="popup-header">
          <label>{updateSurveyPopupLabel}</label>
        <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
        </div>
        <div className="popup-body">
        <div className="input-container">
            <label htmlFor="input2">{surveyDescriptionLabel}</label>
            <TextArea value={surveyDescription}  id="input2" rows="10" cols="15" className="form-input" onChange={handleDescriptionChange}/>
          </div>
          <div className="input-container">
          <label htmlFor="input1">{surveyDateLabel}</label><br></br>
            <DatePicker htmlFor="input1" size="100" onChange={(e) => setSurveyDate(e.toDate())}></DatePicker>
          </div>
          <div className="rate-container">
          <div className="input-container">
            <label htmlFor="input1">{kharipPikLabel}</label>
            <Input type='text' value={kharipCropRate}  id="input1" onChange={handleKharipRateChange} />
            { invalidKharifCropRate && <span>Please neter numbers only!</span>}
          </div>
          <div className="input-container">
            <label htmlFor="input1">{rabiPikLabel}</label>
            <Input type='text' value={rabiCropRate}  id="input1" onChange={handleRabiRateChange} />
            { invalidRabiRate && <span>Please neter numbers only!</span>}
          </div>
          <div className="input-container">
            <label htmlFor="input1">{unhaliPikLabel}</label>
            <Input type='text' value={summerCropRate}  id="input1" onChange={handleSummerRateChange}/>
            { invalidSummerCropRate && <span>फक्त अंक लिहा!</span>}
          </div>
          </div>
         
          <p id="success-message" className="success-message"></p>
          <div className="btn-container">
           <button type="submit" className="btn popup-btn">Save</button>
           <button type="submit" className="btn popup-btn-sec">Cancel</button>
        </div>
        </div>
      </form>
    </div>
)}
const printSurvey = () => {
  return (
      
    <div>
        <div className="popup-header">
          <label>प्रिंट</label>
        <button onClick={handleClosePopupPrint} className="btn popup-close-btn">X</button>
        </div>
        <div className="popup-body">
            <table className="bill-table">
              <thead>
                <tr>
                  <td colSpan={5} className="header-data  main-bill-heading">श्रीमंत मालोजीराजे पाणी वापर संस्था क्र. २<br />बाणगंगा लघु प्रकल्प तावडी कालवा <br />ता. फलटण  जि. सातारा</td>
                </tr>
                <tr>
                  <td className="header-data" colSpan={3}>
                  नाव : {"Damini Kulkarni"}<br></br> हस्ते : {"Damini Kulkarni"}
                  </td>
                  <td className="header-data" colSpan={3}>नं. : {111} <br></br> दिनांक  : {"26/03/2024"}</td>
                </tr>
                <tr>
                  <td className="header-data">अ.नं</td>
                  <td className="header-data">तपशील</td>
                  <td className="header-data">क्षेत्र हेक्टर</td>
                  <td className="header-data">दर</td>
                  <td className="header-data">रक्कम रुपये</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="header-data">{currentSurvey.surveyId}</td>
                  <td className="header-data">{currentSurvey.surveyDescription}</td>
                  <td className="header-data">{currentSurvey.surveyKharifCropRate}</td>
                  <td className="header-data">{currentSurvey.surveyRabiCropRate}</td>
                  <td className="header-data">{currentSurvey.surveySummerCropRate}</td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
)}

  return (
    <div className="page">

     <RenderMenu />
    
     <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
            <h3>{surveyList}</h3>
        </div>
            <div className="btn-container">
              {/* <button className="btn"><i className="fa-solid fa-hourglass-half"></i> Generate Minutes</button> */}
                <Link onClick={openPopup}><button className="btn"><i className="fa-solid fa-plus icon"></i>{addSurveyLabel}</button></Link>
            </div>
        </div>
   
    <DataTable dataSource={survey} columns={columns}></DataTable>
    {isAddPopupOpen  && (
             <div className="popup-overlay">
             <Popup  generateForm={addSurvey}/>
         </div>
           
          )}
    {isPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={updateSurvey}/>
         </div>
           
          )}
    {isPrintPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={printSurvey}/>
         </div>
           
          )}
   
 </div>
  )
}

export default Survey