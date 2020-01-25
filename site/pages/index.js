import Container from '../components/Container'
import Day from '../components/Day'
import styles from '../styles.scss'

function HomePage() {
  return (
    <Container>
      <div className={styles.flexContainer}>
        <Day name="Today" details="Heck yeah" />
        <Day name="Tomorrow" details="Heck yeah" />
      </div>
    </Container>
  )
}

export default HomePage
