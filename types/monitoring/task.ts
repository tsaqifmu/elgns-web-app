export interface Task {
  _id: string;
  productionData: ProductionData | null;
  currentBoardId: string;
  startDateCurrentBoard: string;
  buktiPengerjaan: string[];
  deadlineCurrentBoard: string;
  __v: number;
}

export interface ProductionData {
  _id: string;
  noInvoice?: string;
  tglKeluar?: string;
  tglMasuk?: string;
  jumlah?: number;
  desainImgUrl?: string;
  desainCdrUrl?: string;
}
