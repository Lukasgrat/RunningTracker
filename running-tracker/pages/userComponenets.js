import {useUser } from '@auth0/nextjs-auth0/client';
import React,{ Component } from 'react';
import styles from '../styles/Home.module.css';
  const  Username = () => {
    const{user, error, isLoading } = useUser();
    if (isLoading) {
      return (<div>Loading...</div>  );}
    if (error){
      return (<div>{error.message}</div>);}
    if (user) {
        return (<div href="/api/auth/logout" className={styles.NavTextRight}>Logout</div>);
    }
    return (<div href="/api/auth/login" className={styles.NavTextRight}>Login</div>);
    };
  export default Username;