import styles from '../../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import PFP from '../../images/testPFP.jpg';
import CHART from '../../images/chart.png';
import Navbar from '../../componenets/navbar.js';
import {useReducer, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_FIRST_NAME":
            return {
                ...state,
                firstName: action.payload.firstName
            };
        case "UPDATE_LAST_NAME":
            return {
                ...state,
                lastName: action.payload.lastName
            };
        case "UPDATE_EMAIL":
            return {
                ...state,
                email: action.payload.email
            };
        case "UPDATE_ID":
            return {
                ...state,
                id: action.payload.id
            };
        case "UPDATE_MOSTDONERACE":
            return {
                ...state,
                mostDoneRace: action.payload.mostDoneRace
            };
        case "UPDATE_AVERAGERACETIME":
            return {
                ...state,
                averageRaceTime: action.payload.averageRaceTime
            };
        case "UPDATE_BESTRACETIME":
            return {
                ...state,
                bestRaceTime: action.payload.bestRaceTime
            };
        case "UPDATE_TRENDOFRACES":
            return {
                ...state,
                trendOfRaces: action.payload.trendOfRaces
            };
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    mostDoneRace:0,
    averageRaceTime:0,
    bestRaceTime:0,
    trendOfRaces:"",
};

export default function Profile() {
    const {user, error, isLoading} = useUser();
    const navigationBar = Navbar();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);

    const putUserDataInDatabase = async () => {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const person = await response.json();
        setData(person);
        dispatch({
            type: "UPDATE_FIRST_NAME",
            payload: {firstName: person[0].firstName}
        });
        dispatch({
            type: "UPDATE_LAST_NAME",
            payload: {lastName: person[0].lastName}
        });
        dispatch({
            type: "UPDATE_EMAIL",
            payload: {email: person[0].email}
        });
        return person[0];
    }
    const putRunDataInDatabase = async (sendJson) => {
        const response = await fetch(`http://localhost:3000/api/stat-tracking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const runData = await response.json();
        console.log(runData);
        return runData[0];
    }
    const getRunDataFromDatabase = async (sendJson) => {
        const response = await fetch(`http://localhost:3000/api/stat-tracking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const runData = await response.json();
        var length = Object.keys(runData).length;
        if(length > 0){
            var distanceList = [];
            var countList = [];
            for(var x = 0; x < length;x++){
                var hasFoundDistance = false;
                for(var z = 0; z < distanceList.length;z++){
                    if(distanceList[z] == runData[x].runLength){
                        countList[z]++;
                        hasFoundDistance = true;
                    }
                }
                if(!hasFoundDistance){
                    distanceList.push(runData[x].runLength);
                    countList.push(0);
                }
            }
            var largestIndex = 0;
            for(var x = 0; x < countList.length;x++){
                if(countList[x] > countList[largestIndex]){
                    largestIndex = x;
                }
            }
            console.log(countList);
            console.log(distanceList);
            dispatch({
                type: "UPDATE_MOSTDONERACE",
                payload: {mostDoneRace: distanceList[largestIndex]}
            });
            var fastestDistance = 100000000;
            var sumTime = 0;
            var count  = 0;
            var previousRaceTime = 0;
            var differenceList = []
            for(var x = 0; x < length; x++){
                if(distanceList[largestIndex] == runData[x].runLength){
                    var stringTime = runData[x].runTime.split(":");
                    console.log(stringTime);
                    count++;
                    var intTime = parseInt(stringTime[0]) * 3600 + parseInt(stringTime[1]) * 60 + parseInt(stringTime[1]);
                    if(count == 1){
                        previousRaceTime = intTime;
                    }
                    else{
                        differenceList.push(intTime-previousRaceTime);
                    }
                    sumTime += intTime;
                    if(intTime< fastestDistance){
                        fastestDistance = intTime;
                    }
                }
            }  
            dispatch({
                type: "UPDATE_BESTRACETIME",
                payload: {bestRaceTime: (Math.trunc(fastestDistance/60))}
            });
            dispatch({
            type: "UPDATE_AVERAGERACETIME",
            payload: {averageRaceTime: (Math.trunc(sumTime/60/count))}
        });
        if(distanceList.length > 0){
            var sumOfDistances = 0;
            for(var y = 0; y < distanceList.length;y++){
                sumOfDistances += distanceList[y];
            }
            var slope = sumOfDistances/60/distanceList.length;
            if(slope < 0){
                dispatch({
                type: "UPDATE_TRENDOFRACES",
                payload: {trendOfRaces: "You have improved your time on average by "+slope.toFixed(2)+" minutes per run."}
                });
            }
            else if(slope > 0 ){
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "You have worsened your time on average by "+slope.toFixed(2)+" minutes per run."}
                    });
            }
            else{
                dispatch({
                    type: "UPDATE_TRENDOFRACES",
                    payload: {trendOfRaces: "There hasn't been a major change in your race times"}
                    });
            }
        }
        }
        return runData[0];
    }

    let person;

    if (!isLoading && user) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>All in Run | Profile</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script src=
                                "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script src=
                                "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                    <Script
                        src="https://connect.facebook.net/en_US/sdk.js"
                        strategy="lazyOnload"
                        onLoad={
                            () => {  let sendData = [{
                                email: user.email,
                                isGet: true
                            }]
                                person = putUserDataInDatabase();
                                getRunDataFromDatabase(sendData);
                            }
                        }
                    />
                </header>
                <main className={styles.main}>
                    <h3 className={styles.outsideText}>Welcome {state.firstName}</h3>
                    <div className={styles.grid}>
                        <a className={styles.card}>
                            <Image className={styles.image} src={PFP} alt="profile picture" width={300} height={444}/>
                        </a>
                        <a className={styles.profileCard}>
                            <h4>Name: {state.firstName} {state.lastName}</h4>
                            <h4>Prefered Running Distance: {state.mostDoneRace}km</h4>
                            <h4>Teams: The Boys,The Bogota Bulls</h4>
                            <h4>Average Running Time for Prefered Distance: {state.averageRaceTime} minutes</h4>
                            <h4 className={styles.profileTitle}>Recent Races:</h4>
                            <h4> The BCA Sprint, 5k Leonia</h4>
                            <h4>Best Race Time for Prefered Distance: {state.bestRaceTime} minutes</h4>
                            <h4>Trend of Preferred Races: {state.trendOfRaces}</h4>
                        </a>
                    </div>
                    <h1 className={styles.stats}>Statistics on Recent Races</h1>
                    <Image className={styles.image} src={CHART} alt="stats picture"/>
                    <p>Add a race below by inserting the race distance(in kms) and time below</p>
                    <h3 className={styles.stats}>Race Distance</h3>
                    <div className={styles.grid}>
                        <h3 className={styles.stats}>Length|Time</h3>
                    </div>
                    <div className={styles.grid}>
                        <input id="raceDistance" type="text" color=''></input>
                        <input id="raceTime" type="text"></input>
                    </div>
                    <button id="addDataButton">Insert Data</button>
                    <Script
                        src="https://connect.facebook.net/en_US/sdk.js"
                        strategy="lazyOnload"
                        onLoad={() => {
                            let d = "";
                            let t = "";
                            const button = document.getElementById('addDataButton');
                            button.addEventListener('click', () => {
                                d = document.getElementById("raceDistance").value;
                                t = document.getElementById("raceTime").value;
                                alert("Inserted run with distance of "+d+"kms and time of "+t);
                                let sendData = [{
                                    distance: d,
                                    time: t,
                                    isGet:false,
                                    email: user.email
                                }]
                                putRunDataInDatabase(sendData);
                            })
                        }
                        }
                    />
                </main>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>All in Run | Login</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script src=
                                "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script src=
                                "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                </header>
                <main className={styles.main}>
                    <div class="container">
                        <div class="jumbotron text-center background-color: #b08802 !important">
                            <h1 className={styles.heading}></h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}