export const formatNumberToRupiah = (number: number) => {
  // const formatter = new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  //   minimumFractionDigits: 0,
  // });
  // return formatter.format(value);
  return "Rp " + number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatRupiahToNumber = (rupiah: string): number => {
  return parseInt(rupiah.replace(/[^0-9]/g, ""));
};
