"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Stay Connected</h3>
          <p className="text-sm mb-3">Follow us on social media for deals and updates!</p>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/share/17qJm5Tdky/" target="_blank" className="hover:text-white"> Facebook</Link>
            <Link href="https://wa.me/02058419955" target="_blank" className="hover:text-white">  Whatsapp</Link>
            <Link href="https://github.com/thesst24" target="_blank" className="hover:text-white"> Github</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
