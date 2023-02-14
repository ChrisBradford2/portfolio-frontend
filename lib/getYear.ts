const getYear = (date: any) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
  });
};

export default getYear;