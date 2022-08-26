function Tags() {
  return (
    <div className='flex items-center space-x-4 py-8'>
      <div className='flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 bg-primary-300/10 p-3 px-5 text-sm font-bold text-primary-400 hover:bg-primary-300/10'>
        All
      </div>
      <div className='flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400'>
        Podcasts
      </div>
      <div className='flex cursor-pointer items-center justify-center rounded-xl bg-dark-400 p-3 px-5 text-sm font-bold hover:bg-primary-300/10 hover:text-primary-400'>
        Gaming
      </div>
    </div>
  );
}

export default Tags;
