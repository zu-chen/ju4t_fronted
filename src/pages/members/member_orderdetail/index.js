import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "../members.scss";

const MemberOrderDetail = (props) => {
  const auth = useSelector((state) => state.auth);
  const [orderDetailList, setOrderDetailList] = useState([]);
  const [orderDetailProfile, setOrderDetailProfile] = useState([]);
  const order_id = props.match.params.orderid;

  /* Execute when init */
  useEffect(() => {
    if (auth) {
      getMemberOrderDetail();
    }
  }, [auth]);

  async function getMemberOrderDetail() {
    const url = "http://localhost:3310/member/orderdetail/" + order_id;
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
    console.log(data);
    if (data.body) {
      setOrderDetailList(data.body);
      setOrderDetailProfile(data.body);
    }
  }

  const OrderDetailProfile = orderDetailProfile.map((order, index) => {

    let orderDiscount = "" ;
    if(order.discount === 1){
      orderDiscount = "原價"
    }else if(order.discount === 0.9){
      orderDiscount = "九折優惠"
    }else if(order.discount === 0.8){
      orderDiscount = "八折優惠"
    }else if(order.discount === 0.7){
      orderDiscount = "七折優惠"
    }else {
      orderDiscount = "—"
    }
    if (index === 0) {
      return (
        <tbody key={"everyOrderDetailProfile" + index}>
          <tr>
            <td className="textbold colbg">收件姓名</td>
            <td>{order.taker}</td>
          </tr>
          <tr>
            <td className="textbold colbg">收件電話</td>
            <td>{order.taker_phone}</td>
          </tr>
          <tr>
            <td className="textbold colbg">取貨方式</td>
            <td>{order.getway}</td>
          </tr>
          <tr>
            <td className="textbold colbg">取貨地址</td>
            <td>{order.address}</td>
          </tr>
          <tr>
            <td className="textbold colbg">付款方式</td>
            <td>{order.payway}</td>
          </tr>
          <tr>
            <td className="textbold colbg">優惠折扣</td>
            <td>{orderDiscount}</td>
          </tr>
        </tbody>
      );
    }
  });

  const OrderDetailList = orderDetailList.map((order, index) => {
    const imgModel = order.model_id.replaceAll(" ", "-");
    const imgSmodel = imgModel.replaceAll("Phone-", "").replaceAll(" ", "-");
    const imgSeries = order.series_name_eng.replaceAll(" ", "-");
    const imgDesign = order.design_name_eng.replaceAll(" ", "-");
    return (
      <tr key={"everyOrderDetailList" + index}>
        <td>
          <div className="col-2 order-product-pic position-relative">
            <img
              src={`/img/products/phones/${imgModel}/${imgSmodel}-${order.phoneColor}.png`}
              className="position-absolute"
              alt=""
            />
            <img
              src={
                order.filepath
                  ? `/img/products/uploads/${order.filepath}.png`
                  : `/img/products/series/${imgSeries}/${imgDesign}.png`
              }
              className="position-absolute"
              alt=""
            />

            <img
              src={`/img/products/shells/shell-${order.shell_color_en}.png`}
              className="position-absolute"
              alt=""
            />
            <img
              src={`/img/products/phones/${imgModel}/${imgSmodel}-cam-${order.phoneColor}.png`}
              className="position-absolute"
              alt=""
            />
          </div>
        </td>
        <td>
          {order.model_id} - JU4T防摔殼 <br /> {order.series_name_chn}系列 -{" "}
          {order.design_name_chn}
        </td>
        <td>$&nbsp;{order.per_price}&nbsp;&nbsp;TWD</td>
        <td>{order.quantity}</td>
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
            <li className="breadcrumb-item" aria-current="page">
              <a href="/member/order">訂單紀錄</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {order_id}
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="marginbottom">
        <Col md={3} lg={3} className="mob_none">
          <span className="mhead">Hello {auth.name} !</span>
          <ListGroup defaultActiveKey="/member/order" className="mt-5">
            <ListGroup.Item action href="/member/profile">
              會員資料
            </ListGroup.Item>
            <ListGroup.Item action href="/member/password">
              密碼變更
            </ListGroup.Item>
            <ListGroup.Item action href="/member/order">
              訂單紀錄
            </ListGroup.Item>
            <ListGroup.Item action href="/member/coupon">
              我的優惠券
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col sm={12} md={9} lg={6} className="mx-auto">
          <span className="mhead">訂單編號：{order_id}</span>
          <Table bordered hover className="mt-5 mtext">
            {OrderDetailProfile}
          </Table>
          <Table bordered hover className="mt-5 mtext">
            <thead className="colbg">
              <tr>
                <th>訂單商品</th>
                <th>商品名稱</th>
                <th>商品價格</th>
                <th>訂購數量</th>
              </tr>
            </thead>
            <tbody>{OrderDetailList}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(MemberOrderDetail);
