import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Modal from "../components/Modal";

const CheckOut = () => {
  const { cart, total, setCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    document: "",
    creditCard: "",
  });
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (cart.length === 0) {
      return navigate("/");
    }
  }, [cart, navigate]);

  const clearCheckOut = () => {
    localStorage.removeItem("cart");
  };

  const generateTrackingId = () => {
    return Math.random().toString(36).substr(2, 12);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value.trim() !== "" || !e.target.required) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleCompletePurchase = (e) => {
    e.preventDefault();
    setFormData((formData) => ({ ...formData }));
    if (!isFormValid()) {
      return Swal.fire(
        "Error",
        "Please complete all the required fields",
        "error"
      );
    }

    Swal.fire({
      title: "Confirm Purchase",
      text: "Are you sure you want to complete the purchase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCheckOut();
        const trackingId = generateTrackingId();
        Swal.fire(
          "Purchase Completed!",
          `Your tracking number is: <strong>${trackingId}</strong>`,
          "success"
        );
        setCart([]);
        closeModal();

        return navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 overflow-x-auto">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl mb-12 text-center ">Checkout</h2>
        <div className="w-full max-h-[500px] overflow-y-auto border border-gray-400 rounded-sm">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Product</th>
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Unit Price</th>
                <th className="px-4 py-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-2">{item.amount}</td>
                  <td className="border px-4 py-2">${item.price}</td>
                  <td className="border px-4 py-2">
                    ${(item.amount * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="border px-4 py-2" colSpan="4">
                  Total:
                </td>
                <td className="border px-4 py-2 text-center">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="w-full flex justify-end items-end">
          <button
            onClick={openModal}
            className="bg-primary flex p-4 justify-center items-center text-white w-full max-w-xs mt-4"
          >
            Buy
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {/* Contenido del formulario */}
          <form>
            <h1 className="text-center mb-8 text-2xl uppercase">
              Please complete the information:
            </h1>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="Manolo"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="Rodriguez"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1">
                Phone number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="1234567890"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="Palermo 225"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="document" className="block mb-1">
                Document
              </label>
              <input
                type="number"
                id="document"
                name="document"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="11.223.344"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="document" className="block mb-1">
                Credit card
              </label>
              <input
                type="text"
                id="creditCard"
                name="creditCard"
                className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-3 justify-start mt-8">
              <button
                onClick={handleCompletePurchase}
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Complete purchase
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CheckOut;
