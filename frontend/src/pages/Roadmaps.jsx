import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import getAllRoadmaps from '../hooks/getAllRoadmaps';
import RoadmapCard from '../components/RoadmapCard';
import RoadmapFilter from '../components/RoadmapFilter';

function Roadmaps() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const roadmaps = getAllRoadmaps(category, difficulty);

    return (
        <div className="w-screen min-h-screen bg-black overflow-hidden">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100] bg-black/90 backdrop-blur-sm">
                <MdOutlineKeyboardBackspace 
                    className='w-[25px] h-[25px] text-white cursor-pointer' 
                    onClick={() => navigate('/')} 
                />
                <h1 className="text-white text-[20px] font-semibold">Roadmaps</h1>
            </div>
            
            <div className="pt-[100px] pb-10 px-4 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/4">
                        <RoadmapFilter 
                            category={category}
                            setCategory={setCategory}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                        />
                    </div>
                    
                    <div className="lg:w-3/4">
                        {roadmaps.length === 0 ? (
                            <div className="text-center text-gray-400 text-xl py-20">
                                No roadmaps found
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {roadmaps.map(roadmap => (
                                    <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roadmaps;
