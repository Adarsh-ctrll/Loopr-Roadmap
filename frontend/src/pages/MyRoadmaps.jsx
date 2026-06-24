import React from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import getMyRoadmaps from '../hooks/getMyRoadmaps';
import ProgressCard from '../components/ProgressCard';

function MyRoadmaps() {
    const navigate = useNavigate();
    const myRoadmaps = getMyRoadmaps();

    return (
        <div className="w-screen min-h-screen bg-black overflow-hidden">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100] bg-black/90 backdrop-blur-sm">
                <MdOutlineKeyboardBackspace 
                    className='w-[25px] h-[25px] text-white cursor-pointer' 
                    onClick={() => navigate('/')} 
                />
                <h1 className="text-white text-[20px] font-semibold">My Roadmaps</h1>
            </div>
            
            <div className="pt-[100px] pb-10 px-4 max-w-4xl mx-auto">
                {myRoadmaps.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl py-20">
                        <p>You haven't started any roadmaps yet</p>
                        <button 
                            onClick={() => navigate('/roadmaps')}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                        >
                            Browse Roadmaps
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myRoadmaps.map(userRoadmap => (
                            <ProgressCard key={userRoadmap._id} userRoadmap={userRoadmap} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyRoadmaps;
