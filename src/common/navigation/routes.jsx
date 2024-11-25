import AddExpensive from "../../pages/add-expensive/AddExpensive";
import ExpensiveTable from "../expensive-table/ExpensiveTable";

import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Analyse from "../../pages/analyse/analyse";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SideNav from "../test/Test";
import Test from "../test/Test";

const routes = [

    {
        path: '/expensiveTable',
        Element: <ExpensiveTable/>,
        text: 'Expensive List',
        icon: <FormatListNumberedIcon/>
    },

    {
        path: '/addExpensive',
        Element: <AddExpensive/>,
        text: 'Add Expensive',
        icon: <PlaylistAddCircleIcon/>
    },

    {
        path: '/Analyse',
        Element: <Analyse/>,
        text: 'Analyse Expensive',
        icon: <LeaderboardIcon/>
    },

    // {
    //     path: '/test',
    //     Element: <Test/>,
    //     text: 'Analyse Expensive',
    //     icon: <LeaderboardIcon/>
    // },



]

export default routes;