import Dexie, { Table } from 'dexie';

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  id?: number;
  name: string;
}

export interface Sale {
  id?: number;
  customerId: number;
  productId: number;
  quantity: number;
  price: number;
  date: Date;
}

class ShopDB extends Dexie {
  products!: Table<Product>;
  customers!: Table<Customer>;
  sales!: Table<Sale>;

  constructor() {
    super('ShopDatabase');

    this.version(1).stores({
      products: '++id, name',
      customers: '++id, name',
      sales: '++id, customerId, productId, date', // 👈 this line is important
    });
  }
}

export const db = new ShopDB();


