import axios from 'axios';
import React, { useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setMilestones } from '../redux/roadmapSlice';

function getAllMilestones() {
    const dispatch = useDispatch();
    const { milestones } = useSelector(state => state.roadmap);

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/milestone/getAll`, {
                    withCredentials: true
                });
                console.log("MILESTONES:", result.data);
                dispatch(setMilestones(result.data));
            } catch (error) {
                console.log("GET MILESTONES ERROR:", error);
            }
        };
        fetchMilestones();
    }, [dispatch]);

    return milestones;
}

export default getAllMilestones;
