## 移动端适配方案

###像素
#### 物理像素（设备像素）
屏幕的物理像素，又被成为设备像素，是现实设备中最微小的物理部件，任何设备的屏幕的物理像素出厂时就确定了，且固定不变
#### 设备独立像素
设备独立像素也成为密度无关像素，可以认为是计算机坐标的一个点，这个点可以代表一个可由程序使用的虚拟像素（例如css像素），然后有相关系统转换为物理像素
#### 设备像素比（devicePixelRatio）
简称dpr ，定义了物理像素和设备独立像素的对应关50系
<pre>
设备像素比 = 物理像素 / 独立设备像素
以iphone6 为例  设备固有像素为 750 * 1334，设备宽度是 375 * 667，其 dpr 就是2

可以通过 window.devicePixelRatio 获得
dpr > 1 就是高清屏，一般dpr为整数
</pre>
#### css像素
css、js中使用的一个长度单位。单位 px

注意：pc端1物理像素 等于1px，但是移动端1物理像素不等于 1px，1物理像素与 px的关系与以下因素有关
<pre>
1.屏幕布局的视口大小
2.屏幕的分辨率（物理像素）
</pre>
对于一块屏幕，其物理像素是确定的。视觉视口尺寸是继承与布局视口的，而视觉视口里的宽度即是css的px数。故一块屏幕上的物理像素与px的关系就是物理像素与布局视口的px数的关系
````
比如 iPhone6 它的物理像素是750px， 如果没有设置布局视口 viewport 为 980px
此时: 1物理像素长度 = 980px / 750px = 1.3076px 的长度
由于像素都是点阵的 一个物理像素点相当度 1.3076px * 1.3076px 方格

当在meta中设置了如下配置时

 <meta name ="viewport" content="width=device-width">
 
相当于把布局视口设置为设备的宽度（即上面讲到的设备独立像素）， 对于iphone6就是375
此时： 1物理像素长度 = 375px / 750px = 0.5 的长度，相当于 0.5px * 0.5px 方格
````

### 视口
#### 1.布局视口
 在html中一般在meta中的name为viewport 字段就是控制的布局视口，布局视口一般都是浏览器厂商给的一个值。但是浏览器厂商一般为了能小屏幕也能友好的展示，把布局视口设置很大，一般在768px~1024ox之间，最常用的就是980px。这样用户就能看大绝大部分的内容，根据内容去缩放
 
 故布局视口是看不见的，浏览器厂商设置的固定值，eg：980px，并将980px内容缩放到手机屏幕内
 
 布局视口可以通过
````
document.documentElement.clientWidth
````

#### 2.视觉视口
浏览器可视区域的大小，即用户可以看到的区域。（其宽度继承于布局视口的宽度）
````
window.innerwidth
````
#### 3.理想视口
布局视口虽然解决了移动端 查看pc网页的问题，但是完全忽略的手机本身的尺寸。所以苹果引入了理想视口，它对于设备来说就是最理想的布局视口,用户不需要缩放就可以完美展示整个页面

可以通过
````
window.screen.width 
````
移动端到底如何适配呢 最简单就是设置如下视口

````
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no">
````
使用上述方案定义布局视时，即布局视口等于理想视口，屏幕没有滚动条，不存在高清屏下，字体较小的问题。但是在不同的屏幕上，视觉宽度是不同的，不能简单的将所有的尺寸都设置为px，

#### viewport缩放
对于上面设置，在不同的屏幕上，css像素对应的物理像素具体的数值是不一致的

在普通屏幕上 dpr = 1 时，
1个css像素长度对应一个物理像素长度，1个css像素对应一个物理像素

在retina屏幕， dpr = 2

1个css像素长度对应 2个物理像素长度， 一个css像素 对应 4个物理像素

#### 适配方案
#####方案一
固定高度 宽度自适应

使用理想视口的方案
````
<meta name="viewport" content="width=device-width,initial-scale=1,minumum-scale=1,user-scalable=no" >
````

垂直方向使用固定的值，水平方向使用弹性布局，元素使用定值 百分比 flex 布局

##### 方案二：

固定布局视口宽度，使用viewport 缩放

````

if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
  var version = parseFloat(RegExp.$1);
  if(version>2.3){
    var phoneScale = parseInt(window.screen.width)/640;
    if(/MZ-M571C/.test(navigator.userAgent)){
      document.write('<meta name="viewport" content="width=640, minimum-scale = 0.5, maximum-scale= 0.5">');
    }else if(/M571C/.test(navigator.userAgent)&&/LizhiFM/.test(navigator.userAgent)){
      document.write('<meta name="viewport" content="width=640, minimum-scale = 0.5, maximum-scale= 0.5">');
    }else{
      document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
    }
  }else{
    document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
  }
}else{
  document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}
    
````

方案三：

根据不同的屏幕动态写入font-size， 以rem作为宽度单位， 固定布局视口
````
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maxmum-scale=1,user-scalable=no" >
````

以640px 设计稿 或者 750px 设计稿，
````
var width = document.document.clientWidth;
var rem = width / 7.5
var rem width / 6.4
````

方案四 

以rem作为宽度单位，动态写入viewport 和 font-size 进行缩放

