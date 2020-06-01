const _ = {
  getCurrentDate: () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month}-${day}`;
  },
  getTomorrowDate: () => {
    const today = new Date();
    const tomorrow = new Date(today.valueOf() + 24 * 60 * 60 * 1000);
    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();

    return `${year}-${month}-${day}`;
  },
};

export default _;
