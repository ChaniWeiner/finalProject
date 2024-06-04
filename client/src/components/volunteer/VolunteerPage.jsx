import React from "react";
import RequestDetails from "./RequestDetails"
import SearchRequest from "./SearchRequest";
import { useState, useEffect, useContext } from "react";
const VolunteerPage=()=>{
    const url=`http://localhost:8080/posts`;
    const [requests,setRequests]=useState();
    const [isAdd,setIsAdd]=useState(false)
  let [allRequests, setAllRequests] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const [loading, setLoading] = useState(true)
    const getRequests = () => {
        fetch(url)
          .then(async response => {
            const data = await response.json();
            response.ok ? (setRequests(data), setAllRequests(data)) : alert("oops somthing went wrong...")
          })
      }
    
      useEffect(() => {
        getRequests()
        setTimeout(() => {
          setLoading(false);
        }, 1000)});

    return(<>
     <h1>requests</h1>
      <div className="requests_container">
        <SearchRequest setRequests={setRequests} allRequests={allRequests} requests={requests} />
        {loading ? <div className={Style.loader}>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
        </div> : < >
          
          {posts.map((requests, index) =>
            <div className="request_item"  key={index}>
              <span>name: {post.id}</span>
              {/* {(isUpdate != index) ? <>
                <span>TITLE: {post.title}</span>
                <span>BODY: {post.body}</span>
              </> : null} */}
             <>
              
             <UpdatePost post={post} getPosts={getPosts} setIsUpdate={setIsUpdate} />
              </>
             
            
            </div>
          )}</>}


      </div>
{/*     
    <RequestDetails/> */}
    </>)

}
export default VolunteerPage;