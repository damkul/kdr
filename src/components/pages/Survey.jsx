import React, { useState, useEffect } from "react";
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post, put,deleteItem} from '../../context/rest';
import { Link} from "react-router-dom";
import { Radio,Tooltip, Space,Typography, Button,Input, DatePicker,Spin } from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined,SearchOutlined,CloseCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import {capitalizeFirstLetter,validateNumbersOnly} from '../common/validations'
import {surveyList,addSurveyPopupLabel,surveyDescriptionLabel,surveyDateLabel,kharipPikLabel,rabiPikLabel,unhaliPikLabel,updateSurveyPopupLabel,addSurveyLabel, surveySeasonLabel, surveySeasonKharifLabel, surveySeasonRabbiLabel, surveySeasonSummerLabel, surveySeasonUssRateLabel, surveySeasonBhusarRateLabel} from '../../language/marathi'
import Popup from '../common/popup'
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthData } from "../../auth/AuthWrapper";

const { Text } = Typography;
const { TextArea } = Input;
function Survey() {

  const navigate = useNavigate();
  const { user } = AuthData();
  var id = JSON.parse(localStorage.getItem("user")).id;

  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [survey,setSurvey] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchTextDate, setSearchTextDate] = useState("");
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
  const [value, setValue] = useState();
  const [surveyId,setSurveyId] = useState();
  const [errorMsg,setErrorMsg] = useState(false);


  const [currentSurvey,setCurrentSurvey] = useState();

  const [isSurveyAdded, setIsSurveyAdded] = useState("");
  const [isSurveyUpdated, setIsSurveyUpdated] = useState("");
  // validations
  const [invalidKharifCropRate,setInvalidKharifCropRate] = useState(false)
  const [invalidRabiRate,setInvalidRabiCropRate] = useState(false)
  const [invalidSummerCropRate,setInvalidSummerCropRate] = useState(false)

  const [initialData,setInitialData] = useState([]); 

  const handleOpenPopup = (survey) => {
    console.log(survey);
    setSurveyDescription(survey.surveyDescription);
    setSurveyDate(survey.surveyDate);
    setKharipCropRate(survey.surveyUssCropRate);
    setRabiCropRate(survey.surveyBhusarCropRate);
    setValue(survey.surveySeasonType);
    // setSummerCropRate(survey.surveySummerCropRate);
    setSurveyId(survey.surveyId)
    setIsPopupOpen(true);
  };
  const handlePrintOpenPopup = async (survey) => {
    // setCurrentSurvey(survey)
    // setIsPrintPopupOpen(true);
    var result = get("admin/${id}/downloadbill/Shubhankar_Ingale_Resume.pdf");
  };

  const handleAddPopupCancel = () => {
    setIsAddPopupOpen(false);
  }
  const handleCancel = () => {
    setIsPopupOpen(false);
  }
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setErrorMsg(false)
  };
  const handleClosePopupPrint = () => {
    setIsPrintPopupOpen(false);
    setErrorMsg(false)
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
    setErrorMsg(false)
  };

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get(`admin/${id}/survey`);
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
    var result = await deleteItem(`admin/${id}/survey/${survey.surveyId}`);
    var surveys = await get(`admin/${id}/survey`);
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
  const handleDateSearch = (searchInput) => {
    // Perform filtering logic based on your requirements
   console.log(searchInput);
    // setSearchTextDate(searchInput);
    const filteredData = survey.filter(item =>
      // console.log(formatDate(item.surveyDate)),
        formatDate(item.surveyDate) === formatDate(searchInput)
    );
    setSurvey(filteredData);
  };
  const handleClear = () => {
    setSearchText('');
    setSurvey(initialData); // Resetting to initial data when clearing search
  };
  const handleDateClear = () => {
    setSearchTextDate('');
    setSurvey(initialData); // Resetting to initial data when clearing search
  };

 
  const FilterBySurveyDescriptionInput = (
    <Space style={{ display: "flex", justifyContent: "space-between",flexDirection:'column',alignItems:'flex-start' }}>
      <Link style={{color:'#fff'}}>नेम</Link>
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
  const FilterBySurveyDate = (
    <div>
        <label>सर्व्हेची तारीख</label>
        <div style={{display:'flex'}}>
          <Input.Search
            placeholder="सर्व्हेची तारीख"
            // enterButton={<SearchOutlined/>}
            allowClear
            value={searchTextDate}
            onSearch={handleDateSearch}
            onChange={(e) => setSearchTextDate(e.target.value)}
            // suffix={searchTextDate && <CloseCircleOutlined onClick={handleDateClear} />}
          />
          { searchTextDate.length >0 && 
      <button onClick={handleDateClear} className="clear-btn">
        <CloseCircleOutlined cleOutlined></CloseCircleOutlined>
        </button>}
        </div>
    </div>
   


  );

  function  handleClick(record) {
    console.log(record);
    // navigate("/surveyDetails",record.surveyId);
    navigate("/surveyDetails", { state: record });
  }
  const columns = [
    {
      // title: FilterByNameInput,
      title:FilterBySurveyDescriptionInput,
      dataIndex: "surveyDescription",
      key: "surveyDescription",
      width:"25%",
      // sorter: (a, b) => a.name > b.name,
      render: (text,record) => (
        <Tooltip title={text}>
          <a href="javascript:;" onClick={() => handleClick(record)}> {text} </a>
        </Tooltip>
      ),
    },
    {
      title: FilterBySurveyDate,
      dataIndex: "surveyDate",
      key: "surveyDate",
      width:"13%",
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "ऊस दर",
      dataIndex: "surveyUssCropRate",
      key: "surveyUssCropRate",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "भुसार दर",
      dataIndex: "surveyBhusarCropRate",
      key: "surveyBhusarCropRate",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    // {
    //   title: "उन्हाळी पीक दर",
    //   dataIndex: "surveySummerCropRate",
    //   key: "surveySummerCropRate",
    //   width: "8%",
    //   // sorter: (a, b) => a.name > b.name,
    //   render: (text) => (
    //     <Tooltip title={text}>
    //       <Text ellipsis={true}>{text}</Text>
    //     </Tooltip>
    //   ),
    // },
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
    // {
    //   title: "प्रिंट",
    //   dataIndex: "surveyStatus",
    //   key: "surveyStatus",
    //   width: "2.5%",
    //   // sorter: (a, b) => a.name > b.name,
    //   render: (text,record) => (
    //     <Tooltip title={"Survey Stage: "+text}>
           
    //       {/* <Text ellipsis={true}>{text}</Text> */}
    //       {text >= 2 ?
    //       <a href="javascript:;" onClick={() => handlePrintOpenPopup(record)}>
    //         <PrinterOutlined />
    //       </a>
    //       : ""}
    //     </Tooltip>
    //   ),
    // },
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

  var formData = {
    surveyDescription: surveyDescription,
    surveyDate: formatDateMM(surveyDate),
    surveySeasonType: value,
    surveyUssCropRate: kharipCropRate == 0 ? -1 : kharipCropRate,
    surveyBhusarCropRate: rabiCropRate == 0 ? -1 : rabiCropRate
    // surveyKharifCropRate: kharipCropRate,
    // surveyRabiCropRate: rabiCropRate,
    // surveySummerCropRate: summerCropRate
  }
  console.log("kharipCropRate 2",formData);
  var result = await post(`admin/${id}/survey`,formData);
  setIsSurveyAdded(true);
  if (result) {
   var result = await get(`admin/${id}/survey`);
   setSurvey(result);
  }
  else{
    setErrorMsg(true);
  }
}


  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


const addSurvey = () => {
  return(
    <div>
    <form onSubmit={(e)=> handleAddFormSubmit(e)}> 
        <div className="popup-header">
                <h3 className='session-popup-header'>{addSurveyPopupLabel}</h3>
                <div  className="btn-close">
                <button onClick={handleCloseAddPopup}>X</button>
                </div>
               
            </div>
        <div className="popup-body">
        { isSurveyAdded && <div className="long-msg">सर्व्हे ऍड झाला आहे!</div>}
        { errorMsg && <div className="long-msg error-msg">सर्व्हे ऍड होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
        <div className="input-container first">
            <label htmlFor="input2">{surveyDescriptionLabel}</label>
            <TextArea value={surveyDescription}  id="input2" rows="2" cols="2" className="form-input" onChange={handleDescriptionChange}/>
          </div>
          <div className="input-container">
          <label htmlFor="input1">{surveyDateLabel}</label><br></br>
            <DatePicker htmlFor="input1" onChange={(e) => setSurveyDate(e.toDate())}  style={{width:'42.5rem'}}></DatePicker>
          </div>
          <div className="rate-container">
            <div className="input-container">
            <label htmlFor="input1">{surveySeasonLabel}</label><br></br>
            <Radio.Group onChange={onChange} value={value}  style={{marginTop:'0.5rem'}}>
              <Radio value={1}>{surveySeasonKharifLabel}</Radio>
              <Radio value={2}>{surveySeasonRabbiLabel}</Radio>
              <Radio value={3}>{surveySeasonSummerLabel}</Radio>
            </Radio.Group>
            </div>
          </div>
          <div style={{display:'flex'}}>
          <div className="input-container" style={{width:'50%'}}>
            <label htmlFor="input1">{surveySeasonUssRateLabel}</label>
            <Input type='text' value={kharipCropRate} size="middle" onChange={handleKharipRateChange} className="form-control"/>
            { invalidKharifCropRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div>
          <div className="input-container" style={{width:'50%'}}>
            <label htmlFor="input1">{surveySeasonBhusarRateLabel}</label>
            <Input type='text' value={rabiCropRate} size="middle" onChange={handleRabiRateChange} />
            { invalidRabiRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div>
          {/* <div className="input-container">
            <label htmlFor="input1">{unhaliPikLabel}</label>
            <Input type='text' value={summerCropRate}  id="input1" onChange={handleSummerRateChange}/>
            { invalidSummerCropRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div> */}
          </div>
         
          <p id="success-message" className="success-message"></p>
          <div className="btn-container">
          {isSurveyAdded ? <button type="submit" className="disabled popup-btn long-btn" disabled>Save</button> : <button type="submit" className="btn popup-btn long-btn">Save</button>}
           {/* <button type="submit" className="btn popup-btn-sec" onClick={handleAddPopupCancel}>Cancel</button> */}
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
    surveySeasonType: value,
    surveyUssCropRate: kharipCropRate == 0 ? -1 : kharipCropRate,
    surveyBhusarCropRate: rabiCropRate == 0 ? -1 : rabiCropRate
    // surveyKharifCropRate: kharipCropRate,
    // surveyRabiCropRate: rabiCropRate,
    // surveySummerCropRate: summerCropRate
  }
  var result = await put(`admin/${id}/survey/${surveyId}`,formData);
  
 if (result) {
  setIsSurveyUpdated(true);
  var result = await get(`admin/${id}/survey`);
  setSurvey(result);
 }
 else{
  setErrorMsg(true)
 }
}

function openPopup(){
 resetPopupForm();
  setIsAddPopupOpen(true);
}
function resetPopupForm(){
  setErrorMsg(false);
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
        {/* <div className="popup-header">
          <label>{updateSurveyPopupLabel}</label>
        <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
        </div> */}
        <div className="popup-header">
                <h4 className='session-popup-header'>{updateSurveyPopupLabel}</h4>
                <div  className="btn-close">
                <button onClick={handleClosePopup}>X</button>
                </div>
               
            </div>
        <div className="popup-body">
        { isSurveyUpdated && <div className="long-msg">सर्व्हे अपडेट झाला आहे!</div>}
        { errorMsg && <div className="long-msg error-msg">सर्व्हे अपडेट होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
        <div className="input-container first">
            <label htmlFor="input2">{surveyDescriptionLabel}</label>
            <TextArea value={surveyDescription}  id="input2" rows="2" cols="2" className="form-input" onChange={handleDescriptionChange}/>
          </div>
          <div className="input-container">
          <label htmlFor="input1">{surveyDateLabel}</label><br></br>
            <DatePicker htmlFor="input1" size="100" onChange={(e) => setSurveyDate(e.toDate())} defaultValue={moment(surveyDate)} style={{width:'42.2rem'}}></DatePicker>
          </div>
          <div className="rate-container">
            <div className="input-container">
            <label htmlFor="input1">{surveySeasonLabel}</label><br></br>
            <Radio.Group onChange={onChange} value={value}  style={{marginTop:'0.5rem'}}>
              <Radio value={1}>{surveySeasonKharifLabel}</Radio>
              <Radio value={2}>{surveySeasonRabbiLabel}</Radio>
              <Radio value={3}>{surveySeasonSummerLabel}</Radio>
            </Radio.Group>
            </div>
          </div>
          <div style={{display:'flex'}}>
          <div className="input-container" style={{width:'50%'}}>
            <label htmlFor="input1">{surveySeasonUssRateLabel}</label>
            <Input type='text' value={kharipCropRate} size="middle" onChange={handleKharipRateChange} className="form-control"/>
            { invalidKharifCropRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div>
          <div className="input-container" style={{width:'50%'}}>
            <label htmlFor="input1">{surveySeasonBhusarRateLabel}</label>
            <Input type='text' value={rabiCropRate} size="middle" onChange={handleRabiRateChange} />
            { invalidRabiRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div>
          {/* <div className="input-container">
            <label htmlFor="input1">{unhaliPikLabel}</label>
            <Input type='text' value={summerCropRate}  id="input1" onChange={handleSummerRateChange}/>
            { invalidSummerCropRate && <span className="validation-msg">फक्त अंक लिहा!</span>}
          </div> */}
          </div>
         
          <p id="success-message" className="success-message"></p>
          <div className="btn-container">
           <button type="submit" className="btn long-btn">Save</button>
           {/* <button type="submit" className="btn popup-btn-sec" onClick={handleCancel}>Cancel</button> */}
        </div>
        </div>
      </form>
    </div>
)}



// const printSurvey = () => {
//   return (
      
//     <div>
//         <div className="popup-header">
//           <label>प्रिंट</label>
//         <button onClick={handleClosePopupPrint} className="btn popup-close-btn">X</button>
//         </div>
//         <div className="popup-body">
//             <table className="bill-table">
//               <thead>
//                 <tr>
//                   <td colSpan={5} className="header-data  main-bill-heading">श्रीमंत मालोजीराजे पाणी वापर संस्था क्र. २<br />बाणगंगा लघु प्रकल्प तावडी कालवा <br />ता. फलटण  जि. सातारा</td>
//                 </tr>
//                 <tr>
//                   <td className="header-data" colSpan={3}>
//                   नाव : {"Damini Kulkarni"}<br></br> हस्ते : {"Damini Kulkarni"}
//                   </td>
//                   <td className="header-data" colSpan={3}>नं. : {111} <br></br> दिनांक  : {"26/03/2024"}</td>
//                 </tr>
//                 <tr>
//                   <td className="header-data">अ.नं</td>
//                   <td className="header-data">तपशील</td>
//                   <td className="header-data">क्षेत्र हेक्टर</td>
//                   <td className="header-data">दर</td>
//                   <td className="header-data">रक्कम रुपये</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="header-data">{currentSurvey.surveyId}</td>
//                   <td className="header-data">{currentSurvey.surveyDescription}</td>
//                   <td className="header-data">{currentSurvey.surveyKharifCropRate}</td>
//                   <td className="header-data">{currentSurvey.surveyRabiCropRate}</td>
//                   <td className="header-data">{currentSurvey.surveySummerCropRate}</td>
//                 </tr>
//               </tbody>
//             </table>
//         </div>
//     </div>
// )}

  return (
    <div className="page">

     <RenderMenu />
    
     <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
            <h3 style={{color:'white'}}>{surveyList}</h3>
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
    {/* {isPrintPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={printSurvey}/>
         </div>
           
          )} */}
   
 </div>
  )
}

export default Survey