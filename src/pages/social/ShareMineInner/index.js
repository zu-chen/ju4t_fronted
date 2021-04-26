import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Animated } from "react-animated-css";
import "./ShareMineInner.scss";
// icons
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";

function ShareMineInner() {
  // state for img
  const [img, setImg] = useState("");
  // state for 審核狀態
  const [verifyStatus, setVerifyStatus] = useState(false);
  // state for 觀看數
  const [watch, setWatch] = useState("");
  // state for 愛心數
  const [heart, setHeart] = useState("");
  // state for 上架日期
  const [date, setDate] = useState("");
  // 取得登入資訊
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // fetch social data
    console.log(auth);

    // 登入狀態才去fetch資料
    if (auth) {
      fetch(`http://localhost:3310/social/individual2?member_id=${auth.sid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          setImg(data[0].img);
          setVerifyStatus(data[0].verifyStatus);
          setDate(data[0].created_at);
          setWatch(data[0].watchNumber);
          setHeart(data[0].heartNumber);
        });
    }
  }, [auth]);

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
              我的分享
            </li>
          </ol>
        </nav>

        {/* 圖片 */}
        <div className="shareMineInnerContainer container mb-5 mt-5">
          <div id="shareLeft" className="col-md-12 col-lg-5 mx-0 my-auto">
            <img
              className="shareSquareBackGroundLeft"
              src="/img/social/shareSquareBackGround.png"
              alt=""
            ></img>
            <img
              src={`/img/social/uploads/${img}`}
              id="shareImg"
              alt="個人分享"
            />
            <img
              className="shareSquareBackGroundRight"
              src="/img/social/shareSquareBackGround.png"
              alt=""
            ></img>
          </div>

          {/* 4個方框 */}
          <div id="shareRight" className="col-md-12 col-lg-5 mx-0 my-auto">
            <div className="allBox">
              <Animated
                animationIn="flipInX"
                className="box1"
                style={{
                  backgroundColor: "#f5e4d7",
                  // animationDuration: "0.8s",
                }}
              >
                <div>
                  <p className="checkboxP1">審核狀態</p>
                  <br></br>
                  <p className="checkboxP2">
                    {verifyStatus ? "審核中" : "通過"}
                  </p>
                </div>
              </Animated>
              <Animated
                animationIn="flipInX"
                className="box2"
                style={{
                  backgroundColor: "#e0dbd5",
                  animationDelay: "0.2s",
                }}
              >
                <div>
                  <p className="checkboxP1">上傳日期</p>
                  <br></br>
                  <Moment className="checkboxP2" format="YYYY/MM/DD">
                    {date}
                  </Moment>
                </div>
              </Animated>
            </div>

            <div className="allBox">
              <Animated
                animationIn="flipInX"
                className="box1"
                style={{ backgroundColor: "#e0dbd5", animationDelay: "0.3s" }}
              >
                <div>
                  <p className="checkboxP1">
                    觀看數 <FaRegEye className="shareAllInnerIcon" />
                  </p>
                  <br></br>
                  <p className="checkboxP2">{watch}</p>
                </div>
              </Animated>
              <Animated
                animationIn="flipInX"
                className="box2"
                style={{ backgroundColor: "#f5e4d7", animationDelay: "0.4s" }}
              >
                <div>
                  <p className="checkboxP1">
                    愛心數 <IoIosHeartEmpty className="shareAllInnerIcon" />
                  </p>
                  <br></br>
                  <p className="checkboxP2">{heart}</p>
                </div>
              </Animated>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default ShareMineInner;
