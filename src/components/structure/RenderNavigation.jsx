import { Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from '@mui/material';

export const RenderRoutes = () => {

        const { user } = AuthData();
        
        
        return (
             <Routes>
             { nav.map((r, i) => {
                  
                  if (r.isPrivate && user.isAuthenticated) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else if (!r.isPrivate) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else return false
             })}
             
             </Routes>
        )
   }


   
   export const RenderMenu = () => {
   
        const { user, logout } = AuthData()
        const navigate = useNavigate();
        const drawerWidth = 240;
        const buttonStyle = {
          width:'90%',
          margin:'auto',
          backgroundColor:'#E8F8F5',
          '&:hover':{
            backgroundColor:'#1ABC9C',
            border:'1ps solid green',
            color:'#E8F8F5'
          }
        }

        return (

          <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor:"#0C5546",
              color:'#E8F8F5'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Avatar  onClick= {() => navigate('/account')} sx={{width:80, height:80,marginLeft:'30%', cursor:'pointer'}}/>
          <h3 style={{marginLeft:'28%', cursor:'pointer'}} onClick= {() => { navigate('/account')}}>{user.name}</h3>
          <Toolbar />
          <List>
            {nav.map((item, index) => (
               item.name === "Login" || item.name === "sDetails" ? "" :
              <ListItem key={index}
                  onClick= {() => navigate(item.path)}
              disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{color:'#E8F8F5'}}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Toolbar />
          <Button variant={"contained"} sx={buttonStyle} style={{color:"green"}} onClick={logout}>LOGOUT</Button>
        </Drawer>
        )
   }