import PropTypes from "prop-types";

import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import Layout from "../layout/Layout";

export default function Home({ navigation }) {
  const handleSignInPress = () => {
    navigation.navigate("SignIn");
  };
  const handleSignOutPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Layout>
      <Logo fontSize={70} />
      <CustomButton
        text="Sign In"
        fontSize={18}
        handlePress={handleSignInPress}
        buttonMargin={15}
      />
      <CustomButton
        text="Sign Up"
        fontSize={18}
        handlePress={handleSignOutPress}
        buttonMargin={15}
      />
    </Layout>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
