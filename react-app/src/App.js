import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/Home';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import LogInPage from './components/LogInPage';
import Test from './components/test';
import MenuBar from './components/MenuBar';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <MenuBar />
      <Switch>
        <Route path='/' exact={true}>
          <LogInPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/add' exact={true} >
          <RecipeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/:id' exact={true} >
          <RecipeDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/:id/edit' exact={true} >
          <RecipeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/test' exact={true} >
          <Test />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
