import React from "react";
import { SafeAreaView } from "react-native";

import GoogleMap from "../components/GoogleMap";
import SlideModal from "../components/SlideModal";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <GoogleMap />
      <SlideModal navigation={navigation} />
    </SafeAreaView>
  );
}
