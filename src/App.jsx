import { useState } from 'react'

import './App.css'
import styles from './styles.module.css'
import FeedbackWidget from './components/FeedbackWidget'
import FeedbackButton from './components/FeedbackButton'

const App = ({ projectId, assigneeId, apiUrl, issueTypeId }) => {
  const [show, setShow] = useState(false)

  const handleToggleWidget = () => {
    setShow((prevState) => !prevState)
  }

  return (
    <div className={styles.feedback_container} data-feedback-widget>
      {show ? (
        <FeedbackWidget
          handleToggle={handleToggleWidget}
          setShowWidget={setShow}
          projectId={projectId}
          assigneeId={assigneeId}
          apiUrl={apiUrl}
          issueTypeId={issueTypeId}
        />
      ) : (
        <FeedbackButton handleToggle={handleToggleWidget} />
      )}
    </div>
  )
}

export default App
