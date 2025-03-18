"use client";
import './globals.css';  // Import global styles

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffccff', // Light pink background
    color: '#000080', // Dark blue text
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '2rem',
    color: '#000080', // Dark blue text
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adds depth
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  linkItem: {
    margin: '1rem 0',
  },
  link: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    color: '#000080', // Dark blue text
    backgroundColor: '#ffb3ff', // Light pink background for links
    padding: '0.5rem 1rem',
    border: '2px solid #000080', // Dark blue border
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
};

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Rollin in Dough</h1>
      <ul style={styles.linkList}>
        <li style={styles.linkItem}>
          <a href="/about" style={styles.link}>View Menu</a>
        </li>
        <li style={styles.linkItem}>
          <a href="/api" style={styles.link}>View Cart</a>
        </li>
        <li style={styles.linkItem}>
          <a href="/cart" style={styles.link}>Checkout</a>
        </li>
      </ul>
    </div>
  );
}