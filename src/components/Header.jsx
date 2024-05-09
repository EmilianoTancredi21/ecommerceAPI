import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SideBarContext";
import { CartContext } from "../contexts/CartContext";
import { FilterContext } from "../contexts/FilterContext";
import { BsBag, BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../img/logo.svg";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { filterOpen, setFilterOpen } = useContext(FilterContext);
  const { itemAmount } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const isDetailView = location.pathname.includes("/product/");
  const isCheckOutView = location.pathname.includes("/checkout");

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div>
            <img className="w-[40px]" src={Logo} alt="" />
          </div>
        </Link>
        <div className="flex gap-6 justify-center items-center">
          {!isDetailView && !isCheckOutView && (
            <div
              onClick={() => setFilterOpen(!filterOpen)}
              className="cursor-pointer flex relative"
            >
              <BsGear className="text-2xl" />
            </div>
          )}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
