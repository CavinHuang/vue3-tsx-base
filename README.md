# H5 vue3+typescript+vant+scss+css-module 基础项目

> 注意：此项目demo基于vue3.0+typescript+css-module完成，页面及组件使用tsx完成，可作为项目基础，进行二次开发,之所以使用css-module是因为tsx中css没有scope这个东西

## 简介
- 基于vue-cli 4.0 已经配置好vant+axios+scss+svg+typescript+css-module
- vant 支持按需加载使用
- axios 已经做了封装
- 简化路由创建和加载，分模块自动加载，无需手动引入
- 简化api加载和创建，分模块自动加载api到app实例$api,优化管理，无需手动引入
- 抽离vue router keepalive控制
- 抽离全局布局
- 内置打包分析
- 内置一些常用的工具方法
- 内置手动刷新页面组件的方法
- 内置px自动转rem，自动计算rem基准值

## 项目说明
- 全面函数化axios封装，迎合vue3，函数是一等公民，放弃类，遵循函数格式的开发风格。
- 合理管理ts的type，每个模块就近管理也可全局统一管理，建议涉及公共组件，公共函数时，全局统一管理，涉及业务逻辑、业务接口、业务组件时就近管理。
- 建议每个变量函数都要有自己的type，方便类型追查，减少运行时的bug，慎用any类型。
- 遵行团队其他规范，代码规范是减少开发过程出现莫名bug的有效途径，拜八阿哥----，共勉！

送上团队开发规范 [点这里呀，穿越时空！》》》](https://gitlab.cmsk1979.com/docs/tutorial/-/wikis/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83)


## 项目安装
```
yarn # or npm install
```

### Compiles and hot-reloads for development
```
yarn serve # or npm run serve
```

### Compiles and minifies for production
```
yarn build # or npm run build
```

### Lints and fixes files
```
yarn lint # or npm run lint
```
## 二开说明
`注意:`开发时可以先copy一份.env改成.env.local，当加入local后缀时，不会加入版本控制避免，多人修改.env造成冲突，新增环境变量请往各个环境中添加。

## Q & A
1、如何自定义vant的主题？
参考 [vant less 变量](https://github.com/youzan/vant/blob/dev/src/style/var.less) 中的变量，根据自己的需要，加入到`src/assets/styles/variables.less`

2、接口如何定义和使用？
 - 1、在apis/modules中定义自己的模块文件，定义ts参数type，导出相关接口。例如：
 ```javascript
// 定义参数接口
interface getDemo {
  current: number;
  pageSize: number;
  title?: string;
  author?: string;
}

/**
 * get demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
 * @param {getDemo} params 请求参数
 * @param {CustomerAxiosOptionsInterface} options 指定自定义参数的类型接口
* @returns {Promise<AxiosResponse>} axios response 实例
  */
getTest(params: getDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> {
  return get('/api/xxxx', params, options)
}
```
 - 2、在sfc中使用与vue2有所不用，vue3需要从当前的实例中获得全局挂载的对象，具体的使用方式如下：
 ```js
 // 获得获取api的方法
import { $api } from '@/assets/scripts/utils/sfcGlobalConfig'
// 从vue中获取 getCurrentInstance方法
import { getCurrentInstance } from 'vue

....
// 获取test api模块，接下来就可以从test获取响应的api方法了
const { test } = $api(getCurrentInstance())
```
一个完整的api请求过程
```js
// 获得获取api的方法
import { $api } from '@/assets/scripts/utils/sfcGlobalConfig'
// 从vue中获取 getCurrentInstance方法
import { getCurrentInstance } from 'vue``js
// 导入返回数据实例
import { ResponseDataInterface } from '@/apis/types/response'

// 获取test api模块，接下来就可以从test获取响应的api方法了
const { test } = $api(getCurrentInstance())

// 获取接口
const getGoodsList = (): void => {
  test.getGoodsList().then((res: ResponseDataInterface) => {
    console.log('获取的数据', res)
    // TODO
  })
}
```
具体的完整的代码，请移步至`src/views/home/index.tsx`

### 自定义vue配置
移步 [vue-cli配置文档](https://cli.vuejs.org/config/).
