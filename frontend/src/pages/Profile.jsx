import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import dp from "../assets/dp.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { setProfileData, setUserData } from '../redux/userSlice'
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post'
import { setSelectedUser } from '../redux/messageSlice'
import ProgressCard from '../components/ProgressCard'
import getMyRoadmaps from '../hooks/getMyRoadmaps'

function Profile() {
    const {userName}=useParams()
    const dispatch=useDispatch()

    const navigate=useNavigate()
    const {profileData,userData}=useSelector(state=>state.user)
    const {postData}=useSelector(state=>state.post)

    const [postType,setPostType]=useState("posts")
    const [showFollowers,setShowFollowers]=useState(false)
const [showFollowing,setShowFollowing]=useState(false)
    const myRoadmaps = getMyRoadmaps()
    const handleProfile=async()=>{
        try {

            const result=await axios.get(`${serverUrl}/api/user/getProfile/${userName}`,{withCredentials:true})
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error)
            
        }
    }

    const handleLogout=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
        handleProfile()
    },[userName,dispatch])
    
  return (
    <div className='w-full min-h-screen bg-black '>
        <div className='text-white w-full h-[80px] flex justify-between items-center px-[30px]
     '>
            <div onClick={()=>navigate("/")}><MdOutlineKeyboardBackspace className='w-[25px] h-[25px] text-white cursor-pointer' /></div>
            <div className="font-semibold text-[20px]">{profileData?.userName}</div>
            <div className="font-semibold cursor-pointer text-[20px] text-blue-500" onClick={handleLogout}  >Log Out</div>
        </div>
        <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center ">

           
            <div className='w-[80px] h-[80px]
            md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden'  >
                <img src={profileData?.profileImage ||  dp} alt="" className="w-full object-cover" />
            </div>
            <div>
                <div className="font-semibold text-[22px] text-white">{profileData?.name}</div>
                <div className="text-[17px] text-[#ffffffe8]">{profileData?.profession || "New user"}</div>
                <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>


            </div>
        </div>
        <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
            <div >
                <div className="text-white text-[22px] md:text-[30px] font-semibold">
                    {profileData?.posts.length}
                </div >
                <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Posts</div>
            </div>
<div
  className="cursor-pointer"
  onClick={()=>setShowFollowers(true)}
>
    <div className="flex items-center justify-center gap-[20px]">
    <div className="relative h-[40px] w-[90px]">
  {profileData?.followers?.slice(0,3).map((user,index)=>(
    <div
      key={user._id}
      className="absolute w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-black"
      style={{
        left: `${index * 20}px`,
        zIndex: 3 - index
      }}
    >
      <img
        src={user.profileImage || dp}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>
        <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.followers.length}

        </div>
    </div>
    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Followers</div>
</div>
<div
  className="cursor-pointer"
  onClick={()=>setShowFollowing(true)}
>
    <div className="flex items-center justify-center gap-[20px]">
<div className="relative h-[40px] w-[90px]">
  {profileData?.following?.slice(0,3).map((user,index)=>(
    <div
      key={user._id}
      className="absolute w-[40px] h-[40px] border-2 border-black rounded-full overflow-hidden"
      style={{
        left: `${index * 20}px`,
        zIndex: 3 - index
      }}
    >
      <img
        src={user.profileImage || dp}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>
                <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.following.length}

        </div>
        </div>
    <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">Following</div>
</div>
        </div>
        <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
            {profileData?._id==userData._id && <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl" onClick={()=>navigate("/editprofile")} >Edit Profile</button> }

            {profileData?._id!=userData?._id && <>
<FollowButton tailwind={`px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl outline-none border-none`} targetUserId={profileData?._id} onFollowChange={handleProfile}/>
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl" onClick={() => {
  dispatch(setSelectedUser(profileData))
  navigate("/messageArea")
}}>Message</button>
            
            </> } 


        </div>
        <div className="w-full min-h-[100vh] flex justify-center" >
            <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]">




    {profileData?._id==userData?._id &&       <div className="w-[90%] max-w-[500px] h-[80px] bg-[white] rounded-full flex justify-center items-center gap-[10px]">

        <div className={`${postType=="posts"?"bg-black shadow-2xl shadow-black text-white":""} w-[28%] h-[80%] flex justify-center items-center text-[19px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setPostType("posts")}>
            Posts
        </div>
        <div className={`${postType=="saved"?"bg-black shadow-2xl shadow-black text-white":""} w-[28%] h-[80%] flex justify-center items-center text-[19px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setPostType("saved")}>Saved</div>
        <div className={`${postType=="roadmaps"?"bg-black shadow-2xl shadow-black text-white":""} w-[28%] h-[80%] flex justify-center items-center text-[19px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setPostType("roadmaps")}>Roadmaps</div>

      </div> }



                <Nav/>

    {profileData?._id==userData?._id && <>             {postType=="posts" && postData.map((post,index)=>(
    (post.author?._id==profileData?._id ) && <Post key={post._id} post={post}/>
))}

{    postType=="saved" &&postData.map((post,index)=>(
    userData.saved.includes(post._id) && <Post key={post._id} post={post}/>
))}
{    postType=="roadmaps" && (
    myRoadmaps.length === 0 ? (
        <div className="text-center text-black text-xl py-20">
            <p>You haven't started any roadmaps yet</p>
            <button 
                onClick={() => navigate("/roadmaps")}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
                Browse Roadmaps
            </button>
        </div>
    ) : (
        <div className="w-full px-4">
            {myRoadmaps.map(userRoadmap => (
                <ProgressCard key={userRoadmap._id} userRoadmap={userRoadmap} />
            ))}
        </div>
    )
)}
</>    
}

    {profileData?._id!=userData?._id && postData.map((post,index)=>(
    (post.author?._id==profileData?._id ) && <Post key={post._id} post={post}/>
))

   
}


                


            </div>

        </div>
{showFollowers && (
<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[999]">

  <div className="w-[90%] max-w-[500px] bg-[#111] rounded-xl p-[20px] max-h-[500px] overflow-auto">

    <div className="flex justify-between mb-[20px]">
      <h1 className="text-white text-[22px] font-semibold">
        Followers
      </h1>

      <button
        className="text-white text-[20px]"
        onClick={()=>setShowFollowers(false)}
      >
        ✕
      </button>
    </div>

    {profileData?.followers?.map((user)=>(
      <div
        key={user._id}
        className="flex items-center justify-between py-[10px]"
      >

        <div
          className="flex items-center gap-[10px] cursor-pointer"
          onClick={()=>navigate(`/profile/${user.userName}`)}
        >
          <img
            src={user.profileImage || dp}
            className="w-[45px] h-[45px] rounded-full object-cover"
          />

          <div className="text-white">
            {user.userName}
          </div>
        </div>

      </div>
    ))}

  </div>

</div>
)}

{showFollowing && (
<div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[999]">

  <div className="w-[90%] max-w-[500px] bg-[#111] rounded-xl p-[20px] max-h-[500px] overflow-auto">

    <div className="flex justify-between mb-[20px]">
      <h1 className="text-white text-[22px] font-semibold">
        Following
      </h1>

      <button
        className="text-white text-[20px]"
        onClick={()=>setShowFollowing(false)}
      >
        ✕
      </button>
    </div>

    {profileData?.following?.map((user)=>(
      <div
        key={user._id}
        className="flex items-center justify-between py-[10px]"
      >

        <div
          className="flex items-center gap-[10px] cursor-pointer"
          onClick={()=>navigate(`/profile/${user.userName}`)}
        >
          <img
            src={user.profileImage || dp}
            className="w-[45px] h-[45px] rounded-full object-cover"
          />

          <div className="text-white">
            {user.userName}
          </div>
        </div>

      </div>
    ))}

  </div>

</div>
)}

    </div>
  )
}

export default Profile