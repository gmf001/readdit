import { ChevronDownIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { trpc } from '@/api/trpc';
import { useAtom } from 'jotai';
import { filterAtom } from '@/state';

const DropdownMenu = () => {
  const options = [
    {
      title: 'Home',
      value: ''
    },
    {
      title: 'Popular',
      value: 'popular'
    },
    {
      title: 'All',
      value: 'all'
    }
  ];
  const [selected, setSelected] = useAtom(filterAtom);
  const { data: subscriptions } = trpc.useQuery(['reddit.subscriptions']);

  return (
    <div className='hidden h-full w-60 flex-none md:block'>
      <div className='relative inline-block h-full w-full'>
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className='rounded-2 hover:border-th-border flex h-full w-full flex-none flex-row items-center justify-between rounded-md border border-dark-300 px-3.5 text-sm font-semibold outline-none hover:cursor-pointer hover:border-dark-200'>
                <span>{selected || 'Home'}</span>
                <ChevronDownIcon className='h-5 w-5' />
              </Menu.Button>

              <Transition
                show={open}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-50 mt-1 w-full origin-top-right space-y-2 divide-y divide-dark-200 rounded-md border border-dark-200 bg-dark-300 p-2 shadow-lg outline-none'>
                  <div>
                    {options.map((option, i) => (
                      <Menu.Item key={i}>
                        <button
                          onClick={() => setSelected(option.value)}
                          className='flex w-full justify-between rounded-lg p-2 text-left text-sm font-semibold capitalize leading-5 hover:bg-indigo-300/20 hover:text-indigo-300'
                        >
                          {option.title}
                        </button>
                      </Menu.Item>
                    ))}
                  </div>
                  {subscriptions && (
                    <div>
                      <strong className='block p-2 pt-4 text-xs font-medium uppercase text-gray-400'>
                        Subscriptions
                      </strong>

                      <div className='h-52 overflow-y-scroll scrollbar-hide'>
                        {subscriptions.map((sub) => (
                          <Menu.Item key={sub.name}>
                            <button
                              onClick={() => setSelected(sub.display_name)}
                              className='flex w-full justify-between rounded-lg p-2 text-left text-sm font-semibold leading-5 hover:bg-indigo-300/20 hover:text-indigo-300'
                            >
                              {sub.display_name_prefixed}
                            </button>
                          </Menu.Item>
                        ))}
                      </div>
                    </div>
                  )}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='sticky top-0 z-50 h-14 border-b border-dark-300 bg-dark-500/95 py-1.5  drop-shadow backdrop-blur-xl'>
      <div className='mx-auto flex h-full items-center px-4 md:max-w-screen-xl md:justify-between md:px-8 xl:max-w-screen-2xl'>
        <div className='mr-5 flex h-full items-center space-x-8'>
          <h2 className='text-xl font-extrabold uppercase text-indigo-300'>
            Readdit
          </h2>
          <DropdownMenu />
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

export default Navbar;
