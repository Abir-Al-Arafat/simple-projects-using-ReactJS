import React from 'react'
import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About This Page</h1>
            <p>React App for leaving feedback for product or service</p>
            <p>Version: 1.0.0</p>
            <p><Link to="/">Back To Home</Link></p>
        </div>
    </Card>
  )
}

export default AboutPage