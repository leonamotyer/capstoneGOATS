// filepath: rollin-in-dough/rollin-in-dough/app/about/page.js
"use client";
import '../globals.css';  // Import global styles

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffccff', // Light pink background
    color: '#003366', // Dark blue text
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#003366', // Dark blue text
  },
  paragraph: {
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: '1.5',
  },
};

export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Rollin in Dough</h1>
      <p style={styles.paragraph}>
        Welcome to Rollin in Dough, your go-to destination for delicious cookies! 
        We offer a wide variety of freshly baked cookies made with the finest ingredients. 
        Our mission is to bring joy to your taste buds with every bite. 
        Whether you're ordering for a special occasion or just treating yourself, 
        we have something for everyone. Thank you for choosing us!
      </p>
    </div>
  );
}