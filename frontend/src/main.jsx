import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductCampaigns from './ProductCampaigns.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductCampaigns />
  </StrictMode>,
)
