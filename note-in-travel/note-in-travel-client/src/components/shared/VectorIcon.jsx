import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

function VectorIcon({
  type = "FontAwesome5",
  name,
  size = 25,
  color = "white",
}) {
  return (
    <>
      {type === "FontAwesome5" && (
        <FontAwesome5
          name={name}
          size={size}
          color={color}
        />
      )}
      {type === "FontAwesome" && (
        <FontAwesome
          name={name}
          size={size}
          color={color}
        />
      )}
    </>
  );
}

export default VectorIcon;
