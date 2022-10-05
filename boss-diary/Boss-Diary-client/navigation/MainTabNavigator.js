import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import HeaderMenu from '../components/HeaderMenu';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

// reports
import ReportsScreen from '../screens/ReportsScreen';

// new report
import NewReportScreen from '../screens/NewReportScreen';
import NewReportInputScreen from '../screens/NewReportInputScreen';
import NewReportPreviewScreen from '../screens/NewReportPriviewScreen';

// templates
import TemplatesScreen from '../screens/TemplatesScreen';
import TemplateDetailScreen from '../screens/TemplateDetailScreen';

const ReportsStack = createStackNavigator(
  {
    Reports: {
      screen: ReportsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '보고서 보관함',
        headerLeft: () => <HeaderMenu nav={navigation} name='ios-menu' />
      })
    }
  }
);

const NewReportStack = createStackNavigator(
  {
    NewReport: {
      screen: NewReportScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '보고서 작성',
        headerBackTitle: ' ',
        headerLeft: <HeaderMenu nav={navigation} name='ios-menu' />
      })
    },
    NewReportInput: {
      screen: NewReportInputScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: `${navigation.state.params.template.name} 작성`,
        headerBackTitle: ' '
      })
    },
    NewReportPreview: {
      screen: NewReportPreviewScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '미리보기'
      })
    }
  }
);

const TemplatesStack = createStackNavigator(
  {
    Templates: {
      screen: TemplatesScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '템플릿 구매',
        headerBackTitle: ' ',
        headerLeft: <HeaderMenu nav = {navigation} />
      })
    },
    TemplateDetail: {
      screen: TemplateDetailScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.template.name
      })
    }
  },
  {
    mode: 'modal',
    initialRouteName: 'Templates'
  }
);

ReportsStack.navigationOptions = {
  tabBarLabel: '보고서',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.gray
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-folder${focused ? '-open' : ''}`}
    />
  )
};

NewReportStack.navigationOptions = {
  tabBarLabel: '작성하기',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.gray
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-create'
    />
  )
};

TemplatesStack.navigationOptions = {
  tabBarLabel: '드림 디포',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.gray
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-add-circle${focused ? '' : '-outline'}`}
    />
  )
};

const MainTab = createBottomTabNavigator(
  {
    ReportsStack,
    NewReportStack,
    TemplatesStack
  },
  {
    initialRouteName: 'ReportsStack',
  }
);

export default MainTab;
