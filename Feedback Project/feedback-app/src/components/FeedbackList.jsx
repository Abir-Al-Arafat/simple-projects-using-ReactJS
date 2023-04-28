import PropTypes from 'prop-types'
import React from 'react'
import FeedbackItem from './FeedbackItem'

function FeedbackList({feedback, handleDelete}) {
  if(!feedback || feedback.length === 0){
    return <p>No Feedback yet</p>
  }
  
  return <div className='feedback-list'>
    {feedback.map((item) => 
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
    )}
  </div>
}

// setting shape of object inside of the array
FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string
    })
  )
}

export default FeedbackList