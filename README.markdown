# jQuery.simpleModalBox

This is a simple jQuery plugin that show modal content of link URL.

## Required Framework
* [jQuery](http://jquery.com/) (developed with jQuery 1.5)

## Usage

## JavaScript example

<pre><code>$(function() {
    // $(some selector).simpleModalBox()
    $('a').simpleModalBox({
        containerClassName: 'modal_container',
        overlayClassName: 'modal_overlay',
        closeBtn: $('a.close'),
        body: $('.body')
    });
});</code></pre>

## HTML example
<pre><code>&lt;ul class=&quot;body&quot;&gt;
&lt;!-- modal1.html will be open in modal box. --&gt;
&lt;li&gt;&lt;a href=&quot;modal1.html&quot;&gt;open modal box1&lt;/a&gt;&lt;/li&gt;
&lt;!-- modal2.html will be open in modal box. --&gt;
&lt;li&gt;&lt;a href=&quot;modal2.html&quot;&gt;open modal box2&lt;/a&gt;&lt;/li&gt;
&lt;!-- modal3.html will be open in modal box. --&gt;
&lt;li&gt;&lt;a href=&quot;modal3.html&quot;&gt;open modal box3 (very long)&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

## CSS example
<pre><code>/* class for container of modal content */
.modal_container {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin-left: -240px;
    width: 480px;
    min-height: 100%;
    background-color: #fff;
}
/* class for overlay of window */
.modal_overlay {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(bg_overlay.png) repeat 0 0;
} </code></pre>
