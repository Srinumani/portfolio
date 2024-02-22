import { useState } from "react";

import Alubum from "./Components/Alubums";
import Navbar from "./Components/Navbar";
import ShowAlubum from "./Components/ShowAlubum";

 
function App() {
  
  const [showAlubum,setshowAlubum]=useState(true);
  const [selectedAlubum,setSelectedAlubum]=useState('');
  
  function handleAlubum(alubumName){
    setshowAlubum(!showAlubum);
    setSelectedAlubum(alubumName);

  }

  return (
    <div className="App">
      <Navbar/>
      {showAlubum?<Alubum handleAlubum={handleAlubum} />:
      <ShowAlubum handleAlubum={handleAlubum} selectedAlubum={selectedAlubum}/>}
    </div>
  );
}

export default App;
