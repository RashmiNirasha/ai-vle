import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-100 text-sky-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-sky-600" />
              <span>support@edufocus.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-sky-600" />
              <span>+1 (234) 567-890</span>
            </p>
            <p className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-sky-600" />
              <span>123 Edu Lane, Knowledge City</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="hover:text-sky-500 transition">Dashboard</a></li>
              <li><a href="/courses" className="hover:text-sky-500 transition">Courses</a></li>
              <li><a href="/library" className="hover:text-sky-500 transition">Library</a></li>
              <li><a href="/settings" className="hover:text-sky-500 transition">Settings</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sky-600">
          <p>© {new Date().getFullYear()} EduFocus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
