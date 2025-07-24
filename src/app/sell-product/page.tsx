'use client';

import { useEffect, useState } from 'react';
import { db, Product, Sale, Customer } from '../lib/db';

export default function SellProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await db.products.toArray();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  const handleSell = async () => {
    if (!selectedProductId || quantity < 1 || !customerName.trim()) return alert("Please complete all fields");

    const product = await db.products.get(selectedProductId);
    if (!product || product.quantity < quantity) {
      return alert("Not enough stock");
    }

    // Reduce product quantity
    await db.products.update(selectedProductId, {
      quantity: product.quantity - quantity,
    });

    // Add customer if not exists
    let customer = await db.customers.where("name").equals(customerName).first();
    if (!customer) {
      const customerId = await db.customers.add({ name: customerName });
      customer = { id: customerId, name: customerName };
    }

    // Record sale
    const sale: Omit<Sale,  'id'> = {
      productId: product.id!,
      quantity,
      price: product.price * quantity,
      date:  new Date(),
      customerId: customer.id!,
    };
    await db.sales.add(sale);

    alert("Sale recorded!");
    setSelectedProductId(null);
    setQuantity(1);
    setCustomerName('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sell Product</h2>

      <select
        className="w-full p-2 mb-2 border rounded"
        value={selectedProductId ?? ''}
        onChange={(e) => setSelectedProductId(Number(e.target.value))}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — Rs {p.price} ({p.quantity} in stock)
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full p-2 mb-2 border rounded"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
      />

      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        onClick={handleSell}
      >
        Sell
      </button>
    </div>
  );
}
