import styles from './styles.module.css'

const FeedbackButton = ({ handleToggle }) => {
  return (
    <button type="button" onClick={handleToggle} className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="svg2"
        viewBox="0 0 16 16"
        version="1.1"
        className={styles.lightning_icon}
      >
        <g id="layer1" transform="translate(0 -1036.4)">
          <path
            id="path2996"
            d="m3.4724 8.5186 3.0305-7.0711h6.9448l-5.0192 5.0823h4.1353l-8.1128 9.0914 2.0834-7.1342z"
            transform="translate(0 1036.4)"
            fill="#ffd500"
          />
        </g>
      </svg>
      Give Feedback
    </button>
  )
}

export default FeedbackButton
