import React from 'react'
import ReactDom from 'react-dom';
import '../res/styles.css';

export default function FileView({ open, onClose, filename }) {
  if( !open ) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div 
        className='overlay' 
        onClick={() => onClose()}         
      />
      <div className='image-area'>
        <img src={"http://localhost:2003/uploads/" + filename} alt="proof"/>
      </div>
    </>, 
    document.getElementById('modal')
  );  
}
