////////////////////////////////////////////////////////////////////////////////
// Root Adder Control
////////////////////////////////////////////////////////////////////////////////
/*global jQuery, alert */
var yalp = yalp || {};

yalp.controls = function (controls, $, services) {
	controls.rootadd = function () {
		var self = Object.create(controls.control());

		//////////////////////////////
		// Initialization

		// called when a directory or file is selected
		function onDirTyped() {
			var $input = $(this),
					$button = $input.siblings('button');
			if ($input.val().length) {
				$button.removeAttr('disabled');
			} else {
				$button.attr('disabled', 'disabled');
			}
		}
		
		// called on clicking the add button
		function onAdd() {
			var $button = $(this),
					$input = $button.siblings('input');
			$button.attr('disabled', 'disabled');
			services.addroot($input.val(), function () {
				controls.library.load();
				alert("Folder successfully added to library.");
				$input.val(null);
				$button.removeAttr('disabled');
			});
		}

		//////////////////////////////
		// Overrides

		self.init = function (elem) {
			elem
				.find('input')
					.change(onDirTyped)
					.keyup(onDirTyped)
				.end()
				.find('button')
					.click(onAdd)
				.end();
		};
		
		self.html = function () {
			return [
				'<div id="', self.id, '">',
				'<span>', "Add folder to library:", '</span>',
				'<input type="text">',
				'<button type="button" disabled="disabled">', "Add", '</button>',
				'</div>'
			].join('');
		};
		
		return self;
	}();
	
	return controls;
}(yalp.controls || {},
	jQuery,
	yalp.services);

