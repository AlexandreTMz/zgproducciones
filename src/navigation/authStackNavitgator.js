import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Loginv2 } from './../componentes/login/loginv2'

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen options={{ headerShown: false }} name="Loginv2" component={Loginv2} />
  </AuthStack.Navigator>
);

export default AuthStackScreen