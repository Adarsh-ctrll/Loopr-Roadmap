import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import getAnonymousFeed from '../hooks/getAnonymousFeed';
import AnonymousCard from '../components/AnonymousCard';
import CreateAnonymousPost from '../components/CreateAnonymousPost';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/anonymousSlice';

function Anonymous() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCreate, setShowCreate] = useState(false);
    const { category } = useSelector(state => state.anonymous);
    const posts = getAnonymousFeed(category);

    const categories = ['College', 'Placement', 'Relationships', 'Career', 'Confessions', 'Funny', 'Advice'];

    return (
        <div className="w-screen min-h-screen bg-black overflow-hidden">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100] bg-black/90 backdrop-blur-sm">
                <MdOutlineKeyboardBackspace 
                    className='w-[25px] h-[25px] text-white cursor-pointer' 
                    onClick={() => navigate('/')} 
                />
                <h1 className="text-white text-[20px] font-semibold">Anonymous Confessions</h1>
            </div>
            
            <div className="pt-[100px] pb-10 px-4 max-w-2xl mx-auto">
                {showCreate && (
                    <CreateAnonymousPost onClose={() => setShowCreate(false)} />
                )}

                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    <button 
                        onClick={() => dispatch(setCategory(null))}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                            !category 
                                ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white' 
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => dispatch(setCategory(cat))}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                category === cat 
                                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {!showCreate && (
                    <button 
                        onClick={() => setShowCreate(true)}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity mb-6"
                    >
                        + Create Confession
                    </button>
                )}

                {posts.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl py-20">
                        No confessions yet. Be the first to share!
                    </div>
                ) : (
                    <div>
                        {posts.map(post => (
                            <AnonymousCard key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Anonymous;
