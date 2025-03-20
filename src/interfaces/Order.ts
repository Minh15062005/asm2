export interface Customer {
    name: string;
    phone: string;
    address: string;
  }
  
  export interface Order {
    id: string;
    customer: Customer;
    total: number;
    status: string;
  }
  