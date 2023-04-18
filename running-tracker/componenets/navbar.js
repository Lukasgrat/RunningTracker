import styles from '../styles/Home.module.css';
import {Component, React} from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';
import Username from '../componenets/userComponents';
const Navbar = (profileLink) => {
    const{user, error, isLoading} = useUser();
    const login = Username(user,error,isLoading);
    var profileRoute = "";
    var teamRoute = "";
  if(user){
    profileRoute = profileLink;
    teamRoute = "/teams";
    }
    
    return(
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div className='navigationBar'>
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand">All in Run</a>
            </div>
            <ul class="nav navbar-nav">
              <li><a href="\" className={styles.Navtext}>Home</a></li>
              <li><a href={profileRoute} className={styles.Navtext}>Profile</a></li>
              <li><a href={teamRoute} className={styles.Navtext}>Team</a></li>
              <li><a href="\races" className={styles.Navtext}>Races</a></li>
              <li className={styles.Navtext}>{login}</li>
            </ul>
          </div>
        </div>
        </nav>
        );
}
export default Navbar;