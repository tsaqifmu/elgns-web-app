import { DataCustomer } from "@/app/(dashboard)/customer/columns";

export let customers: DataCustomer[] = [
  ...Array(5)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      dateOfEntry: "20 Feb 2024",
      name: "ING (SEKARIBA)",
      phoneNumber: 6287777060010,
      address: "BATANG",
      status: "DEAL" as const,
      statusDescription: "df",
    })),
  {
    id: "6",
    dateOfEntry: "20 Feb 2024",
    name: "ING (SEKARIBA)",
    phoneNumber: 6287777060010,
    address: "BATANG",
    status: "NEGO" as const,
    statusDescription: "tesss",
  },
];

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const getCustomers = async () => {
  return wait(1000).then(() => [...customers]);
};

export const getCustomer = async (id: string) => {
  const customer = customers.find((customer) => customer.id === id);

  return wait(1000).then(() => customer);
};

export const addCustomer = async (customer: DataCustomer) => {
  const newCustomer: DataCustomer = { ...customer, id: Date.now().toString() };
  customers.push(newCustomer);

  return wait(1000).then(() => newCustomer);
};

export const updateCustomer = async (updatedCustomer: DataCustomer) => {
  customers = customers.map((customer) =>
    customer.id === updatedCustomer.id
      ? { ...customer, ...updatedCustomer }
      : customer,
  );

  const customer: DataCustomer = customers.find(
    (customer) => customer.id === updatedCustomer.id,
  )!;

  return wait(1000).then(() => customer);
};

export const deleteCustomer = (id: string) => {
  customers = customers.filter((customer) => customer.id !== id);
  return wait(1000).then(() => id);
};
