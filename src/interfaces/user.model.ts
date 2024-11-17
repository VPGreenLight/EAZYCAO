export interface User {
    id: number;
    name: string;
    email: string;
    userName: string;
    phone: string;
    address: string;
    isActive: boolean;
    roleId: number;
    money: number;
    createdAt: string; // ISO 8601 date string
    createdBy: string;
    updatedAt: string; // ISO 8601 date string
    updatedBy: string;
    deletedAt: string | null; // ISO 8601 date string or null
    isDelete: boolean;
    deletedBy: string | null;
  }
  