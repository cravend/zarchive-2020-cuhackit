import styles from './Register.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'

const Error = ({ children }) => (
  <div className={styles.required}>{children}</div>
)

const Checkbox = ({ name, type, message, value }) => (
  <div className={styles.dateButton}>
    <Field
      type={type}
      name={name}
      id={value ? value : name}
      value={value ? value : undefined}
    />
    <label htmlFor={value ? value : name}>{message}</label>
  </div>
)

const Element = ({ name, type, message, value }) => (
  <div className={styles.element}>
    <label htmlFor={value ? value : name} className={styles.elementLabel}>
      {message}
    </label>
    <Field
      className={styles.fieldStyle}
      type={type}
      name={name}
      id={value ? value : name}
      value={value ? value : undefined}
    />
  </div>
)

const Basic = () => (
  <div className={styles.container}>
    <h2>Add a New Prescription</h2>
    <p className={styles.note}>All fields are required</p>
    <Formik
      initialValues={{
        name: '',
        days: undefined,
        time: ''
      }}
      validate={values => {
        //[0-9][0-9]:[0-9][0-9]
        const errors = {}
        if (!values.name) {
          errors.name = 'Name of medicine is required.'
        }
        if (values.days == undefined) {
          errors.days = 'Please choose at least one day to schedule.'
        }
        if (!/^[0-2][0-9]:[0-6][0-9]$/.test(values.time)) {
          errors.time = 'Please enter a valid time.'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2)) // put cool post stuff here
          resetForm()
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <ErrorMessage name="name" component={Error} />
          <ErrorMessage name="days" component={Error} />
          <ErrorMessage name="time" component={Error} />

          <div className={styles.flexContainer}>
            <Element name="name" type="text" message="Enter medicine name:" />

            <Element
              name="time"
              type="time"
              message="Enter time for reminder (00:00):"
            />
          </div>
          <br />
          <p className={styles.elementLabel}>
            Select days to receive reminders:
          </p>
          <div className={styles.flexContainer}>
            <Checkbox name="days" type="checkbox" message="S" value="S" />
            <Checkbox name="days" type="checkbox" message="M" value="M" />
            <Checkbox name="days" type="checkbox" message="T" value="T" />
            <Checkbox name="days" type="checkbox" message="W" value="W" />
            <Checkbox name="days" type="checkbox" message="T" value="R" />
            <Checkbox name="days" type="checkbox" message="F" value="F" />
            <Checkbox name="days" type="checkbox" message="S" value="U" />
          </div>
          <br />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

export default Basic
