'use client';

import { useEffect, useState } from 'react';
import { db, Customer, Sale, Product } from '../lib/db';

interface CustomerWithSales extends Customer {
  sales: (Sale & { productName: string })[];
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<CustomerWithSales[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allCustomers = await db.customers.toArray();

      const customerSales = await Promise.all(
        allCustomers.map(async (customer) => {
          const sales = await db.sales
            .where('customerId')
            .equals(customer.id!)
            .toArray();

          const detailedSales = await Promise.all(
            sales.map(async (sale) => {
              const product = await db.products.get(sale.productId);
              return {
                ...sale,
                productName: product?.name || 'Unknown',
              };
            })
          );

          return {
            ...customer,
            sales: detailedSales,
          };
        })
      );

      setCustomers(customerSales);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Customer Purchases</h1>

      {customers.map((customer) => (
        <div key={customer.id} className="mb-6 border border-gray-200 rounded p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">{customer.name}</h2>
          {customer.sales.length > 0 ? (
            <ul className="text-sm space-y-1">
              {customer.sales.map((sale) => (
                <li key={sale.id} className="flex justify-between border-b py-1">
                  <span>
                    {sale.productName} x {sale.quantity}
                  </span>
                  <span>Rs {sale.price} – {new Date(sale.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No purchases yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}
