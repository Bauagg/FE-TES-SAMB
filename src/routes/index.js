import { Route, Routes } from "react-router-dom";
import Supplier from "../pages/supllier";
import NavbarIndex from "../components/navbar";
import Customer from "../pages/customer";
import Product from "../pages/product";
import Warehouse from "../pages/warehouse";
import Transaktion from "../pages/transaksi/transaksi";

const RouterIndex = () => {
    return (
        <div>
            <NavbarIndex />
            <Routes>
                <Route path="/" element={<Supplier />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/product" element={<Product />} />
                <Route path="/warehouse" element={<Warehouse />} />
                <Route path="/transaksi" element={<Transaktion />} />
            </Routes>
        </div>
    )
}

export default RouterIndex