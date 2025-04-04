import { useState } from 'react'
import './App.css'
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [emeraldBalance, setEmeraldBalance] = useState(1000); 
  
  const addCampaign = (campaign) => {
    const fund = parseFloat(campaign.fund);
    if (fund > emeraldBalance) {
      alert('Insufficient funds');
      return;
    }
    setCampaigns([...campaigns, campaign]);
    setEmeraldBalance(emeraldBalance - fund);
  };
  return (
    <>
     <div className="container">
      <h1>Product Campaigns</h1>
      <p><strong>Emerald Balance:</strong> {emeraldBalance}</p>

      {/* Formularz do tworzenia nowej kampanii */}
            <CampaignForm onAdd={addCampaign} />

      {/* Lista istniejących kampanii */}
      <CampaignList campaigns={campaigns} />
     </div>
    </>
  )
}

export default App
