'use client';

import { useEffect, useState } from 'react';
import { db, Product } from '../lib/db';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await db.products.toArray();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-sm bg-white">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: Rs {product.price}</p>
              <p>Stock: {product.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
