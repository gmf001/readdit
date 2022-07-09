const Navbar = () => {
  return (
    <div className="h-16 max-w-screen-xl mx-auto flex items-center justify-between py-1.5 px-4">
      <div>
        <h2 className="font-bold text-lg">Reddify</h2>
      </div>

      <nav>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <button className="px-6 py-2.5 bg-orange-500 rounded font-semibold text-sm hover:bg-orange-600 transition-colors duration-150 ease-linear">
          Login
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
