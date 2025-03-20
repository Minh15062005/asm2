// src/interfaces/Order.ts
export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    thumbnail: string;
  }
  
  export interface Order {
    id: string;
    createdAt: string;
    items: OrderItem[];
    total: number;
    status: string;
  }