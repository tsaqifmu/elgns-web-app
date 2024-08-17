import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DetailNamaPunggung } from "./detail-nama-punggung";
import { DetailRingkasan } from "./detail-ringkasan";

export const Detail = () => {
  const [dummyRingkasanData, setDummyRingkasanData] = useState([
    {
      id: "1",
      sablonBaju: "SABLON PRINTING",
      sablonCelana: "-",
      bahan: "PUMA DRYFT",
      pola: "BASEBALL",
      warna: "CREAM",
      lengan: "PENDEK",
      sizeS: "0",
      sizeM: "2",
      sizeL: "0",
      sizeXL: "0",
      sizeXXL: "0",
      size3XL: "0",
      size5XL: "0",
      size6XL: "0",
      size7XL: "0",
    },
    {
      id: "2",
      sablonBaju: "DTF",
      sablonCelana: "-",
      bahan: "COT COM 30S",
      pola: "KAOS",
      warna: "HITAM",
      lengan: "PENDEK",
      sizeS: "0",
      sizeM: "0",
      sizeL: "2",
      sizeXL: "0",
      sizeXXL: "0",
      size3XL: "0",
      size5XL: "0",
      size6XL: "0",
      size7XL: "0",
    },
  ]);
  const [dummyNamaPunggungData, setDummyNamaPunggungData] = useState([
    {
      id: "1",
      namaPunggung: "Dimaz",
      nomor: "99",
      size: "m",
      keterangan: "-",
    },
    {
      id: "2",
      namaPunggung: "Ajie",
      nomor: "76",
      size: "l",
      keterangan: "-",
    },
  ]);

  return (
    <div>
      <div className="flex flex-col gap-8 px-5 pb-5">
        <DetailRingkasan
          ringkasanData={dummyRingkasanData}
          setRingkasanData={setDummyRingkasanData}
        />
        <DetailNamaPunggung
          namaPunggungData={dummyNamaPunggungData}
          setNamaPunggungData={setDummyNamaPunggungData}
        />
      </div>

      <DialogFooter>
        <Button
          size={"modalTable"}
          variant={"default"}
          type="submit"
          className="bg-yellow-500 uppercase"
        >
          Simpan
        </Button>
      </DialogFooter>
    </div>
  );
};
