import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

function getCurrentUser() {
    const dispatch=useDispatch()
    const {storyData}=useSelector(state=>state.story)
useEffect(()=>{
const fetchUser=async()=>{
    try {
        const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        console.log("CURRENT USER:", result.data);
        dispatch(setUserData(result.data))
        dispatch(setCurrentUserStory(result.data.story))

        
    } catch (error) {
            console.log("CURRENT USER ERROR:", error)
        
    }
}
fetchUser()
},[])
}

export default getCurrentUser
