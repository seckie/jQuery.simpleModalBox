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
        bodySelector: '.body',
		innerLink: $('a.innerLink')
    });
});</code></pre>

## HTML example
<pre><code>&lt;ul class=&quot;body&quot;&gt;
&lt;li&gt;&lt;a href=&quot;modal1.html&quot;&gt;open modal box1&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href=&quot;modal2.html&quot;&gt;open modal box2&lt;/a&gt;&lt;/li&gt;
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


## Options
<table border="1">
<colgroup span="1" class="colh">
<colgroup span="1" class="colh">
<colgroup span="1" class="cold">
<thead>
<tr>
<th>option name</th>
<th>default value</th>
<th>note</th>
</tr>
</thead>
<tbody>
<tr>
<td>containerClassName</td>
<td>&quot;modal_container&quot;</td>
<td>Class name of modal contents container div element.</td>
</tr>
<tr>
<td>overlayClassName</td>
<td>&quot;modal_overlay&quot;</td>
<td>Class name of modal overlay div element.</td>
</tr>
<tr>
<td>closeButtonSelector</td>
<td>&quot;a.close&quot;</td>
<td>Selector string of elemment to close modal window. You can close modal to click this element.</td>
</tr>
<tr>
<td>bodySelector</td>
<td>document.body</td>
<td>Selector string of basic contents wrapper element. Modal window height will compute based on this element.</td>
</tr>
<tr>
<td>innerLinkSelector</td>
<td>null</td>
<td>Selector string of element to load other page inside existing modal window. This has to be a selector of &quot;a&quot; element.</td>
</tr>
<tr>
<td>width</td>
<td>null</td>
<td>Integer of modal window width. You can force modal window width.</td>
</tr>
</tbody>
</table>
