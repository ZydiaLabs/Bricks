NutBang
=======
HTML5 framework designed to keep your project simple and awesome.

 * **HTML5 Apps**: Supports open web standards, such as HTML5, CSS3 and JavaScript.

 * **Light Javascript**: Provides a JavaScript library for modern browser. The syntax is inspired from jQuery, but is not JQuery.

 * **Cross-Device development**: TBD.

 * **Plugin support**: It's modular so you can extend it however you like, also replace our features with your own.

 * **Open Source Project**: We love to work with new people around the globe. Each idea, code feature or fix is welcome. We know that the community is the first step to create and improve amazing things.

*Current version: [0.0.0]()*



Getting Started
---------------
This is a more lightweight alternative to libraries such as jQuery, Prototype and Zepto. We don't want to create a jQuery, Zepto or Prototype clone. That's the reasons we don't support all methods. 

If you think that NutBang needs a certain method please create an issue and tell us why!

### Licensing
NutBang is licensed under GPLv3 licensed. See [LICENSE](https://github.com/NutBang/NutBang/blob/master/LICENSE.md) for more information.

### Help us on being better
If you think that we have to support a new feature or if you have found a bug, use [GitHub issues](https://github.com/NutBang/NutBang/issues). Feel free to get in contact with us.

Mobile Prototype
================

Structure
---------
Here you have the dependencies of your NutBang application's body. It must contain at least:

``` html
<link rel="stylesheet" href="css/NutBang.min.css">
<script src="js/NutBang.min.js"></script>
```

Desktop Prototype
=================

Structure
---------
Here you have the dependencies of your NutBang application's body. It must contain at least:

``` html
<link rel="stylesheet" href="css/NutBang.min.css">
<script src="js/NutBang.min.js"></script>
```

JavaScript
==========

Core
----
NutBang has several methods that are used inside its engine. Here you have them if you need to include some of their functionality in your application.

**$()** is just a shortcut for **nutbang()**, **nb()** and **NutBang()**.

#### $()

NutBang support the basic selectors, but in a modern browser advanced selectors are supported as well via **document.querySelectorAll**.

The function will take two parameters, the first is a selector and the second is the context (or attribute object) where you are searching for the DOM node. If no context is given the context will be document. If a tire collection is given it will just return the given collection.

If a function is given it will be used as a callback for the dom ready event. **$(function () {})** is a shortcut for **$.ready()** or **$().ready**. When the dom is ready, the function is executed.

**Parameters**
``` javascript
$(selector [, context])
```

*Example*
``` javascript
$('#test') // returns the element with the id foo
$('.test') // returns all elements with the class name bar.
$('p') // returns all elements with the tag name p.
$('input[type=text]') // returns all input elements with the type text.
$('a, div') // returns all a and div elements;
$('ul li') // returns all li elements that are inside an ul tag.
$('ol > li') // the same as above but for ol tag.
$('<a />', { href: '#', title: 'a' }); // Add attributes to the tag (1.1.1+).
```

#### $.contains
Check to see if a DOM element is a descendant of another DOM element.

**Parameters**
``` javascript
$.contains(container, contained)
```

*Example*
``` javascript
TBD
```

#### $.each
Iterate over array items or object key-value pairs. 

**Parameters**
``` javascript
$.each(object, callback)
```

*Example*
``` javascript
$.each([1, 2, 3], function (index, item) {
  // Item is 1, 2, 3 and so on. Index is the position in the array
});

$.each({ hello: 'world' }, function (key, value) {
  // Key is `hello` and value is `world`
});
```
#### $.extend
Extends target with members of other objects.

**Parameters**
``` javascript
$.extend(target, [source [, source2, ..]])
```

*Example*
``` javascript
TBD
```

#### $.isArray
Returns true if the given object is an array. 

**Parameters**
``` javascript
$.isArray(object)
```

*Example*
``` javascript
TBD
```

#### $.isFunction
Returns true if the given object is a function.

**Parameters**
``` javascript
$.isFunction(object)
```

*Example*
``` javascript
TBD
```

#### $.isNumeric
Returns true if the given object is a number.

**Parameters**
``` javascript
$.isNumeric(object)
```

*Example*
``` javascript
TBD
```

#### $.isString
Returns true if the given object is a string.

**Parameters**
``` javascript
$.isString(object)
```

*Example*
``` javascript
TBD
```

#### $.isObject
Returns true if the given object is an object.

**Parameters**
``` javascript
$.isObject(object)
```

*Example*
``` javascript
TBD
```

#### $.isPlainObject
Returns true if the given object is a plain object.

**Parameters**
``` javascript
$.isPlainObject(object)
```

*Example*
``` javascript
TBD
```

#### $.isWindow
Returns true if the given object is the window object.

**Parameters**
``` javascript
$.isWindow(object)
```

*Example*
``` javascript
TBD
```

#### $.matches
Returns true if the given object is an object.

**Parameters**
``` javascript
$.isObject(object)
```

*Example*
``` javascript
TBD
```

#### $.trim
The trim method returns the string stripped of whitespace from both ends. It does not affect the value of the string.

**Parameters**
``` javascript
$.trim(string)
```

*Example*
``` javascript
TBD
```

#### $.parseJSON
Parse JSON string to JSON object. This will also work for older browsers that don't include **JSON**.

**Parameters**
``` javascript
$.parseJSON(string)
```

*Example*
``` javascript
$.parseJSON('{"a":"b"}') // Returns { "a": "b"} as an object
```

#### addClass
Add class name to the selected elements. Multiple class names can be given in a space-separated string.

**Parameters**
``` javascript
.addClass(name)
```

*Example*
``` javascript
TBD
```

#### append
Append html to the DOM inside each element in the collection. The html can be a HTML string or Tire collection.

**Parameters**
``` javascript
.append(html)
```

*Example*
``` javascript
TBD
```