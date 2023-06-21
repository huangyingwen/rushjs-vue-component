# monorepo 组件开发

Rushjs + pnpm + storybook

```

├── common
│   ├── autoinstallers             # rush 插件目录
│   │   ├── rush-plugins
│   │   └── rush-storybook         # storybook 插件，跨组件展示文档
│   ├── config                     # rush 配置
│   │   └── rush
│   ├── git-hooks                  
│   ├── scripts
│   └── _templates
│       ├── _plugins
│       │   ├── init-plugin.ts
│       │   └── tsconfig.json
│       ├── template.json
│       └── vue-component          # 项目模板
├── components                     # 组件目录
│   └── Button
├── README.md
├── rush.json
└── tools                          # 工具，tsconfig/eslint... 通用配置，其他组件都引用这个配置
    ├── configs
    │   ├── lintstagedrc.cjs
    │   ├── package.json
    │   ├── prettierrc.cjs
    │   ├── stylelint.config.cjs
    │   ├── tsconfig.json
    │   └── tsconfig.node.json
    └── eslint-config
        ├── index.cjs
        └── package.json

```

## 开发指南

### 安装

1. rush

```bash
npm install -g @microsoft/rush
```

2. 通过 rush 安装项目依赖

```bash
rush update
```

### 启动

1. 运行 storybook

```bash
rush storybook    # 运行文档
```

### 构建组建

**构建单个组件**

```bash
rush build
```

**构建整个组件库**

```bash
# 构建 @cssc-ment/button
rush build --to "@cssc-ment/button"
```

### 添加新组件包

通过 repo 里内置模板添加组件, 目前只有一个 vue 组件项目模板

```bash
# 根据提示往下走
rush init-project
```

### 添加依赖包

必须通过 rush 命令安装依赖包，Rush 会在某个中心文件夹安装所有的依赖，之后使用符号链接给每个项目创建 "node_modules" 文件夹。如果通过其他包管理工具(npm/yarn)安装依赖, 符号连接会失效，运行会出问题。

手动修改了项目 package 必须之下 rush update：

```bash
rush update
```

通过 rush add 安装依赖包

```bash
# cd 到具体组件目录，例如 components/Button
cd ./components/Button
rush add --package "lodash"
```

### 发布组件

当发布一个 NPM 包时，最普遍的做法是带上一个 CHANGELOG.md 文件，该文件记录了问题修复、新功能、功能变动或移除。Rush 中可以使用 rush change 来自动完成这些功能。当你准备提交 PR 时，并将变动 commit 到相应的分支上后，需要执行这个命令，它会分析当前分支中的变动，并在必要时让你对其变动进行描述。

如何组织你的描述是很重要的：不能太具体，也不能太复杂，不能暴露隐私，同时要让描述信息更友好。我们建议在可读性上做文章，问问你自己：

- “此次变更是否与第三方开发者有关？”
- “是否存在破坏性变更？”
- “是否修复了某个让人不悦的 bug? ”
- “是否有需要他人适用的新功能？”

在一些工作流中，发布前需要有人来编辑变更日志，然而应该是每个人都尽其最大努力来保证日志内容的清晰和专业。

#### 最佳实践

- 使用 简单的现代时 和 命令式语气。
- 从一个不熟悉项目细节的外部人员的角度来写。
- 尽量描述场景（例如：“搜索现在支持通配符”），而不是代码的变更（例如：“在 SearchHelper 类中增加正则表达式的支持”）
- 使用动词开头，推荐使用：
  - Add - 当你引入或暴露一个新功能、属性、类、UI 等。
  - Remove - 当你完全移除了不会再被使用的东西。
  - Deprecate - 当你计划移除某些东西，但是目前仍然可用。
  - Fix an issue with/where... - 当你修复一个 bug.
  - Improve - 改进了一个已有的东西。
  - Update - 更新了某项东西，但不一定使其更好。
  - Upgrade - 升级了依赖包的版本。
  - Initial/Beta release of ... - 发布了一个新功能。

- 别用 bug 一词，转而使用 issue.
- 不要使用缩写，除非是被广泛认可的（例如："HTTP"）
- 使用正确的拼写和语法。CHANGELOG.md 是发布文档的一部分。
- 当涉及到公共 API 变化时，使用 () 后缀来指出函数名，例如 setSomethingOnWebpart().
- 当涉及到公共 API 变化时，使用 (` `) 来包裹类和其属性名。
- 当描述版本升级时，表明旧版本和新版本，例如："Upgraded widget-library from 1.0.2 to 2.0.1".
- 当修复一个 Github issue 后，考虑在括号中添加 issue URL.
- 不要在句尾添加句号，除非你有两个以上句子。

#### 变更日志消息示例

这里有一些用于编写 rush change 变更日志的示例：

- Add "buttonColor" to the button manifest schema
- Remove support for older mobile web browsers as described in the README.md
- Deprecate the doSomething() API function. Use doSomethingBetter() instead.
- Fix an issue where "ExampleWidget" API did not handle dates correctly
- Improve the diagnostic logging when running in advanced mode
- Upgrade from React 15 to React 16
- Initial release of the flexible panels feature

### 参考文档

- [storybook](https://storybook.js.org/tutorials/intro-to-storybook/vue/zh-CN/get-started/)
- [rushjs](https://rushjs.io/zh-cn/pages/developer/new_developer/)
