import { useState,useEffect } from "react";
import styles from "../css/Showalubum.module.css"
import { db } from "../firebaseinit";

import { addDoc,collection,query,onSnapshot,deleteDoc,doc } from "firebase/firestore";

function ShowAlubum(props){

    const [show,setShow]=useState(false);
    const [text,setText]=useState("");
    const [image,setImage]=useState("");
    const [images,setimages]=useState([]);

   async  function handleSubmit(event){
        event.preventDefault();
        setimages([{text:text,image:image},...images]);
        const albumId = props.selectedAlubum;
        await addDoc(collection(db, "store", albumId, "images"), {
            text: text,
            image: image,
          });
        setText("");
        setImage("");
    }

    useEffect(() => {
        // Fetch images related to the selected album
        const fetchImages = async () => {
          const albumId = props.selectedAlubum;
    
          const q = query(
            collection(db, "store", albumId, "images") // Assuming "albums" is your main collection and "images" is the subcollection
          );
          const unsub = onSnapshot(q, (snapshot) => {
            const imagesData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setimages(imagesData);
          });
          
        };
    
        if (props.selectedAlubum) {
          fetchImages();
        }
      }, [props.selectedAlubum]);

    function handletoggle(){
        setShow(!show);
         
    }

    function clear(){
        setText("");
        setImage("");
    }
    async function handleRemove(index){
        // images.splice(index,1);
        // setimages([...images]);
        const albumId = props.selectedAlubum;
          const imageIdToDelete = images[index].id; // Get the ID of the image document
          await deleteDoc(doc(db, "store", albumId, "images", imageIdToDelete));
         
    }

    return(
        <>
        <div className={styles.container}> 
            <img className={styles.image} src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png" onClick={props.handleAlubum}/>
            {images.length===0?<span>No Images Found</span>:
            <span>{props.selectedAlubum} Alubum</span>}
            <span className={styles.button} onClick={handletoggle}>{show?"Cancel":"Add Image"}</span> 
        </div>
        <div className={styles.formcontainer}>
           {show?<form onSubmit={handleSubmit}>
                <input value={text} type="text" onChange={(e)=>setText(e.target.value)} placeholder="Enter Image Name..."/>
                <input value={image} type="text" onChange={(e)=>setImage(e.target.value)} placeholder="Enter Image URL..." required/>
                <div > 
                    <button className={styles.button}>Add</button>
                    <button className={styles.change} onClick={clear}>clear</button>
                </div>
            </form>:null} 
        </div>
        <div className={styles.alubumcontainer}>
             
            {images.map((item,index)=>(
                        <div className={styles.card} key={index}>
                            <div className={styles.deletebtn}>
                            <img className={styles.delimage} src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" onClick={()=>handleRemove(index)}/>
                            </div>
                            <img className={styles.imagebox} src={item.image}/>
                            <span className={styles.spantext}>{item.text}</span>
                        </div>
                    ))}
        </div>
         
        </>
    )
}
export default ShowAlubum;