interface ProductionInvoicePageProps {
  params: {
    invoiceId: string;
  };
}

export default function ProductionInvoicePage({
  params,
}: ProductionInvoicePageProps) {
  return (
    <div className="mx-auto max-w-5xl bg-white pt-2">
      <div className="flex justify-between">
        <h1>SISTEM PRODUKSI ELGNS</h1>
        <h1>PORTANI</h1>
        <h1>2 MAY 2024</h1>
      </div>
      <section>
        <div className="mt-8 flex border-2 border-black">
          <div className="flex w-[45rem] flex-col outline-none" id="kotak-kiri">
            <div className="p-4" id="kotak-kiri-1">
              <h1 className="text-4xl">LOGO</h1>
              <h1>Elegant Anywhere</h1>
              <p>Jl. Lempongsari Raya No.253, Jongkang, Sariharjo</p>
              <p>Ngaglik, Sleman, DI Yogyakarta 55581</p>
              <p>WA 082220350044</p>
              <p>Email elgnssportwear@gmail.com</p>
              <div>
                NAMA : PORTANI <br />
                Alamat : SLEMAN <br />
                No WA : 081234456123
                <br />
                Jenis : BASEBALL FULLPRINT + KAOS + LANYARD
              </div>
            </div>
            <div
              className="h-[10rem] border-t-2 border-black p-4"
              id="kotak-kiri-2"
            ></div>
          </div>
          <div className="w-full border-l-2 border-black p-4">kotak kanan</div>
        </div>
      </section>

      <section>
        <div className="mt-8">
          <table className="w-full text-center">
            <thead className="bg-black text-white">
              <tr>
                <td className="border border-black p-1">No</td>
                <td className="border border-black p-1">Sablon Baju</td>
                <td className="border border-black p-1">Sablon Celana</td>
                <td className="border border-black p-1">Bahan</td>
                <td className="border border-black p-1">Pola</td>
                <td className="border border-black p-1">Warna</td>
                <td className="border border-black p-1">Lengan</td>
                <td className="w-12 border border-black p-1">S</td>
                <td className="w-12 border border-black p-1">M</td>
                <td className="w-12 border border-black p-1">L</td>
                <td className="w-12 border border-black p-1">XL</td>
                <td className="w-12 border border-black p-1">XXL</td>
                <td className="w-12 border border-black p-1">3XL</td>
                <td className="w-12 border border-black p-1">5XL</td>
                <td className="w-12 border border-black p-1">6XL</td>
                <td className="w-12 border border-black p-1">7XL</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">Baju1</td>
                <td className="border border-black p-1">Celana</td>
                <td className="border border-black p-1">AAA</td>
                <td className="border border-black p-1">BBB</td>
                <td className="border border-black p-1">CCC</td>
                <td className="border border-black p-1">DDD</td>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">2</td>
                <td className="border border-black p-1">3</td>
                <td className="border border-black p-1">4</td>
                <td className="border border-black p-1">5</td>
                <td className="border border-black p-1">6</td>
                <td className="border border-black p-1">7</td>
                <td className="border border-black p-1">8</td>
                <td className="border border-black p-1">9</td>
              </tr>
              <tr>
                <td className="border border-black p-1">2</td>
                <td className="border border-black p-1">Baju2</td>
                <td className="border border-black p-1">Celana</td>
                <td className="border border-black p-1">AAA</td>
                <td className="border border-black p-1">BBB</td>
                <td className="border border-black p-1">CCC</td>
                <td className="border border-black p-1">DDD</td>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">2</td>
                <td className="border border-black p-1">3</td>
                <td className="border border-black p-1">4</td>
                <td className="border border-black p-1">5</td>
                <td className="border border-black p-1">6</td>
                <td className="border border-black p-1">7</td>
                <td className="border border-black p-1">8</td>
                <td className="border border-black p-1">9</td>
              </tr>
              <tr>
                <td className="border border-black p-1">3</td>
                <td className="border border-black p-1">Baju3</td>
                <td className="border border-black p-1">Celana</td>
                <td className="border border-black p-1">AAA</td>
                <td className="border border-black p-1">BBB</td>
                <td className="border border-black p-1">CCC</td>
                <td className="border border-black p-1">DDD</td>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">2</td>
                <td className="border border-black p-1">3</td>
                <td className="border border-black p-1">4</td>
                <td className="border border-black p-1">5</td>
                <td className="border border-black p-1">6</td>
                <td className="border border-black p-1">7</td>
                <td className="border border-black p-1">8</td>
                <td className="border border-black p-1">9</td>
              </tr>
              <tr>
                <td className="border border-black p-1">4</td>
                <td className="border border-black p-1">Baju4</td>
                <td className="border border-black p-1">DADDA</td>
                <td className="border border-black p-1">KKK</td>
                <td className="border border-black p-1">LLL</td>
                <td className="border border-black p-1">MMM</td>
                <td className="border border-black p-1">NNN</td>
                <td className="border border-black p-1">9</td>
                <td className="border border-black p-1">5</td>
                <td className="border border-black p-1">2</td>
                <td className="border border-black p-1">0</td>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">6</td>
                <td className="border border-black p-1">7</td>
                <td className="border border-black p-1">1</td>
                <td className="border border-black p-1">2</td>
              </tr>
              <tr>
                <td colSpan={7}></td>
                <td
                  colSpan={9}
                  className="border border-black bg-black text-center text-white"
                >
                  130
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mt-8">
          <table className="w-full text-center">
            <thead>
              <tr>
                <td className="border border-black p-1">NO</td>
                <td className="border border-black p-1">NAMA PUNGGUNG</td>
                <td className="border border-black p-1">NOMOR</td>
                <td className="border border-black p-1">SIZE</td>
                <td className="border border-black p-1">KETERANGAN</td>
              </tr>
            </thead>
            <tbody>
              {Array(35)
                .fill(0)
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1">{index + 1}</td>
                    <td className="border border-black p-1">A</td>
                    <td className="border border-black p-1">B</td>
                    <td className="border border-black p-1">C</td>
                    <td className="border border-black p-1">D</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mt-8"></div>
      </section>
    </div>
  );
}
