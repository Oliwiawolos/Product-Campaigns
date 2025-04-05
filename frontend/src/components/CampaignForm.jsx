import {useState, useEffect} from  'react';
import Select from 'react-select';

export default function CampaignForm({
    onAdd,
    onUpdate,
    editingIndex,
    editingCampaign
}) {
    const defaultFormData = {
        name: '',
        keywords: [],
        bid: '',
        fund: '',
        status: '',
        town: '',
        radius: ''
    };

    const [formData, setFormData] = useState(defaultFormData)
    
    useEffect(() => {
        if (editingCampaign){
            setFormData(editingCampaign);
        } else {
            setFormData(defaultFormData);
        }
    }, [editingCampaign]);

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let success;
        if (editingIndex === null){
            success = onAdd(formData);
        } else {
            success = onUpdate(formData);
        }
        if (success){
            setFormData(defaultFormData);
        }
    };

    //Przykładowe miasta 
    const towns = [
        'Berlin', 'Warsaw', 'Paris', 'Oslo', 'Madrid', 'Riga','Stockholm','Prague','London', 'Rome'
    ];
    
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
            <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Campaign name" 
                required 
            />
            
            <Select
                isMulti
                name="keywords"
                options={keywordOptions}
                onChange={(selected) => {
                    const values = selected.map(opt => opt.value);
                    setFormData({ ...formData, keywords: values });
                }}
                value={keywordOptions.filter((opt) => formData.keywords.includes(opt.value))}
                placeholder="Select or type keywords"
            />

            <input 
                name="bid" 
                type="number" 
                min= "1" 
                value={formData.bid} 
                onChange={handleChange} 
                placeholder="Bid" 
                required 
            />

            <input 
                name="fund" 
                type="number" 
                value={formData.fund} 
                onChange={handleChange} 
                placeholder="Campaign fund" 
                required 
            />

            <select 
                name="status"
                value={formData.status} 
                onChange={handleChange} 
                required 
            >
                <option value="">Select status</option>
                <option value="on">On</option>
                <option value="off">Off</option>
            </select>

            <select 
                name="town" 
                value={formData.town} 
                onChange={handleChange} 
                required
            >
                <option value="">Select town</option>
                {towns.map((town) => (
                    <option key={town} value={town}>{town}</option>
                ))}
            </select>

            <input 
                name="radius" 
                type="number" 
                value={formData.radius} 
                onChange={handleChange} 
                placeholder="Radius (km)" 
                required
            />
            
            <button type="submit">
                {editingIndex === null ? 'Add campaign' : 'Update campaign'}
            </button>
        </form>
    )
}