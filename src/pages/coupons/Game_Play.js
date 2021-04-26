import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./game_play.scss";
import { Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { data } from "jquery";
// import CountDownTimer from './components/CountDownTimer';
// import useInterval from '@use-it/interval';

function GamePlay() {
  const [card, setCard] = useState({});
  const [socer, setSocer] = useState(0);

  const [cardStore, setcardStore] = useState("");
  const [isStart, setIsStart] = useState(false);

  //cardValue=點擊到的那張卡片的value
  function store(cardValue) {
    //存點擊到卡片value

    if (cardStore === "") {
      setcardStore(cardValue);
    }
    if (cardStore !== "") {
      // const a = document.value
      const a = [cardStore];
      if (a.length === 2) {
        console.log(a);
      }
    }
  }
  // if(e.currentTarget.classList.contains('flip')){
  //     console.log('測試')}

  //儲存選到的卡片

  function flipCard(e) {
    if (isStart) {
      // console.log('e.target',e.currentTarget)
      //cardStore:存放第一章點擊的state
      if (e.currentTarget.classList.contains("flip")) {
        console.log("沒點擊的狀況");
      } else {
        console.log("有點擊的狀況");
        //將點擊到的卡片加flip
        e.currentTarget.classList.add("flip");
        if (cardStore === "") {
          // console.log('cardStore',cardStore)
          //如果cardStore裡面沒東西，那就將第一個點擊到的卡片存放進去state
          setcardStore(e.currentTarget);
          //如果裡面不是空字串，那就執行以下
        } else {
          let cardTwo = e.currentTarget;
          // console.log(cardStore.getAttribute('data-phonecase'))
          if (
            cardStore.getAttribute("data-phonecase") ===
            e.currentTarget.getAttribute("data-phonecase")
          ) {
            setSocer(socer + 1);
            setcardStore("");
          } else {
            setTimeout(() => {
              // console.log('cardStoreTwo',cardStoreTwo)
              // console.log('cardTwo',cardTwo)
              // console.log('cardStore',cardStore)

              cardTwo.classList.remove("flip");
              cardStore.classList.remove("flip");
              setcardStore("");
            }, 800);
          }
        }
      }

      //點擊到哪個
      // console.log(e.currentTarget.getAttribute('data-phonecase'))
      //目前點到的卡片

      // console.log(e.currentTarget)
      // console.log( e.currentTarget)
      //複製card物件
      // const newCard={...card}
      // newCard[e.target.parentNode.parentNode.getAttribute("value")]=true;
      // console.log(e.target.parentNode.parentNode.getAttribute("value"))
      // console.log(Object.keys(newCard))
      // console.log(Object.values(newCard))
      // setCard({...newCard})
      //  store(e.target.parentNode.parentNode.getAttribute("value"))
    }
  }

  useEffect(() => {}, [card]);

  // 計時器的state
  const [seconds, setSeconds] = useState(35);
  //給他一個旗標(布林直)用來切換
  const [start, setStart] = useState(false);
  // const [coupon,setCoupon ]=useState({})
  useEffect(() => {
    if (!start || seconds === 0) return;

    //每一秒做甚麼事setTimeout(()=>{要做的事情},接間隔時間)
    const timeout = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [start, seconds]);

  const [result, setResut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (seconds === 0) {
        console.log("測試");
        setResut(true);
      }
    }, 500);
  }, [seconds, result]);

  const auth = useSelector((state) => state.auth);
  // auth.sid
  const member_sid = auth.sid;
  const coupon_name = "9折折價券";
 
  const status = "尚未使用";

  function getCoupon() {
    setTimeout(() => {
      const newData = { member_sid, coupon_name,status };
      fetch("http://localhost:3310/games/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      console.log(newData);
    }, 20000);
  }

  // fun
  // const newData=[]
  //折價券fetch unction
  // async function getCoupon() {
  //     const url = "http://localhost:3310/member/coupon";
  //     const request = new Request(url, {
  //       method: "GET",
  //       headers: new Headers({
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: auth.token,
  //       }),
  //     });
  //     const response = await fetch(request);
  //     const data = await response.json();;
  //     if (data.body) {
  //       setCouponList(data.body);
  //     }
  //   }

  //因react裡會自動最佳化，因此無法用此辦法
  // function countdown() {
  //倒數的秒數
  // const countDownSecond = seconds
  //取得當下時間
  // const startTime = Date.now()
  // setInterval:每秒執行直刺
  // const timer = setInterval(() => {
  //     console.log(seconds)
  //     if(seconds-1 < 0) clearInterval(timer)
  //     setSeconds(seconds-1)
  // }, 1000);

  // useInterval(() => {
  //     setSeconds((currentCount) => currentCount - 1);
  //   }, 1000);

  //}

  return (
    <>
      <Container className="gameplay-content">
        <div className="gameplay-background d-flex  flex-column flex-md-row ">
          {/* rwd */}
          <div className="result-fram-phone  d-md-none d-flex justify-content-around">
            <div className="result-fram-phone-btn">
              <button
                className="btn important-btn sm"
                onClick={() => {
                  setStart(true);
                }}
              >
                開始
              </button>
            </div>
            <div className="result-fram-phone-img">
              <h1 className="result-fram-phone-time">{seconds}</h1>
            </div>
            <div className="result-fram-phone-socer">
              <span className="socer-text">目前得分</span>
              <h1 className="socer">15</h1>
            </div>
          </div>
          {/* 遊戲 */}
          <div className="phonecase-fram col-md-8 col-12 ">
            <div className="phonecase phonecase-1 d-flex justify-content-between">
              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="penguin"
                value="card0"
              >
                <div className="front">
                  <img src="\img\coupons\企鵝手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="penguin"
                value="card1"
              >
                <div className="front">
                  <img src="\img\coupons\企鵝手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="one-piece"
                value="card2"
              >
                <div className="front">
                  <img src="\img\coupons\香吉士手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="one-piece"
                value="card3"
              >
                <div className="front">
                  <img src="\img\coupons\香吉士手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="corgi"
                value="card4"
              >
                <div className="front">
                  <img src="\img\coupons\柯基手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>
            </div>

            <div className="phonecase phonecase-2 d-flex justify-content-between">
              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="corgi"
                value="card5"
              >
                <div className="front">
                  <img src="\img\coupons\柯基手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="cat"
                value="card6"
              >
                <div className="front">
                  <img src="\img\coupons\貓貓手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="cat"
                value="card7"
              >
                <div className="front">
                  <img src="\img\coupons\貓貓手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="doraemon"
                value="card8"
              >
                <div className="front">
                  <img src="\img\coupons\多拉A夢手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="doraemon"
                value="card9"
              >
                <div className="front">
                  <img src="\img\coupons\多拉A夢手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>
            </div>

            <div className="phonecase phonecase-3 d-flex justify-content-between">
              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="cabo"
                value="card10"
              >
                <div className="front">
                  <img src="\img\coupons\咖波手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="cabo"
                value="card11"
              >
                <div className="front">
                  <img src="\img\coupons\咖波手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="guinea-pig"
                value="card12"
              >
                <div className="front">
                  <img src="\img\coupons\天竺鼠車車手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="guinea-pig"
                value="card13"
              >
                <div className="front">
                  <img src="\img\coupons\天竺鼠車車手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="shin"
                value="card14"
              >
                <div className="front">
                  <img src="\img\coupons\小葵手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>
            </div>

            <div className="phonecase phonecase-4 d-flex justify-content-between">
              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="shin"
                value="card15"
              >
                <div className="front">
                  <img src="\img\coupons\小葵手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="IU"
                value="card16"
              >
                <div className="front">
                  <img src="\img\coupons\IU手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="IU"
                value="card17"
              >
                <div className="front">
                  <img src="\img\coupons\IU手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="pokemon"
                value="card18"
              >
                <div className="front">
                  <img src="\img\coupons\波克比手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>

              <div
                className="card-container"
                onClick={(e) => {
                  flipCard(e);
                }}
                data-phonecase="pokemon"
                value="card19"
              >
                <div className="front">
                  <img src="\img\coupons\波克比手機正面.png"></img>
                </div>
                <div className="back">
                  <img src="\img\coupons\back.png"></img>
                </div>
              </div>
            </div>
          </div>
          {/* 右方結果顯示 */}
          <div className="result-fram col-4 d-md-block d-none">
            <div className="result-item item-clock">
              {/* 匯入倒數功能  <h1 className="clock-time">{seconds}</h1> onTimeUp={() => { console.log('time up!!') }}*/}
              {/* <CountDownTimer seconds={remainSecond}  /> */}
              <h1 className="clock-time">{seconds}</h1>
            </div>
            <p className="result-item item-text">目前得分</p>
            <div className="result-item item-socer">
              <h1 className="socer">{socer}</h1>
            </div>
            <div className="result-item item-btn">
              <button
                className="result-item btn important-btn md"
                onClick={() => {
                    if(auth.sid){
                        setStart(true);
                  setIsStart(true);
                  getCoupon();
                    }else{
                        alert('請先登入會員')
                    }
                  
                }}
              >
                開始
              </button>
            </div>
          </div>
        </div>
        {/* 遊戲結束時會出現 */}
        <div
          className={`${
            result ? "" : "modal fade"
          } modal-container d-flex col-12`}
          id="modal-container"
        >
          <div>
            <a href="http://localhost:3000" className="btn game-btn">
              <button className="goto-member btn important-btn lg">
                前往首頁
              </button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
export default GamePlay;
