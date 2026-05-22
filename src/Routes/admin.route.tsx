//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import usersLogo from "/images/dashboard-logo/users.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";
import reportLogo from "/images/dashboard-logo/report.svg";
import profileLogo from "/images/dashboard-logo/profile.svg";
import settingLogo from "/images/dashboard-logo/setting.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllHosts from "../pages/Admin/AllUsers/AdminAllHosts";
import AdminAllGuest from "../pages/Admin/AllUsers/AdminAllGuest";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminAllReport from "../pages/Admin/AdminAllReport";
import ChangePassword from "../Components/Dashboard/Profile/ChangePassword";
import CancelationPolicy from "../pages/Common/settings/CancelationPolicy";
import HelpSupport from "../pages/Common/settings/HelpSupport";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    key: "users",
    name: "Users",
    icon: usersLogo,
    children: [
      {
        key: "all-hosts",
        path: "users/all-hosts",
        name: "All Hosts",
        icon: <span>&#8226;</span>,
        element: <AdminAllHosts />,
      },
      {
        key: "all-guests",
        path: "users/all-guests",
        name: "All Guests",
        icon: <span>&#8226;</span>,
        element: <AdminAllGuest />,
      },
    ],
  },
  {
    path: "earning",
    element: <AdminAllTransaction />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },
  {
    path: "reports",
    element: <AdminAllReport />,
    key: "reports",
    name: "Reports",
    icon: reportLogo,
  },
  {
    path: "profile",
    element: <EditProfile />,
    key: "profile",
    name: "Profile",
    icon: profileLogo,
  },
  {
    key: "setting",
    name: "Setting",
    icon: settingLogo,
    children: [
      {
        key: "change-password",
        path: "setting/change-password",
        name: "Change Password",
        icon: <span>&#8226;</span>,
        element: <ChangePassword />,
      },
      {
        key: "help-support",
        path: "setting/help-support",
        name: "Help & Support",
        icon: <span>&#8226;</span>,
        element: <HelpSupport />,
      },
      {
        key: "cancelation-policy",
        path: "setting/cancelation-policy",
        name: "Cancelation Policy",
        icon: <span>&#8226;</span>,
        element: <CancelationPolicy />,
      },
    ],
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
