export interface UnitOption {
  value: string;
  label: string;
}

// Basic unit options for tutorial simplicity
export const UNIT_OPTIONS: UnitOption[] = [
  { value: 'pcs', label: 'pieces' },
  { value: 'lbs', label: 'pounds' },
  { value: 'cups', label: 'cups' },
  { value: 'boxes', label: 'boxes' },
  { value: 'bags', label: 'bags' },
  { value: 'cans', label: 'cans' },
  { value: 'bottles', label: 'bottles' },
];

export function suggestUnitForItem(itemName: string): string {
  const name = itemName.toLowerCase();
  
  // Simple unit suggestions based on common items
  if (name.includes('meat') || name.includes('chicken') || name.includes('beef')) {
    return 'lbs';
  }
  if (name.includes('milk') || name.includes('juice') || name.includes('water')) {
    return 'cups';
  }
  if (name.includes('cereal') || name.includes('pasta') || name.includes('crackers')) {
    return 'boxes';
  }
  if (name.includes('chips') || name.includes('frozen')) {
    return 'bags';
  }
  if (name.includes('soup') || name.includes('beans')) {
    return 'cans';
  }
  if (name.includes('soda')) {
    return 'bottles';
  }
  
  // Default to pieces for countable items
  return 'pcs';
}