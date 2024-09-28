import * as XLSX from "xlsx";

export const proccesExcelFileUpload = (
  file: any,
): Promise<{ fileName: string; dataObjects: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileName = file?.name;

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const binaryStr = evt.target?.result;

      if (typeof binaryStr !== "string")
        return reject(new Error("Failed to read file"));

      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Misalnya, kita ambil sheet pertama
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Konversi sheet ke format JSON
      const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      // Ambil header kolom (row pertama)
      const headers: string[] = jsonData[0] as string[];

      // Buat array of objects dari data yang tersisa
      const dataObjects = jsonData.slice(1).map((item) => ({
        id: item[0],
        name: item[1],
        number: item[2],
        size: item[3],
        notes: item[4],
      }));

      resolve({ fileName, dataObjects });
    };

    reader.onerror = () => reject(new Error("Error reading file"));

    reader.readAsBinaryString(file);
  });
};
