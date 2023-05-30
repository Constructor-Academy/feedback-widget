import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const feedbackWidgetRoot = document.getElementById('feedback-widget-root')
console.log('feedbackWidgetRoot loading', feedbackWidgetRoot)

let retries = 0
const maxRetries = 10
const retryDelay = 5000 // 5 seconds

const renderWidget = () => {
  if (feedbackWidgetRoot) {
    const projectId = feedbackWidgetRoot.getAttribute('data-project-id')
    const assigneeId = feedbackWidgetRoot.getAttribute('data-assignee-id')
    const apiUrl = feedbackWidgetRoot.getAttribute('data-api-url')
    const issueTypeId = feedbackWidgetRoot.getAttribute('data-issue-type-id')

    ReactDOM.render(
      <React.StrictMode>
        <App
          projectId={projectId}
          assigneeId={assigneeId}
          apiUrl={apiUrl}
          issueTypeId={issueTypeId}
        />
      </React.StrictMode>,
      feedbackWidgetRoot
    )
  } else {
    console.log('feedbackWidgetRoot not found. Retrying in 5 seconds.')
    retries += 1
    if (retries <= maxRetries) {
      setTimeout(renderWidget, retryDelay)
    } else {
      console.log(`Failed to render widget after ${maxRetries} retries.`)
    }
  }
}

renderWidget()
