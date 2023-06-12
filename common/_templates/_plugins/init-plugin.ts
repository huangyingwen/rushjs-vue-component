import type {
  IPlugin,
  IHooks,
  IPromptsHookParams
} from '../../autoinstallers/rush-plugins/node_modules/rush-init-project-plugin/lib';

import _ from '../../autoinstallers/rush-plugins/node_modules/lodash/lodash';

export class InitPlugin implements IPlugin {
  public static readonly pluginName: string = 'CDNPlugin';
  apply(hooks: IHooks): void {
    hooks.promptQuestion.for('projectFolder').tap(InitPlugin.pluginName, (promptQuestion, answersSoFar) => {
      // logic here
      // 必须赋值并且返回 null 才会忽略该提示问题
      answersSoFar.projectFolder = `components/${_.capitalize(answersSoFar.packageName)}`;
      return null;
    });

    hooks.promptQuestion
      .for('shouldRunRushUpdate')
      .tap(InitPlugin.pluginName, (promptQuestion, answersSoFar) => {
        // logic here
        answersSoFar.shouldRunRushUpdate = true;
        return null;
      });

    hooks.prompts.tap(InitPlugin.pluginName, (prompts: IPromptsHookParams) => {
      // unshift make this question prompt to user just after template is answered.
      prompts.promptQueue[0].message = '你名称叫什么（package.json 中使用）';
      prompts.promptQueue[1].message = '输入 package 名称（不需要带名称前缀 @cssc-ment/）';
      prompts.promptQueue[2].message = '输入 package 描述信息';
    });

    hooks.answers.tap(InitPlugin.pluginName, (answers) => {
      answers.packageName = `@cssc-ment/${_.kebabCase(answers.packageName)}`;
      answers.packageType = 'module';
    });
  }
}
