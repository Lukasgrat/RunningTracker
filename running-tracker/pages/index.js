import styles from "../styles/Home.module.css";
import Script from "next/script";
import { Component, React } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { render } from "react-dom";
import Navbar from "../componenets/navbar.js";
import { useReducer } from "react";
var runQueries = true;

function reducer(state, action) {
  switch(action.type) {
    case "UPDATE_URL": 
    return {
      ...state,
      url: "/profile/" + action.payload.id
    }
  }
}

const initialState = {
  url: "/profile/"
};

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const putUserDataInDatabase = async () => {
    if (runQueries) {
      runQueries = false;
      const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const person = await response.json();
    dispatch({
      type: "UPDATE_URL",
      payload: { id: person[0].id }
    });
    return person[0];
    }
  };
  
  if (user) {
    putUserDataInDatabase();
  }
  
  const navigationBar = Navbar(state.url);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <title>All in Run | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          id="1"
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        ></Script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <Script
          id="2"
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
        ></Script>
        {navigationBar}
      </header>
      <main className={styles.main}>
        <div class="container">
          <h1 className={styles.jumbotron}>All in Run</h1>
        </div>
        <h1 className={styles.title}>What We Do</h1>
        <a className={styles.titleCard}>
          <p>
            All in Run brings running organizers, teams, and individuals
            together to share info on races, organize your running data, and
            have a more unified team to race with.
          </p>
        </a>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Races </h2>
            <p>
              Look at a collective database of races across the area to find
              info on them with ease.
            </p>
          </a>

          <a className={styles.card}>
            <h2>Profile</h2>
            <p>
              Record your personal data on running, to get back statistics on
              where you are improving or where you need to!
            </p>
          </a>

          <a className={styles.card}>
            <h2>Teams</h2>
            <p>
              Register your team, or join a team you have been invited to and
              see other stats and join on races together!.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by Power{" "}
        </a>
      </footer>
    </div>
  );
}
