/**
 * $.simpleModalBox
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    2.0
 * @update     2011-11-08 11:46:04
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
		cache: true,
		containerClassName: 'modal_container',
		overlayClassName: 'modal_overlay',
		innerLinkSelector: null,
		closeButtonSelector: 'a.close',
		bodySelector: document.body
	},

	_create: function () {
		var self = this;
		this.container = $('div.' + this.containerClassName);
		this.inner = $('div.' + this.containerClassName + '_inner');
		if (!this.container[0]) {
			this.container = $('<div/>', {
					'class': this.containerClassName
				}).hide().appendTo(document.body);
			this.inner = $('<div/>', {
					'class': this.containerClassName + '_inner'
				}).appendTo(this.container);
		}
		this.overlay = $('div.' + this.overlayClassName);
		if (!this.overlay[0]) {
			this.overlay = $('<div/>', {
					'class': this.overlayClassName
				}).hide().appendTo(document.body);
		}
		this.body = $(this.bodySelector);
		this.closeBtn = $(this.closeButtonSelector);

		this.isIE7 = ($.browser.msie && $.browser.version < 8);
		var url = this.element.attr('href');

		// bind event
		this.element.click($.proxy(function (e) {
			this._openModal(url);
			$(document).bind('keydown.smb', $.proxy(this._keyEventHandler, this));
			e.preventDefault();
		}, this));
		this.overlay.click($.proxy(function (e) {
			this._closeModal();
			$(document).unbind('keydown.smb');
			e.preventDefault();
		}, this));
	},
	
	// close modal with Esc key
	_keyEventHandler: function (e) {
		var key = e.keyCode || e.charCode;
		if (key == 27) {
			this._closeModal();
			$(document).unbind('keydown.smb');
		}
	},

	_setContentEvents: function () {
		var self = this;
		// close button
		$(this.closeButtonSelector).bind('click', function (e) {
			self._closeModal();
			$(document).unbind('keydown.smb');
			e.preventDefault();
		});
		// inner link
		if (this.innerLinkSelector) {
			$(this.innerLinkSelector).bind('click', function (e) {
				var href = $(this).attr('href');
				if (!href) { return; }
				self._openInside(href);
				e.preventDefault();
			});
		}
	},

	_openModal: function (url) {
		var cacheCtrl = this.cache ? '' : '?d=' + (new Date()).getTime();
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
		this.inner.load(url + cacheCtrl, $.proxy(function() {
			this._initContainer();
			this._showOverlay();
			this._showContainer();
			this._setContentEvents();
		}, this));
	},

	_closeModal: function () {
		this.inner.empty();
		this.container.hide();
		$(window).scrollTop(this.initialScrollTop);
		if (this.isIE7) {
			this.overlay.hide();
		} else {
			this.overlay.fadeOut();
		}
	},

	_initContainer: function () {
		var scrollTop = $(window).scrollTop();
		if ($(window).height() > scrollTop
				&& this.body.outerHeight() > scrollTop) {
			// prevent too much increase of height
			this.initialScrollTop = scrollTop;
		}

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

	_showOverlay: function () {
		this._adjustOverlaySize();
		if (this.isIE7) {
			this.overlay.show();
		} else {
			this.overlay.fadeIn();
		}
	},

	_adjustOverlaySize: function () {
		var winWidth = $(window).width(),
			winHeight = $(window).height(),
			bodyHeight = this.body.outerHeight();

		var overlayHeight = this._getOverlayHeight();
		this.overlay.width(winWidth).height(overlayHeight);
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
		var cacheCtrl = this.cache ? '' : '?d=' + (new Date()).getTime();
		this.inner.load(url + cacheCtrl, $.proxy(function() {
			// fadeIn effect
			this.container.height(this.container.height());
			this.inner.hide().fadeIn();
			this.container.css('height', '');

			this._adjustOverlaySize();
			this._initContainer();
			$(window).scrollTop(this.initialScrollTop);
			this._showContainer();
			this._setContentEvents();
		}, this));
	}
};

})(jQuery);
