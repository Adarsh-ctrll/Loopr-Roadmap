import axios from 'axios';
import React, { useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setRoadmaps } from '../redux/roadmapSlice';

function getAllRoadmaps(category = null, difficulty = null) {
    const dispatch = useDispatch();
    const { roadmaps } = useSelector(state => state.roadmap);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const params = {};
                if (category) params.category = category;
                if (difficulty) params.difficulty = difficulty;

                const result = await axios.get(`${serverUrl}/api/roadmap/getAll`, {
                    withCredentials: true,
                    params
                });
                console.log("ROADMAPS:", result.data);
                dispatch(setRoadmaps(result.data));
            } catch (error) {
                console.log("GET ROADMAPS ERROR:", error);
            }
        };
        fetchRoadmaps();
    }, [dispatch, category, difficulty]);

    return roadmaps;
}

export default getAllRoadmaps;
