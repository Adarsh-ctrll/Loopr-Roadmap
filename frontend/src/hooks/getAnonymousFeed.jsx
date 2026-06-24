import axios from 'axios';
import React, { useEffect } from 'react';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setAnonymousPosts } from '../redux/anonymousSlice';

function getAnonymousFeed(category = null) {
    const dispatch = useDispatch();
    const { anonymousPosts } = useSelector(state => state.anonymous);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const params = {};
                if (category) params.category = category;

                const result = await axios.get(`${serverUrl}/api/anonymous/getAll`, {
                    withCredentials: true,
                    params
                });
                console.log("ANONYMOUS POSTS:", result.data);
                dispatch(setAnonymousPosts(result.data));
            } catch (error) {
                console.log("GET ANONYMOUS POSTS ERROR:", error);
            }
        };
        fetchPosts();
    }, [dispatch, category]);

    return anonymousPosts;
}

export default getAnonymousFeed;
