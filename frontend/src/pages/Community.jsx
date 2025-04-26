import React, { useEffect } from 'react'
import { getAllCommunities } from '../services/operations/Community'
import { useDispatch, useSelector } from 'react-redux';
function Community() {
    const dispatch = useDispatch();
    const {communities,loading}= useSelector((state) => state.community);
    const {token}= useSelector((state) => state.auth);
    useEffect(()=>{
        dispatch(getAllCommunities(token));
    },[]);


    if (loading) return <p>Loading...</p>;
    if (!communities || communities.length=== 0) return <p>No data found</p>;
  
  return (
    <>
    <div>
        <div>
            <h1>{communities[0].title}</h1>
        </div>
        <div></div>
    </div>
    
    </>
  )
}

export default Community