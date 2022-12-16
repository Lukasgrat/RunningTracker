import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/Script';
import Image from 'next/image';
import PFP from '../images/testPFP.jpg'
import CHART from '../images/chart.png'
export default function Home() {
  
  return (
    <div className={styles.container}>
       <Head className ={styles.main}>
        <title>Running Tracker | Profile</title>
        <link rel="icon" href="/favicon.ico" />
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
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="\">Running Tracker</a>
            </div>
            <ul class="nav navbar-nav">
              <li><a href="\" className={styles.Navtext}>Home</a></li>
              <li><a href="\profile" className={styles.Navtext}>Profile</a></li>
              <li><a href="\teams" className={styles.Navtext}>Team</a></li>
              <li><a href="\races" className={styles.Navtext}>Races</a></li>
              <li><a href="#" className={styles.NavTextRight}>Login</a></li>
            </ul>
          </div>
        </nav>
      </Head>
      <main className={styles.main}> 
        <h3 className={styles.outsideText}>Welcome Erik</h3>
      <div className={styles.grid}>
      <a className= {styles.card}>
        <Image className= {styles.image} src = {PFP} alt="profile picture" width = {300} height = {444}/>
        </a>
      <a className= {styles.profileCard}>
        <h4>Name: Erik Lewis</h4>
        <h4>Prefered Running Distance: 5km</h4>
        <h4>Teams: The Boys,The Bogota Bulls</h4>
        <h4>Average Running Time for Prefered Distance: 34.45 minutes</h4>
        <h4 className = {styles.profileTitle}>Recent Races:</h4>
        <h4> The BCA Sprint, 5k Leonia</h4>
        <h4>Best Race Time for Prefered Distance: 28.21 minutes</h4>
        <h4>Upcoming Races: "The Freezer", December Dash</h4>
      </a>
      </div>
      <h1 className={styles.stats}>Statistics on Recent Races</h1>
      <Image className= {styles.image} src = {CHART} alt="stats picture"/>
      <p>Add a race below by inserting the race distance(in kms) and time below</p>
      <h3 className= {styles.stats}>Race Distance</h3>
      <div className={styles.grid}>
        <h3 className= {styles.stats}>Length|Time</h3>
      </div>
      <div className={styles.grid}>
        <input id = "raceDistance" type = "text" color=''></input>
        <input id = "raceTime" type = "text"></input>
      </div>
      <button id = "addDataButton">Insert Data</button>
      <Script 
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={() =>
        {
          var x = "";
          var y = "";
        const button = document.getElementById('addDataButton')
      button.addEventListener('click', () => {
            x  = document.getElementById("raceTime").value;
            y = document.getElementById("raceDistance").value;
            alert("Added race With time "+x+" and distance "+y+" (km)to the graph.");
          })
      }
    }
  />
      </main>
    </div>
  )
}
