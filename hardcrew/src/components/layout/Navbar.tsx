
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-hardcrew-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">HC</span>
          </div>
          <span className="text-xl font-bold">HardCrew</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/discover" className="font-medium hover:text-hardcrew-blue">
              Discover
            </Link>
            <Link to="/jobs" className="font-medium hover:text-hardcrew-blue">
              Jobs
            </Link>
            <Link to="/workers" className="font-medium hover:text-hardcrew-blue">
              Workers
            </Link>
            <Link to="/how-it-works" className="font-medium hover:text-hardcrew-blue">
              How It Works
            </Link>
          </nav>
        )}

        {/* Search, Login & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          {!isMobile ? (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/discover" className="font-medium p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Discover
            </Link>
            <Link to="/jobs" className="font-medium p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Jobs
            </Link>
            <Link to="/workers" className="font-medium p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              Workers
            </Link>
            <Link to="/how-it-works" className="font-medium p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
              How It Works
            </Link>
            <hr className="my-2" />
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="outline" className="w-full">Log In</Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="btn-primary w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
