import authActionCreator from "./authActionCreator";
import coinActionCreator from "./coinActionCreator";
import cryptofolioActionCreator from "./cryptofolioActionCreator";

const actionCreator = {
  ...authActionCreator,
  ...coinActionCreator,
  ...cryptofolioActionCreator,
};

export default actionCreator;
