'use client';

import { Provider } from 'react-redux';
import {UserProvider} from '@auth0/nextjs-auth0'
import store from '../store'

function Providers({ children }) {
  return (
    <Provider store={store}>
        <UserProvider>
            {children}
        </UserProvider>
      </Provider>
  );
}

export default Providers;