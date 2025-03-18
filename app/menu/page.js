"use client";
import { useEffect, useState } from 'react';
import CookieCard from '../../components/CookieCard';
import { fetchCookies } from '../../lib/utils';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa', // Light background
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#ff69b4', // Pink color
  },
  cookieList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    width: '100%',
  },
};

export default function Menu() {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    const loadCookies = async () => {
      const cookieData = await fetchCookies();
      setCookies(cookieData);
    };

    loadCookies();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Rollin in Dough - Cookie Menu</h1>
      <div style={styles.cookieList}>
        {cookies.map(cookie => (
          <CookieCard key={cookie.id} cookie={cookie} />
        ))}
      </div>
    </div>
  );
}