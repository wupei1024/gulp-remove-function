# gulp-remove-function

> 删除js文件中的一个函数，
> 比如打包的时候有个函数不想要了，
> 比如把老式第三方的包的一部分打包到自己的min里。
>
> 有三个参数，
> 其中regex为匹配要删除函数的文件名的正则，
> ruler为函数的开头，通常是要删除的开头到第一个“{”以前的部分。
> emptyFun 为true是保留空函数体，为false彻底删除，默认false。
> 也许能用上吧。


## Getting Started 使用指南

```
var removeFun = require('gulp-remove-function');
gulp.src(xxx).pipe(removeFun({regex:/aaaa\.js$/,ruler:'funname: function(href, fn, cssname)',emptyFun:false}))

```
删除以前：
aaaa.js
```
funname: function(href, fn, cssname){
    if(1===2){
        return 100;
    }

}
```
删除以后：
emptyFun:false :
```

```
emptyFun:true :

```
funname: function(href, fn, cssname){
}
```