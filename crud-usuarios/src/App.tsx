import { Assets as NavigationAssets } from '@react-navigation/elements';
import * as SplashScreen from 'expo-splash-screen';
import { createURL } from 'expo-linking';
import { Asset } from 'expo-asset';

import { UsersProvider } from './context/UsersContext';
import { Navigation } from './navigation';

Asset.loadAsync(NavigationAssets);

SplashScreen.preventAutoHideAsync();

const linking = {
  enabled: 'auto' as const,
  prefixes: [createURL('/')],
};

export function App() {
  return (
    <UsersProvider>
      <Navigation
        linking={linking}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </UsersProvider>
  );
}
