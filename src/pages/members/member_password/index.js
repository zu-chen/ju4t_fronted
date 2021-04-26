import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../members.scss";

const MemberPassword = (props) => {
  const [formData, setInputs] = useState({
    password: "",
    newpassword: "",
    newpassword2: "",
  });

  const onChangeForField = (fieldName) => (event) => {
    checkFormData(fieldName, event.target.value);
    setInputs((state) => ({ ...state, [fieldName]: event.target.value }));
  };

  const [formError, setFormError] = useState({
    password: "",
    newpassword: "",
    newpassword2: "",
  });

  function checkFormData(fieldName, fieldValue) {
    let checkResult = false;
    switch (fieldName) {
      case "password":
        checkResult = fieldValue.match(/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/);
        if (!checkResult) {
          setFormError((state) => ({ ...state, password: "密碼格式錯誤" }));
        }
        break;
      case "newpassword":
        checkResult = fieldValue.match(/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/);
        if (!checkResult) {
          setFormError((state) => ({ ...state, newpassword: "請輸入至少包含1個英文字母與數字之8~16個字元組合" }));
        }
        break;
      case "newpassword2":
        checkResult = fieldValue !== "" && fieldValue === formData.newpassword;
        if (!checkResult) {
          setFormError((state) => ({
            ...state,
            newpassword2: "新密碼兩次輸入不同",
          }));
        }
        break;
      default:
    }
    if (checkResult) {
      setFormError((state) => ({ ...state, [fieldName]: "OK" }));
    }
  }

  const auth = useSelector((state) => state.auth);
 
  function PasswordAlert(title, text, icon, showConfirmButton, timer) {
    const Swal = require("sweetalert2");
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: showConfirmButton,
      timer: timer,
    });
  }

  async function editMemberPassword() {
    let isPassCheck = true;
    Object.keys(formData).forEach((fieldName) => {
      checkFormData(fieldName, formData[fieldName]);
      if (isPassCheck  && formError[fieldName] && formError[fieldName].indexOf("OK") === -1) {
        isPassCheck = false;
      }
    });
    if (!isPassCheck) {
      console.log("Form verfify fail.");
      return;
    }

    const url = "http://localhost:3310/member/editpassword";

    const request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth.token,
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    if (data.result === "更新成功!") {
      setFormError({ password: "", newpassword: "", newpassword2: "" });
      PasswordAlert(
        "更新成功",
        "下次登入請使用新密碼!",
        "success",
        false,
        1600
      );
    } else if (data.result === "資料未更新!") {
      setFormError({ password: "", newpassword: "", newpassword2: "" });
      PasswordAlert(
        "更新失敗",
        "無更新資料",
        "warning",
        false,
        1600
      );
    } else {
      setFormError({ password: "", newpassword: "", newpassword2: "" });
      PasswordAlert("更新失敗", "密碼錯誤", "error", false, 1600);
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
              密碼變更
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <span className="mhead">Hello {auth.name} !</span>
          <ListGroup defaultActiveKey="./password" className="mt-5">
            <ListGroup.Item action href="./profile">
              會員資料
            </ListGroup.Item>
            <ListGroup.Item action href="./password">
              密碼變更
            </ListGroup.Item>
            <ListGroup.Item action href="./order">
              訂單紀錄
            </ListGroup.Item>
            <ListGroup.Item action href="./coupon">
              我的優惠券
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col sm={12} md={8} lg={6} className="mx-auto">
          <span className="mhead">密碼變更</span>
          <Form>
            <Form.Group className="m-5">
              <Form.Label htmlFor="newpassword" className="form-label">
                會員新密碼
              </Form.Label>
              <small
                className={
                  formError.newpassword.indexOf("OK") > -1
                    ? "successText"
                    : "errorText"
                }
              >
                {formError.newpassword}
              </small>
              <Form.Control
                className="primary-input"
                type="password"
                name="newpassword"
                value={formData.newpassword}
                onChange={onChangeForField("newpassword")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label htmlFor="newpassword2" className="form-label">
                新密碼確認
              </Form.Label>
              <small
                className={
                  formError.newpassword2.indexOf("OK") > -1
                    ? "successText"
                    : "errorText"
                }
              >
                {formError.newpassword2}
              </small>
              <Form.Control
                className="primary-input"
                type="password"
                name="newpassword2"
                id="newpassword2"
                value={formData.newpassword2}
                onChange={onChangeForField("newpassword2")}
              />
            </Form.Group>

            <Form.Group className="m-5">
              <Form.Label htmlFor="password" className="form-label text-orange">
                請輸入原會員密碼以變更資料
              </Form.Label>
              <small
                className={
                  formError.password.indexOf("OK") > -1
                    ? "successText"
                    : "errorText"
                }
              >
                {formError.password}
              </small>
              <Form.Control
                type="password"
                className="primary-input"
                id="passoword"
                value={formData.password}
                onChange={onChangeForField("password")}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                type="button"
                className="btn primary-btn md"
                onClick={() => {
                  editMemberPassword();
                }}
              >
                變更密碼
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(MemberPassword);
