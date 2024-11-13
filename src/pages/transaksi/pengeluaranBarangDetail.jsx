import axios from "axios";
import { useEffect, useState } from "react";

const PengeluaranBarangDetail = () => {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([])
    const [penerimaanBarangHeader, setPenerimaanBarangHeader] = useState([])
    const [toggleCreate, setToggleCreate] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [idData, setIdData] = useState("")
    const [trx_out_idf, setTrx_out_idf] = useState("")
    const [trx_out_d_product_idf, setTrx_out_d_product_idf] = useState("")
    const [trx_out_d_qty_dus, setTrx_out_d_qty_dus] = useState("")
    const [trx_out_d_qty_pcs, setTrx_out_d_qty_pcs] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-detail`)
            .then((result) => {
                setData(result.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/product`)
            .then((result) => {
                setProduct(result.data.data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-header`)
            .then((result) => {
                setPenerimaanBarangHeader(result.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const createPenerimaanDetail = () => {
        const data = {
            trx_out_d_product_idf: parseInt(trx_out_d_product_idf),
            trx_out_d_qty_dus: parseInt(trx_out_d_qty_dus),
            trx_out_d_qty_pcs: parseInt(trx_out_d_qty_pcs),
            trx_out_idf: parseInt(trx_out_idf)
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-detail`, data)
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-detail`)
                    .then((result) => {
                        setToggleCreate(false)
                        setTrx_out_d_product_idf("")
                        setTrx_out_d_qty_dus("")
                        setTrx_out_d_qty_pcs("")
                        setTrx_out_idf("")
                        setData(result.data.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    const updatePenerimaanDetail = () => {
        const data = {
            trx_out_d_product_idf: parseInt(trx_out_d_product_idf),
            trx_out_d_qty_dus: parseInt(trx_out_d_qty_dus),
            trx_out_d_qty_pcs: parseInt(trx_out_d_qty_pcs),
            trx_out_idf: parseInt(trx_out_idf)
        }

        axios.put(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-detail/${idData}`, data)
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/transaksi-pengeluaran-barang-detail`)
                    .then((result) => {
                        setToggleUpdate(false)
                        setTrx_out_d_product_idf("")
                        setTrx_out_d_qty_dus("")
                        setTrx_out_d_qty_pcs("")
                        setTrx_out_idf("")
                        setData(result.data.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="mx-4">
            <h1 className="font-bold fon text-[30px] text-center mb-5">Pengeluaran Barang Detail</h1>
            <button onClick={() => setToggleCreate(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">Create Pengeluaran Barang Detail</button>
            <div>
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">trx_out_no</th>
                            <th className="py-2 px-4 border-b">Product</th>
                            <th className="py-2 px-4 border-b">Warehouse</th>
                            <th className="py-2 px-4 border-b">Supplier</th>
                            <th className="py-2 px-4 border-b">Quantity Dus</th>
                            <th className="py-2 px-4 border-b">Quantity PCS</th>
                            <th className="py-2 px-4 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{item.Header.trx_out_no}</td>
                                <td className="py-2 px-4 border-b">{item.Product.product_name}</td>
                                <td className="py-2 px-4 border-b">{item.Header.MasterWarehouse.whs_name}</td>
                                <td className="py-2 px-4 border-b">{item.Header.MasterSupplier.supplier_name}</td>
                                <td className="py-2 px-4 border-b">{item.trx_out_d_qty_dus}</td>
                                <td className="py-2 px-4 border-b">{item.trx_out_d_qty_pcs}</td>
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
                            <h2 className="text-lg font-semibold">Create Pengeluaran Barang Detail</h2>
                            <button onClick={() => setToggleCreate(false)} className="text-gray-500 hover:text-gray-700">X</button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity Dus</label>
                                <input
                                    value={trx_out_d_qty_dus}
                                    onChange={(e) => setTrx_out_d_qty_dus(e.target.value)}
                                    type="number"
                                    name="trx_out_no"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Trx Out Idf</label>
                                <select
                                    value={trx_out_idf}
                                    onChange={(e) => setTrx_out_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Trx Out Idf</option>
                                    {penerimaanBarangHeader.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.trx_out_no}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity PCS</label>
                                <input
                                    value={trx_out_d_qty_pcs}
                                    onChange={(e) => setTrx_out_d_qty_pcs(e.target.value)}
                                    type="number"
                                    name="trx_out_date"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product ID</label>
                                <select
                                    value={trx_out_d_product_idf}
                                    onChange={(e) => setTrx_out_d_product_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Product</option>
                                    {product.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.product_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={() => createPenerimaanDetail()} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-3">
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
                            <h2 className="text-lg font-semibold">Update Pengeluaran Barang Detail</h2>
                            <button onClick={() => setToggleUpdate(false)} className="text-gray-500 hover:text-gray-700">X</button>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity Dus</label>
                                <input
                                    value={trx_out_d_qty_dus}
                                    onChange={(e) => setTrx_out_d_qty_dus(e.target.value)}
                                    type="number"
                                    name="trx_out_no"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Trx Out Idf</label>
                                <select
                                    value={trx_out_idf}
                                    onChange={(e) => setTrx_out_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Trx Out Idf</option>
                                    {penerimaanBarangHeader.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.trx_out_no}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity PCS</label>
                                <input
                                    value={trx_out_d_qty_pcs}
                                    onChange={(e) => setTrx_out_d_qty_pcs(e.target.value)}
                                    type="number"
                                    name="trx_out_date"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product ID</label>
                                <select
                                    value={trx_out_d_product_idf}
                                    onChange={(e) => setTrx_out_d_product_idf(e.target.value)}
                                    name="whs_idf"
                                    className="mt-1 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Product</option>
                                    {product.map((item) => (
                                        <option key={item.ID} value={item.ID}>
                                            {item.product_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={() => updatePenerimaanDetail()} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-3">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PengeluaranBarangDetail