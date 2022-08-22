import {
  AnnotationIcon,
  ChevronDoubleUpIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid';

function PostSkeleton() {
  return (
    <div className='flex flex-col p-4 space-y-1 border rounded-lg h-[400px] justify-between bg-black-400 border-black-300 hover:border-black-200 hover:cursor-pointer'>
      <div className='flex flex-col flex-1 mb-4 space-y-3'>
        <div className='flex items-center justify-between space-x-3 truncate'>
          <div className='relative w-10 h-10 overflow-hidden rounded-full animate-pulse bg-black-200'></div>
          <span className='text-sm text-gray-500'></span>
        </div>

        <h2 className='w-full h-6 text-xl font-bold text-white animate-pulse line-clamp-2 bg-black-200 rounded-xl'></h2>
        <p className='text-xs font-semibold text-gray-400'>
          Yesterday - 2m Read Time
        </p>
      </div>

      <div className='relative w-full h-[155px] bg-black-200 animate-pulse overflow-hidden rounded-xl'></div>

      <div className='grid grid-cols-3 px-2 pt-4 gap-x-8'>
        <div className='flex items-center space-x-2 group'>
          <ChevronDoubleUpIcon className='w-6 h-6 text-gray-400' />
          <div className='w-full h-4 text-sm font-semibold text-gray-400 rounded animate-pulse bg-black-200 group-hover:text-gray-200'></div>
        </div>
        <div className='flex items-center space-x-2 group'>
          <AnnotationIcon className='w-6 h-6 text-gray-400' />
          <div className='w-full h-4 text-sm font-semibold text-gray-400 rounded animate-pulse bg-black-200 group-hover:text-gray-200'></div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
