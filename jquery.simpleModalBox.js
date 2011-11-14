/**
 * $.simpleModalBox
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    2.1
 * @link       https://github.com/seckie/jQuery.simpleModalBox
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
		bodySelector: document.body,
		closeCallback: function () {}
	},

	_create: function () {
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
		this.element.bind('click', $.proxy(function (e) {
			this._openModal(url);
			$(document).bind('keydown.smb', $.proxy(this._keyEventHandler, this));
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

	_bindContentEvents: function () {
		var self = this;
		// close button
		$(this.closeButtonSelector).bind('click', function (e) {
			self._closeModal();
			$(document).unbind('keydown.smb');
			e.preventDefault();
		});
		// overlay
		this.overlay.unbind('click').bind('click', function (e) {
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
			this._bindContentEvents();
		}, this));
	},

	_closeModal: function () {
		this.inner.empty();
		this.container.hide();
		$(window).scrollTop(this.initialScrollTop);
		if (this.isIE7) {
			this.overlay.hide();
			this.closeCallback();
		} else {
			this.overlay.fadeOut($.proxy(function() {
				this.closeCallback();
			}, this));
		}
	},

	_initContainer: function () {
		var winHeight = $(window).height(),
			scrollTop = $(window).scrollTop();
		if (winHeight < scrollTop
				&& this.body.outerHeight() < scrollTop) {
			// prevent too much increase of height
		} else {
			this.initialScrollTop = scrollTop;
		}

		var posTop = (this.container.outerHeight() < winHeight) ?
			this.initialScrollTop + Math.floor((winHeight - this.container.outerHeight()) / 2) :
			this.initialScrollTop;

		this.container.css({
			'top': posTop
		}).show();
		this.inner.css({
			'visibility': 'hidden'
		});
	},

	_showContainer: function () {
		this.inner.css({
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
		this.overlay.width(this._getOverlayWidth())
			.height(this._getOverlayHeight());
	},

	_getOverlayWidth: function () {
		var winWidth = $(window).width(),
			bodyWidth = this.body.outerWidth(),
			contentWidth = this.container.outerWidth();
		return this._util.getMax([winWidth, bodyWidth, contentWidth]);
	},

	_getOverlayHeight: function () {
		var winHeight = $(window).height(),
			bodyHeight = this.body.outerHeight(),
			contentHeight = this.container.outerHeight() + $(window).scrollTop();
		return this._util.getMax([winHeight, bodyHeight, contentHeight]);
	},

	_openInside: function (url) {
		var cacheCtrl = this.cache ? '' : '?d=' + (new Date()).getTime();
		this.inner.load(url + cacheCtrl, $.proxy(function() {
			// for fadeIn effect
			this.container.height(this.container.height());
			this.inner.hide();

			this._adjustOverlaySize();
			this._initContainer();
			$(window).scrollTop(this.initialScrollTop);
			this._showContainer();
			this._bindContentEvents();

			// fadeIn effect
			if (this.isIE7) {
				this.inner.show();
			} else {
				this.inner.fadeIn();
			}
			this.container.css('height', '');
		}, this));
	},

	/**
	 * utility functions
	 */
	_util: {
		getMax: function (numArray) {
			var max = 0;
			for (var i=0,l=numArray.length; i<l ; i++) {
				max = Math.max(max, numArray[i]);
			}
			return max;
		}
	}
};

})(jQuery);
