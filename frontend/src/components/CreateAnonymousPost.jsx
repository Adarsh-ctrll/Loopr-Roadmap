import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { addAnonymousPost } from '../redux/anonymousSlice';

function CreateAnonymousPost({ onClose }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Confessions');

    const categories = ['College', 'Placement', 'Relationships', 'Career', 'Confessions', 'Funny', 'Advice'];

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('Please write something');
            return;
        }

        try {
            const result = await axios.post(
                `${serverUrl}/api/anonymous/create`,
                { content, category },
                { withCredentials: true }
            );
            dispatch(addAnonymousPost(result.data.post));
            setContent('');
            onClose();
        } catch (error) {
            console.log("CREATE ANONYMOUS POST ERROR:", error);
            alert(error.response?.data?.message || 'Failed to create post');
        }
    };

    return (
        <div className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">Share Anonymously</h3>
            
            <div className="mb-4">
                <label className="text-gray-400 text-sm mb-2 block">Category</label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts anonymously..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none h-32 mb-4"
                maxLength={2000}
            />

            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{content.length}/2000</span>
                <div className="flex gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateAnonymousPost;
