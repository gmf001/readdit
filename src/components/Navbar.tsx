import Image from 'next/image';
import dynamic from 'next/dynamic';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { filterAtom } from '@/store';
const NavMenu = dynamic(() => import('@/components/NavMenu'), { ssr: false });

export default function Navbar() {
  const { data: session } = useSession();
  const [, setFilter] = useAtom(filterAtom);

  return (
    <div className='sticky top-0 z-50 h-14 border-b border-dark-300 bg-dark-500/95 py-1.5  drop-shadow backdrop-blur-xl'>
      <div className='mx-auto flex h-full items-center px-4 md:max-w-screen-xl md:justify-between md:px-8 xl:max-w-screen-2xl'>
        <div className='mr-5 flex h-full items-center space-x-8'>
          <h2
            onClick={() => setFilter({ title: 'Home', value: '' })}
            className='cursor-pointer text-xl font-extrabold uppercase text-indigo-300 transition-opacity duration-150 ease-linear hover:text-opacity-90'
          >
            Readdit
          </h2>
          <NavMenu />
        </div>

        <nav>
          {!session ? (
            <button
              onClick={() => signIn('reddit')}
              className='btn btn-underlined text-gray-300 hover:text-white'
            >
              Sign In
            </button>
          ) : (
            <div className='h-full'>
              {session.user?.image && (
                <div
                  onClick={() => signOut()}
                  className='relative h-11 w-11 cursor-pointer overflow-hidden rounded-full border border-dark-300 hover:border-dark-200'
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
