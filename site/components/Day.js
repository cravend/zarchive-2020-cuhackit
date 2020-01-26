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

const Day = ({ name, date, medicine }) => (
  <div className={styles.box}>
    <h2>
      {name} &mdash; {date}
    </h2>
    <ul className={styles.medicineChecklist}>
      <li>
        <Checkbox name={medicine.name} />
        {medicine.name} &mdash; <em>{formatDate(medicine.time)}</em>
      </li>
    </ul>
  </div>
)

export default Day
