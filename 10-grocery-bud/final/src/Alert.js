import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);   //the setTimeOut works without the list dependency...so it renders whenever the list is updated
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
