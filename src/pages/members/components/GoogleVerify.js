import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Recaptcha 設定：https://www.google.com/recaptcha/admin/site/440735093/settings
// sitekey : 6Ld1FUUaAAAAAK7odin1D4XaR--k7tD6mJryrlgS
// serverkey : 6Ld1FUUaAAAAAKDSSlAFl-NELQsHRSyW3LU3YeFa

const GoogleVerify = () => {

  return (
    <>
      <ReCAPTCHA
        className="ml-5 g-recaptcha"
        sitekey="6Ld1FUUaAAAAAK7odin1D4XaR--k7tD6mJryrlgS"
      />
    </>
  );
};

export default GoogleVerify;
