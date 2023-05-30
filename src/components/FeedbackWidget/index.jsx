import { useState } from 'react'
import axios from 'axios'

import useTextSelection from '../../hooks/useTextSelection'
import { getCookie } from '../../cookies'
import styles from './styles.module.css'
import SuccessMessage from '../SuccessMessage'

const FeedbackWidget = ({
  handleToggle,
  setShowWidget,
  projectId,
  assigneeId,
  apiUrl,
  issueTypeId,
}) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [username, setUsername] = useState('anonymous')
  const [title, setTitle] = useState('')
  const [feedback, setFeedback] = useState('')
  const [selection, setSelection] = useTextSelection()

  const handleReset = () => {
    setTitle('')
    setFeedback('')
    setSelection('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    if (title && selection) {
      axios
        .post(
          apiUrl,
          {
            fields: {
              project: {
                key: projectId,
              },
              assignee: {
                id: assigneeId,
              },
              summary: title,
              issuetype: {
                id: issueTypeId,
              },
              description: `Page \n ${window.location.href} \n \n Feedback \n ${feedback} \n \n Selection \n ${selection}`,
              customfield_10109: username,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('materials_access')}`,
            },
          }
        )
        .then(() => {
          setSuccess(true)
        })
        .catch((error) => {
          console.log('Error', error)
        })
    } else if (!title) {
      setError('Please provide a title!')
    } else if (!selection) {
      setError('Please provide a text selection!')
    }
  }

  // Update the username state if the cookie exists
  const storedUsername = getCookie('momentum_username')
  if (storedUsername) {
    setUsername(storedUsername)
  }

  return (
    <>
      {success ? (
        <SuccessMessage setShow={setShowWidget} />
      ) : (
        <form className={styles.feedback_form} onSubmit={handleSubmit}>
          <div className={styles.info_close}>
            <div className={styles.user_info}>
              Please select a text that you want to give feedback about with
              your mouse. Only select the important part. It will appear here:
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className={styles.close_button}
            >
              X
            </button>
          </div>
          {selection && (
            <div className={styles.text_selection}>{selection}</div>
          )}
          {error && <div className={styles.user_error}>{error}</div>}
          <input
            type="text"
            placeholder="*Please provide a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Tell us more..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
          ></textarea>
          <div className={styles.buttons}>
            {(selection || title || feedback) && (
              <button
                type="button"
                className={styles.feedback__remove_selection}
                onClick={handleReset}
              >
                Reset
              </button>
            )}
            <button type="submit" className={styles.feedback__submit}>
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default FeedbackWidget
