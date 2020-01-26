import styles from './Upcoming.module.scss'

const Day = ({ name, date, medicine }) => (
  <div className={styles.flexItem}>
    <h3>
      {name} &mdash; {date}
    </h3>
    <ul>
      <li>Medicine 1</li>
      <li>medicine 2</li>
    </ul>
  </div>
)

const Upcoming = () => (
  <div className={styles.flexContainer}>
    <Day name="Tuesday" date="Jan 28" />
    <Day name="Wednesday" date="Jan 29" />
    <Day name="Thursday" date="Jan 30" />
    <Day name="Friday" date="Jan 31" />
    <Day name="Saturday" date="Feb 01" />
  </div>
)

export default Upcoming
