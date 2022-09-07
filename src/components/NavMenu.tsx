import { ChevronDownIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { filterAtom } from '@/store';
import { trpc } from '@/api/trpc';

export default function NavMenu() {
  const { data: subscriptions } = trpc.useQuery(['reddit.subscriptions']);
  const [filter, setFilter] = useAtom(filterAtom);

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

  return (
    <div className='hidden h-full w-60 flex-none md:block'>
      <div className='relative inline-block h-full w-full'>
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className='rounded-2 hover:border-th-border flex h-full w-full flex-none flex-row items-center justify-between rounded-md border border-dark-300 px-3.5 text-sm font-semibold outline-none hover:cursor-pointer hover:border-dark-200'>
                {<span>{filter.title}</span>}
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
                          onClick={() => setFilter(option)}
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
                              onClick={() =>
                                setFilter({
                                  title: sub.display_name_prefixed,
                                  value: sub.display_name
                                })
                              }
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
}
