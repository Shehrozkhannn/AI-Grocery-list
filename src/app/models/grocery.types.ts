export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity?: number;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
}

export interface SmartSuggestion {
  item: GroceryItem;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

export enum GroceryCategory {
  PRODUCE = 'produce',
  DAIRY = 'dairy',
  MEAT = 'meat',
  PANTRY = 'pantry',
  BEVERAGES = 'beverages',
  SNACKS = 'snacks',
  OTHER = 'other',
}

export interface CreateGroceryListRequest {
  includeSuggestions: boolean;
  maxSuggestions?: number;
}