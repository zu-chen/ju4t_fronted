import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "../members.scss";

const MemberCoupon = (props) => {
  const auth = useSelector((state) => state.auth);
  const [couponList, setCouponList] = useState([]);
  
  useEffect(() => {
    if (auth) {
      getMemberCoupon();
    }
  }, [auth]);

  async function getMemberCoupon() {
    const url = "http://localhost:3310/member/coupon";
    const request = new Request(url, {
      method: "GET",
      headers: new Headers({
      Accept: "application/json",
              "Content-Type": "application/json",
      Authorization: auth.token,
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    if (data.body) {
      setCouponList(data.body);
    }
  };
    
    const CouponTalbeTr = couponList.map((coupon, index) => {
      const coupon_getdate = moment(coupon.getdate).format('YYYY-MM-DD HH:mm:ss')
    return (
      <tr key={"everyCoupon" + index}>
        <td>{index + 1}</td>
        <td>{coupon.coupon_name}</td>
        <td>{coupon_getdate}</td>
        <td>{coupon.status}</td>
      </tr>
    );
  });

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
              我的優惠券
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <span className="mhead">Hello {auth.name} !</span>
          <ListGroup defaultActiveKey="./coupon" className="mt-5 msidehead ">
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

        <Col sm={12} md={9} lg={6} className="mx-auto">
          <span className="mhead">我的優惠券</span>
          <Table striped bordered hover className="mt-5 mtext">
            <thead>
              <tr>
                <th>編號</th>
                <th>名稱</th>
                <th>獲得日期</th>
                <th>使用狀態</th>
              </tr>
            </thead>
            <tbody>{CouponTalbeTr}</tbody>
          </Table>
        </Col>
      </Row >
    </div>
  );
};

export default withRouter(MemberCoupon);
