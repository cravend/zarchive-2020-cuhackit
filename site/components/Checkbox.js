import styles from './Checkbox.module.scss'

const Checkbox = ({ name }) => (
  <div className={styles.checkbox}>
    <input type="checkbox" name={name} id={name} />
    <label htmlFor={name}>
      &#x2714;<span> taken medicine?</span>
    </label>
  </div>
)

export default Checkbox
