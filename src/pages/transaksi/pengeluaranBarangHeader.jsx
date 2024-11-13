import axios from "axios";
import { useEffect, useState } from "react";

const PengeluaranBarangHeader = () => {
    const [data, setData] = useState([]);
    const [warehouse, setWarehouse] = useState([])
    const [supplier, setSupplier] = useState([])
    const [toggleCreate, setToggleCreate] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [trx_out_no, setTrx_out_no] = useState("")
    const [whs_idf, setWhs_idf] = useState("")
    const [trx_out_date, setTrx_out_date] = useState("")
    const [trx_out_supp_idf, setTrx_out_supp_idf] = useState("")
    const [trx_out_notes, setTrx_out_notes] = useState("")
    const [idData, setIdData] = useState("")

    // Fetch data saat komponen di-mount
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header`)
            .then((result) => {
                setData(result.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/warehouse`)
            .then((result) => {
                setWarehouse(result.data.data)
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/supplier`)
            .then((result) => {
                setSupplier(result.data.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, -5) + 'Z';
    }

    const createPenerimaanBarangHeader = () => {
        const formattedDate = formatDate(trx_out_date);
        const data = { trx_out_no, whs_idf: parseInt(whs_idf), trx_out_date: formattedDate, trx_out_supp_idf: parseInt(trx_out_supp_idf), trx_out_notes }

        axios.post(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header`, data)
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header`)
                    .then((result) => {
                        setToggleCreate(false)
                        setTrx_out_date("")
                        setTrx_out_no("")
                        setTrx_out_supp_idf("")
                        setWhs_idf("")
                        setTrx_out_notes("")
                        setData(result.data.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    const updatePenerimaanBarangHeader = () => {
        const formattedDate = formatDate(trx_out_date);
        const data = { trx_out_no, whs_idf: parseInt(whs_idf), trx_out_date: formattedDate, trx_out_supp_idf: parseInt(trx_out_supp_idf), trx_out_notes }

        axios.put(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header/${idData}`, data)
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header`)
                    .then((result) => {
                        setToggleUpdate(false)
                        setTrx_out_date("")
                        setTrx_out_no("")
                        setTrx_out_supp_idf("")
                        setWhs_idf("")
                        setTrx_out_notes("")
                        setData(result.data.data);
                        setData(result.data.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="mx-4">
            <h1 className="font-bold fon text-[30px] text-center mb-5">Pengeluaran Barang Header</h1>
            <button onClick={() => setToggleCreate(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">Create Pengeluaran Barang Header</button>
            <div>
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">trx_out_no</th>
                            <th className="py-2 px-4 border-b">Supplier</th>
                            <th className="py-2 px-4 border-b">Warehouse</th>
                            <th className="py-2 px-4 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{item.trx_out_no}</td>
                                <td className="py-2 px-4 border-b">{item.MasterSupplier.supplier_name}</td>
                                <td className="py-2 px-4 border-b">{item.MasterWarehouse.whs_name}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => {
                                            setIdData(item.ID)
                                            setToggleUpdate(true)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {toggleCreate && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Create Pengeluaran Barang Header</h2>
                            <button onClick={() => setToggleCreate(false)} className="text-gray-500 hover:text-gray-700">X</button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Trx Out No</label>
                                <input
                                    value={trx_out_no}
                                    onChange={(e) => setTrx_out_no(e.target.value)}
                                    type="text"
                                    name="trx_out_no"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Warehouse</label>
                                <select
                                    value={whs_idf}
                                    onChange={(e) => setWhs_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Warehouse</option>
                                    {warehouse.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.whs_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Transaction Out Date</label>
                                <input
                                    value={trx_out_date}
                                    onChange={(e) => setTrx_out_date(e.target.value)}
                                    type="datetime-local"
                                    name="trx_out_date"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Supplier ID</label>
                                <select
                                    value={trx_out_supp_idf}
                                    onChange={(e) => setTrx_out_supp_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Supplier</option>
                                    {supplier.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.supplier_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                <textarea
                                    value={trx_out_notes}
                                    onChange={(e) => setTrx_out_notes(e.target.value)}
                                    name="trx_out_notes"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button onClick={() => createPenerimaanBarangHeader()} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-3">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {toggleUpdate && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Update Pengeluaran Barang Header</h2>
                            <button onClick={() => setToggleUpdate(false)} className="text-gray-500 hover:text-gray-700">X</button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Trx Out No</label>
                                <input
                                    value={trx_out_no}
                                    onChange={(e) => setTrx_out_no(e.target.value)}
                                    type="text"
                                    name="trx_out_no"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Warehouse</label>
                                <select
                                    value={whs_idf}
                                    onChange={(e) => setWhs_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Warehouse</option>
                                    {warehouse.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.whs_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Transaction Out Date</label>
                                <input
                                    value={trx_out_date}
                                    onChange={(e) => setTrx_out_date(e.target.value)}
                                    type="datetime-local"
                                    name="trx_out_date"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Supplier ID</label>
                                <select
                                    value={trx_out_supp_idf}
                                    onChange={(e) => setTrx_out_supp_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Supplier</option>
                                    {supplier.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.supplier_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                <textarea
                                    value={trx_out_notes}
                                    onChange={(e) => setTrx_out_notes(e.target.value)}
                                    name="trx_out_notes"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button onClick={() => updatePenerimaanBarangHeader()} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-3">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PengeluaranBarangHeader