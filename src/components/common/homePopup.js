import React, { useState, useEffect } from "react";

function homePopup({data,close}) {
  return (
    <div className="popup">
    <div className="popup-content">
    <div className="popup-header">
          <label>{ data.name}</label>
          <button onClick={close} className="btn popup-close-btn">X</button>
          </div>
          <div>{data.content}</div>
    </div>
  </div>
  )
}

export default homePopup