export interface Order {
  id?: number;
  userId: number;
  status: 'active' | 'complete';
  products?: { productId: number; quantity: number }[];
}
