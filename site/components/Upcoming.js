import styles from './Upcoming.module.scss'

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

const UpcomingDay = ({ name, date, medicines }) => (
  <div className={styles.dayBox}>
    <div className={styles.head}>
      <h3>{name}</h3>
      <p>{date}</p>
    </div>
    <ul>
      {Object.entries(medicines).map(([key, value]) => {
        let uniqueId = key + date + value[1]
        return (
          <li className={styles.medicine} key={uniqueId}>
            {key}
            <br />
            <em>
              <small>{formatDate(value[1])}</small>
            </em>
          </li>
        )
      })}
    </ul>
  </div>
)

const Upcoming = ({ data }) => (
  <div className={styles.flexContainer}>
    <UpcomingDay name="Tuesday" date="Jan 28" medicines={data[2]} />
    <UpcomingDay name="Wednesday" date="Jan 29" medicines={data[3]} />
    <UpcomingDay name="Thursday" date="Jan 30" medicines={data[4]} />
    <UpcomingDay name="Friday" date="Jan 31" medicines={data[5]} />
    <UpcomingDay name="Saturday" date="Feb 01" medicines={data[6]} />
  </div>
)

export default Upcoming
