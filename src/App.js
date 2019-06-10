import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Styles
//import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/fonts.scss';
import './App.scss';

// Layouts
import Header from './components/header';
import Dashboard from './views/dashboard';
import Footer from './components/footer';

const routes = [
  {
    path: ["/", "/dashboard"],
    component: Dashboard,
    data : {
      title : 'Dashboard'
    }
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} route_data={route.data} />
      )}
    />
  );
}

class App extends React.Component {

  componentDidMount() {
    AOS.init({
      duration : 500,
      once: false,
      easing: 'ease-in-out',
    });
  }

  render() {
    return (
      <Router>
        <Header name="Dashboard" />
        <div id="main">
          <div className="container">
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
