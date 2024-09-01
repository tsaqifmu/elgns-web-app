import { BackName } from "./back-name";

export interface BackNameResponse {
  _id: string;
  nama: string;
  nmr: string;
  size: string;
  keterangan: string;
}

export const mapBackNameResponseToBackName = (
  listBackNameResponse: BackNameResponse[],
): BackName[] => {
  return listBackNameResponse.map((item) => {
    const { _id, nama, nmr, size, keterangan } = item;

    return {
      id: _id,
      name: nama,
      number: nmr,
      size: size,
      notes: keterangan,
    };
  });
};
