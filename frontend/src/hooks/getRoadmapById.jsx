import axios from 'axios';
import React, { useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setCurrentRoadmap } from '../redux/roadmapSlice';

function getRoadmapById(roadmapId) {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/roadmap/${roadmapId}`, {
                    withCredentials: true
                });
                console.log("ROADMAP DETAIL:", result.data);
                dispatch(setCurrentRoadmap(result.data));
            } catch (error) {
                console.log("GET ROADMAP DETAIL ERROR:", error);
            }
        };
        if (roadmapId) {
            fetchRoadmap();
        }
    }, [dispatch, roadmapId]);
}

export default getRoadmapById;
