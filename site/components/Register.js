import styles from './Register.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'

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
  <div>
    <label htmlFor={value ? value : name}>
      {message}
      <br />
      <Field
        type={type}
        name={name}
        id={value ? value : name}
        value={value ? value : undefined}
      />
    </label>
  </div>
)

const Basic = () => (
  <div>
    <h2>Add New Medicine</h2>
    <Formik
      initialValues={{
        name: '',
        days: undefined,
        time: '',
        test: undefined
      }}
      validate={values => {
        //[0-9][0-9]:[0-9][0-9]
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        if (values.days == undefined) {
          errors.days = 'Choose at least one'
        } else if (!/^[0-9][0-9]:[0-9][0-9]$/.test(values.time)) {
          errors.time = 'Invalid time'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2)) // put cool post stuff here
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Element name="name" type="text" message="Enter medicine name: " />
          <ErrorMessage name="name" component="div" />
          <ErrorMessage name="days" component="div" />
          <div style={{ display: 'flex' }}>
            <Checkbox name="days" type="checkbox" message="S" value="S" />
            <Checkbox name="days" type="checkbox" message="M" value="M" />
            <Checkbox name="days" type="checkbox" message="T" value="T" />
            <Checkbox name="days" type="checkbox" message="W" value="W" />
            <Checkbox name="days" type="checkbox" message="T" value="R" />
            <Checkbox name="days" type="checkbox" message="F" value="F" />
            <Checkbox name="days" type="checkbox" message="S" value="U" />
          </div>
          <ErrorMessage name="time" component="div" />

          <Element
            name="time"
            type="time"
            message="Enter time for reminder (00:00): "
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

export default Basic
