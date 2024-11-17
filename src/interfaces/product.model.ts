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
  }