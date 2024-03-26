

function Popup({ generateForm }) {
  
  return (
    <div className="popup">
    <div className="popup-content">
    
      {generateForm && (
        generateForm()
      ) }
    </div>
  </div>
  );
}

export default Popup;
