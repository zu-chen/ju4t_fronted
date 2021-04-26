import React, { useEffect, useState } from "react";
// import { CardColumns } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CardForEach from "./CardForEach";

const CardWaterFall = () => {
  const [list, setList] = useState([]);

  const addHeart = (item) => {
    console.log(item);
    fetch("http://localhost:3310/social/addheart", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((r) => r.text())
      .then((obj) => {
        console.log(obj);
      });
    getData();
  };

  const addWatch = (item) => {
    console.log(item);
    fetch("http://localhost:3310/social/addwatch", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((r) => r.text())
      .then((obj) => {
        console.log(obj);
      });
    getData();
  };

  function getData() {
    fetch(`http://localhost:3310/social/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(data.reverse());
      });
  }

  // [list]
  useEffect(() => {
    getData();
  }, []);

  let socialArray = list.map((item, index) => (
    <CardForEach
      key={item.sid}
      src={`/img/social/uploads/${item.img}`}
      imgHref={`http://localhost:3000/social/shareAll/${item.sid}`}
      heartNumber={item.heartNumber}
      watchNumber={item.watchNumber}
      addHeart={addHeart}
      addWatch={addWatch}
      item={item}
      index={index}
    />
  ));

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry id="cardCard">{socialArray}</Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default CardWaterFall;
