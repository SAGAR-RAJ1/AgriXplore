import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-black shadow-md ">
      <div className="flex gap-6 text-lg font-medium text-centred items-center">
         <img src="../public/lg.png" className="navlogo" alt="AgriXplore-Logo"  />
        <Link to="/">Home</Link>
        <Link to="/advisory">Advisory</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;