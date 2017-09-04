import * as React from 'react';
import Header from '../../common/Header';
import Main from '../../presentational/Main/Main';
import './App.scss';

// The parent component renders the Header component and component(s) in the
// route the user navigates to.
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <Header />
        <Main />
      </div>
      
    );
  }
}

export default App;
