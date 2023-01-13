import styles from '../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';

const Loading = ( {} ) => {
    const {user, error, isLoading} = useUser();
    const checkData = async () => {
        const response = await fetch("/api/login.js",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user.email)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        dispatch({ type: "CLEAR" });
        const userJSON = await response.json();
        if (userJSON.length !== 0) {
            return true;
        }
        return false;
    }

    const postData = async () => {
        const response = await fetch("/api/login.js",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        dispatch({ type: "CLEAR" });
        const userJSON = await response.json();
        if (userJSON.length !== 0) {
            return true;
        }
        return false;
    }

    if (!isLoading && user) {
        //return(
            // loading page. should automatically call getData and postData while displaying a loading wheel
        //)
    }
}

export default Loading;