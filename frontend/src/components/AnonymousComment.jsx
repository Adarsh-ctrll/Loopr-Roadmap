import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnonymousPost } from '../redux/anonymousSlice';
import dp from '../assets/dp.jpg';

function AnonymousComment({ postId, comments }) {
    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleComment = async () => {
        if (!comment.trim()) return;
        try {
            const result = await axios.post(
                `${serverUrl}/api/anonymous/comment/${postId}`,
                { message: comment },
                { withCredentials: true }
            );
            dispatch(updateAnonymousPost(result.data));
            setComment('');
        } catch (error) {
            console.log("COMMENT ANONYMOUS POST ERROR:", error);
        }
    };

    return (
        <div>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {comments?.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">No comments yet</div>
                )}
                {comments?.map((comment, idx) => (
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
                                Anonymous
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
    );
}

export default AnonymousComment;
