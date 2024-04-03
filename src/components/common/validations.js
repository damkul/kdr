export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Function to format a date object to a readable string
  export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  export const validateNumbersOnly = (str) => {
    if(!/^[0-9]+$/.test(str)){
        return false;
      }
      else{
        return true;
      }
  };
  export const validateEmail = (str) => {
    if(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(str)){
        return false;
      }
      else{
        return true;
      }
  };
  export const validatePhoneNumber = (val) => {
    var isNumber = validateNumbersOnly(val)
      if (isNumber) {
        if(val.length <10 || val.length>10){
          return false;
        }
        else{
          return true;
        }
      }
    else{
      return false;
    }
  };