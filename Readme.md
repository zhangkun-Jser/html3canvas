html3canvas
===========

html2canvas修正版,解决绘制多个元素重复创建iframe的问题.

## 使用
```javascript
import html3canvas from "html3canvas";
const resultCanvas = await html2canvas(el, opt);
```

## 文档

#### * 若`opations`参数没有`elements`字段, 则用法和返回和html2canvas 原库一摸一样
```javascript
html3canvas(a1, {}).then((canvass)=> {
  document.body.appendChild(canvas);
});
```

#### * 复用1个iframe节省资源用法, useOnlyIFrame = true
```javascript
const a1 = document.getElementById("a1");
const a2 = document.getElementById("baz");
const a3 = document.getElementById("a3");
const array = [a1, a2, a3];
const getRanDom = () => array[Math.floor(Math.random() * array.length)];

document.getElementById("btn").onclick = function() {
  html3canvas(getRanDom(), {
    useOnlyIFrame: true,
    removeContainer: false
  }).then(function(canvas) {
    document.body.appendChild(canvas);
  });
  alert("截图");
};

```

#### * 单frame渲染多个dom, 必须传`elements`字段, 返回`canvass`为三个结果canvas数组
```javascript
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');

html3canvas(a1, {
  elements: [a1, a2, a3],
  removeContainer: true
}).then((canvass)=> {
  canvass.forEach(canvas => {
    document.body.appendChild(canvas);
  });
});
```

#### * 预传size, 指定尺寸
```javascript
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');

html3canvas(a1, {
  elements: [a1, a2, a3],
  size: [[100,100], [120,100], [50, 70]]
}).then((canvass)=> {
  canvass.forEach(canvas => {
    document.body.appendChild(canvas);
  });
});
```

#### * 预传canvas
```javascript
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');

const c1 = createCanvas(100, 100);
const c2 = createCanvas(120, 100);
const c3 = createCanvas(50, 70);

html3canvas(a1, {
  elements: [a1, a2, a3],
  canvass: [c1, c2, c3],
  size: [[100,100], [120,100], [50, 70]]
}).then((canvass)=> {
  canvass.forEach(canvas => {
    document.body.appendChild(canvas);
  });
});
```

## 参数
|Name	| Default	| Description|
|  ----  | ----  |----  |
|allowTaint |	false	 |Whether to allow cross-origin images to taint the canvas|
|backgroundColor |	#ffffff |	Canvas background color, if none is specified in DOM. Set null for transparent|
|canvas |	null |	Existing canvas element to use as a base for drawing on|
|foreignObjectRendering |	false |	Whether to use ForeignObject rendering if the browser supports it|
|imageTimeout |	15000	 |Timeout for loading an image (in milliseconds). Set to 0 to disable timeout.|
|ignoreElements |	(element) => false |	Predicate function which removes the matching elements from the render.|
|logging |	true |	Enable logging for debug purposes|
|onclone |	null |	Callback function which is called when the Document has been cloned for rendering, |
|original | source  |document.|
|proxy |	null |	Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.|
|removeContainer |	true |	Whether to cleanup the cloned DOM elements html2canvas creates temporarily|
|scale |	window.devicePixelRatio |	The scale to use for rendering. Defaults to the browsers device pixel ratio.|
|useCORS |	false |	Whether to attempt to load images from a server using CORS|
|width |	Element width	 | The width of the canvas|
|height |	Element height |	The height of the canvas|
|x |	Element x-offset	 | Crop canvas x-coordinate|
|y |	Element y-offset	 | Crop canvas y-coordinate|
|scrollX |	Element scrollX	 | The x-scroll position to used when rendering element, (for example if the Element uses position: fixed)|
|scrollY |	Element scrollY	 | The y-scroll position to used when rendering element, (for example if the Element uses position: fixed)|
|windowWidth |	Window.innerWidth	 |Window width to use when rendering Element, which may affect things like Media queries|
|windowHeight	 | Window.innerHeight	 |Window height to use when rendering Element, which may affect things like Media queries|
