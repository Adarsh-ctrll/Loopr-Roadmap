import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { toggleFollow,setSuggestedUsers  } from '../redux/userSlice'

function FollowButton({targetUserId,tailwind,onFollowChange}) {
    const {following,suggestedUsers}=useSelector(state=>state.user)
    const isFollowing=following.includes(targetUserId)
    const dispatch=useDispatch()
    const handleFollow=async()=>{
        console.log("TARGET USER:", targetUserId)
        try {
            const result=await axios.get(`${serverUrl}/api/user/follow/${targetUserId}`,{withCredentials:true})
            if(onFollowChange){
                onFollowChange()
            }
            dispatch(toggleFollow(targetUserId))
            dispatch(
    setSuggestedUsers(
        suggestedUsers.filter(
            user => user._id !== targetUserId
        )
    )
)

        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <button className={tailwind} onClick={handleFollow}>
{isFollowing?"Following":"Follow"}
    </button>
  )
}

export default FollowButton