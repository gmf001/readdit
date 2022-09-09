import Image from 'next/image';
import dynamic from 'next/dynamic';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { filterAtom } from '@/store';
import { Transition } from '@headlessui/react';
const NavMenu = dynamic(() => import('@/components/NavMenu'), { ssr: false });

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = session && status === 'authenticated';
  const [, setFilter] = useAtom(filterAtom);

  return (
    <div className='sticky top-0 z-50 h-14 w-full border-b border-dark-400 bg-indigo-700 drop-shadow backdrop-blur-xl sm:h-16 sm:py-2'>
      <div className='mx-auto flex h-full items-center justify-between px-4 md:max-w-screen-xl md:px-8 xl:max-w-screen-2xl'>
        <div className='mr-5 flex h-full items-center space-x-8'>
          <h2
            onClick={() => setFilter({ title: 'Home', value: '' })}
            className='cursor-pointer text-base font-extrabold uppercase text-white transition-opacity duration-150 ease-linear hover:text-opacity-90 sm:text-xl'
          >
            Readdit
          </h2>
          <NavMenu />
        </div>

        <nav>
          <Transition show={!isLoading}>
            {/* Background overlay */}
            {isAuthenticated && (
              <Transition.Child
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='h-full'>
                  {session.user?.image && (
                    <div
                      onClick={() => signOut()}
                      className='relative h-11 w-11 cursor-pointer overflow-hidden rounded-full border border-indigo-600 bg-indigo-600 hover:border-indigo-500'
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
              </Transition.Child>
            )}

            {!isAuthenticated && (
              <Transition.Child
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <button
                  onClick={() => signIn('reddit')}
                  className='h-full rounded bg-indigo-500 px-5 py-2 text-xs font-bold uppercase text-white hover:text-white sm:py-3 sm:text-sm'
                >
                  Sign In
                </button>
              </Transition.Child>
            )}
          </Transition>
        </nav>
      </div>
    </div>
  );
}
