const removeCookie = (cookieKey = "") => {
  const { cookie } = document
  console.log("쿠키", cookie);

  const cookieRemovedSpecificKey = cookie
    .split(";")
    .map((cookieString) => {
      if(cookieString.includes(cookieKey)) {

       return `${cookieKey}=; expires=${new Date(0).toUTCString()};`
      }

      return cookieString;
    })
    .join(";");

    document.cookie = cookieRemovedSpecificKey;
    console.log("제거된 쿠키", cookieRemovedSpecificKey);
    // const hasRemoved
    //   = cookie !== cookieRemovedSpecificKey
    //     && !document.cookie.includes(cookieKey);

    return true;
};

export default removeCookie;
