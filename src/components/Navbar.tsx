import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='sticky top-0 z-10 border-b border-dark-300'>
      <div className='mx-auto flex min-h-[4.75rem] w-full items-center justify-between bg-dark-500/95 px-4 py-4 drop-shadow backdrop-blur-xl md:max-w-screen-xl xl:max-w-screen-2xl'>
        <div>
          <h2 className='text-3xl font-extrabold uppercase text-primary-500'>
            Readdit
          </h2>
        </div>

        <nav>
          {!session ? (
            <button
              onClick={() => signIn('reddit')}
              className='btn btn-underlined text-lg text-gray-300 hover:text-white'
            >
              Sign In
            </button>
          ) : (
            <div>
              {session.user?.image && (
                <div
                  onClick={() => signOut()}
                  className='relative h-11 w-11 cursor-pointer overflow-hidden rounded-xl border-2 border-dark-300 hover:border-dark-200'
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
    </div>
  );
}

export default Navbar;
