import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { formatNumberToRupiah } from "@/lib/currencyUtils";
import { dateIdFormat } from "@/lib/dateUtils";
import { WorkOrderData } from "@/types/dashboard/dashboard-data-response";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ApiResponse<ItemType> {
  data: {
    message: {
      docs: ItemType[];
      totalDocs: number;
      limit: number;
      totalPages: number;
      page: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
    };
  };
}

// Define the customer data structure
interface DashboardData {
  _id: string;
  noInvoice: string;
  tglMasuk: string; // Tanggal masuk dalam format ISO string. Gunakan `Date` jika diperlukan.
  tglKeluar: string; // Tanggal keluar dalam format ISO string. Gunakan `Date` jika diperlukan.
  totalBaju: number;
  totalCelana: number;
  terbayar: number;
  tagihan: number;
  totalBayar: number;
  status: string;
}

const mapDashboardData = (data: DashboardData[]): WorkOrderData[] =>
  data.map((data) => ({
    _id: data._id,
    noInvoice: data.noInvoice,
    tglMasuk: data.tglMasuk ? dateIdFormat(data.tglMasuk) : "-",
    tglKeluar: data.tglKeluar ? dateIdFormat(data.tglKeluar) : "-",
    totalBaju: data.totalBaju,
    totalCelana: data.totalCelana,
    terbayar: formatNumberToRupiah(data.terbayar),
    tagihan: formatNumberToRupiah(data.tagihan),
    totalBayar: formatNumberToRupiah(data.totalBayar),
    status: data.status,
  }));

export const useFetchDashboardData = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString() || "1";
  const limit = searchParams.get("pageSize")?.toString() || "5";

  return useQuery({
    queryKey: ["dashboard", page, limit],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/admin/dashboard",
        method: HttpMethod.GET,
        params: {
          alphabet: "",
          year: "",
          month: "",
          week: "",
          name: "",
          status: "",
          page: page,
          limit: limit,
        },
      });
      return response;
    },
    select: (response) => {
      const processedDocs = mapDashboardData(response.data.message.docs);
      return {
        docs: processedDocs,
        dataInfo: {
          totalDocs: response.data.message.totalDocs,
          limit: response.data.message.limit,
          totalPages: response.data.message.totalPages,
          page: response.data.message.page,
          hasPrevPage: response.data.message.hasPrevPage,
          hasNextPage: response.data.message.hasNextPage,
        },
      };
    },
  });
};
