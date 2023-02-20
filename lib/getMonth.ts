const getMonth = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric',
    });
  };
  
  export default getMonth;