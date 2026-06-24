import axios from 'axios';
import React, { useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setMyRoadmaps } from '../redux/roadmapSlice';

function getMyRoadmaps() {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchMyRoadmaps = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/roadmap/my`, {
                    withCredentials: true
                });
                console.log("MY ROADMAPS:", result.data);
                dispatch(setMyRoadmaps(result.data));
            } catch (error) {
                console.log("GET MY ROADMAPS ERROR:", error);
            }
        };
        fetchMyRoadmaps();
    }, [dispatch, userData]);

    return useSelector(state => state.roadmap.myRoadmaps);
}

export default getMyRoadmaps;
