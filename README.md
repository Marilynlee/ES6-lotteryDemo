# ES6语法
## let和const
+ let:声明一个块级作用域变量，必须先声明在引用，不能重复声明，不存在变量提升
+ const:声明一个常量，也是块级作用域变量，声明时必须赋值。  
`const`本质是内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。  
```
function last(){
  const k={
    a:1
  }
  k.a=3;
  console.log(k);
}
last();//{a:3}
```
## 解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring），解构赋值属于“模式匹配”，允许指定默认值。只要等号两边的模式相同，左边的变量就会被赋予对应的值。如果解构不成功，变量的值就等于undefined。只有当一个解构值严格等于undefined，默认值才会生效。
分类：数组解构、对象解构、字符串解构、布尔值解构、数值解构、函数参数解构
### 数组解构  
数组的元素是按次序排列的，变量的取值由它的位置决定；
```
let a,b,rest;
[a,b,...rest]=[1,2,3,4,5];
console.info(a,b,rest);// 1  2   [3, 4, 5]
```
### 对象解构
对象的解构属性没有次序，但变量必须与属性同名，才能取到正确的值。内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
### 字符串赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
let {length : len} = 'hello';
len // 5
```
### 数值和布尔值解构
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```dart in html
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
```
### 函数参数解构赋值
解构赋值为函数的参数指定默认值提供了相当的便利条件
```
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```
## 正则扩展
构造函数的变化，正则方法扩展，修饰符u,y,s（还未实现）
ES6 的正则对象多了sticky属性，表示是否设置了y修饰符
ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。
### 构造函数
1. 参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
1. 参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。如果使用第二个参数指定修饰符,则第二个修饰符会覆盖第一个参数正则的修饰符
1. ES6 将字符串对象可以使用正则表达式：match()、replace()、search()和split()4个方法，在语言内部全部调用RegExp的实例方法，所有与正则相关的方法，全都定义在RegExp对象上。
```
let regex = new RegExp('xyz', 'i'); //第一个参数是字符串，第二个是修饰符
let regex2 = new RegExp(/xyz/i); //es5第一个参数是正则表达式，不接受第二个参数，否则会报错
console.log(regex.test('xyz123'), regex2.test('xyz123')); // true true
let regex3 = new RegExp(/abc/ig, 'i');
console.log(regex3.flags); //i  原有正则对象的修饰符是ig，它会被第二个参数i覆盖
```
### y修饰符
“粘连”（sticky）修饰符：全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。  
```
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]
r1.exec(s) // ["aa"]
r2.exec(s) // null
console.log(r1.sticky, r2.sticky); //false true 表示是否开启了粘连模式
```
### u修饰符
为"Unicode 模式"，用来正确处理大于\uFFFF的 Unicode字符。即正确处理四个字节的 UTF-16 编码 
```dart
{
console.log('u修饰符',/^\uD83D/.test('\uD83D\uDC2A')); // true
console.log('u修饰符',/^\uD83D/u.test('\uD83D\uDC2A')); // false 加上u认为字符串是一个字符
// 大括号表示Unicode字符，只有加上u才能识别
console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')); // true
console.log(/\u{20BB7}/u.test('𠮷')); // true
// 点（.）字符不能识别码点大于0xFFFF的Unicode字符，必须加上u修饰符。
let s = '𠮷';
console.log('大于0xFFFF的Unicode字符',/^.$/.test(s)); // false
console.log('使用u字符',/^.$/u.test(s)); // true
// 使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。
console.log('量词',/𠮷{2}/.test('𠮷𠮷')); // false
console.log('量词',/𠮷{2}/u.test('𠮷𠮷')); // true
}
```
### s修饰符
es5点（.）是一个特殊字符，代表任意的单个字符，但有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。以下四个字符属于”行终止符“。
- U+000A 换行符（\n）
- U+000D 回车符（\r）
- U+2028 行分隔符（line separator）
- U+2029 段分隔符（paragraph separator）
s修饰符称为dotAll模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式。
/s修饰符和多行修饰符/m不冲突，两者一起使用的情况下，.匹配所有字符，而^和$匹配每一行的行首和行尾。
```dart
const re = /foo.bar/s;
re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'
```
## 字符串扩展
### Unicode表示法
JS允许采用\uxxxx形式表示一个字符，只限于码点在\u0000~\uFFFF之间。超出范围的字符须用两个双字节的表示。ES6将码点放入大括号，就能正确解读该字符。  
- 新增codePointAt方法正确返回32位的UTF-16字符的码点。对于两个字节常规字符，返回结果与charCodeAt方法相同。  
- 新增String.fromCodePoint方法，可以识别大于0xFFFF的字符，用于从码点返回对应字符，弥补了String.fromCharCode方法的不足。
- 提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回字符串给定位置的字符。  
- 字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
```dart
console.log('s',`\u20BB7`);// S 口7
console.log('s',`\u{20BB7}`); //𠮷 

