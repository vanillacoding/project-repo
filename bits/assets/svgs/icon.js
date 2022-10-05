import React from "react";
import { SvgXml } from "react-native-svg";

const GoogleIcon = ({ size }) => {
  const svgPath = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#3C3A36"/>
  <path d="M28.5715 19V16H27.0715V19H24.0715V20.5H27.0715V23.5H28.5715V20.5H31.5715V19H28.5715Z" fill="#F2994A"/>
  <path d="M15.0715 18V21H19.315C18.6955 22.746 17.0275 24 15.0715 24C12.5905 24 10.5715 21.981 10.5715 19.5C10.5715 17.019 12.5905 15 15.0715 15C16.147 15 17.182 15.3855 17.986 16.086L19.957 13.824C18.607 12.648 16.873 12 15.0715 12C10.936 12 7.57147 15.3645 7.57147 19.5C7.57147 23.6355 10.936 27 15.0715 27C19.207 27 22.5715 23.6355 22.5715 19.5V18H15.0715Z" fill="#F2994A"/>
  </svg>
  `;

  return <SvgXml xml={svgPath} width={size} height={size} />;
};

const InstagramIcon = ({ size }) => {
  const svgPath = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#3C3A36"/>
  <path d="M24.4504 20.9796C24.4504 23.1724 22.6726 24.9502 20.4798 24.9502C18.287 24.9502 16.5092 23.1724 16.5092 20.9796C16.5092 18.7868 18.287 17.009 20.4798 17.009C22.6726 17.009 24.4504 18.7868 24.4504 20.9796Z" fill="#F2994A"/>
  <path d="M27.1855 8.97949H13.7737C10.8544 8.97949 8.47961 11.3543 8.47961 14.2736V27.6854C8.47961 30.6047 10.8544 32.9795 13.7737 32.9795H27.1855C30.1048 32.9795 32.4796 30.6047 32.4796 27.6854V14.2736C32.4796 11.3543 30.1048 8.97949 27.1855 8.97949ZM20.4796 27.5971C16.8306 27.5971 13.862 24.6285 13.862 20.9795C13.862 17.3305 16.8306 14.3618 20.4796 14.3618C24.1286 14.3618 27.0973 17.3305 27.0973 20.9795C27.0973 24.6285 24.1286 27.5971 20.4796 27.5971ZM28.0679 14.7148C27.3368 14.7148 26.7443 14.1223 26.7443 13.3913C26.7443 12.6602 27.3368 12.0677 28.0679 12.0677C28.7989 12.0677 29.3914 12.6602 29.3914 13.3913C29.3914 14.1223 28.7989 14.7148 28.0679 14.7148Z" fill="#F2994A"/>
  </svg>
  `;

  return <SvgXml xml={svgPath} width={size} height={size} />;
};

const FacebookIcon = ({ size }) => {
  const svgPath = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#3C3A36"/>
  <path d="M20.8878 16.5765V13.8214C20.8878 13.061 21.5049 12.4439 22.2653 12.4439H23.6429V9H20.8878C18.6052 9 16.7551 10.8501 16.7551 13.1327V16.5765H14V20.0204H16.7551V31.0408H20.8878V20.0204H23.6429L25.0204 16.5765H20.8878Z" fill="#F2994A"/>
  </svg>
  `;

  return <SvgXml xml={svgPath} width={size} height={size} />;
};

export { GoogleIcon, InstagramIcon, FacebookIcon };