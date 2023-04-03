import styles from '../../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import PFP from '../../images/defaultPFP.png';
import {InferGetServerSidePropsType} from 'next';
import Navbar from '../../componenets/navbar.js';

const ProfileList = ({profileData}) => {
    const {user, error, isLoading} = useUser();
    const navigationBar = Navbar();
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
                    <Script id="1" src=
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id="2" src=
                        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js">
                    </Script>
                    {navigationBar}
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
                            <h4>Average Running Time for Prefered Distance: {state.averageRaceTime} minutes</h4>
                            <h4>Best Race Time for Prefered Distance: {state.bestRaceTime} minutes</h4>
                            <h4>Trend of Preferred Races: {state.trendOfRaces}</h4>
                        </a>
                    </div>

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
                    <Script id="3" src=
                        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
                    </Script>
                    <Script id="4" src=
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

export async function getServerSideProps(context) {
    let id = context.params.id;
    console.log(id);
    const profileList = await fetch(`https://running-tracker-swart.vercel.app//api/teamstats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ID: id,
            isGet: true
        })
    });
    const data = await profileList.json();
    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: {profileData: data}
    };
}

export default ProfileList