import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";


export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategories(data?.category);
        } catch (error) {
            toast.error('Something went wrong')
        }
    } 
    useEffect(() => {
        getCategory();
        // eslint-disable-next-line
    }, []);

    return categories;
}




