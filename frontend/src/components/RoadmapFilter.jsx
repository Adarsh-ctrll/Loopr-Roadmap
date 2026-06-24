import React from 'react';

function RoadmapFilter({ category, setCategory, difficulty, setDifficulty }) {
    const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'DevOps',
        'Design',
        'Blockchain',
        'Cybersecurity'
    ];

    const difficulties = ['beginner', 'intermediate', 'advanced'];

    return (
        <div className="w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">Filter Roadmaps</h3>
            
            <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block">Category</label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label className="text-gray-400 text-sm mb-2 block">Difficulty</label>
                <select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                    <option value="">All Levels</option>
                    {difficulties.map(diff => (
                        <option key={diff} value={diff} className="capitalize">{diff}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default RoadmapFilter;
