import { Login } from './pages/home/index';
import { SignUp } from './pages/home/signup/index';
import { Profile } from './pages/profile/index';
import { EditProfile } from './pages/profile/profile-edit-data/index';
import { EditPass } from './pages/profile/profile-edit-pass/index';
import { Chat } from './pages/chat/index';
import { Router } from './utils/router/index';


Router.setRootQuery('#root');
Router
    .use('/', Login)
    .use('/sign-up', SignUp)
    .use('/profile', Profile)
    .use('/settings', EditProfile)
    .use('/pass', EditPass)
    .use('/messenger', Chat)
    .start();