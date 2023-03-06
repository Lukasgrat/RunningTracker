import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '../componenets/navbar';

export default function Home() {
    const { user, error, isLoading } = useUser();
    const navigationBar = Navbar();

    const getTeams = async () => {
        const response = await fetch(`http://localhost:3000/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{
                email: user.email,
                isGet: true
            }])
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const teams = await response.json();
        setData(teams);
        // dispatch({
        //     type: "UPDATE_FIRST_NAME",
        //     payload: {firstName: person[0].firstName}
        // });
        // dispatch({
        //     type: "UPDATE_LAST_NAME",
        //     payload: {lastName: person[0].lastName}
        // });
        // dispatch({
        //     type: "UPDATE_EMAIL",
        //     payload: {email: person[0].email}
        // });
        return teams;
    }
    if (!isLoading && user) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <title>Teams</title>
                    <meta name="description" content="Generated by create next app" />
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
                        onLoad={
                            () => {
                                console.log("60");
                                const teams = getTeams();
                            }
                        }
                    />
                </header>
                <main className={styles.main}>
                    <div class="container">
                        <h1 className={styles.jumbotron}>All in Run</h1>
                    </div>
                    <div>
                        <table className={styles.racesTable}>
                            <thead >
                                <tr>
                                    <th scope="col">Team</th>
                                    <th scope="col">Races</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Racing Polygon Team</td>
                                    <td>64K, GCN Marathon</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button">Register Team</button>
                </main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by Power{' '}
                        <span className={styles.logo}>
                        </span>
                    </a>
                </footer>
            </div>
        )
    }
}
