import React from 'react'
import PropTypes from 'prop-types'

function FeedbackStats({feedback}) {
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

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
}

export default FeedbackStats