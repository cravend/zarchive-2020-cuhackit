import styles from './Day.module.scss'

const Day = ({ name, details }) => (
  <div className={styles.box}>
    <h1>{name}</h1>
    <ul>
      <li>{details}</li>
    </ul>
  </div>
)

export default Day
