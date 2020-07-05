import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="site-layout" hasSider>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/b">b</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/c">c</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// function XWebContent(children) {
//   if (typeof window === "undefined") {
//     return children;
//   } else {
//     let xWeb = document.querySelector("#x-web");
//     console.log("xx", xWeb);
//     return (
//       <div
//         id="x-web"
//         dangerouslySetInnerHTML={{
//           __html: xWeb ? xWeb.innerHTML : "",
//         }}
//       />
//     );
//   }
// }
