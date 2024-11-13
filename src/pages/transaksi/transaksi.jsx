import { useState } from "react"
import PenerimaanBarangHeader from "./penerimaanBarangHeader"
import PenerimaanBarangDetail from "./penerimaanBarangDetail"
import PengeluaranBarangHeader from "./pengeluaranBarangHeader"
import PengeluaranBarangDetail from "./pengeluaranBarangDetail"

const Transaktion = () => {
    const [status, setStatus] = useState('penerima_header')

    return (
        <div>
            <div className="flex justify-between my-5 mx-4">
                <button onClick={() => setStatus("penerima_header")} className="border roundes px-2 py-1 bg-[#add8e6]">Transaksi Penerimaan Barang Header</button>
                <button onClick={() => setStatus("penerima_detail")} className="border roundes px-2 py-1 bg-[#add8e6]">Transaksi Penerimaan Barang Detail</button>
                <button onClick={() => setStatus("pengeluaran_header")} className="border roundes px-2 py-1 bg-[#add8e6]">Transaksi Pengeluaran Barang Header</button>
                <button onClick={() => setStatus("pengeluaran_detail")} className="border roundes px-2 py-1 bg-[#add8e6]">Transaksi Pengeluaran Barang Detail</button>
            </div>
            <div>
                <div className="mx-4">
                    {status === "penerima_header" && <PenerimaanBarangHeader />}
                    {status === "penerima_detail" && <PenerimaanBarangDetail />}
                    {status === "pengeluaran_header" && <PengeluaranBarangHeader />}
                    {status === "pengeluaran_detail" && <PengeluaranBarangDetail />}
                </div>
            </div>
        </div>
    )
}

export default Transaktion