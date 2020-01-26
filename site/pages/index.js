import Header from '../components/Header'
import Container from '../components/Container'
import Day from '../components/Day'
import Upcoming from '../components/Upcoming'
import Register from '../components/Register'
import styles from './index.module.scss'

function HomePage() {
  return (
    <>
      <Header />
      <Container>
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
        <div className={styles.flexContainer}>
          <Upcoming />
          <Register />
        </div>
      </Container>
    </>
  )
}

export default HomePage
