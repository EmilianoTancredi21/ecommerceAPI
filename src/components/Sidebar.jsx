import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SideBarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total } = useContext(CartContext);
  const isCartEmpty = cart.length === 0;
  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw]  transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping bag ({cart.length})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[580px] overflow-y-auto overflow-x-hidden border-b">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Your cart is empty. Add products to view them here.</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-12">
        <div className="flex w-full justify-between items-center">
          {/* TOTAL */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          onClick={isCartEmpty ? (e) => e.preventDefault() : handleClose}
          to={isCartEmpty ? "#" : "/checkout"}
          className={`bg-primary flex p-4 justify-center items-center text-white w-full font-medium ${
            isCartEmpty ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
