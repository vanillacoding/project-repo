import { Entypo } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import { LIGHT_GREY_50 } from "../../constants/color";

export default function ProjectCreateButton({ handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Entypo name="circle-with-plus" size={50} color={LIGHT_GREY_50} />
    </TouchableOpacity>
  );
}

ProjectCreateButton.propTypes = {
  handlePress: PropTypes.func.isRequired,
};
