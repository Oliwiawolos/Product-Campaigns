import { render, screen, fireEvent } from '@testing-library/react';
import CampaignList from '../CampaignList';
import '@testing-library/jest-dom';
import { vi } from 'vitest'; 

const dummyCampaigns = [
  {
    name: 'Test Campaign',
    keywords: ['Shoes'],
    bid: '3',
    fund: '50',
    town: 'Warsaw',
    radius: '10',
    status: 'On',
  },
];

test('calls onDelete when Delete button is clicked', () => {
  const mockOnDelete = vi.fn();

  render(
    <CampaignList 
      campaigns={dummyCampaigns} 
      onEdit={() => {}} 
      onDelete={mockOnDelete} 
    />
  );

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(mockOnDelete).toHaveBeenCalledWith(0); 
});

test('calls onEdit when Edit button is clicked', () => {
  const mockOnEdit = vi.fn();

  render(
    <CampaignList 
      campaigns={dummyCampaigns} 
      onEdit={mockOnEdit} 
      onDelete={() => {}} 
    />
  );

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);

  expect(mockOnEdit).toHaveBeenCalledWith(0); 
});

test('displays campaign data correctly', () => {
    render(
      <CampaignList 
        campaigns={dummyCampaigns} 
        onEdit={() => {}} 
        onDelete={() => {}} 
      />
    );
  
    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText(/Shoes/)).toBeInTheDocument();
    expect(screen.getByText(/Bid: 3€/)).toBeInTheDocument();
    expect(screen.getByText(/Fund: 50€/)).toBeInTheDocument();
    expect(screen.getByText(/Town: Warsaw/)).toBeInTheDocument();
    expect(screen.getByText(/Radius: 10 km/)).toBeInTheDocument();
    expect(screen.getByText(/Status: On/)).toBeInTheDocument();
  });