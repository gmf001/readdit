import {
  AnnotationIcon,
  ChevronDoubleUpIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';

function PostSkeleton() {
  return (
    <div className='flex h-[400px] flex-col justify-between space-y-1 rounded-lg border border-dark-300 bg-dark-400 p-4 hover:cursor-pointer hover:border-dark-200'>
      <div className='mb-4 flex flex-1 flex-col space-y-3'>
        <div className='flex items-center justify-between space-x-3 truncate'>
          <div className='relative h-10 w-10 animate-pulse overflow-hidden rounded-full bg-dark-200'></div>
          <span className='text-sm text-gray-500'></span>
        </div>

        <h2 className='h-6 w-full animate-pulse rounded-xl bg-dark-200 text-xl font-bold text-white line-clamp-2'></h2>
        <p className='text-xs font-semibold text-gray-400'></p>
      </div>

      <div className='relative h-[155px] w-full animate-pulse overflow-hidden rounded-xl bg-dark-200'></div>

      <div className='grid grid-cols-3 gap-x-8 px-2 pt-4'>
        <div className='group flex items-center space-x-2'>
          <ChevronDoubleUpIcon className='h-6 w-6 text-gray-400' />
          <div className='h-4 w-full animate-pulse rounded bg-dark-200 text-sm font-semibold text-gray-400 group-hover:text-gray-200'></div>
        </div>
        <div className='group flex items-center space-x-2'>
          <AnnotationIcon className='h-6 w-6 text-gray-400' />
          <div className='h-4 w-full animate-pulse rounded bg-dark-200 text-sm font-semibold text-gray-400 group-hover:text-gray-200'></div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
