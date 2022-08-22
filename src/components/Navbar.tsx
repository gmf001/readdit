import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='sticky top-0 z-10 flex items-center justify-between w-full max-w-screen-xl px-4 py-5 mx-auto min-h-16 bg-black-500/95 backdrop-blur-xl'>
      <div>
        <h2 className='text-3xl font-extrabold text-orange-300 uppercase'>
          Readdit
        </h2>
      </div>

      <nav>
        {!session ? (
          <button
            onClick={() => signIn('reddit')}
            className='px-6 py-2.5 bg-orange-500 rounded font-semibold text-sm hover:bg-orange-600 transition-colors duration-150 ease-linear'
          >
            Sign In
          </button>
        ) : (
          <div>
            {session.user?.image && (
              <div
                onClick={() => signOut()}
                className='relative w-12 h-12 overflow-hidden border rounded-full cursor-pointer border-black-300 hover:border-black-200'
              >
                <Image
                  src={session.user?.image}
                  alt={session.user?.name || ''}
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
