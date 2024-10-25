export interface InvoiceTableItem {
  id: string;
  type: string;
  quantity: number;
  price: number;
  total: number;
}

export const getEmptyInvoiceTableItem = () => ({
  id: crypto.randomUUID(),
  type: "",
  quantity: 0,
  price: 0,
  total: 0,
});

export const mapInvoiceTableItemToSend = (
  invoiceTableItem: InvoiceTableItem[],
) => {
  return invoiceTableItem.map((item) => {
    const { id, type, quantity, price, total } = item;
    return {
      jenis: type,
      jumlah: quantity,
      harga: price,
      total,
    };
  });
};
