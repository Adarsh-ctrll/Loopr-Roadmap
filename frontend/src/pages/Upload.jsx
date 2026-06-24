import React, { useState,useRef } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegSquarePlus } from "react-icons/fa6";
import { setPostData } from "../redux/postSlice";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios"
import { serverUrl } from "../App";
import { setLoopData } from "../redux/loopSlice";
import { setCurrentUserStory, setStoryData } from "../redux/storySlice";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
function Upload() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {postData}=useSelector(state=>state.post)
    const {storyData}=useSelector(state=>state.story)
      const {loopData}=useSelector(state=>state.loop)
  const mediaInput=useRef()
  const { userData } = useSelector((state) => state.user);
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia]=useState(null)
  const [caption,setCaption]=useState("")
const [backendMedia, setBackendMedia]=useState(null)
const [mediaType,setMediaType]=useState("")
const [loading,setLoading]=useState(false)
const handleMedia = (e) => {
      console.log("HANDLE MEDIA HIT");
    const file = e.target.files[0]
      // VIDEO SIZE CHECK
    const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20 MB

    if (
      file.type.includes("video") &&
      file.size > MAX_VIDEO_SIZE
    ) {
      alert("Loop video must be under 20 MB");
      return;
    }
 console.log("FILE SIZE MB:", file.size / 1024 / 1024)
    if(!file) return

    if(file.type.includes("image")){
        setMediaType("image")
    } else {
        setMediaType("video")
    }

    setBackendMedia(file)
    setFrontendMedia(URL.createObjectURL(file))
}

const uploadPost = async () => {
  try {

    const formData = new FormData()

    formData.append("caption", caption)
    formData.append("mediaType", mediaType)
    formData.append("media", backendMedia)

    const result = await axios.post(
      `${serverUrl}/api/post/upload`,
      formData,
      { withCredentials: true }
    )
dispatch(setPostData([...postData,result.data]))
setLoading(false)
    console.log(result.data)
    navigate("/")

  } catch(error){
   console.log(error)
   setLoading(false)
}
}
const uploadStory = async () => {
  try {
    const formData = new FormData()

    formData.append("mediaType", mediaType)
    formData.append("media", backendMedia)

    const result = await axios.post(
      `${serverUrl}/api/story/upload`,
      formData,
      { withCredentials: true }
    )
    dispatch(setCurrentUserStory(result.data))
setLoading(false)
    console.log(result.data)
    navigate("/")

  } catch(error){
   console.log(error)
   setLoading(false)
}
}

const uploadLoop = async () => {
  try {
    const formData = new FormData()

    formData.append("caption", caption)

    formData.append("media", backendMedia)

    const result = await axios.post(
      `${serverUrl}/api/loop/upload`,
      formData,
      { withCredentials: true }
    )
dispatch(setLoopData([...loopData,result.data]))
setLoading(false)
    console.log(result.data)
    navigate("/")

  } catch(error){
   console.log(error)
   setLoading(false)
}
}

const handleAnonymousUpload = () => {
  navigate("/anonymous");
};

const handleUpload=()=>{
  setLoading(true)
  if(uploadType==="post"){
    uploadPost()
  }else if(uploadType==="story"){
    uploadStory()
  }else if(uploadType==="loop"){
    uploadLoop()
  }else{
    handleAnonymousUpload()
  }

}




  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
          <MdOutlineKeyboardBackspace
            className="w-[25px] h-[25px] text-white cursor-pointer"
            onClick={() => navigate(`/`)}
          />

          <h1 className="text-white text-[20px] font-semibold">
            Upload Media
          </h1>
      </div>

      <div className="w-[80%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]">

        <div className={`${uploadType=="post"?"bg-black shadow-2xl shadow-black text-white":""} w-[22%] h-[80%] flex justify-center items-center text-[17px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setUploadType("post")}>
            Post
        </div>
        <div className={`${uploadType=="story"?"bg-black shadow-2xl shadow-black text-white":""} w-[22%] h-[80%] flex justify-center items-center text-[17px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setUploadType("story")}>Story</div>
        <div className={`${uploadType=="loop"?"bg-black shadow-2xl shadow-black text-white":""} w-[22%] h-[80%] flex justify-center items-center text-[17px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setUploadType("loop")}>Loop</div>
        <div className={`${uploadType=="anonymous"?"bg-black shadow-2xl shadow-black text-white":""} w-[22%] h-[80%] flex justify-center items-center text-[17px]
         font-semibold transition-all duration-300 hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}onClick={()=>setUploadType("anonymous")}>Anonymous</div>
      </div>
{!frontendMedia && uploadType !== 'anonymous' && <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
border-gray-800 border-2 flex flex-col items-center justify-center gap-
[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d] text-white'      onClick={()=>mediaInput.current.click()}>
    <input type="file" accept={uploadType=='loop'?"video/*":""} hidden ref={mediaInput}   onChange={handleMedia}/>

      <FaRegSquarePlus     className="text-white text-[25px] cursor-pointer" />
<div>Upload {uploadType}</div>
</div>}

{frontendMedia && (
  <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]">

    {mediaType === "image" && (
      <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">

        <img
          src={frontendMedia}
          alt=""
          className="h-[60%] rounded-2xl"
        />
{uploadType!=="story" &&         <input
          type="text"
          className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px] bg-transparent"
          placeholder="write caption" onChange={(e)=>setCaption(e.target.value)} value={caption}
        />}

      </div>
    )}

        {mediaType === "video" && (
      <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">


      <VideoPlayer media={frontendMedia}/>

{uploadType!=="story" &&         <input
          type="text"
          className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px] bg-transparent"
          placeholder="write caption" onChange={(e)=>setCaption(e.target.value)} value={caption}
        />}

      </div>
    )}

  </div>
)}
{frontendMedia && <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl " onClick={handleUpload}>{loading?<ClipLoader size={30} color='black'/>:`Upload ${uploadType}`}</button>}
{uploadType === 'anonymous' && <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl" onClick={handleAnonymousUpload}>Go to Anonymous</button>}

    </div>
  );
}

export default Upload;