import type { StorybookConfig } from '@storybook/vue3-vite';
import path from 'path';
import { glob } from 'glob';
import fs from 'fs-extra';

const packagePaths = glob.sync('../../components/*');

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../../components/**/stories/*.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: (config) => {
    packagePaths.forEach((_path) => {
      const packageJson = fs.readJsonSync(path.resolve(_path, 'package.json'));
      const dirSourceFile = 'src';
      if (!config.resolve) config.resolve = {};
      if (!config.resolve.alias) config.resolve.alias = {};

      config.resolve.alias[`${packageJson.name}$`] = path.resolve(_path, dirSourceFile);
    });
    return config;
  }
};
export default config;
