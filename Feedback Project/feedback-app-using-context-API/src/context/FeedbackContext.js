import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: '1st review from context',
            rating: 10
        },
        {
            id: 2,
            text: '2nd review from context',
            rating: 8
        },
        {
            id: 3,
            text: '3rd review from context',
            rating: 7
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // function for adding feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // function for deleting feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are You Sure?')){
            setFeedback(feedback.filter((item)=>
                item.id !== id
            ))
        }
    }

    // sets item that needs to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback: feedback,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
        feedbackEdit: feedbackEdit,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext