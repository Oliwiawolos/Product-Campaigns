//Komponent otrzymuje listę kampanii jako props i wyświetla je w formie listy
export default function CampaignList({campaigns}){
    return(
        <div>
            <h2>Campaigns</h2>
            <ul>
                {campaigns.map((c,i)=>(
                    <li key={i}>
                    <strong>{c.name}</strong> – {c.keywords.join(', ')} – {c.bid}€
                  </li>                  
                ))}
            </ul>
        </div>
    )
}