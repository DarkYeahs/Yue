## 模仿vue的双向数据绑定
> 前段时间听了TGideas的一场交流会之后萌生了自己实现数据双向绑定的想法，于是用TypeScript实现了一套双向数据绑定的框架

#### 实现双向数据绑定的基本原理
> 实现双向数据绑定的原理有以下几种
1. ddd
2. ddd
3.


#### 项目主要代码目录如下
```
src
|--Yue
|--|--util
|--|--|--CompileUtil.ts
|--|--|--Updater.ts
|--|--Yue.ts
|--|--Observer.ts
|--|--Compile.ts
|--|--Observer.ts
|--|--Dep.ts
|--|--Watcher.ts
|--index.ts
```
> 整个项目通过src目录下的index.ts对外暴露引用，主体类是Yue目录下的Yue.ts。

>同时Yue类下面还有Observer.ts以及Compile.ts两个主要类。Observer类是用来建立Yue实例化后对象下的data数据的监测，Compile类是负责将自定义的一套html语法糖编译成浏览器所能理解的dom树

> util目录下存放着CompileUtil以及Updater两个工具类，CompileUtil类是编译工具类，Updater是数据更新工具类
