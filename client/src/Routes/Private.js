import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

export default function PrivateRoute({ props: any }) {
    const [ok, setOk] = useState();
    const [auth] = useAuth();
    // useEffect(() => {
    //     const authCheck = async () => {
    //         const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
    //         if (res?.data?.ok) {
    //             setOk(true);
    //         } else {
    //             setOk(false);
    //         }
    //     } 
    //     if (auth?.token) authCheck();
    // }, [auth?.token])

    useEffect(()=>{
        if(auth?.user?.role === 0){
            setOk(true);
        }else {
            setOk(false);
        }
    }, [auth?.user?.role]);

    return ok ? <Outlet /> : <Spinner path="" />
}