import Container from '../components/Container'
import styles from './Header.module.scss'

const Header = () => (
  <div className={styles.container}>
    <Container>
      <h1 className={styles.title}>Welcome to ReMedic!</h1>
    </Container>
  </div>
)

export default Header
