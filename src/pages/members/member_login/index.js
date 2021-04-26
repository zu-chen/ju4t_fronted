import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../members.scss";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLogin from 'react-google-login';
import { setAuth } from "../../../actions/authAction";

// Recaptcha 設定：https://www.google.com/recaptcha/admin/site/440735093/settings
// sitekey : 6Ld1FUUaAAAAAK7odin1D4XaR--k7tD6mJryrlgS
const MemberLogin = (props) => {

  function LoginAlert(title, text, icon, showConfirmButton, timer) {
    const Swal = require("sweetalert2");
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: showConfirmButton,
      timer: timer,
    });
  }
 
  function autoFormData() {
    setInputs((state) => ({ ...state, account: "member_ju4t@gmail.com", password: "aaaa1111",}));
  }

  function autoPasswordData() {
    setInputs((state) => ({ ...state, account: "jasmineli1107@gmail.com"}));
  }

  const dispatch = useDispatch();

  const [formData, setInputs] = useState({
    account: "",
    password: "",
    googleToken: "",
  });
  const onChangeForField = (fieldName) => (event) => {
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }));
  };

  // Google Login 
  const googleLoginSuccess = async (res) => {
    const request = new Request("http://localhost:3310/member/login", {
      method: "POST",
      body: JSON.stringify(res.tokenObj),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
  
    const response = await fetch(request);
    const data = await response.json();

    if (data.result && data.result.indexOf("Bearer") > -1) {
      // 儲存憑證並將資料放於redux中
      dispatch(setAuth(data.result));
      // SuccessAlert();
      props.history.push("/");
    } else {
      console.log(data);
      LoginAlert("登入失敗", "資料錯誤", "error", false, 1600);
      recaptchaRef.current.reset();
    }

  }
  const googleLoginFail = (res) => {
    if (res && res.error === "idpiframe_initialization_failed") {
      console.log(res)
    } else {
      console.log(res)
      LoginAlert("登入失敗", "資料錯誤", "error", false, 1600);
      
    }
  }

  // const [googleData, setGoogleData] = useState({})

  // Google Robot Verify 
  const recaptchaRef = React.createRef();
  function verifyRobot(res) {
    setInputs({ ...formData, googleToken: res });
  }

    async function LoginToServer() {
    if (!formData.googleToken || formData.googleToken.length < 10) {
      LoginAlert("登入失敗", "請勾選我不是機器人", "error", false, 1600);
      return;
    } else {
      console.log('error')
    }
    const url = "http://localhost:3310/member/login";

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    if (data.result && data.result.indexOf("Bearer") > -1) {
      // 儲存憑證並將資料放於redux中
      dispatch(setAuth(data.result));
      // SuccessAlert();
      props.history.push("/");
    } else {
      console.log(data);
      LoginAlert("登入失敗", "帳號或密碼錯誤", "error", false, 1600);
      recaptchaRef.current.reset();
    }
  }
  return (
    <div className="container member-content">
      <Row className="breadcrumb-leftmargin">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">首頁</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href="/member/profile">會員中心</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              會員登入
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col lg="4">
          <div className="loginkv"></div>
        </Col>
        <Col lg="6">
          <h3 className="mhead">會員登入</h3>
          <Form>
            <Form.Group className="m-5">
              <Form.Label className="form-label">會員帳號</Form.Label>
              <Form.Control
                type="email"
                id="account"
                className="primary-input"
                value={formData.account}
                onChange={onChangeForField("account")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">登入密碼</Form.Label>
              <Form.Control
                type="password"
                id="password"
                className="primary-input"
                value={formData.password}
                onChange={onChangeForField("password")}
              />
            </Form.Group>

            <ReCAPTCHA
              ref={recaptchaRef}
              className="ml-5 g-recaptcha"
              sitekey="6Ld1FUUaAAAAAK7odin1D4XaR--k7tD6mJryrlgS"
              onChange={verifyRobot}
            />
            
            <GoogleLogin
              className="ml-5 g-login"
              clientId="889183140809-q98qavt42ngbgrdj95nmese3smgslpqq.apps.googleusercontent.com"
              buttonText="Google   註冊 / 登入"
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginFail}
              cookiePolicy={"single_host_origin"}
            />

            <div className="d-flex justify-content-center m-4 mt-5">
              <Button
                type="button"
                className="btn primary-btn md mr-2"
                onClick={() => {
                  LoginToServer();
                }}
              >
                登入
              </Button>

              <Button
                type="button"
                className="btn primary-btn-demo md mr-2"
                onClick={() => {
                  autoPasswordData();
                }}
              >
                快速帳號
              </Button>

              <Button
                type="button"
                className="btn primary-btn-demo md"
                onClick={() => {
                  autoFormData();
                }}
              >
                一鍵填表
              </Button>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="ml-5">
                <a href="/member/forget">忘記密碼</a>
              </div>
              <div className="mr-5">
                還不是會員？<a href="/member/register">立即註冊</a>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(MemberLogin);
