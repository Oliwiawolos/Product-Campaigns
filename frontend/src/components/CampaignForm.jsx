import {useState, useEffect} from  'react';
import CreatableSelect from 'react-select/creatable';
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
      
    const customStyles = {
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? '#008080' 
            : state.isFocused
            ? 'rgb(12, 184, 184)' 
            : 'white',
          color: state.isSelected || state.isFocused ? 'white' : '#1e1e1e',
          ':active': {
            backgroundColor: '#008080', 
          },
        }),
      };
      
    const statusOptions = [
        { value: 'on', label: 'On' },
        { value: 'off', label: 'Off' }
      ];

    // Przykładowe miasta 
    const townOptions = [
        { value: 'Berlin', label: 'Berlin' },
        { value: 'Warsaw', label: 'Warsaw' },
        { value: 'Paris', label: 'Paris' },
        { value: 'Oslo', label: 'Olso' },
        { value: 'Madrid', label: 'Madrid' },
        { value: 'Riga', label: 'Riga' },
        { value: 'Stockholm', label: 'Stockholm' },
        { value: 'Prague', label: 'Prague' },
        { value: 'London', label: 'London' },
        { value: 'Rome', label: 'Rome' },
      ];

    
    // Przykładowe słowa kluczowe
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
                className="form-field"
                type="text"
                autoComplete="off"
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Campaign name" 
                required 
            />

            <CreatableSelect
                isMulti
                name="keywords"
                className="form-field"
                classNamePrefix="react-select"
                options={keywordOptions}
                onChange={(selected) => {
                    const values = selected.map(opt => opt.value);
                    setFormData({ ...formData, keywords: values });
                }}
                value={formData.keywords.map(value => ({
                    value,
                    label: value.charAt(0).toUpperCase() + value.slice(1)
                }))}
                placeholder="Keywords"
                components={{ IndicatorSeparator: () => null }}
                styles={customStyles}
                required
            />

            <input 
                name="bid" 
                className="form-field"
                type="number" 
                min= "1" 
                value={formData.bid} 
                onChange={handleChange} 
                placeholder="Bid" 
                required 
            />

            <input 
                name="fund" 
                className="form-field"
                type="number" 
                value={formData.fund} 
                onChange={handleChange} 
                placeholder="Campaign fund" 
                required 
            />

            <Select 
                name="status"
                className="form-field"
                classNamePrefix="react-select"
                options={statusOptions}
                placeholder="Select status"
                value={formData.status ? statusOptions.find(opt => opt.value === formData.status) : null}
                onChange={(selected) => setFormData({ ...formData, status: selected.value })}
                components={{ IndicatorSeparator: () => null }}
                styles={customStyles}
                required 
            >
            </Select>

            <Select 
                name="town" 
                className="form-field"
                classNamePrefix="react-select"
                placeholder="Select town"
                options={townOptions}
                value={formData.town ? townOptions.find(opt => opt.value === formData.town) : null}
                onChange={(selected) => setFormData({ ...formData, town: selected.value })} 
                components={{ IndicatorSeparator: () => null }}
                styles={customStyles}
                required
            />


            <input 
                name="radius" 
                className="form-field"
                type="number" 
                value={formData.radius} 
                onChange={handleChange} 
                placeholder="Radius (km)" 
                required
            />

            <div className="submit-wrapper">
                <button type="submit">
                    {editingIndex === null ? 'Add campaign' : 'Update campaign'}
                </button>
            </div>
        </form>
    )
}