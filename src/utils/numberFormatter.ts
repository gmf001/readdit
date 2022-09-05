export default function nFormatter(num: number, hasLiked?: boolean | null) {
  if (hasLiked) {
    num = num + 1;
  }

  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num);
}
