import * as React from "react";
import { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Routes from "./routes";

import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";
import Login from "./screens/login";
import ForgetPassword from "./screens/forgetPassword";
import VerifyPasswordReset from "./screens/verifyPasswordReset";
import NewPassword from "./screens/newPassword";
import Layout from "./components/main/Layout";
import HomeLayout from "./screens/home/HomeLayout";
import HomeRoutes from "./routes/HomeRoutes";

const jss = create({ plugins: [...jssPreset().plugins] });

const Main = ({ history, store }) => {
  useEffect(() => {}, []);

  return (
    <div
      style={{
        minHeight: "100%",
        height: "100%",
        direction: "ltr",
      }}
    >
      <StylesProvider jss={jss}>
        <ThemeProvider
          theme={theme({
            direction: "ltr",
          })}
        >
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgetPassword"
                  component={ForgetPassword}
                />
                <Route
                  exact
                  path="/verifyPasswordReset"
                  component={VerifyPasswordReset}
                />
                <Route exact path="/newPassword" component={NewPassword} />

                <Layout path="/dashboard" history={history}>
                  <Routes />
                </Layout>

                <HomeLayout path="/" history={history}>
                  <HomeRoutes />
                </HomeLayout>
              </Switch>
            </ConnectedRouter>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default Main;
