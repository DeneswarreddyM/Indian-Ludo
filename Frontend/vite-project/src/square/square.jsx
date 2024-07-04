import React from 'react';
import  {useState,useEffect} from 'react';
import './square.css'

const crossSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M19 5L5 19M5.00001 5L19 19"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
const safe=(value)=>{
     if(value===4||value===9||value===13||value===18||value===22||value===24||value===25||value===26||value===28||value===32||value===37||value===41||value===46){
      return true;
     }
     else{
      return false;
     }
}
  const square=({
    onButtonClick,
     value
  })=>{

    const handleClick = () => {
      onButtonClick(value);
    };
    const check=safe(value);
    return (
        <div className="Square" onClick={handleClick}>
            {check&&crossSvg}
        </div>
    )
  };

  export default square
