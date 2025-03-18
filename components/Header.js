import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src="/images/logo.png" alt="Rollin in Dough Logo" style={styles.logoImage} />
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/menu" style={styles.navLink}>Menu</Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/cart" style={styles.navLink}>Cart</Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/checkout" style={styles.navLink}>Checkout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
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
  nav: {
    flex: 2,
  },
  navList: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    margin: '0 1rem',
  },
  navLink: {
    color: '#1e90ff', // Blue text
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Header;