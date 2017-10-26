## 模仿vue的双向数据绑定
> 前段时间听了TGideas的一场交流会之后萌生了自己实现数据双向绑定的想法，于是在参考了[DMQ/mvvm: 剖析vue实现原理，自己动手实现mvvm](https://github.com/DMQ/mvvm)的逻辑后用TypeScript实现了一套简单的双向数据绑定的库

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

#### 双向数据绑定的实现逻辑
> 具体逻辑可以参考[DMQ/mvvm: 剖析vue实现原理，自己动手实现mvvm](https://github.com/DMQ/mvvm)这篇所讲的，我只是大概讲一下关于自己的理解。
1. 建立对数据的监测。在`Observer`这个类中使用`Object.defineProperty`方法重新定义data上的数据，实现对data的数据劫持。在这个过程中为每个属性节点建立一个发布者，这个发布者是针对对应的属性节点以及其后代属性的。
2. 模版的转换。
 + 模版的获取。通过`document.createDocumentFragment`方法创建一个文档碎片，并通过appendChild方法将编译范围内的dom从文档树中移除并加入到文档碎片中。
 + 模版的编译。通过`node.childNodes`递归遍历每个dom节点，使用正则匹配判断每个节点是否存在需要编译的文本，若存在，则将其跟data上的数据进行匹配，并创建一个订阅者将其加入到相应的发布者中。
3. 通过在数据监测以及dom数据绑定的过程构建发布-订阅的设计模式，实现了双向数据绑定

#### 存在的问题
> 
1. 在编译模版中多次引用同个data上的数据会导致重复的`Watcher`创建。
2. 对于`Watcher`的缓存使用，原先逻辑代码上因为对当前`Watcher`需要在多个类中进行使用，通过在`Dep`类上创建一个静态变量`target`实现缓存，使用上会导致代码的可读性降低，增加逻辑的复杂度。

> 上述问题以后会继续研究，待续...
