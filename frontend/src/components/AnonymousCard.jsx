import React, { useState } from 'react';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { FaFlag } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnonymousPost } from '../redux/anonymousSlice';
import AnonymousComment from './AnonymousComment';

function AnonymousCard({ post }) {
    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/anonymous/like/${post._id}`,
                { withCredentials: true }
            );
            dispatch(updateAnonymousPost(result.data));
        } catch (error) {
            console.log("LIKE ANONYMOUS POST ERROR:", error);
        }
    };

    const handleHide = async () => {
        try {
            await axios.post(
                `${serverUrl}/api/anonymous/hide/${post._id}`,
                {},
                { withCredentials: true }
            );
            dispatch(updateAnonymousPost({ ...post, isHidden: true }));
        } catch (error) {
            console.log("HIDE ANONYMOUS POST ERROR:", error);
        }
    };

    const handleReport = async () => {
        const reason = prompt("Reason for reporting:");
        if (!reason) return;
        
        try {
            await axios.post(
                `${serverUrl}/api/anonymous/report/${post._id}`,
                { reason },
                { withCredentials: true }
            );
            alert("Post reported successfully");
        } catch (error) {
            console.log("REPORT ANONYMOUS POST ERROR:", error);
            alert(error.response?.data?.message || "Failed to report post");
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'College': 'text-blue-400',
            'Placement': 'text-green-400',
            'Relationships': 'text-pink-400',
            'Career': 'text-purple-400',
            'Confessions': 'text-yellow-400',
            'Funny': 'text-orange-400',
            'Advice': 'text-cyan-400'
        };
        return colors[category] || 'text-gray-400';
    };

    if (post.isHidden) return null;

    return (
        <div className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 bg-gray-800 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                </span>
                <div className="flex items-center gap-3 text-gray-500">
                    <button 
                        onClick={handleHide}
                        className="hover:text-gray-300 transition-colors"
                        title="Hide post"
                    >
                        <FaEyeSlash className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleReport}
                        className="hover:text-red-500 transition-colors"
                        title="Report post"
                    >
                        <FaFlag className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-white text-base mb-4 whitespace-pre-wrap">{post.content}</p>

            <div className="flex items-center gap-6 text-gray-400 border-t border-gray-800 pt-4">
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={handleLike}
                >
                    {post.likes?.includes(userData._id) ? (
                        <GoHeartFill className="w-5 h-5 text-red-500" />
                    ) : (
                        <GoHeart className="w-5 h-5" />
                    )}
                    <span>{post.likes?.length || 0}</span>
                </div>
                <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-purple-500 transition-colors"
                    onClick={() => setShowComments(!showComments)}
                >
                    <MdOutlineComment className="w-5 h-5" />
                    <span>{post.comments?.length || 0}</span>
                </div>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <AnonymousComment postId={post._id} comments={post.comments} />
                </div>
            )}
        </div>
    );
}

export default AnonymousCard;
