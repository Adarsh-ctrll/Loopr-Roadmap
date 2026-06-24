import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import StoryCard from '../components/StoryCard'
import { setStoryData } from '../redux/storySlice'

function Story() {
  const {userName}=useParams()
  const {storyData}=useSelector(state=>state.story)

  const dispatch=useDispatch()
 
  console.log("USERNAME PARAM", userName)
  const handleStory=async()=>{

    try {

      const result=await axios.get(`${serverUrl}/api/story/getByUserName/${userName}`,{withCredentials:true})
      console.log("STORY DATA:", result.data)
      dispatch(setStoryData(result.data))

      
    } catch (error) {
      console.log(error)
      
    }
  }
useEffect(()=>{
  dispatch(setStoryData(null))

  if(userName){
    handleStory()
  }
},[userName])

if(!storyData){
  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <div className="w-[60px] h-[60px] border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center ">
      <StoryCard storyData={storyData}/>
    </div>
  )
}

export default Story