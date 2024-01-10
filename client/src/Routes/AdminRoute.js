import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";


export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    // useEffect(() => {
    //     const authCheck = async () => {
    //         const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
    //         if (res?.data?.ok) {
    //             setOk(true);
    //         } else {
    //             setOk(false);
    //         }
    //     }
    //     if (auth?.token) authCheck();
    // }, [auth?.token])

    useEffect(()=>{
        if(auth?.user?.role === 1){
            setOk(true);
        }else {
            setOk(false);
        }
    }, [auth?.user?.role]);

    return ok ? <Outlet /> : <Spinner path=""/>
}