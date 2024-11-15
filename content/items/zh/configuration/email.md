---
title: 电子邮件
description: 如何在此项目中管理电子邮件。
---

Resend的魔法链接功能与Auth.js v5兼容! <br />
您可以在本地环境和自己的生产设置中使用它。

然而,您无法在这个演示应用中测试它,因为我不想为这个演示使用Resend的高级计划。

## 步骤

电子邮件部分与[resend](https://resend.com/)文档类似。
如果您需要,可以在[这里](https://authjs.dev/getting-started/installation#setup-environment)找到官方文档。

### 创建账户

如果您还没有Resend账户,只需在[这里](https://resend.com/signup)注册后按照他们的步骤操作。

### 创建API密钥

登录Resend后,它会提示您创建第一个API密钥。

将其复制/粘贴到您的`.env`文件中。

```js
RESEND_API_KEY = re_your_resend_api_key;
```