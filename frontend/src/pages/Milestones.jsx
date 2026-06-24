import React from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import getAllMilestones from '../hooks/getAllMilestones';
import MilestoneCard from '../components/MilestoneCard';

function Milestones() {
    const navigate = useNavigate();
    const milestones = getAllMilestones();

    return (
        <div className="w-screen min-h-screen bg-black overflow-hidden">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100] bg-black/90 backdrop-blur-sm">
                <MdOutlineKeyboardBackspace 
                    className='w-[25px] h-[25px] text-white cursor-pointer' 
                    onClick={() => navigate('/')} 
                />
                <h1 className="text-white text-[20px] font-semibold">Community Milestones</h1>
            </div>
            
            <div className="pt-[100px] pb-10 px-4 max-w-2xl mx-auto">
                {milestones.length === 0 ? (
                    <div className="text-center text-gray-400 text-xl py-20">
                        No milestones yet. Be the first to share your progress!
                    </div>
                ) : (
                    <div>
                        {milestones.map(milestone => (
                            <MilestoneCard key={milestone._id} milestone={milestone} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Milestones;
