import { Container } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { Animated } from "react-animated-css";
import "./ShareAllInner.scss";

// icons
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";

function ShareAllInner(props) {
  let { sid } = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [heart, setHeart] = useState("");
  const [watch, setWatch] = useState("");
  const [img, setImg] = useState("");

  // fetch individual data
  useEffect(() => {
    fetch(`http://localhost:3310/social/individual?sid=${sid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setName(data[0].name);
        setDate(data[0].created_at);
        setHeart(data[0].heartNumber);
        setWatch(data[0].watchNumber);
        setImg(data[0].img);
      });
  }, [sid]);

  return (
    <>
      <Container className="greyText" style={{ overflow: "hidden" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/#">首頁</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <a href="/social">人氣王</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>

        <div className="ShareAllInnerDiv">
          {/* 左資訊 */}
          <div id="portfolioLeft" className="col-sm-12 col-md-4 text-center">
            <Animated animationIn="bounceInUp" className="squareBackGroundLeft">
              <img src="/img/social/squareBackGround.png" alt=""></img>
            </Animated>
            <div id="portfolioText">
              <p className="personalLargeTitle fontUnderLine">分享集</p>
              <p className="smallTitle">{name}</p>
              <Moment className="smallTitle" format="YYYY/MM/DD">
                {date}
              </Moment>
            </div>
            <div id="portfolioIcon" className="d-flex justify-content-center">
              <div>
                <div id="icons" style={{ width: "50px" }}>
                  <IoIosHeartEmpty className="shareAllInnerIcon" />
                </div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "lighter",
                    lineHeight: "20px",
                  }}
                  className="mt-1"
                >
                  {heart}
                </p>
              </div>
              <div>
                <div id="icons" style={{ width: "50px" }}>
                  <FaRegEye className="shareAllInnerIcon" />
                </div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "lighter",
                    lineHeight: "20px",
                  }}
                  className="mt-1"
                >
                  {watch}
                </p>
              </div>
              <div>
                <div id="icons" style={{ width: "50px" }}>
                  <AiOutlineShareAlt className="shareAllInnerIcon" />
                </div>
              </div>
            </div>
            <Animated
              animationIn="bounceInRight"
              className="squareBackGroundRight"
            >
              <img src="/img/social/squareBackGroundRight.png" alt=""></img>
            </Animated>
          </div>

          {/* 右圖片 */}
          <div id="portfolioRight" className="col-sm-12 col-md-7">
            <img
              src={`/img/social/uploads/${img}`}
              id="shareImg"
              alt="他人作品分享"
            ></img>
          </div>
          <div
            className="leftControl"
            onClick={() => {
              props.history.push(`/social/shareAll/${--sid}`);
            }}
          ></div>
          <div
            className="rightControl"
            onClick={() => {
              props.history.push(`/social/shareAll/${++sid}`);
            }}
          ></div>
        </div>
      </Container>
    </>
  );
}
export default withRouter(ShareAllInner);
