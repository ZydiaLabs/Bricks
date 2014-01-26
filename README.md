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
Lungo is licensed under GPLv3 licensed. See [LICENSE](https://github.com/NutBang/NutBang/blob/master/LICENSE.md) for more information.

### Help us on being better
If you think that we have to support a new feature or if you have found a bug, use [GitHub issues](https://github.com/tapquo/lungo.js/issues). Feel free to get in contact with us.

MOBILE PROTOTYPE
================

Structure
---------
Here you have the dependencies of your Lungo application's body. It must contain at least:

``` html
<link rel="stylesheet" href="css/NutBang.min.css">
<script src="js/NutBang.min.js"></script>
```

DESKTOP PROTOTYPE
=================

Structure
---------
Here you have the dependencies of your Lungo application's body. It must contain at least:

``` html
<link rel="stylesheet" href="css/NutBang.min.css">
<script src="js/NutBang.min.js"></script>
```

JavaScript
==========

Core
----
Lungo has several methods that are used inside its engine. Here you have them if you need to include some of their functionality in your application.

#### $()
$() is just a shortcut for nutbang(), nb() and NutBang().

NutBang support the basic selectors, but in a modern browser advanced selectors are supported as well via document.querySelectorAll.

The function will take two parameters, the first is a selector and the second is the context (or attribute object) where you are searching for the DOM node. If no context is given the context will be document. If a tire collection is given it will just return the given collection.

If a function is given it will be used as a callback for the dom ready event. $(function () {}) is a shortcut for $.ready() or $().ready. When the dom is ready, the function is executed.

**Parameters**
```
$(selector [, context])
```

*Example*
``` javascipt
$('#test') // returns the element with the id foo
$('.test') // returns all elements with the class name bar.
$('p') // returns all elements with the tag name p.
$('input[type=text]') // returns all input elements with the type text.
$('a, div') // returns all a and div elements;
$('ul li') // returns all li elements that are inside an ul tag.
$('ol > li') // the same as above but for ol tag.
$('<a />', { href: '#', title: 'a' }); // Add attributes to the tag (1.1.1+).
```