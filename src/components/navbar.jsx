import { Link } from "react-router-dom";

const NavbarIndex = () => {
    return (
        <div className="w-full bg-[#add8e6] flex p-5 justify-between">
            <h1 className="font-bold">A. Mambaus Sholihin</h1>
            <div className="flex space-x-4">
                <Link to="/" >Supplier</Link>
                <Link to="/customer">Customer</Link>
                <Link to="/product">Product</Link>
                <Link to="/warehouse">Warehouse</Link>
                <Link to="/transaksi">Transaktion</Link>
            </div>
        </div>
    );
};

export default NavbarIndex;
