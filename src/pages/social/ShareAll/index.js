import React from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import CardWaterFall from "./CardWaterFall";
import "./ShareAll.scss";
import "../scss/Social.scss";
import { IoIosArrowUp } from "react-icons/io";
// import { LazyLoadImage } from 'react-lazy-load-image-component';

function ShareAll(props) {
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
  };
  return (
    <>
      <Container className="greyText">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">首頁</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href="/social">人氣王</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              分享集
            </li>
          </ol>
        </nav>
        <div className="text-center mt-5">
          <img
            className="circleBackGround"
            src="/img/social/circleBackGround.png"
            alt=""
          ></img>
          <h4 className="largeTitle">分享即有機會獲得大獎</h4>
          <h6 className="smallTitle">＃我們都在用JU4T</h6>
          <br></br>

          <button
            className="btn primary-btn md"
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
        <div className="my-5">
          <CardWaterFall />
        </div>
      </Container>
      {/* <a
        href="###"
        className="fixed fixed-bottom"
        fixed="left"
        // style={{ border: "0px", width: "50px" }}
      >
        <AiOutlineArrowUp />
      </a> */}
      <button className="fixed sticky-top">
        <a
          href="##"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
          }}
        >
          <IoIosArrowUp className="toTop" />
          <p>Top</p>
        </a>
      </button>
    </>
  );
}
export default withRouter(ShareAll);
