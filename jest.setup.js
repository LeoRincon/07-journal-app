// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironment } from './src/helpers/getEnvironment';

require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/helpers/getEnvironment', () => ({
  getEnvironment: () => ({ ...process.env }),
}));
