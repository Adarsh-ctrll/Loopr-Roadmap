import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.jpg"
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import VideoPlayer from './VideoPlayer';
function StoryCard({storyData}) {
    

    const navigate=useNavigate()
    const [progresss,setProgress]=useState(0)    
    const {userData}=useSelector(state=>state.user)
    const [showViewers,setShowViewers]=useState(false)
    useEffect(()=>{
        const interval=setInterval(()=>{
            setProgress(prev=>{
                if(prev>=100){
                    clearInterval(interval)
                    navigate("/")
                    return 100
                }


                return prev+1})
        },150)
        return ()=>clearInterval(interval)
    },[navigate])
  return (
    <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
     
        <div className="flex items-center gap-[10px] absolute top-[20px] px-[10px]">

<MdOutlineKeyboardBackspace className='w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>navigate(`/`)} />
                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden'  >
                    <img src={storyData?.author?.profileImage ||  dp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-[150px] font-semibold truncate text-white">
                    {storyData?.author?.userName}
                </div>

        </div>
        <div className="absolute top-[10px] left-0 w-full h-[5px] bg-black/40 overflow-hidden">
  <div
    className="
      h-full
      bg-gradient-to-r
      from-purple-600
      via-pink-500
      to-orange-400
      shadow-[0_0_10px_rgba(236,72,153,0.8)]
      transition-all
      duration-75
      ease-linear
    "
    style={{ width: `${progresss}%` }}
  />
  </div>
         {!showViewers && <>  <div className="w-full h-[90vh] flex items-center justify-center ">

    {storyData?.mediaType === "image" && (
      <div className="w-[90%]  flex items-center justify-center ">

        <img
          src={storyData?.media}
          alt=""
          className="w-[80%] rounded-2xl object-cover"
        />

      </div>
    )}

        {storyData?.mediaType === "video" && (
      <div className="w-[80%]  flex flex-col items-center justify-center">


      <VideoPlayer media={storyData.media}/>


      </div>
    )}

  </div>


  {storyData?.author?._id === userData?._id  && <div className="absolute w-full h-[70px] bottom-0 p-2 text-white gap-[10px] flex items-center cursor-pointer left-0 "onClick={()=>{
    setShowViewers(true)
  }}>
    <div className="text-white flex items-center gap-[5px]"><FaEye />
      {storyData?.viewers?.length}
    </div>

<div className="relative h-[40px] w-[90px]">
  {storyData?.viewers?.slice(0,3).map((viewer,index)=>(
    <div
      key={viewer._id}
      className="absolute w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-black"
      style={{
        left: `${index * 20}px`,
        zIndex: 3 - index
      }}
    >
      <img
        src={viewer.profileImage || dp}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>
    
  



  </div> }</>}

{showViewers && <>

   <div className="w-full h-[30%] flex items-center justify-center mt-[100px] overflow-hidden py-[30px] cursor-pointer
   "onClick={()=>{
    setShowViewers(false)
  }}>

    {storyData?.mediaType === "image" && (
      <div className="h-full  flex items-center justify-center ">

        <img
          src={storyData?.media}
          alt=""
          className="h-full rounded-2xl object-cover"
        />

      </div>
    )}

        {storyData?.mediaType === "video" && (
      <div className="h-full  flex flex-col items-center justify-center">


      <VideoPlayer media={storyData?.media}/>


      </div>
    )}

  </div>

  <div className="w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]">
    <div className="text-white flex items-center gap-[10px]">
      <FaEye /><span>{storyData?.viewers?.length}</span><span>Viewers</span>

    </div>
      <div className="w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]">
    {storyData?.viewers?.map((viewer,index)=>(
<div className="w-full flex items-center gap-[20px]" >
    <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden'  >
                    <img src={viewer?.profileImage ||  dp} alt="" className="w-full object-cover" />
                </div>
                <div className="w-[150px] font-semibold truncate text-white">
                    {viewer.userName}
                </div>
  </div>
    ))}

  </div>

  </div>
  
  </>}


  

    </div>
    
  )
}

export default StoryCard