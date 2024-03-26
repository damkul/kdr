import React, { useState, useEffect } from "react";
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker, Radio,Spin, Checkbox,Switch} from "antd";
import { Link} from "react-router-dom";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {get, post,put} from '../../context/rest';
import Popup from '../common/popup';
import {billingList,firstNameLabel,lastNameLabel,phoneNumberLabel,dareNumberLabel,totalLandLabel,statusLabel,actionsLabel,defaulterLabel,receivedPaymentLabel,receivedPaymentDateLabel,updateBillLabel} from '../../language/marathi'
import '../../css/table.css'

const { Text } = Typography;
const { TextArea } = Input;

const Billing = () => {

  const [bills,setBills] = useState(); 
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  

  // form fields
const [receivedPayment,setReceivedPayment] = useState()
const [receivedPaymentDate,setReceivedPaymentDate] = useState()
const [isDefaulter,setIsDefaulter] = useState()
const [billId,setBillId] = useState()



  function handleReceivedPaymentChange(event){
    setReceivedPayment(event.target.value)
}
  function handleReceivedPaymentDateChange(event){
    setReceivedPaymentDate(event.target.value)
}
  function handleIsDefaulterChange(event){
    setIsDefaulter(event.target.value)
}

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/defaulter');
       console.log("companies",result);
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

  const columns = [
    {
      // title: FilterByNameInput,
      title:"फर्स्ट नेम",
      dataIndex: "farmerFirstName",
      key: "farmerFirstName",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title:"लास्ट नेम",
      dataIndex: "farmerLastName",
      key: "farmerLastName",
      width:"10%",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
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
      dataIndex: "farmerTotalLand",
      key: "farmerTotalLand",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title:"स्टेटस",
      dataIndex: "isDefaulter",
      key: "isDefaulter",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title:"ऍक्शन",
      dataIndex: "actions",
      key: "actions",
      width: "8%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
          <a href="javascript:;" onClick={() => handleOpenPopup(record)}>
           <EditOutlined></EditOutlined>
          </a>
          </Tooltip>
          <Tooltip title="Delete company">
            <DeleteOutlined
              onClick={async () => {
              //   await deleteCompany(record.id);
              //   setCompanies(await getCompanies(sessionStorage.getItem("firmId")));
              }}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];


  const handleOpenPopup = (bill) => {
    console.log(bill);
    setIsDefaulter(bill.isDefaulter);
    setReceivedPayment(bill.receviedPayment);
    setReceivedPaymentDate(bill.receivedPaymentDate)
    setBillId(bill.farmerSurveyId);
    setIsPopupOpen(true);
  };


  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    var formData = {
    receivedPayment: receivedPayment,
    receivedPaymentDate: receivedPaymentDate,
    isDefaulter: isDefaulter
  }
  
    var result = await put(`admin/1/defaulter/${billId}`,formData);
    setSpinner(false);
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
          {spinner &&     
        <Spin></Spin>
  }
          <div className="input-container">
              <label htmlFor="input2">{receivedPaymentLabel}</label>
              <Input value={receivedPayment}  id="input2" rows="10" cols="15" className="form-input" onChange={handleReceivedPaymentChange}/>
            </div>
            <div className="defaulter-container">
              <div className="input-container">
              <label htmlFor="input1">{receivedPaymentDateLabel}</label><br></br>
              <DatePicker htmlFor="input1"  onChange={handleReceivedPaymentDateChange} className="date"></DatePicker>
              </div>
              <div className="input-container">
              <label htmlFor="input1">{defaulterLabel}</label><br></br>
                <Switch value={isDefaulter} className="defaulter" onChange={handleIsDefaulterChange}></Switch>
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




  return (
    <div className="page">
               <RenderMenu />
               <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
            <h3>{billingList}</h3>
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