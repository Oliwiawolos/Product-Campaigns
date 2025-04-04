import {useState} from  'react';
import Select from 'react-select';

//Komponent przekazuje dane kampanii do rodzica przez funkcję onAdd
export default function CampaignForm({onAdd}){
    const [formData, setFormData]=useState({
        name: '',
        keywords: [],
        bid: '',
        fund: '',
        status: '',
        town: '',
        radius: ''
    });

    //obsługa zmiany wartości pól formularza 
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    //obsługa wysłania formularza
    const handleSubmit=(e)=>{
        e.preventDefault();
        onAdd(formData);
        setFormData({
            name: '',
            keywords: [],
            bid: '',
            fund: '',
            status: '',
            town: '',
            radius: '',
        });
    };

    //Przykładowe miasta 
    const towns = ['Berlin', 'Warsaw', 'Paris', 'Oslo', 'Madrid', 'Riga','Stockholm','Prague','London', 'Rome'];
    
    //Przykładowe słowa kluczowe
    const keywordOptions = [
        { value: 'shoes', label: 'Shoes' },
        { value: 'clothes', label: 'Clothes' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'books', label: 'Books' },
        { value: 'sports', label: 'Sports' },
        { value: 'beauty', label: 'Beauty' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'jewelry', label: 'Jewelry' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'garden', label: 'Garden' },
        { value: 'music', label: 'Music' },
        { value: 'games', label: 'Games' },
      ];
      

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Campaign name" required />
            <Select
                isMulti
                name="keywords"
                options={keywordOptions}
                onChange={(selected) => {
                    const values = selected.map(opt => opt.value);
                    setFormData({ ...formData, keywords: values });
                }}
                placeholder="Select or type keywords"
            />
            <input name="bid" type="number" min= "1" value={formData.bid} onChange={handleChange} placeholder="Bid" required />
            <input name="fund" type="number" value={formData.fund} onChange={handleChange} placeholder="Campaign fund" required />
            <select name="status" value={formData.status} onChange={handleChange} required >
                <option value="on">On</option>
                <option value="off">Off</option>
            </select>
            <select name="town" value={formData.town} onChange={handleChange} required>
                <option value="">Select town</option>
                {towns.map((town) => (
                    <option key={town} value={town}>{town}</option>
                ))}
            </select>
            <input name="radius" type="number" value={formData.radius} onChange={handleChange} placeholder="Radius (km)" required/>
            <button type="submit">Add campaign</button>

        </form>
    )
}