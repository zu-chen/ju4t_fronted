import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import "./SocialStart.scss";

// icons
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineExclamation } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";

// Test
// function sleep(ms) {
//   return new Promise((r) => setTimeout(r, ms));
// }

const CardSlider = () => {
  // state for img
  const [imgList, setImgList] = useState([]);
  // state for sid
  const [sid, setSid] = useState("");
  // state for name
  const [name, setName] = useState("");
  // state for 上架日期
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3310/social/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImgList(data.reverse());
      });
  }, []);

  useEffect(() => {
    if (imgList) {
      const temp = { ...imgList[0] };
      console.log(temp);
      setSid(temp.sid);
      setName(temp.name);
      setDate(temp.created_at);
    }
  }, [imgList]);

  const addHeart = () => {
    fetch("http://localhost:3310/social/addheart", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imgList[0]),
    })
      .then((r) => r.text())
      .then((obj) => {
        console.log(obj);
      });
  };

  function removeData() {
    // filter只針對陣列, 並過濾掉非條件的物件
    const newList = [...imgList];
    console.log(newList);
    const temp = newList.filter((v, i) => i !== 0);
    setImgList(temp);
  }

  function newOne() {
    const temp = { ...imgList[0] };
    console.log(temp);
    setSid(temp.img);
  }

  async function yes() {
    newOne();

    // await sleep(1);
    // document.getElementById("P1").style.left = "1936px";
    // await sleep(200);
    // document.getElementById("P1").style.left = "-20px";
  }

  async function no() {
    newOne();
    // // 陣列第0張圖片
    // const temp0 = { ...imgList[0] };
    // console.log(temp0);
    // setSid(temp0.img);

    // await sleep(1);
    // document.getElementById("P1").style.left = "-1936px";
    // await sleep(200);
    // document.getElementById("P1").style.left = "-20px";
  }

  return (
    <>
      <div style={{ margin: "0 auto" }}>
        {/* card */}
        <div className="manyCard my-5">
          {imgList.map((item, i) => (
            // {}要return ()可以不要return
            // console.log(`我是${item.img}`);
            <img
              key={item.sid}
              src={`/img/social/uploads/${item.img}`}
              id={`P${i + 1}`}
              hidden={i > 2 ? true : false}
              alt="error"
              style={{ transitionDuration: "1000ms" }}
            ></img>
          ))}
        </div>

        {/* info, date */}
        <p className="largeTitle my-3" style={{ color: "#707070" }}>
          {name},&ensp;
          <Moment className="checkboxP2" format="YYYY/MM/DD">
            {date}
          </Moment>
        </p>
        {/* icons */}
        <div className="sociaCardshareIcon">
          <a
            href="##"
            onClick={(e) => {
              e.preventDefault();
              removeData();
              no();
            }}
          >
            <BsArrowLeft />
          </a>
          <a href={`http://localhost:3000/social/shareAll/${sid}`}>
            <AiOutlineExclamation />
          </a>
          <a
            id="addHeart"
            href="##"
            onClick={(e) => {
              e.preventDefault();
              addHeart();
              removeData();
              yes();
              // changeBTN();
            }}
          >
            <IoIosHeartEmpty />
          </a>
        </div>
      </div>
    </>
  );
};
export default CardSlider;
