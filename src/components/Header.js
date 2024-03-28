import React from "react";
import "../styles/Header.css"
export default function Header(props)
{
    function handleStart()
    {
        props.setRunning(!props.running)
    }

    return (
        <div id="header">
            <div id = "heading">
                Conway Game Of Life Simulator
            </div>
            <div>
            <button onClick={handleStart} className="start-button" >Start</button>
          
          <button onClick={() => window.location.href = "/"} className="reset-button">Reset</button>
     
            </div>
       
        </div>
    )
}