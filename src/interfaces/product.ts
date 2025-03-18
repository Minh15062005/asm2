interface IProduct {
  id: string,
  title: string,
  category: string,
  price:number,
  stock: number,
  thumbnail: string,
  description: string
} 

export default IProduct;

export type ProductInput = Omit<IProduct,'id' | 'stock'>