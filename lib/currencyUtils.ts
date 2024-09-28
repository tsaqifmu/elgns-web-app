export const formatNumberToRupiah = (numberInput?: number) => {
  const number = numberInput ?? 0;
  return "Rp " + number?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatRupiahToNumber = (rupiahInput?: string): number => {
  const rupiah = rupiahInput ?? "";
  return parseInt(rupiah.replace(/[^0-9]/g, ""));
};
