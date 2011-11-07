/**
 * $.simpleModalBox
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.1
 * @update     2011-08-05 17:09:23
 */

(function($) {

$.fn.simpleModalBox = function (options) {
	this.each(function (i, element) {
		options.element = $(element);
		$(element).data('simpleModalBox', new SimpleModalBox(options));
	});
};

function SimpleModalBox() {
	// extend default options
	$.extend(this, this.defaultOptions, arguments[0]);
	// initialize
	this._create();
}

SimpleModalBox.prototype = {
	defaultOptions: {
		element: {},
		width: null,
		containerClassName: 'modal_container',
		overlayClassName: 'modal_overlay',
		innerLink: null,
		closeBtn: $('a.close'),
		body: $(document.body)
	},

	_create: function () {
		var self = this;
		this.container = $('div.' + this.containerClassName);
		if (!this.container[0]) {
			this.container = $('<div/>', {
					'class': this.containerClassName
				}).hide().appendTo(document.body);
		}
		this.overlay = $('div.' + this.overlayClassName);
		if (!this.overlay[0]) {
			this.overlay = $('<div/>', {
					'class': this.overlayClassName
				}).hide().appendTo(document.body);
		}

		this.isIE7 = ($.browser.msie && $.browser.version < 8);
		var url = this.element.attr('href');

		this.element.click($.proxy(function (e) {
			this._openModal(url);
			$(document).bind('keydown', $.proxy(this._keyEventHandler, this));
			e.preventDefault();
		}, this));
		this.overlay.click($.proxy(function (e) {
			this._closeModal();
			$(document).unbind('keydown', $.proxy(this._keyEventHandler, this));
			e.preventDefault();
		}, this));
		this.closeBtn.live('click', $.proxy(function (e) {
			this._closeModal();
			$(document).unbind('keydown', $.proxy(this._keyEventHandler, this));
			e.preventDefault();
		}, this));

		// inner link
		if (this.innerLink) {
			this.innerLink.live('click', function (e) {
				var href = $(this).attr('href');
				if (!href) { return; }
				self._openInside(href);
				e.preventDefault();
			});
		}
	},
	
	// close modal with Esc key
	_keyEventHandler: function (e) {
		var key = e.keyCode || e.charCode;
		if (key == 27) {
			this._closeModal();
			$(document).unbind('keydown');
		}
	},

	_openModal: function (url) {
		if (this.width) {
			this.container.css({
				'width': this.width,
				'margin-left': Math.floor(this.width / 2) * -1
			});
		} else {
			this.container.css({
				'width': '',
				'margin-left': ''
			});
		}
		this.container.load(url, $.proxy(function() {
			this._initContainer();
			this._showOverlay();
			this._showContainer();
		}, this));
	},

	_closeModal: function () {
		this.container.empty().hide();
		$(window).scrollTop(this.initialScrollTop);
		if (this.isIE7) {
			this.overlay.hide();
		} else {
			this.overlay.fadeOut();
		}
	},

	_initContainer: function () {
		this.initialScrollTop = $(window).scrollTop();
		this.container.css({
			'top': this.initialScrollTop,
			'visibility': 'hidden'
		}).show();
	},

	_showContainer: function () {
		this.container.css({
			'visibility': 'visible'
		});
	},

	_showOverlay: function (overlayHeight) {
		var winWidth = $(window).width(),
			winHeight = $(window).height(),
			bodyHeight = this.body.outerHeight();

		var overlayHeight = this._getOverlayHeight();
		this.overlay.width(winWidth).height(overlayHeight);
		if (this.isIE7) {
			this.overlay.show();
		} else {
			this.overlay.fadeIn();
		}
	},

	_getOverlayHeight: function () {
		var winHeight = $(window).height(),
			bodyHeight = this.body.outerHeight(),
			contentHeight = this.container.outerHeight() + $(window).scrollTop();
		return getMax([winHeight, bodyHeight, contentHeight]);

		function getMax(numArray) {
			var max = 0;
			for (var i=0,l=numArray.length; i<l ; i++) {
				max = Math.max(max, numArray[i]);
			}
			return max;
		}
	},

	_openInside: function (url) {
		this.container.load(url, $.proxy(function() {
			this._initContainer();
			this._showContainer();
		}, this));
	}
};

})(jQuery);
