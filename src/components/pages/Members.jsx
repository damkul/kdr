// import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from "react";
import CommonTable from '../../components/common/table';
import {PageHeading} from '../../components/common/headings';
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post,put,deleteItem} from '../../context/rest';
import { Link} from "react-router-dom";
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker,Spin} from "antd";
import { FormOutlined, EditOutlined,MinusCircleOutlined,CloseCircleOutlined,PlusCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import Popup from '../common/popup';
import {capitalizeFirstLetter,validateNumbersOnly,validatePhoneNumber} from '../common/validations';
import {memberList,firstNameLabel,lastNameLabel,phoneNumberLabel,dareNumberLabel,totalLandLabel,updateMemberPopupLabel,addMemberPopupLabel,gatNumberLabel,addMemberLabel} from '../../language/marathi'
import { AuthData } from "../../auth/AuthWrapper";

const { Text } = Typography;
const { TextArea } = Input;

function Members() {

  const { user } = AuthData();

  var id = JSON.parse(localStorage.getItem("user")).id;

  const [members,setMembers] = useState([]); 
  const [initialData,setInitialData] = useState([]); 
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchTextDareNumber, setSearchTextDareNumber] = useState('');
  const [searchTextGatNumber, setSearchTextGatNumber] = useState("");


  const [isMemberAdded, setIsMemberAdded] = useState("");
  const [isMemberUpdated, setIsMemberUpdated] = useState("");

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
  const [contactInvalidMsg,setContactInvalidMessage] = useState(false);
  const [errorMsg,setErrorMsg] = useState(false);



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
    setTotalLand(event.target.value)
    // var isNumber = validateNumbersOnly(event.target.value);
    // if (isNumber) {
    //   setTotalLand(event.target.value)
    //   setInvalidTotalLand(false)
    // }
    // else{
    //   setInvalidTotalLand(true);
    //   setTotalLand();
    // }
      
  }
  function handleGatNumberChange(event){
    setGatNumber(event.target.value)
      // var isNumber = validateNumbersOnly(event.target.value);
      // if (isNumber) {
      //   setGatNumber(event.target.value)
      // }
      // else{
      //   setGatNumber();
      // }
  }

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get(`admin/${id}/member`);
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
    var result = await deleteItem(`admin/${id}/member/${member.farmerId}`);
    var members = await get(`admin/${id}/member`);
       setIsDataLoaded(false);
       setMembers(members);
  }

  async function toggleMemberStatus(member){
    if (member.isActive == 1) {
      var result = await put(`admin/${id}/member/${member.farmerId}/status/${0}`);
    }
    else if(member.isActive == 0){
      var result = await put(`admin/${id}/member/${member.farmerId}/status/${1}`);
    }
    var members = await get(`admin/${id}/member`);
    setMembers(members);
  }

  const handleSearch = (searchInput) => {
    // setSearchText(searchInput)
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


  const handleGatSearch = value => {
    setSearchTextGatNumber(value);
    const filteredData = searchTextGatNumber ? members.filter(item =>
      item.farmerGatNumber.includes(value)
    ) : members;
    setMembers(filteredData);
  };
  const handleDareSearch = value => {
     //setSearchTextDareNumber(value);
    // console.log(searchTextDareNumber);
    const filteredData = searchTextDareNumber ? members.filter(item =>
      item.farmerDhareNumber == value
    ) : members;
    setMembers(filteredData);
  };


  const FilterByFirstNameInput = (
    <Space style={{ display: "flex", justifyContent: "space-between",flexDirection:'column',alignItems:'flex-start' }}>
      <Text style={{color:'#fff'}}>नेम</Text>
      <Input.Search
        placeholder="नेम"
        // enterButton={<SearchOutlined/>}
        allowClear
        value={searchText}
        onSearch={handleSearch}
        onChange={e => setSearchText(e.target.value)}
        />
        </Space>
  );
  const FilterByDareNumber = (
    <div style={{ display: "flex", justifyContent: "space-between",flexDirection:'column',alignItems:'flex-start' }}>
      <label htmlFor="">दारे नंबर</label>
      <div style={{display:'flex'}}>
      <Input.Search
        placeholder="दारे नंबर"
        // enterButton={<SearchOutlined/>}
        allowClear
        value={searchTextDareNumber}
        onSearch={handleDareSearch}
        onChange={e => setSearchTextDareNumber(e.target.value)}
        />
         { searchTextDareNumber.length >0 && 
            <button onClick={handleDareNumberClear} className="clear-btn">
                <CloseCircleOutlined></CloseCircleOutlined>
            </button>}
      </div>
        </div>
  //   <div>
  //   <label htmlFor="">गट नंबर</label>
  //     <div style={{display:'flex'}}>
  //     <Search
  //     placeholder="Search name"
  //     value={searchTextDareNumber}
  //     onChange={e => handleDareSearch(e.target.value)}
  //   />
  //   { searchTextDareNumber.length >0 && 
  //  <button onClick={handleDareNumberClear} className="clear-btn">
  //  <CloseCircleOutlined></CloseCircleOutlined>
  //  </button>}

  // </div>
  // </div>
    
  );
  const FilterByGatNumber = (
    <div>
      <label htmlFor="">गट नंबर</label>
        <div style={{display:'flex'}}>
        <Search
        placeholder="गट नंबर"
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

  const columns = [
    {
      title: FilterByFirstNameInput,
      // title:"फर्स्ट नेम",
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
      width: "7%",
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
      width: "13%",
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
      width: "5%",
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
      width: "13%",
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
          <Tooltip title="Change Status Of member">
          <a href="javascript:;" onClick={() => toggleMemberStatus(record)}>
          {record.isActive == 1 ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
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
    setIsMemberUpdated(false);
    setErrorMsg(false)
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
    setIsMemberAdded(false);
    setErrorMsg(false)
  };

   async function handleAddFormSubmit(e) {
    e.preventDefault();
    // setSpinner(true);
    var formData = {
    farmerFirstName: firstName,
    farmerLastName: lastName,
    farmerPhoneNumber: phoneNumber,
    farmerDhareNumber: dareNumber,
    farmarTotalLand: totalLand,
    farmerGatNumber:gatNumber
  }
  
    var result = await post(`admin/${id}/member`,formData);
    
    if (result) {
      setIsMemberAdded(true);
      var result = await get(`admin/${id}/member`);
      setMembers(result);
    }
    else{
      setErrorMsg(true)
    }
    // setSpinner(false);
  }

   async function handleFormSubmit(e) {
    e.preventDefault();
    var formData = {
    farmerFirstName: firstName,
    farmerLastName: lastName,
    farmerPhoneNumber: phoneNumber,
    farmerDhareNumber: dareNumber,
    farmarTotalLand: totalLand,
    farmerGatNumber:gatNumber
  }
  
    var result = await put(`admin/${id}/member/${memberId}`,formData);
   
    if (result) {
      setIsMemberUpdated(true);
      var result = await get(`admin/${id}/member`);
      setMembers(result);
    }
    else{
      setErrorMsg(true)
    }
  }

  const handleAddPopupCancel = () => {
    setIsAddPopupOpen(false);
  }
  const handleCancel = () => {
    setIsPopupOpen(false);
  }

   const addMember = () => {
    return(
      <div>
      <form onSubmit={(e)=> handleAddFormSubmit(e)}> 
          {/* <div className="popup-header">
          <label>{addMemberPopupLabel}</label>
          <button onClick={handleCloseAddPopup} className="btn popup-close-btn">X</button>
          </div> */}
          <div className="popup-header">
                <h3 className='session-popup-header'>{addMemberPopupLabel}</h3>
                <div  className="btn-close">
                <button onClick={handleCloseAddPopup}>X</button>
                </div>
               
            </div>
          <div className="popup-body">
            { isMemberAdded && <div className="long-msg">मेंबर ऍड झाला आहे!</div>}
            { errorMsg && <div className="long-msg error-msg">मेंबर ऍड होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
          <div className="input-container first">
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
              { contactInvalidMsg && <span className="validation-msg">फक्त अंक लिहा.!</span>}
            </div>
            <div className="rate-container">
            <div className="input-container">
              <label htmlFor="input1">{dareNumberLabel}</label>
              <Input type='text' value={dareNumber}  id="input1" onChange={handleDareNumberChange} />
              { invalidDareNumber && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{totalLandLabel}</label>
              <Input type='text' value={totalLand}  id="input1" onChange={handleTotalLandChange} />
              { invalidTotalLand && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{gatNumberLabel}</label>
              <Input type='text' value={gatNumber}  id="input1" onChange={handleGatNumberChange}/>
            </div>
            </div>
            <div className="btn-container">
             {isMemberAdded ? <button type="submit" className="disabled popup-btn long-btn" disabled>Save</button> : <button type="submit" className="btn popup-btn long-btn">Save</button>}
             {/* <button type="submit" className="btn popup-btn-sec" onClick={handleAddPopupCancel}>Cancel</button> */}
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
          {/* <div className="popup-header">
          <label>{updateMemberPopupLabel}</label>
          <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
          </div> */}
          <div className="popup-header">
                <h3 className='session-popup-header'>{updateMemberPopupLabel}</h3>
                <div  className="btn-close">
                <button onClick={handleClosePopup}>X</button>
                </div>
                </div>
          <div className="popup-body">
          { isMemberUpdated && <div className="long-msg">मेंबर अपडेट झाला आहे!</div>}
          { errorMsg && <div className="long-msg error-msg">मेंबर अपडेट होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
          <div className="input-container first">
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
              { invalidDareNumber && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{totalLandLabel}</label>
              <Input type='text' value={totalLand}  id="input1" onChange={handleTotalLandChange} />
              { invalidTotalLand && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container">
              <label htmlFor="input1">{gatNumberLabel}</label>
              <Input type='text' value={gatNumber}  id="input1" onChange={handleGatNumberChange}/>
            </div>
            </div>
           
            <p id="success-message" className="success-message"></p>
            <div className="btn-container">
             <button type="submit" className="btn popup-btn">Save</button>
             <button type="submit" className="btn popup-btn-sec" onClick={handleCancel}>Cancel</button>
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
            <h3 style={{color:'white'}}>{memberList}</h3>
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