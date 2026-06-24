import React from 'react'
import logo from "../assets/LogoLOOPR.png"
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from './StoryDp';
import Nav from './Nav';
import { MdOutlineMessage } from "react-icons/md";
import { useSelector } from 'react-redux';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
function Feed() {
  const {postData}=useSelector(state=>state.post)
  const navigate=useNavigate()
    const {userData,notificationData}=useSelector(state=>state.user)
      const {storyList,currentUserStory}=useSelector(state=>state.story)
  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto " >
        <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">

            <img src={logo} alt="logo" className="w-[110px]  ml-[-30px]"/>
            <div className="flex items-center gap-[10px]">
            <div className="relative" onClick={()=>navigate("/notifications")}> 
                <FaRegHeart  className="text-[white] w-[25px] h-[25px] cursor-pointer"/>
{notificationData && notificationData.some((noti)=>noti.isRead===false) &&             (<div className="w-[10px] h-[10px] bg-purple-500 rounded-full absolute top-0 right-[-5px]">

                </div>)}

            </div>
                <MdOutlineMessage className="text-[white] w-[25px] h-[25px] cursor-pointer" onClick={()=>navigate("/messages")} />
            </div>
        </div>
        <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
          <StoryDp userName={"Your Story"} ProfileImage={userData?.profileImage} story={currentUserStory}/>

{storyList
  ?.filter(story => story.author._id !== userData?._id)
  .map((story,index)=>(
    <StoryDp
      userName={story.author.userName}
      ProfileImage={story.author.profileImage}
      story={story}
      key={index}
    />
))}

        </div>


        <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]' >
          <Nav/>

{postData && postData.map((post, index)=>(
<Post post={post} key={index}/>
))}
</div>
    </div>
  )
}

export default Feed