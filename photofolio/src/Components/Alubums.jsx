import { useEffect, useState } from "react";
import { addDoc,collection,onSnapshot } from "firebase/firestore";
import { db } from "../firebaseinit";
import styles from "../css/Alubum.module.css"

function Alubum(props){
  const [show,setShow]=useState(true);
  const [text,setText]=useState("");
  const [store,setStore]=useState([]);
//get the data from the firebase at every update componentdid mount and componentdid update
  useEffect(()=>{
    const unsub=onSnapshot(collection(db,"store"),(snapshot)=>{
        const store=snapshot.docs.map((doc)=>{
            return{
                id:doc.id,
                ...doc.data()
            }
        })
        setStore(store);
        

    })

  },[])

   async function handleSubmit(event){
        event.preventDefault();
        setStore([...store,{text:text}])
        //for ading the store in the firebase
        await addDoc(collection(db, "store"), {
                text:text,
                createdOn: new Date()
              });
        setText("");
        console.log(store)
    }

    
    function clear(){
        setText("");
    }

   
  function toggle(){
    setShow(!show);
  }
    return(
        <>
        {show?<div className={styles.formcontainer}>
            <form onSubmit={handleSubmit}>
                <input value={text} type="text" onChange={(e)=>setText(e.target.value)} placeholder="Enter Alubum Name" required/>
                
                <div>
                    <button className={styles.button}>Create</button>
                    <button className={styles.change} onClick={clear}>clear</button>
                </div>
            </form>
        </div>:null}

    <div className={styles.container}> 
        <span>Your Alubums</span>
        <span className={styles.button} onClick={toggle}>{show?"Cancel":"Add alubum"}</span> 
    </div>
          
        <div className={styles.alubumcontainer} onClick={toggle}>
             {store.map((item,index)=>(
                      <div className={styles.card} key={index} onClick={()=>props.handleAlubum(item.text)}>
                      <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png"/>
                      <span className={styles.spantext}>{item.text}</span>
                      </div>
                 ))}
         </div>
        </>
    )
}
export default Alubum;
