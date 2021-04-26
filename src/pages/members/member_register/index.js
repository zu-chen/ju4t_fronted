import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "../members.scss";
import ReCAPTCHA from "react-google-recaptcha";

const MemberRegister = (props) => {
  const [formData, setInputs] = useState({
    account: "",
    password: "",
    password2: "",
    name: "",
    mobile: "",
    birthday: "",
    googleToken: "",
  });
  
  const onChangeForField = (fieldName) => (event) => {
    // checkFormData(fieldName, event.target.value);
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }));
  };
  // const dispatch = useDispatch();
  const recaptchaRef = React.createRef();
  function verifyRobot(res) {
    console.log(res)
    if (res) {
      setInputs({ ...formData, googleToken: res });
    } else {
      /* 如果機器人驗證過期，會回傳null，須讓formError重新設定 */
      setFormError((state) => ({ ...state, googleToken: "請勾選我不是機器人" }));
      setInputs({ ...formData, googleToken: "" });
    }
  }

  const [formError, setFormError] = useState({
    account: "",
    password: "",
    password2: "",
    name: "",
    mobile: "",
    birthday: "",
    googleToken: "",
  });

  function autoFormData() {
    setInputs({
      account: "jasmineli1107@gmail.com",
      password: "aaaa1111",
      password2: "aaaa1111",
      name: "李宜臻",
      mobile: "0911-111-111",
      birthday: "2021-03-05",
      googleToken: "",
    })
  }

   useEffect (() => {
      let isPassCheck = true
      Object.keys(formData).forEach(fieldName => {
        if (formData[fieldName] && formData[fieldName].length > 0) {
        checkFormData(fieldName, formData[fieldName])
        if (isPassCheck && formError[fieldName].indexOf("OK") === -1) {
          isPassCheck = false
          }
        }
      })
    },[formData])

  function checkFormData(fieldName, fieldValue) {
    let checkResult = false;
    switch (fieldName) {
        case "account":
        checkResult = fieldValue.match(
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        );
        if (!checkResult) {
          setFormError((state) => ({ ...state, account: "無效格式" }));
        }
        break;
        case "password":
        checkResult = fieldValue.match(/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/);
        if (!checkResult) {
          setFormError((state) => ({ ...state, password: "無效格式" }));
        }
        break;
        case "password2":
        checkResult = fieldValue !== "" && fieldValue === formData.password
        if (!checkResult) {
          setFormError((state) => ({ ...state, password2: "密碼兩次輸入不同" }));
        }
        break;
        case "name":
        checkResult = fieldValue && fieldValue.length > 1 && fieldValue.length < 11
        if (!checkResult) {
          setFormError((state) => ({ ...state, name: "請輸入2~10個中文或英文字元" }));
        }
        break;
        case "mobile":
          checkResult = fieldValue.match(/^09\d{2}-?\d{3}-?\d{3}$/);
          if (!checkResult) {
            setFormError((state) => ({ ...state, mobile: "請輸入09○○-○○○-○○○格式" }));
          }
        break;
        case "birthday":
        checkResult = fieldValue && fieldValue.length > 0
        if (!checkResult) {
          setFormError((state) => ({ ...state, birthday: "請填寫生日日期" }));
        }
        break;
        case "googleToken":
          checkResult = fieldValue && fieldValue.length > 10
          if (!checkResult) {
            setFormError((state) => ({ ...state, googleToken: "請勾選我不是機器人" }));
          }
          break;
      default:
    }
    if (checkResult) {
      setFormError((state) => ({ ...state, [fieldName]: "OK" }));
    }
  }

  async function RegisterToServer() {
    let isPassCheck = true
    Object.keys(formData).forEach(fieldName => {
      checkFormData(fieldName, formData[fieldName])
      if (isPassCheck && formError[fieldName].indexOf("OK") === -1) {
        isPassCheck = false
        }
    })
    if (!isPassCheck) {
      RegisterAlert(
        "註冊失敗",
        "請確認欄位格式是否填寫正確",
        "error",
        false,
        1600);
      console.log("Form verfify fail.")
      return
    }

    const url = "http://localhost:3310/member/register";

    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    function RegisterAlert(title, text, icon, showConfirmButton, timer) {
      const Swal = require("sweetalert2");
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: showConfirmButton,
        timer:  timer,
      });
    }
    
    if (data.result === "Register Success!") {
      RegisterAlert(
        "註冊成功",
        "請使用註冊之帳號密碼登入",
        "success",
        false,
        1600);
      props.history.push("/member/login");
    } else if (data.result === "Account exist.") {
      RegisterAlert(
        "註冊失敗",
        "註冊帳號重複",
        "error",
        false,
        1600);
    } else {
      alert(data.result);
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
              會員註冊
            </li>
          </ol>
        </nav>
      </Row>
      <Row  className="marginbottom">
        <Col lg="4">
          <div className="registerkv"></div>
        </Col>
        <Col lg="6">
          <h3 className="mhead">會員註冊</h3>
          <Form name="registerform">
            <Form.Group className="m-5">
              <Form.Label className="form-label">會員帳號</Form.Label>
              <small className={formError.account.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.account}</small>
              <Form.Control
                type="email"
                placeholder="請輸入日常使用之電子信箱做為登入帳號"
                className="primary-input"
                value={formData.account}
                onChange={onChangeForField("account")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">登入密碼</Form.Label>
              <small className={formError.password.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.password}</small>
              <Form.Control
                type="password"
                placeholder="至少包含1個英文字母與數字之8~16個字元組合"
                className="primary-input"
                value={formData.password}
                onChange={onChangeForField("password")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">確認密碼</Form.Label>
              <small className={formError.password2.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.password2}</small>
              <Form.Control
                type="password"
                className="primary-input"
                value={formData.password2}
                onChange={onChangeForField("password2")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">會員姓名</Form.Label>
              <small className={formError.name.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.name}</small>
              <Form.Control
                type="text"
                className="primary-input"
                value={formData.name}
                onChange={onChangeForField("name")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">手機號碼</Form.Label>
              <small className={formError.mobile.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.mobile}</small>
              <Form.Control
                type="text"
                className="primary-input"
                value={formData.mobile}
                onChange={onChangeForField("mobile")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label className="form-label">出生日期</Form.Label>
              <small className={formError.birthday.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.birthday}</small>
              <Form.Control
                type="date"
                className="primary-input"
                value={formData.birthday}
                onChange={onChangeForField("birthday")}
              />
            </Form.Group>

            <div className="d-flex">
            <ReCAPTCHA
              ref={recaptchaRef}
              className="ml-5 g-recaptcha mr-5"
              sitekey="6Ld1FUUaAAAAAK7odin1D4XaR--k7tD6mJryrlgS"
              // onChange={verifyCallback}
              onChange={verifyRobot}
            />
             <small className={formError.googleToken.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.googleToken}</small>
             </div>
            
            {/* <GoogleSocialLogin /> */}

            <div className="d-flex justify-content-center m-4">
              <Button
                type="button"
                className="btn primary-btn md mr-2"
                onClick={() => {
                  RegisterToServer();
                }}
              >
                註冊
              </Button>

              <Button
                type="button"
                className="btn primary-btn-demo md ml-2"
                onClick={() => {
                  autoFormData();
                }}
              >
                一鍵填表
              </Button>
            </div>

          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(MemberRegister);