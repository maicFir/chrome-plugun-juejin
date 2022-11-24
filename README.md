
# chrome-plugun-juejin

仿掘金导航chrome插件

本项目主要是理解一个基础`chrome`插件的构成，理解`chrome`核心配置`manifest.json`，`chrome`插件基本与网页没有太大的区别，区别在于需要掌握`chrome`API的使用，以及`popup`与`content.js`的如何通信等。

### v1.0
在`manifest_version：3`不支持直接引入`vue.global.min`，因为`vue3`有`new Function`,`chrome`插件已经禁止`evel`与`new Function`，所以`vuejs`使用了`csp`版本，但是`csp`版本又是`v1.0`，所以干脆就将计就计了，使用了`vue1.0`官方github已经提供了一个[csp](https://github.com/vuejs/vue/tree/csp)版本


* 当我们安装起插件就会打开掘金插件的导航栏，怎么做到的呢？主要是`manifest.json`中的这行配置

```js
 "chrome_url_overrides": {
        "newtab": "index.html"
    },
```
* `manifest_version`的一些常用配置
  

```json
{
    "manifest_version": 3,
    "version": "0.1",
    "name": "仿掘金导航",
    "author": "",
    "description": "仿掘金导航",
    "action": {
        "default_title": "仿掘金导航",
        "default_popup": "index.html#/popup",
        "default_icon": "images/logo.png"
    },
    "icons": {
        "16": "images/icon-16.png",
        "32": "images/icon-32.png",
        "48": "images/icon-48.png",
        "128": "images/icon-128.png"
    },
    "content_scripts": [
        {
            "js": [
                "scripts/content.js"
            ],
            "matches": [
                "<all_urls>"
            ]
        }
    ],
    "chrome_url_overrides": {
        "newtab": "index.html"
    },
    "host_permissions": [
        "<all_urls>"
    ]
}
```
  
* 掘金换肤功能

    主要利用了css的变量功能，所有颜色，背景都用css变量,然后我们切换皮肤时，就动态修改`body`上的`dart`样式即可

```css
    :root {
        --header-bg-color: #fff;
        --jjext-color-divider: #e5e6eb;
        --jjext-color-secondary-bg: #fff;
        --jjext-color-nav-title: #86909c;
        --logo: url("https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg");
        --jjext-color-main-bg: #f4f5f5;
        --card-height: calc(100vh - 186px - 30px);
        --jjext-color-brand: #1e80ff;
        --jjext-color-navbar-icon: #1e80ff;
        }
        :root .dart {
        --jjext-color-primary: #e3e3e3;
        --jjext-color-divider: #4a4a4a;
        --header-bg-color: #272727;
        --jjext-color-nav-title: #e3e3e3;
        --logo: url("https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/brand-dark.3111cff6.svg");
        --jjext-color-main-bg: #121212;
        --jjext-color-secondary-bg: #272727;
        --jjext-color-brand: #fff;
        --jjext-color-navbar-icon: #e3e3e3;
        }
```

* 引入[eazyMock]("https://mock.mengxuegu.com/")仿造接口数据
  
### 开始

* git clone https://github.com/maicFir/chrome-plugun-juejin.git
  
* 打开chrome,`更多工具>插件管理>添加该克隆项目即可`


### 预览结果
![](https://files.mdnice.com/user/24614/136cfc99-bbb7-4014-8e33-c786f53ba24b.png)

![](https://files.mdnice.com/user/24614/a6c2fa8c-cc3b-4a0d-aa2e-20c7d2073cef.png)

![](https://files.mdnice.com/user/24614/abd1d7f6-621b-47e6-add8-147d392db343.png)

### v2.0

待计划

* 使用`webpack5`从0到1构建`chrome`插件，引入`vue3`，将`v1.0`改成工程化方式构建`chrome`插件
  
* 增加本地缓存

* 考虑本地收藏网页

* popup控制当前网页(目前未实现)

    加载本地插件，不会自动加载`content.js`，当前页面必须是有服务地址才可通信。如有知道，可留言，一起讨论交流