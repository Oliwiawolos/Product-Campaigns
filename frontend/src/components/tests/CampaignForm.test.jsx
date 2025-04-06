import { render, screen, fireEvent } from '@testing-library/react';
import CampaignForm from '../CampaignForm';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

test('calls onAdd when form is submitted with basic valid fields', async () => {
  const mockOnAdd = vi.fn(() => Promise.resolve(true));

  render(
    <CampaignForm
      onAdd={mockOnAdd}
      onUpdate={() => {}}
      editingIndex={null}
      editingCampaign={null}
    />
  );

  fireEvent.change(screen.getByPlaceholderText('Campaign name'), { target: { value: 'New Campaign' } });
  fireEvent.change(screen.getByPlaceholderText('Bid'), { target: { value: '5' } });
  fireEvent.change(screen.getByPlaceholderText('Campaign fund'), { target: { value: '100' } });
  fireEvent.change(screen.getByPlaceholderText('Radius (km)'), { target: { value: '25' } });
  fireEvent.submit(screen.getByRole('button', { name: /add campaign/i }).closest('form'));
  expect(mockOnAdd).toHaveBeenCalled();
});
