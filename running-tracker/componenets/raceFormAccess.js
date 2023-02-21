import {useUser} from '@auth0/nextjs-auth0/client';
import React,{ Component } from 'react';
import styles from '../styles/Home.module.css';
  const  raceFormLink = () => {
    const{user, error, isLoading} = useUser();
    return (
    <a className={styles.card} href = "/raceForm"><h2 >Create Race</h2></a>)
    };
  export default raceFormLink;