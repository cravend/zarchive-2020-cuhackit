import React from 'react'

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

const Day = ({ name, date, medicines }) => (
  <div className={styles.box}>
    <h2>
      {name} &mdash; {date}
    </h2>
    <ul className={styles.medicineChecklist}>
      {Object.entries(medicines).map(([key, value]) => {
        let uniqueId = key + date + value[1]
        return (
          <li key={uniqueId}>
            <Checkbox name={uniqueId} />
            {key} &mdash; {formatDate(value[1])}
          </li>
        )
      })}
    </ul>
  </div>
)

export default Day
