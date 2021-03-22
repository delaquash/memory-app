import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import User from './user/pages/Users';
import NewPlaces from './places/pages/NewPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App =() =>{
  return (
    <Router>
      <MainNavigation />
      <main>
      <Switch>
        <Route path='/' exact>
        <User />
      </Route>
      <Route path="/places/new" exact>
        <NewPlaces />
      </Route>
      <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
