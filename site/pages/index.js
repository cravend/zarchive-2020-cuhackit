import Container from '../components/Container'
import Day from '../components/Day'
import Register from '../components/Register'
import styles from './index.module.scss'

function HomePage() {
  return (
    <Container>
      <h1 className={styles.title}>Welcome, Dalton!</h1>
      <div className={styles.flexContainer}>
        <Day name="Today" medicine={{ name: 'Atorvastatin', time: '22:00' }} />
        <Day name="Tomorrow" medicine={{ name: 'Tretonin', time: '07:00' }} />
      </div>
      <hr />
      <Register />
    </Container>
  )
}

export default HomePage
