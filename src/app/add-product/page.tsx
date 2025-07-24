'use client';

import { useState } from 'react';
import { db } from '../lib/db';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = async () => {
    await db.products.add({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    });
    setName('');
    setPrice('');
    setQuantity('');
    alert('Product added!');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <input placeholder="Name" className="border p-2 mb-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" type="number" className="border p-2 mb-2 w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Quantity" type="number" className="border p-2 mb-2 w-full" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </div>
  );
}
