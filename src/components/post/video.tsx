interface Props {
  src: string;
  autoplay: boolean;
}

export const VideoPost = ({ src, autoplay }: Props) => {
  return (
    <video
      className='h-full w-full bg-dark-600'
      autoPlay={autoplay}
      muted={true}
      loop={true}
      playsInline
    >
      <source data-src={src} src={src} type='video/mp4' />
    </video>
  );
};
