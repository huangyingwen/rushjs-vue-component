import type {IConfig} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib';
import {InitPlugin} from '../_plugins/init-plugin';

const config: IConfig = {
  prompts: [],
  plugins: [new InitPlugin()],
  defaultProjectConfiguration: {
    reviewCategory: 'components',
    shouldPublish: true,
    tags: ['components'],
  },
};

export default config;
