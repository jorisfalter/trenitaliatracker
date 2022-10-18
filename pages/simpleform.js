import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Datepicker from './datepicker.js'
import { useForm, Controller } from "react-hook-form";


export default function Form() {
  const { handleSubmit, control } = useForm();  
  
  return (
      <div className="container">
        <p className={styles.title}>
          What date do you want to take an Italian train?
        </p>
        <p className={styles.description}>
        Share your preferred date
        </p>
        <p className={styles.description}>
        We'll send you an email when the schedule is online
        </p>

        <form action="/api/form" method="post">
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" name="first" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          {/* <label htmlFor="last">Date</label>
          <Datepicker />
          <input type="text" id="last" name="last" required /> */}

          <label htmlFor="date">Date of intended travel</label>
          <Controller
                name='dateinput'
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