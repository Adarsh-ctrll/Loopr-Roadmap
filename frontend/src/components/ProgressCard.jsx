import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProgressCard({ userRoadmap }) {
    const navigate = useNavigate();
    const { roadmap, progressPercentage, completedSteps, startedAt } = userRoadmap;

    const getProgressColor = (percentage) => {
        if (percentage < 30) return 'from-red-500 to-orange-500';
        if (percentage < 70) return 'from-yellow-500 to-green-500';
        return 'from-green-500 to-emerald-500';
    };

    return (
        <div 
            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/roadmap/${roadmap._id}`)}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">{roadmap.title}</h3>
                    <p className="text-gray-400 text-sm">{roadmap.category}</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white">{progressPercentage}%</div>
                    <div className="text-gray-500 text-xs">Complete</div>
                </div>
            </div>
            
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(progressPercentage)} transition-all duration-500`}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            
            <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>{completedSteps.length} / {roadmap.steps.length} steps</span>
                <span>Started {new Date(startedAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
}

export default ProgressCard;
