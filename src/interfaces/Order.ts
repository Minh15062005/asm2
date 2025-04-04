export interface Order {
  id: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  total: number;
  status: string;
  history?: {
    status: string;
    updatedAt: string; // hoặc Date
  }[];
}