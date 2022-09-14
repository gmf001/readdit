function nFormatter(num: number, liked?: boolean | null) {
  if (liked) num = num + 1;
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
}

export default nFormatter;
