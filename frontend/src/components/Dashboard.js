import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Tabs } from "antd";
import {
  SendOutlined,
  CrownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import CustomTabPanes from "./CustomTabPanes";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu theme="dark" mode="inline" selectedKeys={"0"}>
          <Menu.Item key="0" icon={<SendOutlined />}>
            <Link to="/home">Event Booking</Link>
          </Menu.Item>
          {/* <Menu.Item key="1" icon={<SendOutlined />}>
            <Link to="/home">Decoration Booking</Link>
          </Menu.Item> */}
        </Menu>
        <br />
        <br />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>User</Breadcrumb.Item>
          </Breadcrumb>
          <CustomTabPanes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} Event Company
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
