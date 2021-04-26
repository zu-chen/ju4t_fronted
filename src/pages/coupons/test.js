import React, { useState } from 'react'

const Practice = () => {
  // 宣告一個新的 state 變數，我們稱作為「seconds」。
  // 透過「setSeconds」 方法去修改「seconds」狀態。
  // 給予「seconds」狀態初始值為 10。
  const [seconds, setSeconds] = useState(10)

  return (
    <>
      <div>
        請輸入倒數秒數
        <input
          value={seconds}
          type='number'
          onChange={e => setSeconds(Number(e.target.value) || 0)}
        />
      </div>
      <div>
          您所輸入的秒數 {seconds}
      </div>
    </>
  )
}

export default Practice