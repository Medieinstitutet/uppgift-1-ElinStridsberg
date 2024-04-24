import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import CartProvider from './models/CartContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <CartProvider>
   <RouterProvider router={router}></RouterProvider>

    </CartProvider> 
 </React.StrictMode>,
)
