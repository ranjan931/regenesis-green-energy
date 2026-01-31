import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.jpeg';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + Brand */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-17 h-18 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Regenesis Green Energy Logo"
                className="w-12 h-16 object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-green-700">
                Regenesis Green Energy
              </div>
              <div className="text-xs font-semibold text-yellow-600 tracking-wide">
                Clean Power Solutions
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Home
            </a>
            <a
              href="/#projects"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Projects
            </a>
            <a
              href="/#about"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              About
            </a>

            {/* ADMIN – ONLY VISIBLE IN DEVELOPMENT */}
            {import.meta.env.DEV && (
              <a
                href="/admin"
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Admin
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/#projects"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="/#about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>

            {/* ADMIN – ONLY VISIBLE IN DEVELOPMENT */}
            {import.meta.env.DEV && (
              <a
                href="/admin"
                className="block px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
