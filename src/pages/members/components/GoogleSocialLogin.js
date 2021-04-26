import React from 'react';
import GoogleLogin from 'react-google-login';

// 

const responseGoogle = (response) => {
  console.log(response);
}

const GoogleSocialLogin = () => {
  return(  
    <GoogleLogin className="ml-5 g-login"
    clientId="889183140809-q98qavt42ngbgrdj95nmese3smgslpqq.apps.googleusercontent.com"
    buttonText="Google 註冊 / 登入"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  )
};

export default GoogleSocialLogin;
