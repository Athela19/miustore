export default function Navbar() {
  return (
    <nav className="flex justify-between bg-[var(--background)] border-b-3 border-[var(--primary)] h-20 w-full fixed absolute px-16">
      <div className="flex justify-center items-center">
        <img src="/PetLogo.png" alt="logo" className="w-10 h-10" />
        <h1 className="font-bold text-4xl">
          Miu<span className="text-[var(--primary)]">Store</span>.
        </h1>
      </div>
      <ul className="flex gap-4 justify-center items-center">
        <li>
          <a href="#" className="group cursor-pointer">
            dashboard
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#" className="group cursor-pointer">
            about us
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#" className="group cursor-pointer">
            Brand
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#" className="group cursor-pointer">
            Pets
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#" className="group cursor-pointer">
            Services
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <li>
          <a href="#" className="group cursor-pointer">
            Blog
            <span className="mt-1 block h-0.5 w-0 bg-[var(--primary)] rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
        <button className="bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-full text-base font-semibold">
          Login
        </button>
      </ul>
    </nav>
  );
}
