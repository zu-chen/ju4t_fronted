import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../members.scss";
// import Loading from "../components/Loading";

const MemberForget = (props) => {
  const [formData, setInputs] = useState({
    account: "",
    mobile: "",
    birthday: ""
  });

  function autoFormData() {
    setInputs({
      account: "jasmineli1107@gmail.com",
      mobile: "0911-111-111",
      birthday: "2021-03-05",
    })
  }

  const onChangeForField = (fieldName) => (event) => {
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }));
  };

  async function ForgetToServer(props) {
    const url = "http://localhost:3310/member/forget";
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request, { mode: 'cors' })
    const data = await response.json()

    function ForgetAlert(title,text,icon,showConfirmButton,timer){
      const Swal = require('sweetalert2')
        Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: showConfirmButton,
        timer: timer
      })
      };
    
    if (data.result === "UPDATE_PASSWORD_SUCCESS") {
      ForgetAlert('驗證成功','請至電子信箱查詢新密碼','success',false,1600)
    } else if(data.result === "ACCOUNT_MOBILE_OR_BIRTHDAY_ERROR"){
      ForgetAlert('驗證失敗','會員帳號、電話號碼或生日日期錯誤','error',false,1600)
    }
    else {
      console.log(data.result)
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
              忘記密碼
            </li>
          </ol>
        </nav>
      </Row>
      <Row  className="marginbottom">
        <Col lg="4">
          <div className="forgetkv"></div>
        </Col>
        <Col lg="6">
          <h3 className="mhead">忘記密碼</h3>
          <Form>
            <Form.Group className="m-5">
              <Form.Label className="form-label">會員帳號</Form.Label>
              {/* <small className={formError.birthday.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.account}</small> */}
              <Form.Control
                type="email"
                id="account"
                placeholder="請輸入註冊時之會員帳號"
                className="primary-input"
                value={formData.account}
                onChange={onChangeForField("account")}
              />
            </Form.Group>
            <Form.Group className="m-5">
              <Form.Label className="form-label">手機號碼</Form.Label>
              {/* <small className={formError.mobile.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.account}</small> */}
              <Form.Control
                type="text"
                id="mobile"
                placeholder="請輸入註冊時之電話號碼"
                className="primary-input"
                value={formData.mobile}
                onChange={onChangeForField("mobile")}
              />
            </Form.Group>
            <Form.Group className="m-5">
              <Form.Label className="form-label">出生日期</Form.Label>
              {/* <small className={formError.birthday.indexOf("OK") > -1 ? "successText" : "errorText"}>{formError.birthday}</small> */}
              <Form.Control
                type="date"
                className="primary-input"
                value={formData.birthday}
                onChange={onChangeForField("birthday")}
              />
            </Form.Group>

            <div className="forget-text ml-5">
                  <h6>請輸入註冊時所使用的E-amil信箱地址，</h6>
                  <h6>我們將會產生一組新的密碼並寄至信箱，提供您重新登入。</h6>
                </div>

            <div className="d-flex justify-content-center m-5">
              <Button
                type="button"
                className="btn primary-btn md mr-2"
                onClick={() => {
                  ForgetToServer();
                }}
              >
                發送
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

export default withRouter(MemberForget);
