const { RESTDataSource } = require("apollo-datasource-rest");

const { KAKAO_REST_API_KEY } = process.env;

class KakaoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://dapi.kakao.com";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `KakaoAK ${KAKAO_REST_API_KEY}`);
  }

  getRegions({ lng, lat }) {
    return this.get(`/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`);
  }
}

module.exports = KakaoAPI;
