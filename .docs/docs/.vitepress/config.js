const pkg = require('../../package.json')
const pathJoin = data => {
  let _sidebar = {};

  // 路径处理
  for (let k in data) {
    // let _key = k != '/' ? root.base + k : k;
    // console.log('sidebar', k);
    data[k].forEach(e => {
      // console.log('sidebar.' + k, e);
      // 补充路径
      e.link = k + e.link;
      if (e.children) {
        // 有下级
        let _chpath = e.link.replace(/index$/gi, '');
        e.children.forEach(item => {
          // 补充路径
          item.link = _chpath + item.link;
        });
      }
    });

    _sidebar[k] = data[k];
  }

  return _sidebar;
};
module.exports = {
  title: pkg.name,
  description: pkg.description,
  themeConfig: {
    algolia: {
      apiKey: 'ed418a25a6a5d7d44a3ca0ec8207f13e',
      indexName: 'docs-xizher-core'
    },
    sidebar: true,
    sidebar: pathJoin({
      '/guide/': [
        {
          text: '基础工具集',
          link: 'base-utils',
        },
        {
          text: 'Cookie工具集',
          link: 'cookie-utils',
        },
        {
          text: '字符串加密解密工具集',
          link: 'crypto-utils',
        },
        {
          text: '存储工具集',
          link: 'storage-utils',
        },
        {
          text: 'Axios二次集成库',
          link: 'axios',
        },
        {
          text: '观察者类',
          link: 'watcher',
        },
        {
          text: '事件监听者类',
          link: 'observable',
        },
        {
          text: '原型对象扩展装饰器',
          link: 'ext',
        },
      ],
    })
  },
}