export interface BackName {
  id: string;
  name: string;
  number: string;
  size: string;
  notes: string;
}

export const emptyBackNameData: BackName = {
  id: crypto.randomUUID(),
  name: "",
  number: "",
  size: "",
  notes: "",
};

export const mapBackNameToBackNameResponse = (backNames: BackName[]) => {
  return backNames.map((backName) => {
    const { name, number, size, notes } = backName;
    return { nama: name, nmr: number, size: size, keterangan: notes };
  });
};
