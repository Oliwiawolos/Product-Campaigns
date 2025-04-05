// Komponent otrzymuje listę kampanii jako props i wyświetla je w formie listy
export default function CampaignList({campaigns, onEdit, onDelete}){
    return(
        <div>
            <h2>Campaigns</h2>
            <ul>
                {campaigns.map((c,i)=>(
                    <li key={i}>
                    <strong>{c.name}</strong> – {c.keywords.join(', ')} – {c.bid}€
                    &nbsp;| Fund: {c.fund}
                    &nbsp;| Town: {c.town}
                    &nbsp;| Radius: {c.radius} km
                    &nbsp;| Status: {c.status}

                    <button onClick={() => onEdit(i)}>Edit</button>
                    <button onClick={() => onDelete(i)}>Delete</button>
                  </li>                                   
                ))}
            </ul>
        </div>
    )
}