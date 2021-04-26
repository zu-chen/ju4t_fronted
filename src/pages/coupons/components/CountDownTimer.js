import React,{useEffect,useState} from "react";
import PropTypes from 'prop-types'

const CountDownTimer = ({ seconds, onTimeUp }) => {
  const [remainSecond, setRemainSecond] = useState(15)
  //使用生命週期
function CountDown(){
  const countDownSecond = seconds

    // 產生 Timer

    const startTime = Date.now()
    const countDownTimer = setInterval(() => {
      // 計算剩餘秒數
      const pastSeconds = parseInt((Date.now() - startTime) / 1000)
      const remain = (countDownSecond - pastSeconds)
      setRemainSecond(remain < 0 ? 0 : remain)


      // 檢查是否結束
      if (remain <= 0) {
        clearInterval(countDownTimer)

        onTimeUp() // 透過 prop 通知外部時間已到
      }
    }, 1000)
}
  return (
    //輸入秒數轉換成分秒
    // 輸入數字直接轉成時 分 秒:{new Date(seconds * 1000).toISOString().substr(11, 8)}
<button className="result-item btn important-btn md">開始</button>

  );
};
CountDownTimer.propTypes = {
  onTimeUp: PropTypes.func,
  seconds: PropTypes.number
}

export default CountDownTimer;