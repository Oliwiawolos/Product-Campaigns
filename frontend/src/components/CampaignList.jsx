// Komponent otrzymuje listę kampanii jako props i wyświetla je w formie listy
export default function CampaignList({campaigns, onEdit, onDelete}){
    return(
        <div className="campaign-list">
            <h2>Campaigns</h2>
            <ul>
                {campaigns.map((c,i)=>(
                    <li key={i} className="campaign-item">
                    <div className="campaign-content">
                        <strong>{c.name}</strong> – {c.keywords.join(', ')} | Bid: {c.bid}€
                        &nbsp;| Fund: {c.fund}€
                        &nbsp;| Town: {c.town}
                        &nbsp;| Radius: {c.radius} km
                        &nbsp;| Status: {c.status}
                    </div>
                    
                    <div className="campaign-actions">
                        <button className="edit-btn" onClick={() => onEdit(i)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(i)}>Delete</button>
                    </div>
                  </li>                                   
                ))}
            </ul>
        </div>
    )
}