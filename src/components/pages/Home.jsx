import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import CommonCard from '../../components/common/card';
import {CardHeading, Count,PageHeading,Hr} from '../../components/common/headings';
import { RenderMenu } from "../structure/RenderNavigation";
import HomePopup from "../common/homePopup";
import Card from '@mui/material/Card';
import {get, post,put,deleteItem} from '../../context/rest';
export function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(false);
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const[cardDetails,setCardDetails] = useState();

  const cardStyle ={
    width:'20%',
    height:'100px',
    borderLeft:"50px solid #148D75",
    borderRadius:'20px',
     marginLeft:'1rem',
    marginTop:'2rem',
    marginRight:'1rem',
     padding:'0.2rem 1rem',
    cursor:'pointer',
    backgroundColor:'#F5F5F5',
    '&:hover':{
      backgroundColor:'#E8F8F5',
      textAlign:'left'
    }
  }
  const data = [
    {
    name:'Card 1',
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
    },
    {
      name:'Card 2',
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
    },
    {
    name:'Card 3',
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
    },
    {
    name:'Card 4',
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
    },
    {
      name:'Card 5',
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
      },
      {
        name:'Card 6',
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, quisquam."
        },]


        function openPopup(row) {
          console.log('hi',row);
          setPopupData(row);
          setIsPopupOpen(true);
        }


        const handleClosePopup = () => {
          setIsPopupOpen(false);
        };

        useEffect(() => {
          async function fetchData() {
            try {
             var result = await get('admin/1/homepage');
             console.log("companies",result);
             setIsDataLoaded(false);
            //  document.getElementById('spin').classList.remove('loader-overlay')
            setCardDetails(result);
            } catch (error) {
              console.log(error);
              console.error(error);
            }
          }
          
          fetchData();
        }, []);

       

  return (
     <div className="page">
                <RenderMenu />
                
         {/* {data.map((row) => (
              //  <Card sx={cardStyle} data={data} onClick={() => openPopup(row)}>
                  <Card sx={cardStyle}>
                 <CardHeading text={row.name}></CardHeading>
                 <Hr />
                 <Count text={row.content}></Count>
               </Card>
           ))} */}
            {/* {isPopupOpen  && (
             <div className="popup-overlay">
             <HomePopup data={popupData} close={handleClosePopup}/>
         </div>
           
          )} */}
          {
            cardDetails != undefined &&
            <div  style={{display:'flex',flexWrap:'wrap',marginTop:'2%',marginLeft:'20%'}}>
          <Card sx={cardStyle}>
                 <CardHeading text={"फार्मर्स काउन्ट"}></CardHeading>
                 <Hr />
                 <Count text={cardDetails.farmerCount}></Count>
               </Card>
          <Card sx={cardStyle}>
                 <CardHeading text={"मोबाइल ऍप  काउंट"}></CardHeading>
                 <Hr />
                 <Count text={cardDetails.mobileAppCount}></Count>
               </Card>
          <Card sx={cardStyle}>
                 <CardHeading text={"सर्व्हे काउन्ट"}></CardHeading>
                 <Hr />
                 <Count text={cardDetails.surveyCount}></Count>
               </Card>
          <Card sx={cardStyle}>
                 <CardHeading text={"टोटल पेमेंट"}></CardHeading>
                 <Hr />
                 <Count text={cardDetails.totalPayment}></Count>
               </Card>
          <Card sx={cardStyle}>
                 <CardHeading text={"टोटल रिसिव्हड पेमेंट"}></CardHeading>
                 <Hr />
                 <Count text={cardDetails.totalReceivedPayment}></Count>
               </Card>
               </div>
                }
       
           </div>
  )
}