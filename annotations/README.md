## 开发新的装饰器

添加文件，并遵循首字母大写。然后声明与文件名称相同的函数。

例如新建 `Example.js`，并编码：

```javascript
const Component = require('./Component.js');

function Example(option) {
  function decorator(target) {};
  return Component(decorator, 'Example'); 
}

module.exports = Example;
```
