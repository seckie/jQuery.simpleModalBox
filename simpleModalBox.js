/**
 * $.simpleModalBox
 * using jQuery JavaScript Framework
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    Release: 1.0
 * @update     2011-07-18 22:12:30
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
		containerClassName: 'modal_container',
		overlayClassName: 'modal_overlay'
	},

	_create: function () {
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
		},this));
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
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var $container = this.container;
		$container.load(url, function() {
			$container.show();
		});
		if (this.isIE7) {
			this.overlay.width(winWidth).height(winHeight).show();
		} else {
			this.overlay.width(winWidth).height(winHeight).fadeIn();
		}
	},

	_closeModal: function () {
		this.container.empty().hide();
		if (this.isIE7) {
			this.overlay.hide();
		} else {
			this.overlay.fadeOut();
		}
	}
};

})(jQuery);
