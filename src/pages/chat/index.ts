import { Chat } from './chat';
import { render } from '../../utils/renderDOM';

const chat = new Chat({});
render('#root', chat);