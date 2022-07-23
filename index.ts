import { Login } from './src/pages/home/index';
import { SignUp } from './src/pages/home/signup/index';
import { Profile } from './src/pages/profile/index';
import { EditProfile } from './src/pages/profile/profile-edit-data/index';
import { EditPass } from './src/pages/profile/profile-edit-pass/index';
import { Chat } from './src/pages/chat/index';
import { Router } from './src/utils/router/index';
import './src/style.scss';

Router.setRootQuery('#root');
Router
    .use('/', Login)
    .use('/sign-up', SignUp)
    .use('/profile', Profile)
    .use('/settings', EditProfile)
    .use('/pass', EditPass)
    .use('/messenger', Chat)
    .start();