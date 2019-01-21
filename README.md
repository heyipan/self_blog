**JEST 配置中的坑点**

一，步骤

    1.1 安装 npm install jest enzyme --save-dev
        注释：jest 为测试运行环境，enzyme为类jquery操作API
        
    1.2 配置package.json jest

        "jest": {
         "verbose": true,
         "testURL": "http://localhost",
         "moduleFileExtensions": [
           "js",
           "jsx"
         ],
         "moduleNameMapper": {
           "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
           ".*\\.(css|less|scss)$": "<rootDir>/__mock__/stub.css"
         },
         "transform": {
           "^.+\\.jsx?$": "babel-jest"
         }
        } `  
    
    
    1.3 配置package.json 中的测试script
    
        "scripts": {
            "start": "http-server & webpack -w --config webpack.pro.js",
            "pro": "webpack -p --config webpack.pro.js --progress",
            "hot": "node server_hot.js",
            "test": "jest" 
          },
          
二、测试demo，见__test__下以spec.js或test.js结尾的文件


三、运行测试
    npm run test //基于package.json
    
四、坑点

**postcss**
    
    1. postcss.config.js 从webpack.config.js 中单独提取，类似 .babelrc
    2. autoprefix, 自动添加css3前缀
    3. postcss-sprite, 自动合并图片（要求css严格按照切图编写，不实用）
    
        
**ICONFONT**

    http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=777161

**src中文件夹结构说明**
    asset： 资源文件文件夹，包括css：    用于存放页面整体样式定义style.scss，页面整体样式参数定义constant.css；
                               Iconfont：用于存放字体文件相关字体，页面和样式；
                               img：     用于存放页面图片。
    component： 项目组件库，包括native： 用于存放外部提供的组件，比如ant design已有的组件， 通过已有组件做了简单封装的组件（全部可重用）；
                                common： 用于存放基础组件，比如货币单位， 国家省市区联动等组件（全部可重用）；
                                biz：    用于存放业务组件，比如人员选择，公司选择等组件；
                                private：用于存放只有本项目可用的业务组件（用于当前项目）；
                                util.js：用于存放公共处理数据方法，比如请求参数解码等。

    container： 项目业务代码文件夹。
    l18n：国际化文件，en_US.js用于注册en相关文件, zh_CN.js用于注册cn相关文件。
    reducer：项目中reducer注册文件夹。
    request：处理服务器请求相关方法，链接存放文件夹，包括index.js： 用于存放服务器请求相关方法；
                                                         api.js：   用于存放外部请求链接。
    router：项目中跳转链接注册文件夹。
    store：项目中store注册文件夹。
    template：index页面文件夹。
    utils：项目中通用组件所在位置。
    entry.jsx：入口文件。


**Webpack4配置中的坑点**

    1. ExtractTextPlugin （用于提取css）插件不能用了，用MiniCssExtractPlugin 代替
    2. HtmlWebpackPlugin 需要升级一下
    3. 热加载的组件react-hot-loader不能喝react16混用，只能降级到react15
    4. 各种热加载顺序：
        4.1 react-hot-loader 必须写在所有jsx? loader之前 （否则热加载js无效）
        4.2 style-loader 必须写在所有s?css loader之前 （否在代码报错）
        4.3 css-hot-loader 必须写在第二个s？css loader处 （否则热加载css无效）