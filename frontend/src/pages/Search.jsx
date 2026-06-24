import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import { useEffect } from 'react';
import dp from "../assets/dp.jpg"
import { useSelector } from 'react-redux'


function Search() {
    const navigate=useNavigate()
    const [input,setInput]=useState("")
            const dispatch=useDispatch()
    const {searchData}=useSelector(state=>state.user)

    const handleSearch=async()=>{
        // e.preventDefault()
        try {
            const result=await axios.get(`${serverUrl}/api/user/search?keyword=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
console.log("RESULT", result.data)
        } catch (error) {
            console.log(error)
            
        }
    }
useEffect(() => {
  if(input.trim()){
    handleSearch()
  }else{
    dispatch(setSearchData([]))
  }
}, [input])
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] pt-[10px]">
<div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] top-0"><MdOutlineKeyboardBackspace className='w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>navigate(`/`)} />

    </div>
    <div className="w-full h-[80px] flex items-center justify-center ">
    <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-[20px]">
<FaSearch className="w-[18px] h-[18px] text-white " />
<input type="text" placeholder="search..." className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]" onChange={(e)=>setInput(e.target.value)} value={input}/>
    </form>

   
    </div>
     <div className="w-full flex flex-col items-center gap-[10px] mt-[20px]">
  {searchData?.map((user)=>(
    <div
      key={user._id}
className="w-[90vw] max-w-[700px] h-[80px] rounded-full bg-[#0f1414] border border-gray-800 flex items-center gap-[20px] px-[20px] hover:border-purple-500 transition-all duration-300"
onClick={()=>navigate(`/profile/${user.userName}`)}
    >
      <div
        className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        
      >
        <img
          src={user.profileImage || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-white text-[18px] font-semibold">
        <div>{user.userName}</div>
        <div className="text-[14px] text-gray-400">
          {user.name}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default Search
