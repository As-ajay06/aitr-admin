import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setData } from "../../store/slices/departmentSlice"
import axios from "axios";



export default function departmentData({tab} : { tab: string }) {

    const dispatch = useDispatch();
    const { columns, data } = useSelector((state: RootState) => state.department);


    let url;

    useEffect(() => {
        const BASE_URL = "";
        const fetchData = async () => {
            if (tab === "mou") {
                url = `${BASE_URL}/api/v1/department/mou`;
            } else if (tab === "eventGrant") {
                url = `${BASE_URL}/api/v1/department/event-grants-received`;
                try {
                    const res = await axios(url);
                    const data = res.data;
                    console.log("this is data" , data.eventGrants);
                    dispatch(setData(data.eventGrants)); // ✅ update redux with API data
                    if(data){
                        return data;
                    }

                    
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }
        }

    }, [tab])

}