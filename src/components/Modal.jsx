import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
  // Renderizar el modal en un portal para evitar problemas con el z-index y la posición
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Botón de cierre del modal */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        {/* Contenido del modal */}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
