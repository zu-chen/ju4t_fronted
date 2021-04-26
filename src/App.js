import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import JNavbar from "./components/JNavbar";
import JMainContent from "./components/JMainContent";
import JFooter from "./components/JFooter";
import ScrollToTop from "./components/ScrollToTop";

import Example from "./pages/Example";

import Home from "./pages/home";

import ProductsList from "./pages/products/products_list";
import ProductDetails from "./pages/products/product_details";
import CustomizeStepOne from "./pages/products/customize_step_one";
import CustomizeStepTwo from "./pages/products/customize_step_two";
import CustomizeStepThree from "./pages/products/customize_step_three";

import OrderStep0 from "./pages/orders/OrderStep0";
import OrderStep1 from "./pages/orders/OrderStep1";
import OrderStep2 from "./pages/orders/OrderStep2";
import OrderStep3 from "./pages/orders/OrderStep3";
import OrderRout from "./pages/orders/OrderRout";

import MemberLogin from "./pages/members/member_login";
import MemberRegister from "./pages/members/member_register";
import MemberProfile from "./pages/members/member_profile";
import MemberPassword from "./pages/members/member_password";
import MemberForget from "./pages/members/member_forget";
import MemberOrder from "./pages/members/member_order";
import MemberOrderdDtail from "./pages/members/member_orderdetail";
import MemberCoupon from "./pages/members/member_coupon";

import GameIndex from "./pages/coupons/Game_Index";
import GamePlay from "./pages/coupons/Game_Play";
import GameResult from "./pages/coupons/Game_Result";

import SocialStart from "./pages/social/SocialStart";
import ShareAll from "./pages/social/ShareAll";
import ShareAllInner from "./pages/social/ShareAllInner";
import ShareMine from "./pages/social/ShareMine";
import ShareMineInner from "./pages/social/ShareMineInner";
// import FullPageTest from "./pages/social/FullPageTest";

import ProductsListToken from "./pages/test/ProductsListToken";
import ReduxBagCounter from "./pages/test/ReduxBagCounter";
import KonvaCanvas from "./pages/test/KonvaCanvas";
import FileUpload from "./pages/test/FileUpload";

import NotFound from "./pages/NotFound";

const checkToken = (to, from, next) => {
  if (to.meta.auth) {
    let token = sessionStorage.getItem("JWT_TOKEN");
    if (token && token.indexOf("Bearer") > -1) {
      next();
    } else {
      next.redirect("/member/login");
    }
  } else {
    next();
  }
};

function App() {
  const [mainBlur, SetMainBlur] = useState("0px");

  return (
    <Router>
      <>
        <JNavbar SetMainBlur={SetMainBlur} />
        <JMainContent mainBlur={mainBlur}>
          <ScrollToTop>
            <GuardProvider guards={[checkToken]} error={NotFound}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/example">
                  <Example />
                </Route>
                <Route path="/order">
                  <OrderRout />
                </Route>
                <Route path="/OT/cart">
                  <OrderStep0 />
                </Route>
                <Route path="/OT/1">
                  <OrderStep1 />
                </Route>
                <Route path="/OT/2">
                  <OrderStep2 />
                </Route>
                <Route path="/OT/3">
                  <OrderStep3 />
                </Route>
                <Route exact path="/products">
                  <ProductsList />
                </Route>
                <Route exact path="/products/details/:phoneModel/:designId">
                  <ProductDetails />
                </Route>
                <Route exact path="/customize">
                  <Redirect to="/customize/step-one" />
                </Route>
                <Route exact path="/customize/step-one">
                  <CustomizeStepOne />
                </Route>
                <Route exact path="/customize/step-two">
                  <CustomizeStepTwo />
                </Route>
                <Route exact path="/customize/step-three">
                  <CustomizeStepThree />
                </Route>
                <Route exact path="/member">
                  <MemberLogin />
                </Route>
                <Route
                  exact
                  path="/member/login"
                  component={MemberLogin}
                ></Route>
                <Route
                  exact
                  path="/member/register"
                  component={MemberRegister}
                ></Route>
                <GuardedRoute
                  exact
                  path="/member/profile"
                  component={MemberProfile}
                  meta={{ auth: true }}
                ></GuardedRoute>
                <GuardedRoute
                  exact
                  path="/member/password"
                  component={MemberPassword}
                  meta={{ auth: true }}
                ></GuardedRoute>
                <Route
                  exact
                  path="/member/forget"
                  component={MemberForget}
                ></Route>
                <GuardedRoute
                  exact
                  path="/member/order"
                  component={MemberOrder}
                  meta={{ auth: true }}
                ></GuardedRoute>
                <GuardedRoute
                  exact
                  path="/member/orderdetail/:orderid"
                  component={MemberOrderdDtail}
                  meta={{ auth: true }}
                ></GuardedRoute>
                <GuardedRoute
                  exact
                  path="/member/coupon"
                  component={MemberCoupon}
                  meta={{ auth: true }}
                ></GuardedRoute>
                {/* social */}
                <Route exact path="/social">
                  <SocialStart />
                </Route>
                <Route exact path="/social/shareAll">
                  <ShareAll />
                </Route>
                <Route exact path="/social/shareAll/:sid">
                  <ShareAllInner />
                </Route>
                <Route exact path="/social/shareMine">
                  <ShareMine />
                </Route>
                <Route exact path="/social/shareMine/:member_sid/Mine">
                  <ShareMineInner />
                </Route>
                {/* <Route exact path="/social/FullPageTest">
                  <FullPageTest />
                </Route> */}
                <Route exact path="/gameindex">
                  <GameIndex />
                </Route>
                <Route exact path="/gameplay">
                  <GamePlay />
                </Route>
                <Route exact path="/gameresult">
                  <GameResult />
                </Route>

                {/* Testing Routes */}
                <Route exact path="/test/products-list-token">
                  <ProductsListToken />
                </Route>
                <Route exact path="/test/redux-bag-counter">
                  <ReduxBagCounter />
                </Route>
                <Route exact path="/test/konva">
                  <KonvaCanvas />
                </Route>
                <Route exact path="/test/file-upload">
                  <FileUpload />
                </Route>

                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </GuardProvider>
          </ScrollToTop>
        </JMainContent>
        <JFooter />
      </>
    </Router>
  );
}

export default App;
