
import * as React from 'react';
import './App.css';
import Header from './components/header';
import FindFalcone from './components/findFalcon';
import Result from './components/result';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div className="App">
      <Header />
      <h2>Finding Falcone!</h2>
      <main>
        <Switch>
          <Route exact path="/" component={FindFalcone}/>
          <Route path="/result" component={Result}/>
        </Switch>
      </main>
    </div>
    );
  }
}

export default App;
