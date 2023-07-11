import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Sales, AddBweet } from './frontend';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { scheme } from 'expo'
import Tabs from './navihations'
const Stack = createStackNavigator();

const projectId = 'YourWalletConnectProjectId';

const providerMetadata = {
  name: 'Lestonz',
  description: 'Lestonz DApp',
  url: 'https://react-web3wallet.vercel.app',
  icons: ['https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/0c24a66f-00f0-4a6d-f4bd-efab7de7a200/lg'],
  redirect: {
    native: `${scheme}://`
  }
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:1'], // You should choose your network params.This is Ethereum Mainnet
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
  optionalNamespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:5'], // You should choose your network params.This is Ethereum Goerli
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};

export default function App() {
  const { open, isConnected } = useWalletConnectModal();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName= {isConnected ? "HomeTabs" :'Login' } 
        >
          <Stack.Screen
            name="HomeTabs"
            component={Tabs}
          />
          <Stack.Screen
            name="Sales"
            component={Sales}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="AddBweet"
            component={AddBweet}
          />

          <Stack.Screen
            name="ProfilTabs"
            component={Tabs}
          />
          <Stack.Screen
            name="ChatTabs"
            component={Tabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
