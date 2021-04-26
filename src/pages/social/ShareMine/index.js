import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsUpload } from "react-icons/bs";
// import ImgUpload from "./ImgUpload.js";
import "./ShareMine.scss";

function ShareMine(props) {
  // 抓取網址
  const url = props.location.pathname;
  // const memberQueryString = url.slice(24);
  console.log("url是我", url);
  // const uploadFolder = "/imgs/social/uploads";

  // redux抓取auth資料
  const auth = useSelector((state) => state.auth);
  // 抓取member_id、name、img
  // console.log("auth.name是我", auth.name);
  // const [img, setImg] = useState("");
  // const [done, setDone] = useState(false);

  const memberID = auth.sid;
  const name = auth.name;
  console.log(memberID, name);

  // 上傳過圖片跳轉
  // useEffect(() => {
  //   props.history.push(`/social/shareMine/${auth.sid}/Mine`);
  // }, [done]);

  // 是否上傳
  useEffect(() => {
    if (auth) {
      fetch(`http://localhost:3310/social/isposted?member_id=${memberID}`)
        .then((r) => r.json())
        .then((obj) => {
          // console.log("data_obj是我", obj);
          if (obj.isPost) {
            props.history.push(url + auth.sid + "/Mine");
          }
        });
    }
  }, [auth]);

  // 上傳的資料建立一個FormData
  let formData = new FormData();

  const handleChangeFile = (event) => {
    // console.log(event)
    const file = event.target.files[0];

    formData.append("imgPosted", file);
    //Make a request to server and send formData
    if (file) {
      document.getElementById("chooseBtn").style = "display:none";
      document.getElementById("submitBtn").style = "display:inline";
    }
  };

  // 資料庫insert資料
  const addNewDate = (item) => {
    // console.log("img是我", img);
    // console.log("item是我", item);
    formData.append("member_id", memberID);
    formData.append("name", name);
    // const data = { memberID, name, img };
    fetch("http://localhost:3310/social/addnewdata", {
      method: "post",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(data)
      body: formData,
    })
      .then((r) => r.json())
      .then((objooo) => {
        if (objooo.success) {
          //setDone(true);
          props.history.push(url + auth.sid + "/Mine");
        }
        console.log("objooo是我", objooo);
      });
  };

  return (
    <>
      <Container className="greyText mb-5">
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

        <div
          className="row d-flex justify-content-center"
          style={{ position: "relative" }}
        >
          <img
            id="myShareBackGround"
            src="/img/social/myShareBackGround.png"
            alt=""
          ></img>
          <div id="myShareContent">
            <div
              className="uploadImgDiv d-flex justify-content-center"
              style={{ position: "relative" }}
            >
              <img
                className="uploadImg"
                src="/img/social/uploads.png"
                alt=""
              ></img>
            </div>
            <p className="morelargeTitle">分享作品 獲得折價卷</p>
            {/* 按鈕開始 */}
            <input
              hidden
              type="file"
              id="imgPosted"
              name="imgPosted"
              accept="image/*"
              // onChange={(e) => {
              //   // grab temp uploaded img
              //   let generatedImgURL = URL.createObjectURL(e.target.files[0]);
              //   // set canvas image
              //   setImg(generatedImgURL);
              // }}
              // 把input欄位的資料傳進handleChangeFile
              onChange={handleChangeFile.bind(this)}
            />
            <br></br>
            <Button
              id="chooseBtn"
              className="my-2"
              onClick={(e) => {
                document.getElementById("imgPosted").click();
              }}
            >
              <span>
                <BsUpload /> &emsp; 選擇檔案
              </span>
            </Button>
            <br></br>
            <Button
              id="submitBtn"
              className="uploadBtnMD btn important-btn md"
              style={{ display: "none" }}
              onClick={(e) => {
                if (document.getElementById("checkMe").checked) {
                  addNewDate();
                } else {
                  alert("請勾選同意訂購條款");
                }
              }}
            >
              上傳檔案
            </Button>
            {/* 按鈕結束 */}
            <div className="mt-3" style={{ width: "90vw" }}>
              <input id="checkMe" type="checkbox"></input>
              <span className="checkboxSpan ml-2 ">
                同意上傳。公開分享於此網站，並且不涉及色情血腥暴力。
              </span>
            </div>
          </div>
        </div>
        <p className="moreSmallTitle mt-2 d-flex justify-content-center col-xl-8">
          按著作權法（下稱本法）第10條之1規定：「依本法取得之著作權，其保護僅及於該著作之表達，而不及於其所表達之思想、程序、製程、系統、操作方法、概念、原理、發現。」。如發生爭議時，仍應由司法機關於具體個案調查事實認定之。
        </p>
      </Container>
    </>
  );
}
export default withRouter(ShareMine);
