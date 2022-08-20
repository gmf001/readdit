import { signIn } from 'next-auth/react';

function Navbar() {
  return (
    <div className='sticky top-0 z-10 flex items-center justify-between py-5 min-h-16 bg-black-500/95 backdrop-blur-xl'>
      <div>
        <h2 className='text-3xl font-extrabold text-orange-300 uppercase'>
          Readdit
        </h2>
      </div>

      <nav>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <button
          onClick={() => signIn('reddit', { callbackUrl: '/' })}
          className='px-6 py-2.5 bg-orange-500 rounded font-semibold text-sm hover:bg-orange-600 transition-colors duration-150 ease-linear'
        >
          Sign In
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
