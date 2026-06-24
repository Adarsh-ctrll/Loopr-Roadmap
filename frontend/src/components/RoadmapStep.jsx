import React from 'react';
import { FaCheck } from "react-icons/fa6";

function RoadmapStep({ step, isCompleted, onComplete, order }) {
    return (
        <div className={`w-full bg-[#1a1a1a] border rounded-xl p-5 transition-all duration-300 ${
            isCompleted 
                ? 'border-green-500/50 bg-green-500/5' 
                : 'border-gray-800 hover:border-purple-500/50'
        }`}>
            <div className="flex items-start gap-4">
                <div 
                    onClick={() => onComplete(order)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isCompleted 
                            ? 'bg-green-500 text-black' 
                            : 'bg-gray-800 text-gray-400 hover:bg-purple-500 hover:text-white'
                    }`}
                >
                    {isCompleted ? <FaCheck className="w-4 h-4" /> : <span className="text-sm font-medium">{order}</span>}
                </div>
                
                <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-2 ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                        {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                    
                    {step.resources && step.resources.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-gray-500 text-xs uppercase tracking-wider">Resources</p>
                            {step.resources.map((resource, idx) => (
                                <a 
                                    key={idx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-purple-400 text-sm hover:text-purple-300 transition-colors"
                                >
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    {resource.title}
                                    <span className="text-gray-600 text-xs">({resource.type})</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoadmapStep;
