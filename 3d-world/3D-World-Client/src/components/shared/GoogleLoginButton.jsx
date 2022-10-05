import styled from "styled-components";

const GoogleLoginButton = styled.button`
  box-sizing: border-box;
  position: relative;
  width: 13em;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  background: #DD4B39;
  cursor: pointer;
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  };
  &:hover,
  &:focus {
    outline: none;
    background: #E74B37;
  };
`;

export default GoogleLoginButton;
