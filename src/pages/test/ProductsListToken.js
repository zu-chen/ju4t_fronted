import React from "react";
import Cookies from "js-cookie";

// test out decoding the token for shopping cart data
const ProductsListToken = () => {
  return (
    <div className="container">
      <button
        onClick={() => {
          let token = Cookies.get("cart_products");

          fetch("http://localhost:3310/products/decode-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }}
      >
        TEST DECODE TOKEN
      </button>
    </div>
  );
};

export default ProductsListToken;
