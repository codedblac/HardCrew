
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-hardcrew-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">HC</span>
              </div>
              <span className="text-lg font-bold">HardCrew</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connecting skilled workers with great opportunities through video-first profiles and secure payments.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">For Workers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-to-join" className="text-gray-600 hover:text-hardcrew-blue">How to Join</Link></li>
              <li><Link to="/profile-tips" className="text-gray-600 hover:text-hardcrew-blue">Profile Tips</Link></li>
              <li><Link to="/video-guidelines" className="text-gray-600 hover:text-hardcrew-blue">Video Guidelines</Link></li>
              <li><Link to="/payment-info" className="text-gray-600 hover:text-hardcrew-blue">Payment Info</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="text-gray-600 hover:text-hardcrew-blue">Post a Job</Link></li>
              <li><Link to="/hiring-guide" className="text-gray-600 hover:text-hardcrew-blue">Hiring Guide</Link></li>
              <li><Link to="/worker-verification" className="text-gray-600 hover:text-hardcrew-blue">Worker Verification</Link></li>
              <li><Link to="/payment-protection" className="text-gray-600 hover:text-hardcrew-blue">Payment Protection</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-hardcrew-blue">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-hardcrew-blue">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-hardcrew-blue">Contact Us</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-hardcrew-blue">Press</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} HardCrew. All rights reserved.
            </div>
            <div className="space-x-4 text-sm">
              <Link to="/terms" className="text-gray-500 hover:text-hardcrew-blue">Terms</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-hardcrew-blue">Privacy</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-hardcrew-blue">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
