import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='min-h-16 sticky top-0 z-10 mx-auto flex w-full items-center justify-between bg-black-500/95 px-4 py-5 backdrop-blur-xl md:max-w-screen-xl xl:max-w-screen-2xl'>
      <div>
        <h2 className='text-3xl font-extrabold uppercase text-orange-400'>
          Readdit
        </h2>
      </div>

      <nav>
        {!session ? (
          <button
            onClick={() => signIn('reddit')}
            className='rounded bg-orange-500 px-6 py-2.5 text-sm font-bold uppercase transition-colors duration-150 ease-linear hover:bg-orange-600'
          >
            Sign In
          </button>
        ) : (
          <div>
            {session.user?.image && (
              <div
                onClick={() => signOut()}
                className='relative h-12 w-12 cursor-pointer overflow-hidden rounded-full border border-black-300 hover:border-black-200'
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
