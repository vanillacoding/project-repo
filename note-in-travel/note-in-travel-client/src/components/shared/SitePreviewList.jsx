import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import THEME from "../../constants/theme";

function SitePreviewList({ sites, onSitePress }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        centerContent
        showsHorizontalScrollIndicator={false}
      >
        {sites.map((site) => (
          <TouchableOpacity
            key={site._id}
            onPress={() => onSitePress(site)}
            style={styles.site}
          >
            <Text>{site.shortName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    paddingVertical: 5,
  },
  site: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginLeft: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: THEME.color.primitive,
  },
});

export default SitePreviewList;
