import styles from '../styles/Home.module.css'
import Script from 'next/script';
import {useUser} from '@auth0/nextjs-auth0/client';

const Loading = ( {} ) => {
    const {user, error, isLoading} = useUser();
}

export default Loading;