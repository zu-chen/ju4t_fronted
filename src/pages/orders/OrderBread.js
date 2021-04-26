import React from "react";
// 高階元件樣式(HOC)，增強元件用的
import { withRouter, Link } from "react-router-dom";
// 中文路徑對照陣列，移出到config/index.js中設定
import { pathnameList, pathnameTextList } from "./config";
function OrderBread(props) {
  const { location } = props;

  // find index
  const findPathnameIndex = (pathname) =>
    pathnameList.findIndex((v, i) => v === pathname);

  // 有一個項目和二個項目的情況
  const formatText = (index) => {
    if (index === -1) return "";

    // "/購物車/客戶資訊/完成結帳" -> ['','購物車','客戶資訊','完成結帳']
    const textArray = pathnameTextList[index].split("/");

    // "/order/step1/step2/step3" -> ['','order','step1', 'step2','step3']
    const pathArray = pathnameList[index].split("/");

    const listArray = textArray.map((v, i, array) => {
      if (i === 0) return "";

      if (i === array.length - 1) {
        return (
          <li key={i} className="breadcrumb-item active" aria-current="page">
            {v}
          </li>
        );
      }

      return (
        <li className="breadcrumb-item" key={i}>
          <Link to={pathArray.slice(0, i + 2).join("/")}>{v}</Link>
        </li>
      );
    });

    return listArray;
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          {formatText(findPathnameIndex(location.pathname))}
        </ol>
      </nav>
    </>
  );
}
export default withRouter(OrderBread);
