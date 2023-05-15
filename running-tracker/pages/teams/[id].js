import styles from '../../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Navbar from '../../componenets/navbar.js';
const db = require('../../db/db_connection.js')
import {useReducer, useState} from "react";
import Cookies from 'js-cookie';
const ProfileList = ({profileData,teamInfo,teamCode}) => {
    function leaveButton(input){
        if(input == teamCode){
            var sendJson =
            {
                'isGet' :false,
                'isLeave': true,
                'ID' : Cookies.get("id"),
                'teamID': teamInfo.teamID,
            }
            leaveTeams(sendJson);
            location.href = "/teams"
        }
    }

    async function leaveTeams(sendJson){
        const apiString = location.origin + "/api/teamstats";
        console.log(apiString);
        const response = await fetch(apiString, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendJson)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    }
    function reducer(state, action) {
        switch (action.type) {
            case "UPDATE_TEAM_NAMES":
                return {
                    ...state,
                    teamNames: action.payload.names
                };
            case "UPDATE_TEAM_MOSTRAN":
                return {
                    ...state,
                    mostDoneRaces: action.payload.mostDoneRaces
                };
            case "UPDATE_TEAM_AVERAGE":
                return {
                    ...state,
                    averageRaces: action.payload.averageRaces
                };
            case "UPDATE_TEAM_BESTRACE":
                return {
                    ...state,
                    bestRaces: action.payload.bestRaces
                };
            case "UPDATE_TEAM_TREND":
                return {
                    ...state,
                    trends: action.payload.trends
                };
            case "CLEAR":
                return initialState;
                default:
                    return state;
        }
    }
    var names = [];
    for(var x = 0; x < profileData.length;x++){
        names.push(profileData[x].name);
    }
    var mostDoneRaces = [];
    for(var x = 0; x < profileData.length;x++){
        mostDoneRaces.push(profileData[x].mostDoneRace);
    }
    var averageRaces = [];
    for(var x = 0; x < profileData.length;x++){
        averageRaces.push(profileData[x].averageRaceTime);
    }
    var bestRaces = [];
    for(var x = 0; x < profileData.length;x++){
        bestRaces.push(profileData[x].bestRaceTime);
    }
    var trends = [];
    for(var x = 0; x < profileData.length;x++){
        trends.push(profileData[x].trendOfRaces);
    }
    const initialState = {
        names: names,
        mostDoneRaces: mostDoneRaces,
        averageRaces: averageRaces,
        bestRaces: bestRaces,
        trends: trends,
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState([]);
    const {user, error, isLoading} = useUser();
    var userID = "";
    userID = Cookies.get('id');
    const navigationBar = Navbar(userID);
    if (!isLoading && user) {
        const TeamStatsDisplay = ({vals}) => {
            return (<a className={styles.profileCard}>
                        <h4>Name: {vals[0]}</h4>
                        <h4>Prefered Running Distance: {vals[1]}km</h4>
                        <h4>Average Running Time for Prefered Distance:{vals[2]}  minutes</h4>
                        <h4>Best Race Time for Prefered Distance:{vals[3]} minutes</h4>
                        <h4>Trend of Preferred Races: {vals[4]}</h4>
                    </a>);
        }
        var list = []
        for(var x =0; x < profileData.length;x++){
            list.push(x);
        }
        const displayTeamStats  = () =>{
            return ((list || []).map(element => <TeamStatsDisplay key={element} vals={[state.names[element],state.mostDoneRaces[element],state.averageRaces[element],state.bestRaces[element],state.trends[element]]}/>));
        }
        const teamStatsHTML = displayTeamStats();
        return (
            
            <div className={styles.profileImage}>
                <header className={styles.header}>
                    <title>All in Run | Teams</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script id="1" src=
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id="2" src=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
                </header>
                <main className={styles.mainImage}> 
                    <div className={styles.container}>
                        <h1 className={styles.teamCard}>{teamInfo.teamName}</h1>
                    </div>
                    <a className={styles.profileCard}>
                        <h4>{teamInfo.teamDesc}</h4>
                    </a>
                    <div className={styles.grid}>  
                     {teamStatsHTML}
                    </div>
                    <div className={styles.profileCard}>If you are sure you want to leave the team. Enter its join code below.</div>
                    <div><input id = "joinCode" type = "text"></input></div>
                    <button type="button" id =  "leaveTeam" onClick={()=>{leaveButton(document.getElementById("joinCode").value)}}>Leave the Team</button>
                  
                </main>
            </div>
        )
    } else {
        return (
            <div className={styles.profileImage}>
                <header className={styles.header}>
                    <title>All in Run | Login</title>
                    <link rel="icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href=
                            "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                    <Script id="3" src=
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id="4" src=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                </header>
                <main className={styles.mainImage}>
                        <div class="jumbotron text-center background-color: #b08802 !important">
                            {navigationBar}
                        </div>
                </main>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    let id = context.params.id;
    const [rows] = await db.execute(`select concat(Person.firstName, " ", Person.lastName) as name,
                                                                                    id,
                                                                                    runTime,
                                                                                    runLength,
                                                                                    runDate
                                                                                from Person
                                                                                    join Run
                                                                                        on Run.userID = Person.id
                                                                                where id in
                                                                                (select userID
                                                                                    from Membership
                                                                                    join Team
                                                                                    on Membership.teamID = Team.teamID
                                                                                    where Team.teamCode = ?)
                                                                                order by id`, [id]);
    let results = JSON.parse(JSON.stringify(rows));
    if (!results) {
        return {
            notFound: true
        };
    }
    const runStats = (runData) => {
        var distanceList = [];
        var countList = [];
        for (var x = 0; x < runData.length; x++) {
            var hasFoundDistance = false;
            for (var z = 0; z < distanceList.length; z++) {
            if (distanceList[z] == runData[x].runLength) {
                countList[z]++;
                hasFoundDistance = true;
            }
            }
            if (!hasFoundDistance) {
            distanceList.push(runData[x].runLength);
            countList.push(0);
            }
        }
        var largestIndex = 0;
        for (var x = 0; x < countList.length; x++) {
            if (countList[x] > countList[largestIndex]) {
            largestIndex = x;
            }
        }
        const most = distanceList[largestIndex];
        var fastestDistance = 100000000;
        var sumTime = 0;
        var count = 0;
        var previousRaceTime = 0;
        var differenceList = [];
        for (var x = 0; x < runData.length; x++) {
            if (distanceList[largestIndex] == runData[x].runLength) {
            var stringTime = runData[x].runTime.split(":");
            count++;
            var intTime =
                parseInt(stringTime[0]) * 3600 +
                parseInt(stringTime[1]) * 60 +
                parseInt(stringTime[1]);
            if (count == 1) {
                previousRaceTime = intTime;
            } else {
                differenceList.push(intTime - previousRaceTime);
                previousRaceTime = intTime;
            }
            sumTime += intTime;
            if (intTime < fastestDistance) {
                fastestDistance = intTime;
            }
            }
        }
        const best = Math.trunc(fastestDistance / 60);
        const avg =  Math.trunc(sumTime / 60 / count);
        if (differenceList.length > 0) {
            var sumOfDistances = 0;
            for (var y = 0; y < differenceList.length; y++) {
            sumOfDistances += differenceList[y];
            }
            var slope = sumOfDistances / 60 / differenceList.length;
            var trend = "";
            if (slope < 0) {
            trend =  "You have improved your time on average by " + -1 * slope.toFixed(2) + " minutes per run.";
            } else if (slope > 0) {
            trend = "You have worsened your time on average by " + slope.toFixed(2) + " minutes per run.";
            } else {
            trend = "There hasn't been a major change in your race times";
        }
        }
        var returnSet = 
            {
            name: runData[0].name,
            mostDoneRace: most,
            averageRaceTime: avg,
            bestRaceTime: best,
            trendOfRaces: trend,
            teamID:context.params.id,
            };
        return returnSet;
    }
    var setID = results[0].id;
    var beginIndex = 0;
    var returnProps = [];
    var tempList = [];
    for(var x = 1; x < results.length;x++){
        if(setID != results[x].id){
            for(var y = beginIndex; y < x;y++){
                tempList.push(results[y]);
            }
            returnProps.push(runStats(tempList));
            beginIndex = x;
            setID = results[x].id;
            tempList = [];
        }
    }
    for(var y = beginIndex; y < results.length;y++){
        tempList.push(results[y]);
    }
    returnProps.push(runStats(tempList));
    let profileList = returnProps;
    const [teamInfo] = await db.execute(`select * from Team where teamCode = ?`, [id]);
    let teamResults = JSON.parse(JSON.stringify(teamInfo));
    return {
        props: {profileData: profileList,
                teamInfo:teamResults[0],
                teamCode:id,
        }
    };
}

export default ProfileList