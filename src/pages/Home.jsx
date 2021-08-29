import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authStatusSelector } from '../services/redux/slices/authSlice/authSelectors';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function Home() {
  const authStatus = useSelector((state) => authStatusSelector(state));

  return authStatus === 'logged' ? (
    <>
      <Header />
      <Footer />
    </>
  ) : (
    <Redirect to="/signup" />
  );
}
