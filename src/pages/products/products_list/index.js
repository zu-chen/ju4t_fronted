import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";

import "./0_products_list.scss";
import ProductsBanner from "./ProductsBanner";
import SideBar from "./SideBar";
import ProductsGrid from "./ProductsGrid";

const ProductsList = () => {
  // use react-router location for query strings
  const location = useLocation();
  const history = useHistory();
  const parsed = queryString.parse(location.search);

  // for pagnination
  const itemsPerPage = 16;

  // state for selected sort (by hot or new)
  const [selectedSort, setSelectedSort] = useState("hot");

  // state for selected phone model
  const [phoneModel, setPhoneModel] = useState(parsed.phone);

  // state for selected phone color
  const [phoneColor, setPhoneColor] = useState("");

  // state to store the phone color options to render (color options differ for each phone model)
  // this is not set to an empty array to prevent the error of "Cannot read property 'color' of undefined"
  const [phoneColorsArr, setPhoneColorsArr] = useState([
    { color: "", hex_color: "", model_id: "" },
  ]);

  // state for selected series
  const [shellSeries, setShellSeries] = useState("all");

  // state to store the series options to render (series availability differs for each phone model)
  const [seriesArr, setSeriesArr] = useState([]);

  // state for selected phone shell radio button
  const [shellRadioValue, setShellRadioValue] = useState("black");

  // state to store total items count, current page, and total pages for pagnination
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(parsed.page ? +parsed.page : 1);
  const [totalPages, setTotalPages] = useState(1);

  // state to store products list to render
  const [productsDisplayArr, setProductsDisplayArr] = useState([]);

  // onchange handler for SelectPhoneModel
  const handleSelectPhoneModel = (e) => {
    setPhoneModel(e.target.value);

    // reset selected series to all
    setShellSeries("all");

    // change the phone model value in the query string
    history.push(`${location.pathname}?phone=${e.target.value}`);
  };

  // series options to render in dropdown
  const seriesOptions = seriesArr.map((item) => (
    <option key={item.id} value={item.id}>
      {item.series_name_chn}
    </option>
  ));

  useEffect(() => {
    // async helper function because useEffect cannot have use a async callback function
    const helperFunction = async () => {
      const parsed = queryString.parse(location.search);
      const phoneModelName = phoneModel.replaceAll("-", " ");

      // when the url query string changes, set the phone model state to match query string values
      setPhoneModel(parsed.phone);

      // fetch product phone series data to render photos (this fetches all the products to display per selected series)
      const data = await fetch(
        `http://localhost:3310/products/products-list?phone=${phoneModelName}&series=${shellSeries}&sort-by=${selectedSort}`
      ).then((response) => response.json());

      // set state of total item number and total pages
      setTotalItems(data.length);
      setTotalPages(Math.ceil(data.length / itemsPerPage));

      setProductsDisplayArr(data);
    };
    helperFunction();
  }, [location.search, phoneModel, shellSeries, selectedSort]);

  // change the phone color options when the selected phone model changes
  useEffect(() => {
    const phoneModelName = phoneModel.replaceAll("-", " ");

    // fetch the phone color options for the selected phone model
    fetch(
      `http://localhost:3310/products//phone-color-options?phone=${phoneModelName}`
    )
      .then((response) => response.json())
      .then((data) => setPhoneColorsArr(data));
  }, [phoneModel]);

  // change series dropdown options according to phone selected value
  useEffect(() => {
    const phoneModelName = phoneModel.replaceAll("-", " ");

    fetch(
      `http://localhost:3310/products/select-series-dropdown?phone=${phoneModelName}`
    )
      .then((response) => response.json())
      .then((data) => setSeriesArr(data));
  }, [phoneModel]);

  // set the default selected phone color to the first one
  // this has to be tied with phoneColorsArr in useEffect and not phoneModel because I tried to tie it to the phoneModel useEffect and it didn't work
  useEffect(() => {
    setPhoneColor(phoneColorsArr[0].color);
  }, [phoneColorsArr]);

  // update page state according when the url query string page changes
  useEffect(() => {
    setPage(parsed.page ? +parsed.page : 1);
  }, [parsed.page]);

  return (
    <>
      <Container className="products-list mb-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            產品
          </li>
        </ol>
        <ProductsBanner />
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <SideBar
              phoneModel={phoneModel}
              setPhoneModel={setPhoneModel}
              phoneColor={phoneColor}
              phoneColorsArr={phoneColorsArr}
              setPhoneColor={setPhoneColor}
              shellRadioValue={shellRadioValue}
              setShellRadioValue={setShellRadioValue}
              shellSeries={shellSeries}
              setShellSeries={setShellSeries}
              seriesOptions={seriesOptions}
              handleSelectPhoneModel={handleSelectPhoneModel}
            />
          </Col>
          <Col sm={12} md={6} lg={8} xl={9}>
            <ProductsGrid
              productsDisplayArr={productsDisplayArr.filter((item, index) => {
                return (
                  index >= itemsPerPage * (page - 1) &&
                  index < itemsPerPage * page
                );
              })}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              phoneModel={phoneModel}
              phoneColor={phoneColor}
              shellRadioValue={shellRadioValue}
              totalItems={totalItems}
              startItem={itemsPerPage * (page - 1) + 1}
              endItem={page === totalPages ? totalItems : itemsPerPage * page}
              page={page}
              totalPages={totalPages}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductsList;
