import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Success from './Pages/Success'

const router = createBrowserRouter([
    {path: '/', element: <App/>},
    {path: '/home', element: <Success/>}
])

export default router
