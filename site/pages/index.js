import Container from '../components/Container'
import Day from '../components/Day'
import Upcoming from '../components/Upcoming'
import Register from '../components/Register'
import styles from './index.module.scss'

function HomePage() {
  return (
    <Container>
      <h1 className={styles.title}>Welcome, Dalton!</h1>
      <div className={styles.flexContainer}>
        <Day
          name="Today"
          date="January 26"
          medicine={{ name: 'Atorvastatin', time: '22:00' }}
        />
        <Day
          name="Tomorrow"
          date="January 27"
          medicine={{ name: 'Tretonin', time: '07:00' }}
        />
      </div>
      <hr />
      <Upcoming />
      <hr />
      <Register />
    </Container>
  )
}

export default HomePage
