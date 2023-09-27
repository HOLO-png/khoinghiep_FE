// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import ChatOutline from 'mdi-material-ui/ChatOutline'
import MonitorDashboard from 'mdi-material-ui/MonitorDashboard'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Monitoring',
      icon: MonitorDashboard,
      path: '/monitoring'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/auth/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/auth/register',
      openInNewTab: true
    },
    {
      title: 'ChatBox',
      icon: ChatOutline,
      path: '/chatbox'
    },
    {
      sectionTitle: 'weather'
    },
    {
      title: 'Weather',
      icon: FormatLetterCase,
      path: '/weather'
    },
  ]
}

export default navigation
