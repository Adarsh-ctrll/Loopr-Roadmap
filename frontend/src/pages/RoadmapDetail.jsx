import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import getRoadmapById from '../hooks/getRoadmapById';
import RoadmapStep from '../components/RoadmapStep';
import { useDispatch } from 'react-redux';
import { updateMyRoadmap, setCurrentRoadmap } from '../redux/roadmapSlice';

function RoadmapDetail() {
    const { roadmapId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    const { currentRoadmap } = useSelector(state => state.roadmap);
    const [loading, setLoading] = useState(false);

    getRoadmapById(roadmapId);

    const handleStartRoadmap = async () => {
        try {
            setLoading(true);
            const result = await axios.post(
                `${serverUrl}/api/roadmap/start/${roadmapId}`,
                {},
                { withCredentials: true }
            );
            dispatch(updateMyRoadmap(result.data.userRoadmap));
            setLoading(false);
        } catch (error) {
            console.log("START ROADMAP ERROR:", error);
            setLoading(false);
        }
    };

    const handleCompleteStep = async (stepOrder) => {
        try {
            const result = await axios.patch(
                `${serverUrl}/api/roadmap/complete-step/${roadmapId}`,
                { stepOrder },
                { withCredentials: true }
            );
            dispatch(updateMyRoadmap(result.data.userRoadmap));
            dispatch(setCurrentRoadmap({
    ...currentRoadmap,
    userProgress: result.data.userRoadmap
}));
        } catch (error) {
            console.log("COMPLETE STEP ERROR:", error);
        }
    };

    if (!currentRoadmap) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const { roadmap, userProgress } = currentRoadmap;
    const isStarted = userProgress !== null;

    return (
        <div className="w-screen min-h-screen bg-black overflow-hidden">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100] bg-black/90 backdrop-blur-sm">
                <MdOutlineKeyboardBackspace 
                    className='w-[25px] h-[25px] text-white cursor-pointer' 
                    onClick={() => navigate('/roadmaps')} 
                />
                <h1 className="text-white text-[20px] font-semibold">{roadmap.title}</h1>
            </div>

            <div className="pt-[100px] pb-10 px-4 max-w-4xl mx-auto">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                            {roadmap.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm font-medium capitalize">
                            {roadmap.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm font-medium">
                            {roadmap.estimatedDuration}
                        </span>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{roadmap.description}</p>
                    
                    {isStarted ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-white">{userProgress.progressPercentage}%</div>
                                <div className="text-gray-500 text-sm">Complete</div>
                            </div>
                            <div className="w-1/2 h-3 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 transition-all duration-500"
                                    style={{ width: `${userProgress.progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={handleStartRoadmap}
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? 'Starting...' : 'Start Roadmap'}
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <h2 className="text-white text-xl font-semibold mb-4">Steps</h2>
                    {roadmap.steps.map((step) => {
                        const isCompleted = isStarted && userProgress.completedSteps.includes(step.order);
                        return (
                            <RoadmapStep
                                key={step.order}
                                step={step}
                                isCompleted={isCompleted}
                                onComplete={isStarted ? handleCompleteStep : null}
                                order={step.order}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default RoadmapDetail;
