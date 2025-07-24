'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex gap-4">
        <Link href="/customers" className="text-white px-4 py-2">Customers</Link>
        <Link href="/">Home</Link>
        <Link href="/add-product">Add Product</Link>
        <Link href="/products">Products</Link>
        <Link href="/sell-product">Sell</Link>
        <Link href="/customers">Customers</Link>
      </div>
    </nav>
  );
}
