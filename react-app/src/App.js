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
import MenuBar from './components/MenuBar';
import HelperBox from './components/HelperBox';
import TVScreen from './components/TVScreen';




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
      <TVScreen/>
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
          <MenuBar />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/add' exact={true} >
        <MenuBar />
          <RecipeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/:id' exact={true} >
        <MenuBar />
          <RecipeDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes/:id/edit' exact={true} >
        <MenuBar />
          <RecipeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/test' exact={true} >
        <HelperBox />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
