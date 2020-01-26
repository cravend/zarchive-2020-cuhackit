import Header from '../components/Header'
import Container from '../components/Container'
import Day from '../components/Day'
import Upcoming from '../components/Upcoming'
import Register from '../components/Register'
import fetch from 'isomorphic-unfetch'
import styles from './index.module.scss'

function HomePage({ days }) {
  return (
    <>
      <Header />
      <Container>
        <div className={styles.flexContainer}>
          <Day name="Today" date="January 26" medicines={days[0]} />
          <Day name="Tomorrow" date="January 27" medicines={days[1]} />
        </div>
        <hr />
        <div className={styles.flexContainer}>
          <Upcoming data={days} />
          <Register />
        </div>
      </Container>
    </>
  )
}

HomePage.getInitialProps = async function() {
  var date = new Date()
  date = date.toISOString().substring(0, 10)
  const res = await fetch('http://localhost:5000/notifications?day=' + date)
  const data = await res.json()

  console.log(`Data fetched. Count: ${data.length}`)
  console.log(data)

  return {
    days: data
  }
}

export default HomePage
