import { Card } from "react-bootstrap";
import React, { useEffect } from "react";
import AOS from "aos";
import { Animated } from "react-animated-css";
import "aos/dist/aos.css";

// icons
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";

function CardForEach(props) {
  const { addHeart, addWatch, item } = props;

  // 滾動fade-up特效的秒數
  useEffect(() => {
    AOS.init({
      delay: 200,
    });
  }, []);

  useEffect(() => {}, [item]);
  return (
    <div id="cardCard" data-aos="fade-up">
      <a
        href={props.imgHref}
        onClick={() => {
          addWatch(item);
        }}
      >
        <Card.Img className="px-2 py-2" id="cardImg" src={props.src} />
      </a>

      <Animated
        animationIn="fadeIn"
        // className="infinite"
        style={{ animationDuration: "0.8s" }}
        className="hoverAllTag text-center"
      >
        <div className="">
          <a
            href="##"
            onClick={(e) => {
              e.preventDefault();
              addHeart(item);
            }}
          >
            <IoIosHeartEmpty />
          </a>
          <p>{item.heartNumber}</p>
          <a
            href="##"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FaRegEye />
          </a>
          <p>{item.watchNumber}</p>
          <a href="##">
            <AiOutlineShareAlt />
          </a>
        </div>
      </Animated>
    </div>
  );
}

export default CardForEach;
