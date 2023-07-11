import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import routes, {
  // landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes
} from "./index";

import Trip from "../pages/trip/Trip";
import CreateBooking from "../pages/booking/CreateBooking";
import BookingCheckout from "../pages/booking/BookingChekout";
import ShowCustomerInfo from "../pages/booking/ShowCustomerInfo";
import Grid from "../pages/ui-elements/Grid";

import DashboardLayout from "../layouts/Dashboard";
// import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => {
  const role = 0;
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          {/* {childRoutes(LandingLayout, landingRoutes)} */}
          {childRoutes(DashboardLayout, dashboardRoutes)}
          {childRoutes(AuthLayout, pageRoutes)}
          <Route exact path="/" component={Grid} />
          {role == 1 ? <Route path="/dashboard/default" component={DashboardLayout} /> : <Route exact path="/" component={Grid} />}
          <Route path="/trips" component={Trip} />
          <Route path="/createBooking" component={CreateBooking} />
          <Route path="/bookingCheckout" component={BookingCheckout} />
          <Route path="/showCustomerInfo" component={ShowCustomerInfo} />
          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default Routes;
