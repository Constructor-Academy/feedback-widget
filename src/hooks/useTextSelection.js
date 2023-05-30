import { useState, useEffect, useCallback } from 'react'

const useTextSelection = () => {
  const [selection, setSelection] = useState('')

  const isOutsideWidget = useCallback((element) => {
    if (element.getAttribute && element.getAttribute('data-feedback-widget')) {
      return false
    }

    if (element.parentElement) {
      return isOutsideWidget(element.parentElement)
    }

    return true
  }, [])

  const handleMouseUp = useCallback(
    (e) => {
      if (isOutsideWidget(e.target)) {
        const selectedText = window.getSelection().toString()
        setSelection(selectedText)
      }
    },
    [isOutsideWidget]
  )

  useEffect(() => {
    // if user selects text before feedback widget is open, set the selection
    const selectedText = window.getSelection().toString()
    setSelection(selectedText)
  }, [])

  useEffect(() => {
    // after the feedback widget is open, listen for mouseup events to update the selection
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp])

  return [selection, setSelection]
}

export default useTextSelection
