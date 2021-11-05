import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuTop from "./components/Menu/Menu";
import Home from "./pages/home";
import PageList from "./pages/employee-list";
import Employee from "./pages/employee/employee";
import Edit from "./pages/edit/edit";
import Add from "./pages/add/add";

function App() {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop></MenuTop>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home></Home>
            </Route>
            <Route path="/employee" exact={true}>
              <PageList />
            </Route>
            <Route path="/employee/:id" exact={true}>
              <Employee />
            </Route>
            <Route path="/edit/:id" exact={true}>
              <Edit />
            </Route>
            <Route path="/add" exact={true}>
              <Add />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
