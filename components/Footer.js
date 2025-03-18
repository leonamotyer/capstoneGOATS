import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© {new Date().getFullYear()} Rollin in Dough. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/about" style={styles.link}>About Us</a>
          <a href="/menu" style={styles.link}>Menu</a>
          <a href="/cart" style={styles.link}>Cart</a>
          <a href="/checkout" style={styles.link}>Checkout</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ff69b4', // Pink background
    color: '#ffffff', // White text
    padding: '1rem 0',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  text: {
    margin: '0',
  },
  links: {
    marginTop: '0.5rem',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    margin: '0 1rem',
    transition: 'color 0.3s ease',
  },
};

export default Footer;