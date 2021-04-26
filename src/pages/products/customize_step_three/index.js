import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FiChevronLeft } from "react-icons/fi";
import Cookies from "js-cookie";

import "./0_customize_step_three.scss";
import CustomizeHeading from "../components/CustomizeHeading";
import CustomizeSteps from "../components/CustomizeSteps";
import DetailsTable from "../components/DetailsTable";
import CautionBlock from "./CautionBlock";
import AddToCartModal from "../components/AddToCartModal";
import { increment } from "../../../actions/bagCounterAction";

const CustomizeStepTwo = () => {
  // get customized photo info from local storage
  const shell_id = localStorage.getItem("shell_id");
  const filename = localStorage.getItem("cst_filename");
  const shell_color_en = localStorage.getItem("shell_color_en");
  const shell_color_chn = localStorage.getItem("shell_color_chn");
  const phoneModel = localStorage.getItem("cst_phone_model"); // has dashes in name
  const phoneColor = localStorage.getItem("cst_phone_color"); // also has dashes in name

  // shortenedPhoneModelName is used for the phone photo and camera photo names
  const shortenedPhoneModelName = phoneModel
    .replaceAll("Phone-", "")
    .replaceAll(" ", "-");

  // state for checkbox
  const [checkbox, setCheckbox] = useState(false);

  // state for modal
  const [show, setShow] = useState(false);

  // functions to show or close modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // redux dispatch
  const dispatch = useDispatch();

  return (
    <Container className="customize-step-three">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/customize/step-one">客製化工作室</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          第三步
        </li>
      </ol>
      <CustomizeHeading />
      <CustomizeSteps
        firstWordClass="d-none d-sm-block"
        secondWordClass="d-none d-sm-block"
        thirdWordClass="customize-active"
        thirdCircleClass="customize-active"
      />
      <Row>
        <Col sm={5} lg={6}>
          <div className="position-relative customize-photo-block mx-auto">
            <img
              className="position-absolute"
              src={`/img/products/phones/${phoneModel}/${shortenedPhoneModelName}-${phoneColor}.png`}
              alt={`${phoneModel} ${phoneColor}`}
            />
            <img
              className="position-absolute"
              src={`/img/products/uploads/${filename}.png`}
              alt="客製化圖片"
            />
            <img
              className="position-absolute"
              src={`/img/products/shells/shell-${shell_color_en}.png`}
              alt={`${shell_color_en} shell`}
            />
            <img
              className="position-absolute"
              src={`/img/products/phones/${phoneModel}/${shortenedPhoneModelName}-cam-${phoneColor}.png`}
              alt="camera"
            />
          </div>
        </Col>

        <Col sm={7} lg={6}>
          <div className="step-three-right-block px-5 mx-0 mx-md-5">
            <DetailsTable
              phoneModel={phoneModel.replaceAll("-", " ")}
              shellColor={shell_color_chn}
              seriesName="客製化工作室"
              designName="自行客製化"
            />

            <CautionBlock checkbox={checkbox} setCheckbox={setCheckbox} />

            <div className="price-block d-flex justify-content-between pt-2 pb-2 mt-3">
              <div>價格</div>
              <div>$ 1,000 TWD</div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Link to="/customize/step-two">
                <button className="btn btn-outline-primary btn-md">
                  <FiChevronLeft
                    style={{
                      fontSize: "16px",
                      verticalAlign: "middle",
                    }}
                  />
                  &nbsp;&nbsp;上一步
                </button>
              </Link>

              <button
                className="btn important-btn btn-md"
                onClick={() => {
                  // first check if checkbox is checked, if not remind them to check checkbox
                  if (!checkbox) {
                    alert("請勾選同意訂購條款");
                  } else {
                    // this is the info to send to the backend (to store in a token)
                    const infoToSend = {
                      design_id: "100",
                      design_name_chn: "自行客製化",
                      design_name_eng: "customized",
                      phoneColor: phoneColor,
                      phoneModel: phoneModel.replaceAll("-", " "),
                      price: 1000,
                      quantity: 1,
                      series_id: 16,
                      series_name_chn: "客製化",
                      series_name_eng: "customized",
                      shell_color_chn: shell_color_chn,
                      shell_color_en: shell_color_en,
                      shell_id: shell_id,
                      file_name: localStorage.getItem("cst_filename"),
                    };

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
                  }
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

export default CustomizeStepTwo;
