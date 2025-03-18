import Link from 'next/link';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/">
          <img src="/images/logo.png" alt="Rollin in Dough Logo" style={styles.logoImage} />
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link href="/menu" style={styles.navLink}>Menu</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/cart" style={styles.navLink}>Cart</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/checkout" style={styles.navLink}>Checkout</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/about" style={styles.navLink}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#ff69b4', // Pink background
  },
  logo: {
    flex: 1,
  },
  logoImage: {
    height: '50px',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    margin: '0 1rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#1e90ff', // Blue text
    fontWeight: 'bold',
  },
};

export default NavBar;