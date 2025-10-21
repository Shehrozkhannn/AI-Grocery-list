import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { GroceryItem, SmartSuggestion } from '../models/grocery.types';

@Injectable({
  providedIn: 'root',
})
export class AiGroceryAssistant {
  private apiRequest = signal<{ items: GroceryItem[] } | null>(null);

  private smartSuggestionResource = httpResource<SmartSuggestion[]>(() => {
    const request = this.apiRequest();
    if (!request) return undefined;

    return {
      url: '/api/smart-suggestions',
      method: 'POST',
      body: request,
    };
  });

  readonly suggestions = computed(() => {
    const resourceData = this.smartSuggestionResource.value();
    if (!resourceData) return [] as SmartSuggestion[];

    return resourceData as SmartSuggestion[];
  });

  readonly isLoading = this.smartSuggestionResource.isLoading;
  readonly error = this.smartSuggestionResource.error;

  generateSmartSuggestions(groceryItems: GroceryItem[]) {
    this.apiRequest.set({ items: groceryItems });
  }

  clearSuggestions() {
    this.apiRequest.set(null);
  }
}