import { useUser } from '@auth0/nextjs-auth0/client';
import React, { Component } from 'react';
export function Username(){
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return (<div>Loading...</div>);}
  if (error){
    return (<div>{error.message}</div>);}

  if (user) {
    return (<a href="/api/auth/logout">Logout</a>);
  }
  return (<a href="/api/auth/login">Login</a>);
}