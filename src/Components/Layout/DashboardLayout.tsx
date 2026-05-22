import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import logout from "/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = ["users", "setting"];

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]); // Only keep the latest submenu open
    } else {
      setOpenKeys(keys); // Update normally for closing or nested submenus
    }
  };

  const defaultUrl = "/admin"
  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("main.bonavent_accessToken");
    window.location.href = "/sign-in";
    window.location.reload();
  };


  const activeKeys = getActiveKeys(normalizedPath);
  const menuItems = sidebarItemsGenerator(adminPaths, "admin")


  menuItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#222222", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={handleLogout} className="">
        <NavLink to="/sign-in" className="font-bold !text-[#6078EA]">
          Logout
        </NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-ribg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-background-color">
        <Sider
          theme="light"
          width={280}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            position: "sticky",
            borderRadius: "10px",
            top: 10,
            margin: "0px 10px 0px 12px",
            height: "97.5vh",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            border: "2px solid #6078EA",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[90%] mx-auto h-auto mb-12 mt-10"
            />
          </Link>

          <Menu
            mode="inline"
            openKeys={openKeys} // Bind openKeys state
            onOpenChange={onOpenChange} // Handle open/close
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
        </Sider>
        <Layout className="!bg-background-color px-2">
          <Header
            style={{
              background: "#fff",
              position: "sticky",
              borderRadius: "10px",
              top: 10,
              zIndex: 999,
              height: "fit-content",
              marginLeft: 0,
              border: "2px solid #6078EA",
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-highlight-color  py-4 mt-5 min-h-screen">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
