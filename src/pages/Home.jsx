import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import { authStatusSelector } from '../services/redux/slices/authSlice/authSelectors';

export default function Home() {
  const authStatus = useSelector((state) => authStatusSelector(state));

  return authStatus === 'logged' ? <Header /> : <Redirect to="/signup" />;
}
