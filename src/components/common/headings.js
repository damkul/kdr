import React from 'react'

const cardHeadingStyle = {
    fontSize:'16px',
    fontWeight:'bold',
    color:'#0C5546'
}
const paragraphStyle = {
    fontSize:'16px',
    color:'#0C5546',
    lineHeight:'20px'
}
const pageHeading = {
    fontSize:'24px',
    // color:'#E8F8F5',
    marginLeft:'2rem',
    marginTop:'3rem'
}
const hrStyle = {
    backgroundColor:'#0C5546',
    height:'2px',
    border:'none',
    borderRadius:'2.5px',
    marginTop:'-0.5rem'
}
const countStyle = {
  fontSize:'22px',
  fontWeight:'bold',
  color:'#0C5546'
}
export const PageHeading = ({text}) => {
  return (
    <h2 style={pageHeading}>{text}</h2>
  )
}

export const CardHeading = ({text}) => {
    return (
      <h3 style={cardHeadingStyle}>{text}</h3>
    )
  }
  

export const Paragraph = ({text}) => {
    return (
      <p style={paragraphStyle}>{text}</p>
    )
  }
export const Count = ({text}) => {
    return (
      <h2 style={countStyle}>{text}</h2>
    )
  }

  export const Hr = () => {
    return (
     <hr style={hrStyle}></hr>
    )
  }