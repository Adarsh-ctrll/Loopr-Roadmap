import React, { useEffect, useState } from 'react';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { updateMilestone } from '../redux/roadmapSlice';
import dp from '../assets/dp.jpg';

function MilestoneCard({ milestone }) {
    const { userData } = useSelector(state => state.user);
    const { socket } = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/milestone/like/${milestone._id}`,
                { withCredentials: true }
            );
            dispatch(updateMilestone(result.data));
        } catch (error) {
            console.log("LIKE MILESTONE ERROR:", error);
        }
    };

    const handleComment = async () => {
        if (!comment.trim()) return;
        try {
            const result = await axios.post(
                `${serverUrl}/api/milestone/comment/${milestone._id}`,
                { message: comment },
                { withCredentials: true }
            );
            dispatch(updateMilestone(result.data));
            setComment('');
        } catch (error) {
            console.log("COMMENT MILESTONE ERROR:", error);
        }
    };

    useEffect(() => {
        socket?.on("likedMilestone", (updatedData) => {
            if (updatedData.milestoneId === milestone._id) {
                dispatch(updateMilestone({ ...milestone, likes: updatedData.likes }));
            }
        });

        socket?.on("commentedMilestone", (updatedData) => {
            if (updatedData.milestoneId === milestone._id) {
                dispatch(updateMilestone({ ...milestone, comments: updatedData.comments }));
            }
        });

        return () => {
            socket?.off("likedMilestone");
            socket?.off("commentedMilestone");
        };
    }, [socket, milestone, dispatch]);

    return (
        <div className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-4">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                    <img 
                        src={milestone.author?.profileImage || dp} 
                        alt="" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{milestone.author?.userName}</span>
                        <span className="text-gray-500 text-sm">completed a step in</span>
                    </div>
                    <div className="text-purple-400 font-medium mb-2">{milestone.roadmap?.title}</div>
                    <p className="text-gray-300">{milestone.message}</p>
                    {milestone.stepTitle && (
                        <div className="mt-2 text-sm text-gray-400">
                            Step: {milestone.stepTitle}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6 text-gray-400 border-t border-gray-800 pt-4">
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={handleLike}
                >
                    {milestone.likes?.includes(userData._id) ? (
                        <GoHeartFill className="w-5 h-5 text-red-500" />
                    ) : (
                        <GoHeart className="w-5 h-5" />
                    )}
                    <span>{milestone.likes?.length || 0}</span>
                </div>
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-purple-500 transition-colors"
                    onClick={() => setShowComments(!showComments)}
                >
                    <MdOutlineComment className="w-5 h-5" />
                    <span>{milestone.comments?.length || 0}</span>
                </div>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                        {milestone.comments?.map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="w-8 h-8 border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                                    <img 
                                        src={comment.author?.profileImage || dp} 
                                        alt="" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-white font-semibold text-sm">
                                        {comment.author?.userName}
                                    </span>
                                    <p className="text-gray-300 text-sm">{comment.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border-2 border-black rounded-full overflow-hidden flex-shrink-0">
                            <img 
                                src={userData?.profileImage || dp} 
                                alt="" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <input 
                            type="text" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button 
                            onClick={handleComment}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MilestoneCard;
