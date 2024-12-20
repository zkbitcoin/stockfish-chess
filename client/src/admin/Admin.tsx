import React, { FC } from 'react';
import { fetchUtils, Admin as ReactAdmin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';

import { UserList, UserEdit, UserCreate } from './Users';
import { BACKEND_URL } from '../utils/config';

const httpClient = (url: any, options: any) => {
  if (!options) {
    options = {};
  }
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(BACKEND_URL, httpClient);

export const Admin: FC = () => {
    return (
        <ReactAdmin dataProvider={dataProvider} authProvider={authProvider}>
            {(permissions: 'admin' | 'user' | undefined) => {
                // Log the permissions to the console
                console.log('Current permissions:', permissions);

                return permissions === 'admin' ? (
                    <Resource
                        name="users"
                        list={UserList}
                        edit={UserEdit}
                        create={UserCreate}
                    />
                ) : null;
            }}
        </ReactAdmin>
    );
};
