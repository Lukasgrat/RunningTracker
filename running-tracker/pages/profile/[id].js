
import styles from '../../styles/Home.module.css'
import Script from 'next/script';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import PFP from '../../images/defaultPFP.png';
import CHART from '../../images/chart.png';
import Navbar from '../../componenets/navbar.js';
import { useReducer, useState } from "react";
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
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

const initialState = {
    firstName: "",
    lastName: "",
    email: ""
};

export default function Profile() {
    const { user, error, isLoading } = useUser();
    const navigationBar = Navbar();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);

    const putDataInDatabase = async () => {
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

        dispatch({ type: "CLEAR" });
        const person = await response.json();
        setData(person);
        dispatch({
            type: "UPDATE_FIRST_NAME",
            payload: { firstName: person[0].firstName }
        });
        dispatch({
            type: "UPDATE_LAST_NAME",
            payload: { firstName: person[0].lastName }
        });
        dispatch({
            type: "UPDATE_EMAIL",
            payload: { firstName: person[0].email }
        });
        return person[0];
    }

    if (!isLoading && user) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>All in Run | Profile</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
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
                        onLoad={() => {
                            const person = putDataInDatabase();
                        }
                        }
                    />
                </header>
                <main className={styles.main}>
                    <h3 className={styles.outsideText}>Welcome {state.firstName}</h3>
                    <div className={styles.grid}>
                        <a className={styles.card}>
                            <Image className={styles.image} src={PFP} alt="profile picture" width={300} height={444} />
                        </a>
                        <a className={styles.profileCard}>
                            <h4>Name: Erik Lewis</h4>
                            <h4>Prefered Running Distance: 5km</h4>
                            <h4>Teams: The Boys,The Bogota Bulls</h4>
                            <h4>Average Running Time for Prefered Distance: 34.45 minutes</h4>
                            <h4 className={styles.profileTitle}>Recent Races:</h4>
                            <h4> The BCA Sprint, 5k Leonia</h4>
                            <h4>Best Race Time for Prefered Distance: 28.21 minutes</h4>
                            <h4>Upcoming Races: "The Freezer", December Dash</h4>
                        </a>
                    </div>
                    <h1 className={styles.stats}>Statistics on Recent Races</h1>
                    <Image className={styles.image} src={CHART} alt="stats picture" />
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
                            var x = "";
                            var y = "";
                            const button = document.getElementById('addDataButton')
                            button.addEventListener('click', () => {
                                x = document.getElementById("raceTime").value;
                                y = document.getElementById("raceDistance").value;
                                alert("Added race With time " + x + " and distance " + y + " (km)to the graph.");
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
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
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
                            <h1 className={styles.heading}>Test</h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}