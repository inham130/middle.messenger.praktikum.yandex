import { SignUp } from './signup';
import { render } from '../../../utils/renderDOM';

const signUp = new SignUp();
render('#root', signUp);