import axios from "axios"
import { useEffect, useState } from "react"

const Supplier = () => {
    const [data, setData] = useState([])
    const [supplier_name, setName] = useState("")
    const [toggleCreate, setToggleCreate] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [idDate, setIdData] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/supplier`)
            .then((result) => {
                setData(result.data.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const createSupplier = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/supplier`, { supplier_name })
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/supplier`)
                    .then((result) => {
                        setToggleCreate(false)
                        setName("")
                        setData(result.data.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    const updateSupplier = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/supplier/${idDate}`, { supplier_name })
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/supplier`)
                    .then((result) => {
                        setIdData("")
                        setToggleUpdate(false)
                        setName("")
                        setData(result.data.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    const deleteSupplier = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/supplier/${id}`)
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/supplier`)
                    .then((result) => {
                        setName("")
                        setIdData("")
                        setData(result.data.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="px-4">
            <div className="my-4">
                <button onClick={() => setToggleCreate(true)} className="border rounded bg-[#add8e6] px-4 py-2">Create Supplier</button>
            </div>
            <div className="flex justify-center items-center h-screen px-4">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className="border px-1 py-5 rounded w-40 mx-1">
                                <p className="truncate text-center">{item.supplier_name}</p>
                                <button onClick={() => {
                                    setToggleUpdate(true)
                                    setIdData(item.ID)
                                }} className="border rounded bg-[#add8e6] mt-3 py-1 w-full">UPDATE</button>
                                <button onClick={() => { deleteSupplier(item.ID) }} className="border rounded bg-[#DC143C] text-white mt-3 py-1 w-full">DELETE</button>
                            </div>
                        )
                    })
                }
            </div>

            {toggleCreate && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative w-80">
                        <button
                            onClick={() => setToggleCreate(false)}
                            className="absolute top-2 right-2 text-gray-600 font-bold text-xl"
                        >
                            X
                        </button>
                        <div>
                            <label>
                                <p className="mb-2 text-gray-700 font-medium">Name Supplier</p>
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter supplier name"
                                    value={supplier_name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <button onClick={() => createSupplier()} className="border rounded bg-[#add8e6] mt-3 py-1 w-full">CREATE</button>
                        </div>
                    </div>
                </div>
            )}

            {toggleUpdate && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative w-80">
                        <button
                            onClick={() => setToggleUpdate(false)}
                            className="absolute top-2 right-2 text-gray-600 font-bold text-xl"
                        >
                            X
                        </button>
                        <div>
                            <label>
                                <p className="mb-2 text-gray-700 font-medium">Name Supplier</p>
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter supplier name"
                                    value={supplier_name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <button onClick={() => updateSupplier()} className="border rounded bg-[#add8e6] mt-3 py-1 w-full">UPDATE</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Supplier