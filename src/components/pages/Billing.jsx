import React, { useState, useEffect } from "react";
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker, Radio,Spin, Checkbox,Switch} from "antd";
import { Link} from "react-router-dom";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {download, get, post,put} from '../../context/rest';
import Popup from '../common/popup';
import {billingList,firstNameLabel,lastNameLabel,phoneNumberLabel,dareNumberLabel,totalLandLabel,statusLabel,actionsLabel,defaulterLabel,receivedPaymentLabel,receivedPaymentDateLabel,updateBillLabel} from '../../language/marathi'
import '../../css/table.css'
import moment from "moment";

const { Text } = Typography;
const { TextArea } = Input;

const Billing = () => {

  const [bills,setBills] = useState(); 
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  
  const [isBillUpdated, setIsBillUpdated] = useState("");
  const [errorMsg,setErrorMsg] = useState(false);


  // form fields
const [receivedPayment,setReceivedPayment] = useState()
const [totalPayment,setTotalPayment] = useState()
const [receivedPaymentDate,setReceivedPaymentDate] = useState()
const [isDefaulter,setIsDefaulter] = useState(1)
const [billId,setBillId] = useState()
const [fileName,setFileName] = useState()
const [showPrintButton,setShowPrintButton] = useState(false)



  function handleReceivedPaymentChange(event){
    setReceivedPayment(event.target.value)
}
  function handleReceivedPaymentDateChange(event){
    setReceivedPaymentDate(event.target.value)
}
  function handleIsDefaulterChange(event){
    setIsDefaulter(event.target.value)
}
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

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/defaulter');
       setIsDataLoaded(false);
      //  document.getElementById('spin').classList.remove('loader-overlay')
        setBills(result);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
    
    fetchData();
  }, []);


  async function printSurveyBill() {
     setIsBillUpdated(false);
    var res = await download(`admin/1/downloadbill/${fileName}`);
  }
  
  const columns = [
    {
      // title: FilterByNameInput,
      title:"नेम",
      dataIndex: "farmerFirstName",
      key: "farmerFirstName",
      width:"15%",
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
      title: "सर्व्हे",
      dataIndex: "surveyDescription",
      key: "surveyDescription",
      width: "15%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "गट नंबर",
      dataIndex: "farmerGatNumber",
      key: "farmerGatNumber",
      width: "6%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "टोटल पेमेंट",
      dataIndex: "totalPayment",
      key: "totalPayment",
      width: "6%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    
    {
      title:"रिसिव्हड पेमेंट",
      dataIndex: "receviedPayment",
      key: "receviedPayment",
      width:"6%",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title:"रिसिव्हड पेमेंट डेट",
      dataIndex: "receivedPaymentDate",
      key: "receivedPaymentDate",
      width:"6%",
      // sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{formatDate(text)}</Text>
        </Tooltip>
      ),
    },
    {
      title:"स्टेटस",
      dataIndex: "isDefaulter",
      key: "isDefaulter",
      width: "5%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          {/* <Text ellipsis={true}>{text}</Text> */}
          { text == 1 ?  <Badge status="success" text="Active" /> :  <Badge status="error" text="In-active" />}
        </Tooltip>
      ),
    },
    {
      title:"ऍक्शन",
      dataIndex: "actions",
      key: "actions",
      width: "3.5%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
          <a href="javascript:;" onClick={() => handleOpenPopup(record)}>
           <EditOutlined></EditOutlined>
          </a>
          </Tooltip>
          {/* <Tooltip title="Delete company">
            <DeleteOutlined
              onClick={async () => {
              //   await deleteCompany(record.id);
              //   setCompanies(await getCompanies(sessionStorage.getItem("firmId")));
              }}
            />
          </Tooltip> */}
        </Space>
      ),
    }
  ];


  const handleOpenPopup = (bill) => {
    setIsBillUpdated(false);
    setShowPrintButton(false);
    setReceivedPayment(bill.receviedPayment);
    setTotalPayment(bill.totalPayment);
    setReceivedPaymentDate(bill.receivedPaymentDate)
    setBillId(bill.farmerSurveyId);
    // setFileName(bill.billFileName);
    setIsPopupOpen(true);
  };


  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (receivedPayment == totalPayment) {
      setIsDefaulter(2);
    }
    var formData = {
      receviedPayment: receivedPayment,
      receivedPaymentDate: receivedPaymentDate,
      isDefaulter: isDefaulter
  }
    var result = await put(`admin/1/defaulter/${billId}`,formData);
    if (result) {
      setIsBillUpdated(true);
      setFileName(result.fileName);
      setShowPrintButton(true);
      var result = await get('admin/1/defaulter');
    }
    else{
      setErrorMsg(true);
    }
  }


  const updateBill = () => {
    return(
      <div>
      <form onSubmit={(e)=> handleFormSubmit(e)}> 
          <div className="popup-header">
          <label>{updateBillLabel}</label>
          <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
          </div>
          <div className="popup-body">
          { isBillUpdated && <div className="long-msg">बील अपडेट झालं आहे!</div> }
          { errorMsg && <div className="long-msg error-msg">बील अपडेट होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
            <div className="defaulter-container first">
            <div className="input-container">
              <label htmlFor="input2">{receivedPaymentLabel}</label>
              <Input value={receivedPayment} className="date"  onChange={handleReceivedPaymentChange}/>
            </div>
              <div className="input-container">
              <label htmlFor="input1">{receivedPaymentDateLabel}</label><br></br>
              <DatePicker htmlFor="input1"  onChange={handleReceivedPaymentDateChange} className="date" defaultValue={moment(receivedPaymentDate)}></DatePicker>
              </div>
              {/* <div className="input-container">
              <label htmlFor="input1">{defaulterLabel}</label><br></br>
                <Switch value={isDefaulter} className="defaulter" onChange={handleIsDefaulterChange}></Switch>
              </div> */}
            </div>
            <div className="btn-container">
             <button type="submit" className="btn popup-btn">Save</button>
             {/* <button type="submit" className="btn popup-btn-sec">Cancel</button> */}
             {
                showPrintButton &&  <button type="submit" className="btn popup-btn-sec" onClick={printSurveyBill}>Print</button>
             }
            
          </div>
          </div>
     </form>
    </div>
    )
    
  }




  return (
    <div className="page">
               <RenderMenu />
               <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
            <h3 style={{color:'white'}}>{billingList}</h3>
        </div>
            {/* <div className="btn-container">
                <Link onClick={openPopup}><button className="btn"><i className="fa-solid fa-plus icon"></i>Add Member</button></Link>
            </div> */}
        </div>
               <DataTable dataSource={bills} pageName={"Members"} columns={columns}></DataTable>
               {isPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={updateBill}/>
         </div>
           
          )}
          </div>
  )
}

export default Billing