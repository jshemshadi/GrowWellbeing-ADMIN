import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Appointments from "../screens/appointments";
import Dashboard from "../screens/dashboard";
import Users from "../screens/users";
import Messages from "../screens/messages";
import Notifications from "../screens/notifications";
import Profile from "../screens/profile";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/appointments" component={Appointments} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/messages" component={Messages} />
    </Switch>
  </>
);

export default Routes;
