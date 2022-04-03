import * as React from "react";
import Loading from "./loading.jsx";

const LoadingFullPage = function(props) {
  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Loading/>
    </div>
  );
}

export default LoadingFullPage;