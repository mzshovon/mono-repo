import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Success from './Pages/Success'
import Failed from './Pages/Failed'

const router = createBrowserRouter([
    {path: '/', element: <App/>},
    {path: '/success', element: <Success/>},
    {path: '/fail', element: <Failed/>}
])

export default router
