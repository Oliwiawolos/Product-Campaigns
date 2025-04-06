import { useState, useEffect } from 'react'
import './App.scss'; 
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [emeraldBalance, setEmeraldBalance] = useState(1000); 
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch('https://product-campaigns.onrender.com/campaigns')
      .then(response => response.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error(error));
  }, []);

  const addCampaign = async (campaign) => {
    const fund = parseFloat(campaign.fund);
    if (fund > emeraldBalance) {
      alert('Insufficient funds');
      return false;
    }

    try {
      const response = await fetch('https://product-campaigns.onrender.com/campaigns', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign)
      });
      if (!response.ok) {
        throw new Error('Error adding campaign');
      }
      const newCampaign = await response.json();
      setCampaigns([...campaigns, newCampaign]);
      setEmeraldBalance(emeraldBalance - fund);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const deleteCampaign = async (index) => {
    const campaignToDelete = campaigns[index];

    try {
      const response = await fetch(`https://product-campaigns.onrender.com/campaigns/${campaignToDelete.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting campaign');
      }
      const fundToReturn = parseFloat(campaigns[index].fund);
      setEmeraldBalance(emeraldBalance + fundToReturn);
      setCampaigns(campaigns.filter((_, i) => i !== index));
      if (editingIndex === index){
        setEditingIndex(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCampaign = async (updatedCampaign) => {
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

    try {
      const response = await fetch(`https://product-campaigns.onrender.com/campaigns/${oldCampaign.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updatedCampaign)
      });
      if(!response.ok){
        throw new Error('Error updating campaign');
      }
      const returnedCampaign = await response.json();
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[editingIndex] = returnedCampaign;
      setCampaigns(updatedCampaigns);
      setEditingIndex(null);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

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