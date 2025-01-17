import React, { useState } from "react";

import { createStackNavigator, createAppContainer } from "react-navigation";

import About from "./src/pages/About";
import StudentMain from "./src/pages/StudentMain";
import VisorMain from "./src/pages/VisorMain";
import RegisterActivity from "./src/pages/RegisterActivity";
import Contacts from "./src/pages/Contacts";
import GenReport from "./src/pages/GenReport";
import ViewReports from "./src/pages/ViewReports";
import Inicial from "./src/pages/Inicial";
import InfoStage from "./src/pages/InfoStage";
import RegisterMember from "./src/pages/RegisterMember";
import MoreInfoSupervisor from "./src/pages/MoreInfoSupervisor";
import MoreInfoAdvisor from "./src/pages/MoreInfoAdvisor";
import ToThink from "./src/pages/ToThink";
import MoreInfoStudent from "./src/pages/MoreInfoStudent";
import StayOn from "./src/pages/StayOn";
import Login from "./src/pages/Login";

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const AppNavigator = createStackNavigator({
  About,
  StudentMain,
  VisorMain,
  RegisterActivity,
  Contacts,
  GenReport,
  ViewReports,
  Inicial,
  InfoStage,
  Login,
  StayOn,
  MoreInfoStudent,
  ToThink,
  MoreInfoAdvisor,
  MoreInfoSupervisor,
  RegisterMember
}, {
  initialRouteName: 'Inicial',
  // defaultNavigationOptions: {
  // headerShown: false,
  // headerForceInset: { top: 'never', bottom: 'never' }
  // },
}
);

const AppContainer = createAppContainer(AppNavigator);

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoMono-Bold': require('./src/assets/fonts/RobotoMono-Bold.ttf'),
    'RobotoMono-Light': require('./src/assets/fonts/RobotoMono-Light.ttf'),
    // 'RobotoMono-Medium': require('./src/assets/fonts/RobotoMono-Medium.ttf')
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }
  return (
    <AppContainer />
  )
}

export default App