let s1='𠮷a';
console.log('at0',s.charCodeAt(0));//at0 55362
console.log('code0',s1.codePointAt(0));//code0 134071
console.log(String.fromCharCode("0x20bb7"));//ஷ
console.log(String.fromCodePoint("0x20bb7"));//𠮷

'𠮷'.charAt(0) // "\uD842"
'𠮷'.at(0) // "𠮷"
'\u01D1'.normalize() === '\u004F\u030C'.normalize() // true
```
### 字符串遍历器接口
ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
```dart
let str='\u{20bb7}a';
for(let i=0;i<str.length;i++){
  console.log('es5',str[i]);//es5 ? | es5 ? | es5 a
}
for(let code of str){
  console.log('es6',code);//es6 𠮷 | es6 a
}
```

### 字符串新增实用方法
ES6 又提供以下新方法，前三个都支持第二个参数，表示开始搜索的位置。
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
- repeat方法返回一个新字符串，表示将原字符串重复n次。  
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。参一指定字符串的最小长度，参二用来补全的字符串。
- padStart()用于头部补全
- padEnd()用于尾部补全
```
let str="string";
console.log('includes',str.includes("c"));//false
console.log('start',str.startsWith('str'));//true
console.log('end',str.endsWith('ng'));//true
let s="abc";
console.log(s.repeat(2)); //abcabc
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
```
### 模板字符串
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。将变量名写在${}之中，大括号内部可以放入任意的JS表达式，可以进行运算，以及引用对象属性，还能调用函数。
```dart
let name="list";
let info="hello world";
let m=`i am ${name},${info}`;
console.log(m); //i am list hello world 
function fn() {
  return "Hello World";
}
`foo ${fn()} bar` // foo Hello World bar
```
### 标签模板
“标签模板”功能（tagged template）：模板字符串紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。本质是函数调用的一种特殊形式。“标签”指的就是函数，紧跟的模板字符串就是它的参数。但模板字符里面有变量，会将模板字符串先处理成多个参数，再调用函数。
第一个参数是一个数组，数组成员是模板字符串中那些没有变量替换的部分,其他参数是模板字符串各个变量被替换后的值。
```
{
  let user={
    name:'Mary',
    info:'Tom'
  };
  console.log(abc`Hi ${user.name}, this is ${user.info}`); //Hi ,, this is ,MaryTom
  function abc(s,v1,v2){
    console.log(s,v1,v2); // ['Hi' , ', this is' , '']  'Mary' 'Tom'
    return s+v1+v2
  }
}
```
## 数值扩展
### 新增方法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
```
0b111110111 === 503 // true
0o767 === 503 // true
```
ES6 在Number对象上新增两个方法
+ Number.isFinite()用来检查一个数值是否为有限的（finite）,对于非数值一律返回false
+ Number.isNaN()用来检查一个值是否为NaN。只对于NaN才返回true，非NaN一律返回false 
+ ES6将全局方法parseInt()和parseFloat()移植到Number上，行为完全保持不变。
+ Number.isInteger()用来判断一个数值是否为整数。对数据精度的要求较高，不建议使用
+ Number.EPSILON是一个极小的常量，表示1与大于1的最小浮点数之间的差。是JS能表示的最小精度。
误差如小于这个值，就认为不存在。引入目的在于为浮点数计算，设置一个误差范围。
+ Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER两个常量用来表示-2^53到2^53的上下限
+ Number.isSafeInteger()则是用来判断一个整数是否落在-2^53到2^53这个范围之内。

```
Number.isFinite(NaN); // false
Number.isNaN(9/NaN) // true
Number.isInteger(25.0) // true
Number.isInteger('15') // false
Number.EPSILON === Math.pow(2, -52)// true
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1// true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER// true
Number.isSafeInteger(1.2) // false
```

