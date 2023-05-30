import { useEffect } from 'react'

import styles from './styles.module.css'

const SuccessMessage = ({ setShow }) => {
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }, [setShow])

  return (
    <div className={styles.success_container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className={styles.tick_icon}
      >
        <path d="M20.285 2L9 13.567 3.714 8.556 0 12.271l9 8.729L24 4.958z"></path>
      </svg>
      <span className={styles.success_message}>
        Success! Thank you for the feedback.
      </span>
    </div>
  )
}

export default SuccessMessage
