import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  createNativeStackScreen,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { UserList } from './screens/UserList';
import { UserForm } from './screens/UserForm';
import { Ionicons } from '@expo/vector-icons';

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'UserList',
  screenOptions: screenOptions,
  screens: {
    UserList: createNativeStackScreen({
      screen: UserList,
      options: ({ navigation }) => ({
        title: 'Usuários',
        headerRight: () => (
          <HeaderButton onPress={() => navigation.navigate('UserForm')}>
            <Ionicons name="add" size={24} color="#000" />
          </HeaderButton>
        ),
      }),
    }),
    UserForm: createNativeStackScreen({
      screen: UserForm,
      options: ({ navigation })=> ({
        title: 'Cadastrar novo usuáario',
      }),
    }),
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
