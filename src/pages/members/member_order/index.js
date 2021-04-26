import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Table } from "react-bootstrap";
import { useSelector} from "react-redux";
import moment from "moment";
import "../members.scss";
// import { table, thead, tbody, tr, th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const MemberOrder = (props) => {
  const auth = useSelector((state) => state.auth);
  const [orderList, setOrderList] = useState([]);

  /* Execute when init */
  useEffect(() => {
    if (auth) {
      getMemberOrderList();
    }
  }, [auth]);

  /* Get member coupon */
  async function getMemberOrderList() {
    const url = "http://localhost:3310/member/order";
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
      setOrderList(data.body);
    }
  }

  const OrderTalbeTr = orderList.map((order, index) => {
    const order_createdat = moment(order.created_at).format('YYYY-MM-DD HH:mm:ss')
    let orderStatus ="";
    if(order.status === 1){
      orderStatus = "未出貨"
    }else if(order.status === 2){
      orderStatus = "已出貨"
    }else{
      orderStatus ="已棄單"
    }
    return (
      <tr key={"everyOrder" + index}>
        <td>{order.unique_id}</td>
        <td>{order_createdat}</td>
        <td>$&nbsp;{order.price}&nbsp;&nbsp;TWD</td>
        <td>{orderStatus}</td>
        <td><a href={"/member/orderdetail/" + order.unique_id}>查看明細</a></td>
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
              訂單紀錄
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <span className="mhead">Hello {auth.name} !</span>
          <ListGroup defaultActiveKey="./order" className="mt-5">
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

        <Col  sm={12} md={9} lg={6} className="mx-auto">
          <span className="mhead">訂單紀錄</span>
          <Table  striped bordered hover className="mt-5 mtext">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>訂購日期</th>
                <th>訂購總額</th>
                <th>訂單狀態</th>
                <th>訂單明細</th>
              </tr>
            </thead>
            <tbody>{OrderTalbeTr}</tbody>
          </Table >
        </Col>
      </Row>
    </div>
  );
};

export default MemberOrder;
