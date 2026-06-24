import uploadOnCloudinary from "../config/cloudinary.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"
import { getSocketId,io } from "../socket.js"

export const getCurrentUser=async (req,res)=>{
    try {
        const userId=req.userId
        const user=await User.findById(userId).populate("posts loops posts.author posts.comments story following")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`get current user error ${error}`})
    }
}

// export const suggestedUsers=async (req,res)=>{
//     try {
// const users = await User.find({
//   _id: { $ne: req.userId }
// }).select("-password")
//         return res.status(200).json(users)
//     } catch (error) {
//                 return res.status(500).json({message:`get Suggested user error ${error}`})
        
//     }
// }

export const suggestedUsers=async (req,res)=>{
    try {

        const currentUser = await User.findById(req.userId)

        const users = await User.find({
            _id:{
                $nin:[
                    ...currentUser.following,
                    req.userId
                ]
            }
        }).select("-password")

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            message:`get Suggested user error ${error}`
        })
    }
}

export const editProfile=async(req,res)=>{
    try {
        console.log("BODY:", req.body)
        console.log("FILE:", req.file)
        const {userName,name,bio,profession,gender}=req.body
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const sameUserWithUserName=await User.findOne({userName}).select("-password")
        if (sameUserWithUserName && sameUserWithUserName._id.toString()!=req.userId){
            return res.status(400).json({message:"userName already exist"})
        }
let profileImage = user.profileImage;

if(req.file){
    profileImage = await uploadOnCloudinary(req.file.path);
}

user.name = name || user.name;
user.userName = userName || user.userName;
user.profileImage = profileImage;
user.bio = bio || user.bio;
user.profession = profession || user.profession;
user.gender = gender || user.gender;

        await user.save()
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`edit Profile Error ${error}`})
        
    }
}

export const getProfile=async (req,res)=>{
    try {
        const userName=req.params.userName
        const user=await User.findOne({userName}).select("-password").populate("posts loops followers following")
        if(!user){
        return res.status(400).json({message:"User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`Get profile error ${error}`})
        
    }
}

export const follow=async(req,res)=>{
    try {
        const currentUserId=req.userId
        const targetUserId=req.params.targetUserId

        if(!targetUserId){
            return res.status(400).json({message:"target user is not found"})
        }
if(currentUserId === targetUserId){
     return res.status(400).json({
        message:"you cannot follow yourself"
     })
}
        const currentUser=await User.findById(currentUserId)
        const targetUser=await User.findById(targetUserId)
        const isFollowing=currentUser.following.includes(targetUserId)

        if(isFollowing){
            currentUser.following=            currentUser.following.filter(id=>id.toString()!=targetUserId)

            targetUser.followers=targetUser.followers.filter(id=>id.toString()!=currentUserId)
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following:false,
                message:"unfollow successfully"
            })
        }else{
            currentUser.following.push(targetUserId)
            targetUser.followers.push(currentUserId)

            if(currentUser._id.toString() !== targetUser._id.toString()){
                const notification =await Notification.create({
                    sender:currentUser._id,
                    receiver:targetUser._id,
                    type:"follow",
                    
                    message:"Started Following You"
                })
                const populatedNotification=await Notification.findById(notification._id).populate("sender receiver")
                const receiverSocketId = getSocketId(
            targetUser._id.toString()
                )
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("newNotification",populatedNotification)
                }

            }

            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following:true,
                message:"followed successfully"
            })
        }
    } catch (error) {
    console.log("FOLLOW ERROR:", error)

    return res.status(500).json({
        message:`Follow error ${error}`
    })
}}

export const followingList=async(req,res)=>{
    try {
        const result=await User.findById(req.userId)
        return res.status(200).json(result?.following)

    } catch (error) {
                return res.status(500).json({message:`Following error ${error}`})
    }
}

export const search=async(req,res)=>{
try {
    const keyWord=req.query.keyword
if(!keyWord){
    return res.status(400).json({message:"keyword is required"})
}
const users=await User.find({
$or:[
    {userName:{$regex:keyWord,$options:"i"}},
    {name:{$regex:keyWord,$options:"i"}}
]
}).select("-password")
return res.status(200).json(users)

} catch (error) {
                    return res.status(500).json({message:`search error ${error}`})
}
}

export const getAllNotifications=async (req,res)=>{
    try {
        const notification=await Notification.find({
            receiver:req.userId
        }).populate("sender receiver post loop").sort({createdAt:-1})
        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({message:`get notification error ${error}`})
        
    }
}

export const markAsRead = async (req,res)=>{
    try {
        const { notificationId } = req.body;

        if (Array.isArray(notificationId)) {
            await Notification.updateMany(
                { _id: { $in: notificationId }, receiver: req.userId },
                { $set: { isRead: true } }
            );
        } else {
            await Notification.findOneAndUpdate(
                { _id: notificationId, receiver: req.userId },
                { $set: { isRead: true } }
            );
        }

        return res.status(200).json({ message: "marked as read" });
    } catch (error) {
        return res.status(500).json({
            message: `Read notification error ${error}`
        });
    }
};