import {useUser} from '@auth0/nextjs-auth0/client';
import React,{ Component } from 'react';
import styles from '../styles/Home.module.css';
  const  Username = () => {
    const{user, error, isLoading} = useUser();
    if(isLoading){
      return (<a className={styles.NavTextRight} id ="login">Loading...</a>);
    }
    if (error){
      return (<div id ="login" >{error.message}</div>);}
    if (user) {
        return (<a href="/api/auth/logout" id = "login" className={styles.NavTextRight}>Logout</a>);
    }
    return (<a href="/api/auth/login" id ="login" className={styles.NavTextRight}>Login</a>);
    };
  export default Username;