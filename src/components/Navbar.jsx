import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-black shadow-md p-4">
      <div className="flex gap-6 text-lg font-medium">
        <Link to="/">Home</Link>
        <Link to="/advisory">Advisory</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;