import { createContext, useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const defaultFeedbacks = [
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
    ]
    
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(()=>{
        fetchFeedback()
    }, [])

    // function for fetching feedback data
    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc')
        const data = await response.json()
        setFeedback(data) 
    }

    // function for adding feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback), 
        })

        const data = await response.json()
        // newFeedback.id = uuidv4()
        setFeedback([data, ...feedback])
    }

    // function for deleting feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are You Sure?')){
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            setFeedback(feedback.filter((item)=>
                item.id !== id
            ))
        }
    }

    // function for updating feedback
    const updateFeedback = async (id, updateItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item)=>{
            return item.id === id ? {...item, ...data} : item
        }))
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
        feedbackEdit: feedbackEdit,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
        updateFeedback: updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext