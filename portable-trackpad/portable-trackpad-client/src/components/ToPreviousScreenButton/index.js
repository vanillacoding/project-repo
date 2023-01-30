import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/COLORS";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ToPreviousScreenButton = ({ screen, props }) => {
  const navigation = useNavigation();

  return (
    <TouchPadPreviousScreenButton
      onPress={() => navigation.navigate(screen, props)}
    >
      <Ionicons name="arrow-back" size={32} color={COLORS.MAIN_COLOR} />
    </TouchPadPreviousScreenButton>
  );
};

const TouchPadPreviousScreenButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

export default ToPreviousScreenButton;
