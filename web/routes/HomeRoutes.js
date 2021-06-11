import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../screens/home";
import Employement from "../screens/home/pages/employement";
import OurMission from "../screens/home/pages/ourMission";
import OurPeople from "../screens/home/pages/ourPeople";
import Services from "../screens/home/pages/services";
import Welcome from "../screens/home/pages/welcome";
import ContactUs from "../screens/home/pages/contactUs";
import PrivateIndividualTherapy from "../screens/home/pages/privateIndividualTherapy";
import SchoolWellbingProgram from "../screens/home/pages/schoolWellbingProgram";
import SchoolGroupPrograms from "../screens/home/pages/schoolGroupPrograms";
import Ndis from "../screens/home/pages/ndis";
import Referrals from "../screens/home/pages/referrals";
import WhoWeAre from "../screens/home/pages/whoWeAre";
import ManagementTeam from "../screens/home/pages/managementTeam";

const HomeRoutes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/services" component={Services} />
      <Route exact path="/ourPeople" component={OurPeople} />
      <Route exact path="/ourMission" component={OurMission} />
      <Route exact path="/employement" component={Employement} />
      <Route exact path="/contactUs" component={ContactUs} />

      <Route
        exact
        path="/services_privateIndividualTherapy"
        component={PrivateIndividualTherapy}
      />
      <Route
        exact
        path="/services_schoolWellbingProgram"
        component={SchoolWellbingProgram}
      />
      <Route
        exact
        path="/services_schoolGroupPrograms"
        component={SchoolGroupPrograms}
      />
      <Route exact path="/services_ndis" component={Ndis} />
      <Route exact path="/services_referrals" component={Referrals} />

      <Route exact path="/ourPeople_whoWeAre" component={WhoWeAre} />
      <Route
        exact
        path="/ourPeople_managementTeam"
        component={ManagementTeam}
      />
    </Switch>
  </>
);

export default HomeRoutes;
