import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";

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

interface CustomerData {
  _id: string;
  date: string;
  name: string;
  noHp: number;
  alamat: string;
  alamatKabupaten: string;
  status: string;
  info: string;
}

const dateIdFormat = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};

const mapCustomerData = (data: CustomerData[]) =>
  data.map((data) => ({
    id: data._id,
    dateOfEntry: dateIdFormat(data.date),
    name: data?.name?.toUpperCase(),
    phoneNumber: data.noHp,
    address: data.alamat,
    regency: data?.alamatKabupaten?.toUpperCase(),
    status: data?.status?.toUpperCase(),
    statusDescription: data.info,
  }));

export const useFetchCustomerData = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page")?.toString();
  const limit = searchParams.get("pageSize")?.toString();

  return useQuery<ApiResponse<CustomerData>>({
    queryKey: ["customers", page, limit],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/customer/list",
        method: HttpMethod.GET,
        params: {
          alphabet: "ascending",
          year: "2024",
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
      const processedDocs = mapCustomerData(response.data.message.docs);

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
