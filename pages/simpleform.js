import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Datepicker from './datepicker.js'
import { useForm, Controller } from "react-hook-form";


export default function Form() {
  const { handleSubmit, control } = useForm();  
  
  return (
      <div className="container">
        <h1 className={styles.title}>
          Form{' '}
          <Link href="/">
            <a>without</a>
          </Link>{' '}
          JavaScript.
        </h1>

        <p className={styles.description}>
        Get started by looking at{' '}
        <code className={styles.code}>pages/no-js-form.js</code>
        </p>

        <form action="/api/form" method="post">
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" name="first" required />
    
          <label htmlFor="last">Last Name</label>
          <input type="text" id="last" name="last" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="last">Date</label>
          <Datepicker />
          <input type="text" id="last" name="last" required />

          <Controller
                name='date-input'
                control={control}
                render={({ onChange, value }) => (
                    <Datepicker
                        selected={value}
                        onChange={onChange}
                    />
                )}
            />
    
          <button type="submit">Submit</button>
        </form>
      </div>

    )
  }