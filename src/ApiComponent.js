import React , {useEffect, useState} from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./ApiComponent.css"
const ApiComponent = () => {
    const [getPhotos, setGetPhotos] = useState([{}])
    const [limit, setLimit] = useState(0)
    const [page, setPage] = useState(1);
    const [running, setRunning] = useState(true);
    const [count, setCount] = useState(1)
    // const [activePages , setActivePages] = useState(15)
    let data = [];
    const URL = `http://jsonplaceholder.typicode.com/photos?_start=${limit}&_limit=5`;
    const fetchDetails = async () =>{
       
    // debugger;
        await axios.get(URL).then((res)=>{
          data = res.data;
          console.log(data);
          setGetPhotos(data)
       })
   }
//   const handlePageChange = (e)=>{
//     console.log(e)
//     }

const handlePrev =() =>{
    setRunning(true)
    if(page >=1){
       setLimit(limit - 5)  
       setCount(count-1) 
    }
   }
   const handleNext = () => {
       setRunning(true)
       console.log('handle next')
       setLimit(limit + 5 )
       setCount(count + 1)
    //    console.log(limit.start)
   }
   const handleDelete = (e,id) => {
    
    setRunning(false);
//    console.log(id)
    // setGetPhotos(getPhotos.splice(id,1))
  const updatedData =  getPhotos.filter((ele)=>{
        if(ele.id!==id){
            return ele;
        }
    })
    setGetPhotos(updatedData)

    

   }

    useEffect(()=>{
        if(!running){
          return;  
        }
        else{
            fetchDetails();  
        }
        
    
    },[handleNext,handlePrev])
  
   
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Album-id</th>
                         <th>id</th>
                        <th>Title</th>
                         <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                {getPhotos.map((e)=>(
                    <tr>
                        <td>{e.albumId}</td>
                        <td>{e.id}</td>
                        <td>{e.title}</td>
                        <td><button className="button" onClick={()=> handleDelete(e,e.id)}>delete</button></td>
                    </tr>
                
                ))}
                </tbody>
                
            </table>
            
            {/* <Pagination
            activePage={activePages}
            itemsCountPerPage={5}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            /> */}

            <div className="prev">
                <button className="preve"  onClick={handlePrev}>prev</button> <span>{count}</span> <button className="preve" onClick={handleNext}>next</button>
            </div>
            
        </div>
    )
}

export default ApiComponent;