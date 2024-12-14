import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Message as MessageIcon,
  CircleNotifications as CircleNotificationsIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

interface SidebarMenu {
  id: string;
  title: string;
  path: string;
  icon: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const SidebarMenu: SidebarMenu[] = [
    {
      id: "sidebar-dashboard",
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      id: "sidebar-intent",
      title: "Intent",
      path: "/intent",
      icon: <SettingsIcon />,
    },
    {
      id: "sidebar-messaging",
      title: "Messaging",
      path: "/messaging",
      icon: <MessageIcon />,
    },
    {
      id: "sidebar-notifications",
      title: "Notifications",
      path: "/notifications",
      icon: <CircleNotificationsIcon />,
    },
    {
      id: "sidebar-logout",
      title: "Logout",
      path: "/",
      icon: <LogoutIcon />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {SidebarMenu.map((menuItem) => (
          <ListItem
            id={menuItem.id}
            key={menuItem.id}
            onClick={() => router.push(menuItem.path)}
          >
            <ListItemButton>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
