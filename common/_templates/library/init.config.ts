import type {IConfig} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib';
import {InitPlugin} from '../_plugins/init-plugin';

const config: IConfig = {
  prompts: [],
  plugins: [new InitPlugin()],
  defaultProjectConfiguration: {
    reviewCategory: 'librarys',
    shouldPublish: true,
    tags: ['librarys'],
  },
};

export default config;
