import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.jpeg'; // adjust path if needed

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Regenesis Green Energy Logo"
                  className="w-9 h-9 object-contain"
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
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              Leading the renewable energy revolution with innovative solar solutions.
              Committed to a sustainable future for generations to come.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-green-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-green-500 transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-green-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-green-500 transition">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                <span className="text-sm">regenesisgreenenerg.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-sm">+91- 94450212027
</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 mt-1" />
                <span className="text-sm">
                  Bangalore, Karnataka, India 560001
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Regenesis Green Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
