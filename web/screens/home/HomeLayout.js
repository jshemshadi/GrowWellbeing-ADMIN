import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import SchoolIcon from "@material-ui/icons/School";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import Header from "./Header";
import Footer from "./Footer";

const sections = [
  { title: "Welcome", url: "welcome" },
  {
    title: "Services",
    url: "services",
    subMenues: [
      {
        title: "Private Individual Therapy",
        url: "services_privateIndividualTherapy",
        icon: <PersonIcon fontSize="small" />,
      },
      {
        title: "School Wellbing Program",
        url: "services_schoolWellbingProgram",
        icon: <SchoolIcon fontSize="small" />,
      },
      {
        title: "School Group Programs",
        url: "services_schoolGroupPrograms",
        icon: <GroupIcon fontSize="small" />,
      },
      {
        title: "NDIS",
        url: "services_ndis",
        icon: <LocalHospitalIcon fontSize="small" />,
      },
      {
        title: "Referrals & Online forms",
        url: "services_referrals",
        icon: <ListAltIcon fontSize="small" />,
      },
    ],
  },
  {
    title: "Our People",
    url: "ourPeople",
    subMenues: [
      {
        title: "Who We Are",
        url: "ourPeople_whoWeAre",
        icon: <PermIdentityIcon fontSize="small" />,
      },
      {
        title: "Management Team",
        url: "ourPeople_managementTeam",
        icon: <PeopleOutlineIcon fontSize="small" />,
      },
    ],
  },
  { title: "Our Mission", url: "ourMission" },
  { title: "Employment", url: "employement" },
  { title: "Contact Us", url: "contactUs" },
];

export default function HomeLayout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Grow Wellbeing"
          sections={sections}
          history={props.history}
        />
        <main>{props.children}</main>
      </Container>
      <Footer title="" description="" />
    </React.Fragment>
  );
}
