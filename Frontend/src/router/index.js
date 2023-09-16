import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCookie } from '../components/Cookie';
import AppDispatcher from '../redux/dispatchers/appDispatcher';
import ProtectedRoute from './ProtectedRoute';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import UnprotectedRoute from './UnprotectedRoute';
import Error from '../pages/Error';

const Router = () => {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  const [isExecute, setExecute] = useState(false);
  const userToken = getCookie('token');

  useEffect(() => {
    const checkUserToken = async () => {
      if (!userToken || userToken === undefined) {
        AppDispatcher.updateLoginStatus(false)
      } else {
        AppDispatcher.updateLoginStatus(true)
      }
    };
    checkUserToken();
  }, [isLoggedIn]);

  useEffect(() => {
    setTimeout(() => {
      setExecute(true)
    }, 500);
  }, [isLoggedIn])

  return (
    <BrowserRouter>
      <Routes>
        {PrivateRoutes.map(route => {
          return (
            !!isLoggedIn && (
              <Route
                path={route.path}
                key={`Route-${route.path}`}
                element={
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                }
              />
            )
          );
        })}

        {PublicRoutes.map(route => {
          return (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={
                <UnprotectedRoute>
                  <route.component />
                </UnprotectedRoute>
              }
            />
          );
        })}
        {isExecute && <Route path='*' element={<Error />} />}
      </Routes>
    </BrowserRouter>

  );
};

export default Router;
