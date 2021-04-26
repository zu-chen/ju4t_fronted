import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import Cookies from "js-cookie";

import "./0_product_details_style.scss";
import ProductPhoto from "./ProductPhoto";
import DetailsTable from "../components/DetailsTable";
import AddToCartModal from "../components/AddToCartModal";
import { increment } from "../../../actions/bagCounterAction";

const ProductDetails = () => {
  const { phoneModel, designId } = useParams();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  // state to store design item info
  const [designInfo, setDesignInfo] = useState({});

  // redux dispatch
  const dispatch = useDispatch();

  // state for modal
  const [show, setShow] = useState(false);

  // functions to show or close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch design item info (the dependencies are only there because react throws a caution if they are not there)
  useEffect(() => {
    fetch(
      `http://localhost:3310/products/details?shellColor=${parsed.shellColor}&id=${designId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDesignInfo(data[0]);
      });
  }, [parsed.shellColor, designId]);

  return (
    <Container className="product-details">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/products?phone=${phoneModel}`}>產品</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          產品詳細頁
        </li>
      </ol>
      <Row>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <ProductPhoto
            phoneModel={phoneModel}
            phoneColor={parsed.phoneColor}
            shellColor={parsed.shellColor}
            designInfo={designInfo}
          />
        </Col>
        <Col xs={12} md={6} className="light-gray-bottom-border">
          <div>
            <DetailsTable
              phoneModel={phoneModel.replaceAll("-", " ")}
              shellColor={designInfo.shell_color_chn}
              seriesName={designInfo.series_name_chn}
              designName={designInfo.design_name_chn}
            />
          </div>
          <div className="price-block light-gray-bottom-top mt-5 px-5">
            <div className="d-flex justify-content-between pt-3">
              <div>價格</div>
              <div>$ {designInfo.price} TWD</div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn primary-btn md"
                onClick={() => {
                  let infoToSend = designInfo;
                  infoToSend.phoneModel = phoneModel.replaceAll("-", " ");
                  infoToSend.phoneColor = parsed.phoneColor;
                  infoToSend.quantity = 1;

                  // get the old token data if there is one, this is because the token will contain an array of products and we need to update the old token
                  let oldToken = Cookies.get("cart_products");

                  // send data and old token data to backend
                  fetch("http://localhost:3310/products/create-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      data: infoToSend,
                      oldToken: oldToken,
                    }),
                  })
                    .then((response) => response.text())
                    .then((token) => {
                      // store token in cookies
                      Cookies.set("cart_products", token, { expires: 1 });
                      //open modal
                      handleShow();
                      // increase bag_counter count in cookie
                      dispatch(increment());
                    });
                }}
              >
                加入購物車
              </button>
            </div>

            {/* 已加入購物車 modal */}
            <AddToCartModal
              show={show}
              handleClose={handleClose}
              phoneModel={phoneModel}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
