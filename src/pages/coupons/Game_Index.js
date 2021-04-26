import "./game.scss";
import { Container } from "react-bootstrap";
function GameIndex() {
  return (
    <>
    <Container className="game-content">
      <div className=" game-background">
      <div className="row">
        <span className="game-text1 d-flex" text="玩&nbsp;遊&nbsp;戲&nbsp;，&nbsp;拿&nbsp;獎&nbsp;勵">玩 遊 戲 ， 拿 獎 勵</span>
        </div>
        <div className="treasure-img d-flex">
          <img alt="" src="\img\coupons\寶箱.png"></img>
        </div>
        <a href="http://localhost:3000/gameplay" className="btn game-btn">
          <button className="btn game-btn  important-btn md" >Go</button>
        </a>
        <div className="game-step d-flex justify-content-around">
          <span className="step step-1">Step.1</span>
          <span className="step step-2">Step.2</span>
          <span className="step step-3">Step.3</span>
        </div>
        <div className="step-img d-flex justify-content-around">
            <div className="img-circle"><img alt="" className="img-1" src="\img\coupons\登入會員.png"></img></div>
            <div className="img-circle"><img alt="" className="img-2" src="\img\coupons\開始遊戲.png"></img></div>
            <div className="img-circle"><img alt="" className="img-3" src="\img\coupons\獲取獎勵.png"></img></div>
        </div>
        <div className="step-text d-flex justify-content-around">
          <span>登入會員</span>
          <span>開始遊戲</span>
          <span>獲得獎勵</span>
        </div>
        <div className="rule-fram d-flex justify-content-around">
          <div className="rule ">
          <p className="rule-title">遊戲規則</p>
          <div className="rule-text-fram">
          <p className="rule-text rule-text1">翻開相同卡片即可獲得<span>1</span>分</p>
          <p className="rule-text rule-text2">獲取一定分數可獲得對應的折價券</p>
          <p className="rule-text rule-text3"><span>7</span>分:折價券<span>9</span>折</p>
          <p className="rule-text rule-text4"><span>8</span>分:折價券<span>8</span>折</p>
          <p className="rule-text rule-text5"><span>10</span>分:折價券<span>7</span>折</p>
          </div>
          </div>         
        </div>

        <div className="act-fram d-flex justify-content-around">
          <div className="act ">
          <p className="act-title">活動辦法</p>
          <div className="act-text-fram">
          <p className="act-text act-text1"><span>1</span>. 加入會員即可獲得1次遊玩機會</p>
          <p className="act-text act-text2"><span>2</span>. 1天有3次遊玩的機會</p>
          <p className="act-text act-text3"><span>3</span>. 買1支手機殼可使用1張，以此類推</p>
          <p className="act-text act-text4"><span>4</span>. 獲得的折價券不限使用日期</p>
          <p className="act-text act-text5"><span>5</span>. 活動限時1個月</p>
          </div>
          </div>         
        </div>

        
        
        
       
      
     
        </div>
        </Container>
   
     
    </>
  );
}
export default GameIndex;
