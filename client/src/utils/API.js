import axios from "axios";

const baseUrl = "http://api.spacex.land/graphql/"

export default {
    getAllLaunches: () => {
        return axios.get(`${baseURL}launches/?limit=10`)
    },

    getLaunchData: (url) => {
        return axios.get(url);
    },

    getOneLaunch: (query) => {
        return axios.get(``)
    }
}