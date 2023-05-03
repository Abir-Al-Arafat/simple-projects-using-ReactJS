import {motion, AnimatePresence} from 'framer-motion'
import PropTypes from 'prop-types'
import React from 'react'
import FeedbackItem from './FeedbackItem'

function FeedbackList({feedback, handleDelete}) {
  if(!feedback || feedback.length === 0){
    return <p>No Feedback yet</p>
  }

  // with animation effects
  return (
  <div className='feedback-list'>
    <AnimatePresence>
      {feedback.map((item) => (
          <motion.div 
          key={item.id} 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          >
            <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
          </motion.div>
      ))}
    </AnimatePresence>
  </div>
)
  
  // without animation effects
  // return <div className='feedback-list'>
  //   {feedback.map((item) => 
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
  //   )}
  // </div>
}

// setting shape of object inside of the array
FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string
    })
  )
}

export default FeedbackList