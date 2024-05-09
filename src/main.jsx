import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProductProvider from "./contexts/ProductContext.jsx";
import SidebarProvider from "./contexts/SideBarContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import { FilterProvider } from "./contexts/FilterContext.jsx";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SidebarProvider>
      <FilterProvider>
        <CartProvider>
          <ProductProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ProductProvider>
        </CartProvider>
      </FilterProvider>
    </SidebarProvider>
    <Toaster richColors />
  </>
);
