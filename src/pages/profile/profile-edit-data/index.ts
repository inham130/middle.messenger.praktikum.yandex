import { EditProfile } from './profileEditData';
import { render } from '../../../utils/renderDOM';

const editProfile = new EditProfile();
render('#root', editProfile);