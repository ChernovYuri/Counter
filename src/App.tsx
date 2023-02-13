import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import './App.css';
import {App1Box} from "./App1Box";
import {App2Box} from "./App2Box";
import UniversalButton from "./universalButton/universalButton";


function App() {
    // box mode, if else => 2 box
    let [mode, setMode] = useState<boolean>(true)
    return (
     <div>
         <span><UniversalButton name={"Change mode"} callBack={()=>{setMode(!mode)}} disabled={false}/></span>
         {mode ? <App1Box /> : <App2Box />}
     </div>
    )
}

export default App;
