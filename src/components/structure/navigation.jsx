import Members from "../pages/Members"
import Survey from "../pages/Survey"
import Billing from "../pages/Billing"
import MobileUser from "../pages/MobileUser"
import { Account } from "../pages/Account"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SecurityUpdateGoodOutlinedIcon from '@mui/icons-material/SecurityUpdateGoodOutlined';
import SurveyDetails from "../common/survey-details"

export const nav = [
     { path:     "/",           icon:'',                             name: "Login",       element: <Login />,       isMenu: true,     isPrivate: false  },
     { path:     "/home",       icon:<HomeOutlinedIcon />,           name: "होम",        element: <Home />,        isMenu: true,     isPrivate: true  },
     { path:     "/login",      icon:'',                             name: "Login",       element: <Login />,       isMenu: false,    isPrivate: true  },
     { path:     "/members",    icon:<PeopleAltOutlinedIcon/>,       name: "मेंबर्स",     element: <Members />,     isMenu: true,     isPrivate: true  },
     { path:     "/survey",     icon:<WorkOutlineOutlinedIcon />,    name: "सर्व्हे ",      element: <Survey />,      isMenu: true,     isPrivate: true  },
     { path:     "/surveyDetails",     icon:'',    name: "sDetails",      element: <SurveyDetails />,      isMenu: false,     isPrivate: true  },
     { path:     "/billing",    icon:<ReceiptOutlinedIcon />,        name: "बिलिंग",     element: <Billing />,     isMenu: true,     isPrivate: true  },
     { path:     "/mobileUser", icon:<SecurityUpdateGoodOutlinedIcon />,  name: "मोबाईल यूजर",     element: <MobileUser />,     isMenu: true,     isPrivate: true  },
     { path:     "/account",    icon:<AccountBoxOutlinedIcon />,           name: "प्रोफाइल",     element: <Account />,     isMenu: true,     isPrivate: true  },
]