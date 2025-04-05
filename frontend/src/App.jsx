import { useState } from 'react'
import './App.scss'; 
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [emeraldBalance, setEmeraldBalance] = useState(1000); 
  const [editingIndex, setEditingIndex] = useState(null);

  const addCampaign = (campaign) => {
    const fund = parseFloat(campaign.fund);
    if (fund > emeraldBalance) {
      alert('Insufficient funds');
      return false;
    }
    setCampaigns([...campaigns, campaign]);
    setEmeraldBalance(emeraldBalance - fund);
    return true;
  };

  const deleteCampaign = (index) => {
    const fundToReturn = parseFloat(campaigns[index].fund);
    setEmeraldBalance(emeraldBalance + fundToReturn);
    setCampaigns(campaigns.filter((_, i) => i !== index));
    if (editingIndex === index){
      setEditingIndex(null);
    }
  };

  const updateCampaign = (updatedCampaign) => {
    const oldCampaign = campaigns[editingIndex];
    const oldFund = parseFloat(oldCampaign.fund);
    const newFund = parseFloat(updatedCampaign.fund);
    
    if(newFund > oldFund){
      const diff = newFund - oldFund;
      // Jeśli kampania została zwiększona, sprawdź czy użytkownik ma środki
      if(diff > emeraldBalance){
        alert('Insufficient funds for update');
        return false;
      } else {
        setEmeraldBalance(emeraldBalance - diff);
      }
    } else if (newFund < oldFund){
      const diff = oldFund - newFund;
      // Jeśli kampania została zmniejszona, zwróć różnicę
      setEmeraldBalance(emeraldBalance + diff);
    }

    const updatedCampaigns = [...campaigns];
    updatedCampaigns[editingIndex] = updatedCampaign;
    setCampaigns(updatedCampaigns);

    setEditingIndex(null);
    return true;
  }

  const editCampaign = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h1>Product Campaigns</h1>
      <p><strong>Emerald Balance:</strong> {emeraldBalance}</p>

      { (emeraldBalance > 0 || editingIndex !== null) ?  (
        <CampaignForm 
          onAdd={addCampaign} 
          onUpdate={updateCampaign}
          editingIndex={editingIndex}
          editingCampaign={editingIndex !== null ? campaigns[editingIndex] : null}
        />
      ) : (
        <p>You have no more emeralds. You can't create new campaigns right now.</p>
      )}
    
    <CampaignList 
      campaigns={campaigns} 
      onEdit={editCampaign}
      onDelete={deleteCampaign}
    />
    </div>
  )
}

export default App