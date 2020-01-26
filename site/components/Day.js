import Checkbox from '../components/Checkbox'
import styles from './Day.module.scss'

function formatDate(date) {
  var split = date.split(':')
  var hour = parseInt(split)
  var label = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  if (hour == 0) {
    hour++
  }
  return hour + ':' + split[1] + ' ' + label
}

const Day = ({ name, medicine }) => (
  <div className={styles.box}>
    <h2>{name}</h2>
    <ul>
      <li>
        <Checkbox name={medicine.name} />
        {medicine.name} &mdash; <em>{formatDate(medicine.time)}</em>
      </li>
    </ul>
  </div>
)

export default Day
