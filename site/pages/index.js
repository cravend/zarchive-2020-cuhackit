import Container from '../components/Container'
import Day from '../components/Day'
import Register from '../components/Register'
import styles from '../theme/styles.scss'

function HomePage() {
  return (
    <Container>
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
