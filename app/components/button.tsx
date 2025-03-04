import React from 'react'

const button = ({text}:{text: string}) => {
  return (
    <div className="section-btn">
      <p>{text}</p>
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7071 8.20711C18.0976 7.81658 18.0976 7.18342 17.7071 6.79289L11.3431 0.428932C10.9526 0.0384079 10.3195 0.0384079 9.92893 0.428932C9.53841 0.819456 9.53841 1.45262 9.92893 1.84315L15.5858 7.5L9.92893 13.1569C9.53841 13.5474 9.53841 14.1805 9.92893 14.5711C10.3195 14.9616 10.9526 14.9616 11.3431 14.5711L17.7071 8.20711ZM0 8.5L17 8.5V6.5L0 6.5L0 8.5Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default button