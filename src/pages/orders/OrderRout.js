import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth } from "../../actions/authAction";

// import { data, memberData } from "./fakeData";

import OrderStep1 from "./OrderStep1";
import OrderStep2 from "./OrderStep2";
import OrderStep3 from "./OrderStep3";

function OrderRout(props) {
  // url判斷
  const url = props.location.pathname;
  // member
  const auth = useSelector((state) => state.auth);
  const [couponList, setCouponList] = useState([]);
  

  const dispatch = useDispatch();

  const memberData = {
    id: auth.sid,
    name: auth.name,
    email: auth.account,
    phone: auth.mobile,
    birthday: auth.birthday,
    coupon: couponList,
  };

  function LogOut(props) {
    dispatch(clearAuth());
    sessionStorage.removeItem("JWT_TOKEN");
  }

  // 購物車
  const [cartList, setCartList] = useState("");
  // STEP1資料
  const [orderDetail, setOrderDetail] = useState({
    tag: [
      { id: 1, text: "active", picked: false, discount: 0.9 },
      { id: 2, text: "active", picked: false, discount: 0.8 },
      { id: 3, text: "active", picked: false, discount: 0.7 },
    ],
    discount: 1,
    getWay: "超商取貨",
    payWay: "貨到付款",
    receipt: "二聯式電子發票",
    setted: false,
  });
  // STEP2資料
  const [orderDetail2, setOrderDetail2] = useState({
    name: "",
    phone: "",
    city: "",
    addNum: "",
    address: "",
    store: "",
    block: "",
  });
  //撈Coupon資料
  
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
      const tempList = data.body.map((v) => {
        if (v.coupon_name === "9折折價券") {
          return "九折";
        }
        if (v.coupon_name === "8折折價券") {
          return "八折";
        }
        return "七折";
      });
      //去除陣列中重複的選項 ▼
      let unique = [...new Set(tempList)];
      //以九折、八折、七折順序排列 ▼
      unique.sort(function (a, b) {
        let itemA = a === "九折" ? 9 : a === "八折" ? 8 : 7;
        let itemB = b === "九折" ? 9 : b === "八折" ? 8 : 7;
        if (itemA < itemB) {
          return 1;
        }
        if (itemA > itemB) {
          return -1;
        }
        return 0;
      });
      setCouponList(unique);
    }
  }
  useEffect(() => {
    if (auth) {
      getMemberCoupon();
    }
  }, [auth]);


  useEffect(() => {
    let token = Cookies.get("cart_products");

    fetch("http://localhost:3310/products/decode-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCartList(data.data);
      });
   

  }, []);

  return (
    <>
      <Container>
        {url === "/order" ? <Redirect to="/order/step1" /> : ""}

        <Switch>
          <Route path="/order/step1/step2/step3">
            <OrderStep3
              cartList={cartList}
              orderDetail={orderDetail}
              memberData={memberData}
              orderDetail2={orderDetail2}
              setOrderDetail={setOrderDetail}
            />
          </Route>
          <Route path="/order/step1/step2">
            <OrderStep2
              cartList={cartList}
              orderDetail={orderDetail}
              memberData={memberData}
              orderDetail2={orderDetail2}
              setOrderDetail2={setOrderDetail2}
              LogOut={LogOut}
            />
          </Route>
          <Route path="/order/step1">
            <OrderStep1
              cartList={cartList}
              setCartList={setCartList}
              orderDetail={orderDetail}
              setOrderDetail={setOrderDetail}
              memberData={memberData}
              orderDetail2={orderDetail2}
              setOrderDetail2={setOrderDetail2}
            />
          </Route>
          <Route path="order/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
export default withRouter(OrderRout);
