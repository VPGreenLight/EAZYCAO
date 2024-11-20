// export interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     image: string;  // Adjusted to match the `image` field in your API
//     expiry: string;
//     quantity: number;
//     category: string;
//     brand: string;
//     createdAt: string;
//     createdBy: string;
//     updatedAt: string;
//     updatedBy: string;
//     deletedAt: string | null;
//     isDelete: boolean;
//     deletedBy: string | null;
//   }
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;  // Adjusted to match the `image` field in your API
  expiry: string;
  quantity: number;
  category: string;
  brand: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  isDelete: boolean;
  deletedBy: string | null;
  details: Array<{ id: number, serial: string, code: string, isDelete: boolean }>;
}
export interface ProductDetail {
  id: number;
  serial: string;
  code: string;
  productId: number;
  isDelete: boolean;
}