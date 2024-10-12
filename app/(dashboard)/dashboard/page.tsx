"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import React, { useEffect } from "react";
import { AdminDashboard } from "./admin-dashboard";
import SkeletonTable from "@/components/dashboard/skeleton-table";
import ErrorLoadData from "@/components/dashboard/error-load-data";
import ContainerPage from "@/components/dashboard/container-page";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { getColumnsDashboard } from "@/components/dashboard/dashboard/columns";

const dataSource = [
  {
    workOrder: "WO.294.7 SEPTEMBER GUNTUR -",
    tanggalMasuk: "7 SEP 2024",
    deadline: "24 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "Rp 1.000.000",
    tagihan: "Rp 2.309.500",
    totalPembayaran: "Rp 3.039.500",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.295.9 SEPTEMBER TAMBAHAN",
    tanggalMasuk: "9 SEP 2024",
    deadline: "25 SEP 2024",
    atasan: 10,
    bawahan: 10,
    terbayar: "Rp 520.000",
    tagihan: "0",
    totalPembayaran: "Rp 520.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.296.10 SEPTEMBER ASTRA M",
    tanggalMasuk: "10 SEP 2024",
    deadline: "14 SEP 2024",
    atasan: 15,
    bawahan: 0,
    terbayar: "0",
    tagihan: "Rp 8.210.000",
    totalPembayaran: "Rp 8.210.000",
    keterangan: "SELESAI",
  },
  {
    workOrder: "WO.297.10 SEPTEMBER VOLI SMP",
    tanggalMasuk: "10 SEP 2024",
    deadline: "24 SEP 2024",
    atasan: 0,
    bawahan: 15,
    terbayar: "0",
    tagihan: "Rp 1.540.000",
    totalPembayaran: "Rp 1.540.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.298.11 SEPTEMBER BENDERA",
    tanggalMasuk: "11 SEP 2024",
    deadline: "14 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "Rp 550.000",
    totalPembayaran: "Rp 550.000",
    keterangan: "DIKIRIM",
  },
  {
    workOrder: "WO.299.11 SEPTEMBER ALUMNI 2",
    tanggalMasuk: "12 SEP 2024",
    deadline: "18 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "Rp 2.625.000",
    totalPembayaran: "Rp 2.625.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.300.12 SEPTEMBER KELAS 7",
    tanggalMasuk: "13 SEP 2024",
    deadline: "26 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "Rp 1.840.000",
    totalPembayaran: "Rp 1.840.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.301.14 SEPTEMBER SMA 1 GRI",
    tanggalMasuk: "14 SEP 2024",
    deadline: "24 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "Rp 3.315.000",
    totalPembayaran: "Rp 3.315.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.302.14 SEPTEMBER SMA 1 GRI",
    tanggalMasuk: "14 SEP 2024",
    deadline: "24 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "Rp 3.895.000",
    totalPembayaran: "Rp 3.895.000",
    keterangan: "PRODUKSI",
  },
  {
    workOrder: "WO.303.17 SEPTEMBER SCIENCE",
    tanggalMasuk: "17 SEP 2024",
    deadline: "27 SEP 2024",
    atasan: 20,
    bawahan: 20,
    terbayar: "0",
    tagihan: "0",
    totalPembayaran: "0",
    keterangan: "PRODUKSI",
  },
];

const data = [
  {
    _id: "66f2be1e7c321fb2aa8633f1",
    noInvoice: "WO.12.24.Sep-TES BARUA ELGNS",
    totalBaju: 14,
    totalCelana: 5,
    terbayar: 750000,
    tagihan: 0,
    totalBayar: 750000,
    status: "SELESAI",
  },
  {
    _id: "66ed230b389edad05091508d",
    noInvoice: "WO.01.20 FEB-kocheng",
    tglMasuk: "2024-09-05T15:51:28.845Z",
    tglKeluar: "2024-09-16T15:51:28.845Z",
    totalBaju: 22,
    totalCelana: 13,
    terbayar: 2000000,
    tagihan: 3940000,
    totalBayar: 5940000,
    status: "DIKIRIM",
  },
];

const DashboardPage = () => {
  const renderContent = () => {
    // if (isLoading) return <SkeletonTable />;
    // if (isError) return <ErrorLoadData error={error} />;
    if (dataSource)
      return (
        <>
          <DataTable columns={getColumnsDashboard()} data={dataSource as any} />
          {/* <DataTablePagination dataInfo={dataInfo} /> */}
        </>
      );
    return null;
  };
  return (
    <>
      <main className="mt-9">{renderContent()}</main>
    </>
  );
};

export default DashboardPage;
