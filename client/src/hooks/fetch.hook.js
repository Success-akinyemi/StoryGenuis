import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getEmail } from '../helpers/helper'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://storygenuis.onrender.com'



/**Custom Hooks */
export function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const { email } = !query ? await getEmail() : '';

                const { data, status} = !query ? await axios.get(`api/user/${email}`) : await axios.get(`/api/${query}`) 
                
                
                console.log('data from hooks', data)
                if (status === 200) {
                    setData({ isLoading: false, apiData: data, status: status, serverError: null })
                } else {
                    setData({ isLoading: false, apiData: null, status: status, serverError: null })
                }
            } catch (error) {
                setData({ isLoading: false, apiData: null, status: null, serverError: error })
            }
        };
        fetchData()
    }, [query])

    return data;
}

/**Get Stories */
export function useFetchStories(query) {
    const [fetchStories, setFetchStories] = useState({ isLoadingStories: true, storiesData: null, storiesStatus: null, serverErrorStories: null})

    const fetchStoriesData = useCallback(async () => {
        try {
            const { email } = !query ? await getEmail() : '';

            const token = await localStorage.getItem('token')

            const { data, status } = !query ? await axios.get(`api/getStories/${email}`) : await axios.get(`/api/${query}`,  {headers: {Authorization: `Bearer ${token}`}})
            
            console.log('Story Data>>', data)
            if (status === 200) {
                setFetchStories({ isLoadingStories: false, storiesData: data, storiesStatus: status, serverErrorStories: null })
            } else {
                setFetchStories({ isLoadingStories: false, storiesData: null, storiesStatus: status, serverErrorStories: null })
            }
        } catch (error) {
            setFetchStories({ isLoadingStories: false, storiesData: null, storiesStatus: null, serverErrorStories: error })
        }
    }, [query]);

    useEffect(() => {
        fetchStoriesData();
    }, [fetchStoriesData]);

    return fetchStories;
}


export function useFetchSpecificStory(storyRef) {
    const [storyId, setStoryId] = useState({ isLoadingStory: true, storyData: null, storyStatus: null, serverErrorStory: null})

    const fetchStoryData = useCallback(async () => {
        try {
            const token = await localStorage.getItem('token')
            const { data, status } = await axios.get(`api/getSpecificStoryOfAUser/${storyRef}`, {headers: {Authorization: `Bearer ${token}`}}) 
            
            if (status === 200) {
                setStoryId({ isLoadingStory: false, storyData: data, storyStatus: status, serverErrorStory: null })
            } else {
                setStoryId({ isLoadingStory: false, storyData: null, storyStatus: status, serverErrorStory: null })
            }
        } catch (error) {
            setStoryId({ isLoadingStory: false, storyData: null, storyStatus: null, serverErrorStory: error })
        }
    }, [storyRef]);

    useEffect(() => {
        fetchStoryData();
    }, [fetchStoryData]);

    return storyId;
}



