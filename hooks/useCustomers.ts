import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as customerService from "../lib/customerService";
import { DataCustomer } from "@/app/(dashboard)/customer/columns";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";

interface ApiResponse<ItemType> {
  data: {
    message: {
      docs: ItemType[];
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
    name: data.name.toUpperCase(),
    phoneNumber: data.noHp,
    address: data.alamat,
    regency: data.alamatKabupaten.toUpperCase(),
    status: data.status.toUpperCase(),
    statusDescription: data.info,
  }));

export const useFetchCustomerData = () => {
  return useQuery<ApiResponse<CustomerData>>({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await apiRequest({
        path: "/customer/list?alphabet=ascending&year=2024&month=&week=&name=ahmadfh&status=&page=",
        method: HttpMethod.GET,
      });
      return response;
    },
    select: (response) => mapCustomerData(response.data.message.docs) as any,
  });
};

//! BATAS SUCI BROKK

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: DataCustomer) => {
      return customerService.addCustomer(customer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
