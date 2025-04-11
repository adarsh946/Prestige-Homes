function Navbar() {
  return (
    <div className="flex items-center justify-between mx-auto mt-3 py-5 px-7">
      <div className="flex items-center justify-center gap-7">
        <h2 className="font-bold text-xl">PrestigeHomes</h2>
        <h3 className="text-md font-medium">Home</h3>
        <h3 className="text-md font-medium">About</h3>
        <h3 className="text-md font-medium">Contact</h3>
        <h3 className="text-md font-medium">Agents</h3>
      </div>
      <div className="flex items-center justify-center gap-7">
        <button className="cursor-pointer p-2 rounded-lg">Signin</button>
        <button className="cursor-pointer border-amber-200 bg-amber-300 p-2 rounded-lg">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
