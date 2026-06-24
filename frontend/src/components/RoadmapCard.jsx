import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function RoadmapCard({ roadmap }) {
    const navigate = useNavigate();

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner':
                return 'text-green-400';
            case 'intermediate':
                return 'text-yellow-400';
            case 'advanced':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div 
            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/roadmap/${roadmap._id}`)}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-2">{roadmap.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{roadmap.description}</p>
                </div>
                <MdOutlineKeyboardArrowRight className="w-6 h-6 text-purple-500" />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                    {roadmap.category}
                </span>
                <span className={`px-3 py-1 bg-gray-800 rounded-full text-xs font-medium capitalize ${getDifficultyColor(roadmap.difficulty)}`}>
                    {roadmap.difficulty}
                </span>
            </div>
            
            <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>{roadmap.steps.length} steps</span>
                <span>{roadmap.estimatedDuration}</span>
            </div>
        </div>
    );
}

export default RoadmapCard;
