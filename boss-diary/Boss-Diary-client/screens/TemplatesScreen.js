import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Template from '../components/Template';
import Color from '../constants/Colors';

export default function TemplatesScreen(props) {
  const { navigation } = props;
  const { fetchTemplates, templates } = props.screenProps;

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!templates.length) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.templatesContainer}>
          {templates.map(template => (
            <Template
              key={template._id}
              template={template}
              nav={navigation}
              path={'TemplateDetail'}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ultraLightGray,
  },
  templatesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 20,
  }
});
