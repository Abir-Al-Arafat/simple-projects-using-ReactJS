import React from 'react'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

  let average = 0;

  feedback.forEach(element => {
    average += element.rating;
  });

  // setting to one decimal place
  average = (average / feedback.length).toFixed(1);

  return (
    <div className='feedback-stats'>
        <h4>Reviews({feedback.length})</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average }</h4>
    </div>
  )
}

export default FeedbackStats