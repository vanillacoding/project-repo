const scrapOptions = {
  CHILSUNG: {
    commonUrl: "https://mmall.lottechilsung.co.kr/mobile/display/getGoodsListAjax.lecs?displayNo=CF2A01A02&allYn=Y&displayNos=CF2A01A02A01&viewType=img&currentPage=",
    urls: [
      "1&listSortCode=11&detailViewYn=N",
      "2&listSortCode=11&detailViewYn=N",
      "3&listSortCode=11&detailViewYn=N",
      "4&listSortCode=11&detailViewYn=N",
      "5&listSortCode=11&detailViewYn=N",
    ],
    selector: "ul.lc_item_container > li > a",
    src: {
      selector: ".item img",
      attr: "data-src",
    },
    alt: {
      selector: ".item img",
      attr: "alt",
    },
    productName: {
      selector: ".item_info span.name",
    },
  },
};

export default scrapOptions;
