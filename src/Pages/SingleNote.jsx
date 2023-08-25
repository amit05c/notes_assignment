import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
const SingleNote = () => {
    const params = useParams();
    const [data,setData]= useState({})
    useEffect(()=>{
        axios.get('http://localhost:3001/data') // Replace with your server URL
      .then(response => {
        // setData(response.data);
        console.log(response.data)
        let result = response.data.filter((el,index)=>index==params.id)
        // console.log("amit is ",result[0])
        setData(result[0])
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[])

    const isImage = (data)=>{
      //  console.log("amit is here",data)
     let result =  data?.filter(elem =>{
        if(elem.mimetype == "image/png"){
            return elem
        }
       }) 

       console.log(result)
       if(result?.length >0 ){
        return result[0]
       }
    }
  return (
    <div style={{border:'1px solid red',width: '80%', margin:'auto'}}>
        {/* {console.log(data)} */}
    <h1>{data.title}</h1>
    {/* <img src='logo192.png' alt='hhjkhhkhhh'/> */}

    <p style={{ whiteSpace: 'normal',wordWrap: "break-word", padding: "10px" }}>{data.description}</p>

    {
        data?.files?.map(el => el.mimetype === "audio/mpeg" && (
          <div key={el.originalname} style={{ width: '40%', margin: 'auto' }}>
            {console.log(el.url)}
            <audio controls width="100%" height="auto">
              <source src={window.location.origin + '/' + el.url} type={el.mimetype} />
              Your browser does not support the video tag.
            </audio>
          </div>
        ))
      }

    {
      data?.files?.map(el=>el.mimetype == "image/png" && <div style={{width:'50%',margin:'auto',marginTop:"1rem"}}>
        {console.log(el.url)}
             <img src={window.location.origin + '/'+ el.url} alt={el.originalname} style={{width:'100%'}} />
      </div>)
    }


      {
        data?.files?.map(el => el.mimetype === "video/mp4" && (
          <div key={el.originalname} style={{ width: '40%', margin: 'auto' }}>
            {console.log(el.url)}
            <video controls width="100%" height="auto">
              <source src={window.location.origin + '/' + el.url} type={el.mimetype} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      }
      
    
    <div>

    </div>
        
    </div>
  )
}

export default SingleNote