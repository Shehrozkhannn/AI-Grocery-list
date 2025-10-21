import { Injectable, signal } from '@angular/core';
import { GroceryList, GroceryItem } from '../models/grocery.types';

@Injectable({
  providedIn: 'root',
})
export class Grocery {
  private currentList = signal<GroceryList | null>(null);

  readonly list = this.currentList.asReadonly();

  constructor() {
    this.loadFromStorage();
  }

  // creating a new list
  createNewList(name?: string): GroceryList {
    const newList: GroceryList = {
      id: this.generateId(),
      name: name || `Grocery List - ${new Date().toLocaleDateString()}`,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    };

    this.currentList.set(newList);
    this.saveToStorage();

    return newList;
  }

  addItemToCurrentList(item: GroceryItem) {
    const current = this.currentList();
    if (!current) {
      return;
    }
    this.currentList.update((currentList) => {
      const list = currentList as GroceryList;
      const updatedList = {
        ...list,
        items: [...list.items, item],
        updatedAt: new Date(),
      };
      return updatedList;
    });
    this.saveToStorage();
  }

  removeItemFromCurrentList(itemId: string) {
    const current = this.currentList();
    if (!current) {
      return;
    }
    this.currentList.update((currentList) => {
      const list = currentList as GroceryList;
      const updatedList = {
        ...list,
        items: list.items.filter((item) => item.id !== itemId),
        updatedAt: new Date(),
      };
      return updatedList;
    });
    this.saveToStorage();
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return; // for SSR

    try {
      const savedList = localStorage.getItem('grocery_current_list');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        const list = {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt),
        };
        this.currentList.set(list);
      }
    } catch (error) {
      console.error('Failed to load from storage', error);
    }
  }

  saveToStorage() {
    if (typeof localStorage === 'undefined') return; // for SSR
    try {
      const currentList = this.currentList();
      if (currentList) {
        localStorage.setItem('grocery_current_list', JSON.stringify(currentList));
      }
    } catch (error) {
      console.error('Failed to save to localStorage', error);
    }
  }

  generateId() {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}