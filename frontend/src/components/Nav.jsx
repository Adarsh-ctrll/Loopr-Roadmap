import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { RiMapPinUserLine } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa6";
import dp from "../assets/dp.jpg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Nav() {
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex
justify-around items-center fixed bottom-[20px] rounded-full
shadow-2xl shadow-[#000000] z-[100]'>
<div className="text-white text-[25px] cursor-pointer" onClick={()=>navigate("/")}>
  <AiFillHome />
</div>

<div onClick={()=>navigate("/search")}>
  <FaSearch className="text-white text-[25px] cursor-pointer" />
</div>

<div className="text-white text-[25px] cursor-pointer" onClick={()=>navigate("/upload")}>
  <FaRegSquarePlus />
</div>

<div className="text-white text-[25px] cursor-pointer" onClick={()=>navigate("/loops")}>
  <RxVideo />
</div>

<div className="text-white text-[25px] cursor-pointer" onClick={()=>navigate("/roadmaps")}>
  <RiMapPinUserLine />
</div>

<div className="text-white text-[25px] cursor-pointer" onClick={()=>navigate("/anonymous")}>
  <FaUserSecret />
</div>
            <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.userName}`)} >
                <img src={userData.profileImage ||dp} alt="" className="w-full object-cover" />
            </div>
</div>
  )
}

export default Nav