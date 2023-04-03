import {useUser} from '@auth0/nextjs-auth0/client';
import React,{ Component } from 'react';
import styles from '../styles/Home.module.css';
import { useReducer, useState } from "react";
const initialState = {
    role:0
};
const  raceFormLink = () => {
   
    const{user, error, isLoading} = useUser();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);
    function reducer(state, action) {
        switch (action.type) {
            case "UPDATE_ROLE":
                return {
                    ...state,
                    role: action.payload.role
                };
            case "CLEAR":
                return initialState;
            default:
                return state;
        }
    }
    
    const getDataFromDatabase = async () => {
        const response = await fetch(`http://localhost:3000/api/raceForm`, {
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
        const person = await response.json();
        setData(person);
        dispatch({
            type: "UPDATE_ROLE",
            payload: { role: person[0].id }  
        });
        return person[0];
    }
    if(user && !isLoading){
        const role = getDataFromDatabase();
        if(state.role != "1" || state.role != "2"){
        return (
            <a className={styles.card} href = "/raceForm"><h2 >Create Race</h2></a>
            )
        }
    }
    return (
        <div></div>
        )
    };
  export default raceFormLink;