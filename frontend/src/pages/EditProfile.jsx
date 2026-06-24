import React, { useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import dp from "../assets/dp.jpg"
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
function EditProfile() {
const {userData}=useSelector(state=>state.user)
const navigate=useNavigate()
const imageInput=useRef()
const [frontendImage,setFrontendImage]=useState(userData.profileImage ||
dp)
const [backendImage, setBackendImage]=useState(null)

const [name, setName] = useState(userData.name || "")
const [userName, setUserName] = useState(userData.userName || "")
const [bio, setBio] = useState(userData.bio || "")
const [profession, setProfession] = useState(userData.profession || "")
const [gender, setGender] = useState(userData.gender || "")
const dispatch=useDispatch()
const [loading,setLoading]=useState(false)
const handleImage=(e)=> {
const file=e.target.files[0]
setBackendImage(file) 
setFrontendImage(URL.createObjectURL(file))
}

const handleEditProfile=async ()=> {
    setLoading(true)
try {
const formdata=new FormData()
formdata.append("name", name)
formdata.append("userName",userName)
formdata.append("bio",bio)
formdata.append("profession",profession)
formdata.append("gender",gender)
if(backendImage){
    formdata.append("profileImage",backendImage)
}

const result=await axios.post(`${serverUrl}/api/user/editProfile`,formdata,{withCredentials:true})
dispatch(setProfileData(result.data))
dispatch(setUserData(result.data))
setLoading(false)
navigate(`/profile/${userName}`)

} catch (error) {
    console.log(error)
    setLoading(false)
}
}
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]">
    <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]"><MdOutlineKeyboardBackspace className='w-[25px] h-[25px] text-white cursor-pointer' onClick={()=>navigate(`/profile/${userData.userName}`)} />
    <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
    </div>
            <div className='w-[80px] h-[80px]
            md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>{
                imageInput.current.click()
            }}  >
                <input type="file" accept='image/*' ref={imageInput}
                  onChange={handleImage}
                hidden/>
                <img src={frontendImage} alt="" className="w-full object-cover" />
            </div>
        <div className="text-blue-500 text-center text-[18px] cursor-pointer font-semibold" onClick={()=>{
                imageInput.current.click()
            }}>Change your Profile picture</div>

<input type="text"  className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none' placeholder="Enter your name"  value={name}
 onChange={(e)=>setName(e.target.value)}/>
<input type="text"  className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none' placeholder="Enter your Username"  value={userName}
 onChange={(e)=>setUserName(e.target.value)}/><input type="text"  className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none' placeholder="Enter your bio"  value={bio}
 onChange={(e)=>setBio(e.target.value)}/><input type="text"  className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none' placeholder="Enter your profession"  value={profession}
 onChange={(e)=>setProfession(e.target.value)}/><input type="text"  className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
border-2 border-gray-700 rounded-2xl text-white font-semibold px-[20px] outline-none' placeholder="Enter your gender"  value={gender}
 onChange={(e)=>setGender(e.target.value)}/>

<button
  className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px]
  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400
  text-white font-semibold cursor-pointer rounded-2xl"
  onClick={handleEditProfile}
>
  {loading ? (
    <ClipLoader size={30} color="white" />
  ) : (
    "Save Profile"
  )}
</button>
    </div>
  )
}

export default EditProfile