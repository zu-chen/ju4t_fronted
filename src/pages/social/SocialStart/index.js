import React from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Animated } from "react-animated-css";
import CardSlider from "./CardSlider";
import "../scss/Social.scss";
import "./SocialStart.scss";

function SocialStart(props) {
  // redux抓取auth資料
  const auth = useSelector((state) => state.auth);
  // onClick後才fetch資料
  const handleClick = async () => {
    // fetch social data
    console.log(auth);
    await fetch(
      `http://localhost:3310/social/individual2?member_id=${auth.sid}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("aaaa", data[0]);
        if (data[0]) {
          props.history.push(
            "/social/shareMine/memberSid_" + auth.sid + "/Mine"
          );
        } else {
          props.history.push("/social/shareMine/");
        }
      });
    // .catch((error) => {
    //   document.location.href =
    //     "http://localhost:3000/social/shareMine/memberSid_" + auth.sid;
    // });
  };

  return (
    <>
      <Container className="greyText">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">首頁</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              人氣王
            </li>
          </ol>
        </nav>
      </Container>
      {/* SocialStart */}
      <div class="socialContainer">
        <Container>
          <div id="socialTitle" className="d-flex align-items-center">
            <img
              className="socialTitleImg"
              src="/img/social/socialTitle.png"
              alt=""
            ></img>
          </div>
          {/* socialActivity */}
          <div
            id="socialActivity"
            className="d-flex justify-content-center my-5"
            style={{ position: "relative" }}
          >
            <img
              className="socialActivityImgL"
              src="/img/social/socialActivityTextL.png"
              alt=""
            ></img>
            <img
              className="socialActivityImgM"
              src="/img/social/socialActivityTextM.png"
              alt=""
            ></img>
            <button
              className="btn primary-btn md"
              id="socialActivityImgBtn"
              onClick={() => {
                if (auth.sid) {
                  handleClick();
                } else {
                  alert("請先登入會員");
                  props.history.push("/member/login");
                }
              }}
            >
              上傳檔案
            </button>
          </div>
        </Container>
      </div>
      <Container className="greyText">
        {/* socialCard */}
        <div id="phoneSocialCardText"></div>
        <div
          id="socialCard"
          className="d-flex justify-content-center mb-5"
          style={{ position: "relative" }}
        >
          <div
            id="socialCardText"
            className="my-5"
            style={{ left: "10%", position: "absolute" }}
          >
            <img src="/img/social/cardText.png" alt=""></img>
          </div>

          <div
            id="socialCardImg"
            className="text-center"
            style={{ margin: "0 auto" }}
          >
            <CardSlider />
          </div>
        </div>
        {/* socialCardMore */}
        <div className="text-center">
          <a href="/social/shareAll" style={{ textDecoration: "none" }}>
            <span className="morelargeTitle" style={{ fontSize: "48px" }}>
              More
            </span>
            <br></br>
            <Animated animationIn="bounce" className="infinite">
              <img
                className="sociaCardMoreIcon mt-3"
                src="/img/social/doubleArrow.png"
                alt=""
              ></img>
            </Animated>
          </a>
        </div>
        {/* <SwipeTest /> */}
        {/* <FullPageTest /> */}
      </Container>
    </>
  );
}
export default withRouter(SocialStart);
