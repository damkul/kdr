import React, { useState, useEffect } from "react";
import CommonTable from '../../components/common/table';
import {PageHeading} from '../../components/common/headings';
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post,put,deleteItem} from '../../context/rest';
import { Link} from "react-router-dom";
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker,Spin} from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined,CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import Popup from '../common/popup';
import {capitalizeFirstLetter,validateNumbersOnly,validatePhoneNumber} from '../common/validations';
import {memberList,firstNameLabel,lastNameLabel,phoneNumberLabel,dareNumberLabel,totalLandLabel,updateMemberPopupLabel,addMemberPopupLabel,gatNumberLabel,addMemberLabel} from '../../language/marathi'

const { Text } = Typography;
const { TextArea } = Input;

function Members() {

  const [members,setMembers] = useState([]); 
  const [initialData,setInitialData] = useState([]); 
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchLastNameText, setSearchLastNameText] = useState("");

  // Form Data
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [dareNumber,setDareNumber] = useState();
  const [totalLand,setTotalLand] = useState();
  const [gatNumber,setGatNumber] = useState();
  const [memberId,setMemberId] = useState();

  // validations
  const [invalidDareNumber,setInvalidDareNumber] = useState(false);
  const [invalidTotalLand,setInvalidTotalLand] = useState(false);
  const [contactInvalidMsg,setContactInvalidMessage] = useState(false)


  function handleFirstNameChange(event){
      setFirstName(event.target.value)
  }
  function handleLastNameChange(event){
      setLastName(event.target.value)
  }
  function handlePhoneNumberChange(event){
    var isValidNumber = validatePhoneNumber(event.target.value);
    if (isValidNumber) {
      setPhoneNumber(event.target.value)
      setContactInvalidMessage();
    }
     else{
      setContactInvalidMessage(true);
      setPhoneNumber()
     }
  }
  function handleDareNumberChange(event){
    var isNumber = validateNumbersOnly(event.target.value);
    if (isNumber) {
      setDareNumber(event.target.value);
      setInvalidDareNumber(false)
    }
    else{
      setInvalidDareNumber(true)
      setDareNumber();
    }
      
  }
  function handleTotalLandChange(event){
    var isNumber = validateNumbersOnly(event.target.value);
    if (isNumber) {
      setTotalLand(event.target.value)
      setInvalidTotalLand(false)
    }
    else{
      setInvalidTotalLand(true);
      setTotalLand();
    }
      
  }
  function handleGatNumberChange(event){
      
      var isNumber = validateNumbersOnly(event.target.value);
      if (isNumber) {
        setGatNumber(event.target.value)
      }
      else{
        setGatNumber();
      }
  }

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/member');
       setIsDataLoaded(false);
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


  async function deleteRecord(member){
    var result = await deleteItem(`admin/1/member/${member.farmerId}`);
    var members = await get('admin/1/member');
       setIsDataLoaded(false);
       setMembers(members);
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
    // {
    //   title: FilterByLastNameInput,
    //   dataIndex: "farmerLastName",
    //   key: "farmerLastName",
    //   width:"22%",
    //   // sorter: (a, b) => new Date(a.date) - new Date(b.date),
    //   render: (text) => (
    //     <Tooltip title={text}>
    //       <Text ellipsis={true}>{text}</Text>
    //     </Tooltip>
    //   ),
    // },
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
      width: "8%",
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
    }
  ];


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

  const handleOpenPopup = (survey) => {
    console.log(survey);
    setFirstName(survey.farmerFirstName);
    setLastName(survey.farmerLastName);
    setPhoneNumber(survey.farmerPhoneNumber);
    setTotalLand(survey.farmarTotalLand);
    setDareNumber(survey.farmerDhareNumber);
    setGatNumber(survey.farmerGatNumber);
    setMemberId(survey.farmerId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  function openPopup(){
    resetPopupForm();
    setIsAddPopupOpen(true);
   }
   function resetPopupForm(){
      setFirstName();
      setDareNumber();
      setLastName();
      setGatNumber();
      setTotalLand();
      setPhoneNumber();
   }
   const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

   async function handleAddFormSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    var formData = {
    farmerFirstName: firstName,
    farmerLastName: lastName,
    farmerPhoneNumber: phoneNumber,
    farmerDhareNumber: dareNumber,
    farmarTotalLand: totalLand,
    farmerGatNumber:gatNumber
  }
  
    var result = await post('admin/1/member',formData);
    setSpinner(false);
  }

   async function handleFormSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    var formData = {
    farmerFirstName: firstName,
    farmerLastName: lastName,
    farmerPhoneNumber: phoneNumber,
    farmerDhareNumber: dareNumber,
    farmarTotalLand: totalLand,
    farmerGatNumber:gatNumber
  }
  
    var result = await put(`admin/1/member/${memberId}`,formData);
    setSpinner(false);
  }

   const addMember = () => {
    return(
      <div>
      <form onSubmit={(e)=> handleAddFormSubmit(e)}> 
          <div className="popup-header">
          <label>{addMemberPopupLabel}</label>
          <button onClick={handleCloseAddPopup} className="btn popup-close-btn">X</button>
          </div>
          <div className="popup-body">
          {spinner &&     
        <Spin></Spin>
  }

          <div className="input-container">
              <label htmlFor="input2">{firstNameLabel}</label>
              <Input value={firstName}  id="input2" rows="10" cols="15" className="form-input" onChange={handleFirstNameChange}/>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{lastNameLabel}</label><br></br>
              <Input value={lastName} size="100" onChange={handleLastNameChange}></Input>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{phoneNumberLabel}</label><br></br>
              <Input value={phoneNumber} size="100" onChange={handlePhoneNumberChange}></Input>
              { contactInvalidMsg && <span>Please enter number only!</span>}
            </div>
            <div className="rate-container">
            <div className="input-container">
              <label htmlFor="input1">{dareNumberLabel}</label>
              <Input type='text' value={dareNumber}  id="input1" onChange={handleDareNumberChange} />
              { invalidDareNumber && <span>फक्त अंक लिहा.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{totalLandLabel}</label>
              <Input type='text' value={totalLand}  id="input1" onChange={handleTotalLandChange} />
              { invalidTotalLand && <span>फक्त अंक लिहा.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{gatNumberLabel}</label>
              <Input type='text' value={gatNumber}  id="input1" onChange={handleGatNumberChange}/>
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

  const updateMember = () => {
    return(
      <div>
      <form onSubmit={(e)=> handleFormSubmit(e)}> 
          <div className="popup-header">
          <label>{updateMemberPopupLabel}</label>
          <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
          </div>
          <div className="popup-body">
          {spinner &&     
        <Spin></Spin>
  }
          <div className="input-container">
              <label htmlFor="input2">{firstNameLabel}</label>
              <Input value={firstName}  id="input2" rows="10" cols="15" className="form-input" onChange={handleFirstNameChange}/>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{lastNameLabel}</label><br></br>
              <Input value={lastName} size="100" onChange={handleLastNameChange}></Input>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{phoneNumberLabel}</label><br></br>
              <Input value={phoneNumber} size="100" onChange={handlePhoneNumberChange}></Input>
            </div>
            <div className="rate-container">
            <div className="input-container">
              <label htmlFor="input1">{dareNumberLabel}</label>
              <Input type='text' value={dareNumber}  id="input1" onChange={handleDareNumberChange} />
              { invalidDareNumber && <span>फक्त अंक लिहा.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{totalLandLabel}</label>
              <Input type='text' value={totalLand}  id="input1" onChange={handleTotalLandChange} />
              { invalidTotalLand && <span>फक्त अंक लिहा.</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{gatNumberLabel}</label>
              <Input type='text' value={gatNumber}  id="input1" onChange={handleGatNumberChange}/>
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
            <h3>{memberList}</h3>
        </div>
        <div className="btn-container">
            <Link onClick={openPopup}><button className="btn"><i className="fa-solid fa-plus icon"></i>{addMemberLabel}</button></Link>
        </div>
    </div>
    <DataTable dataSource={members} columns={columns}></DataTable>
    {isAddPopupOpen  && (
             <div className="popup-overlay">
             <Popup  generateForm={addMember}/>
         </div>
           
          )}
          {isPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={updateMember}/>
         </div>
           
          )}
         
  </div>
       
  )
}

export default Members