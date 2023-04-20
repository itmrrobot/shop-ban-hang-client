import { useState,useEffect } from "react";
import axios from "axios";
import { url } from "../constants";

const useFetch = (path) => {
    const [data,setData] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        try {
            const fetchData = async() => {
                let respone = await axios.get(url+path,{
                    signal: controller.signal
                })
                setData(respone.data);
            }
            fetchData();
        } catch(e) {
            console.log(e);
        }
        return () => {
            controller.abort();
        }
    },[path]);
    return data;
}

export default useFetch;