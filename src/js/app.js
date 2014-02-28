var fs, domready, insertcss, template;

// Requirements
fs = require('fs');
domready = require('domready');
insertcss = require('./insertcss');
template = require('../templates/container.hbs');

var y, min, max, width, $container, lastXY;

min = 1900;
max = 2013;

// Get the required CSS
var css = fs.readFileSync(__dirname + '/../tmp/app.css'); 

function toggleText($el) {
	var args = Array.prototype.slice.call(arguments, 1);
	$el.text(($el.text() === args[0]) ? args[1] : args[0]); 
}

// Gets a collection of annotations for each year from a table.
function getAnnotations($el) {
	var annotations, years;
	annotations = {};

	$el.find('tr').each(function(){
		var $this, start, end, y, text;
		$this = $(this);
		years = $this.text().match(/[0-9]{4}/g);
		if (years && years.length > 1) {
			start = parseInt(years[0], 10);
			end = parseInt(years[1], 10);
		} else if (years && years.length === 1) {
			start = end = parseInt(years[0], 10);
		}
		
		if (start && end) {
			for (y = start; y<=end; y++) {
				annotations[y] = annotations[y] || {
					drought: [],
					flood: []
				};

				text = $this.find('td,th').eq(1).text();

				if (text.match(/drought|dry/i)) {
					annotations[y].drought.push({
						title: $this.find('td,th').eq(0).text(),
						caption: text
					});
				}

				if (text.match(/flood/i)) {
					annotations[y].flood.push({
						title: $this.find('td,th').eq(0).text(),
						caption: text
					});
				}
			}
		}
	});
	return annotations;
}

function init() {
	var width, 
		$container, 
		$layoutSwitch, 
		$scrubber, 
		$key,
		annotations,
		years, 
		c, 
		$tables,
		$trigger,
		$handle;

	$tables = $('div.article.section table, article table');
	
	$('article>figure.type-photo').hide();

	annotations = getAnnotations($tables);
	
	years = {};
	for (y=min; y<=max; y++) {
		years[y] = {
			year: y,
			min: (y === min),
			max: (y === max),
			fifty: (y%50 === 0),
			ten: (y%10 === 0),
			position: 100/(max-min+1)*(y-min)
		};
		if (typeof annotations[y] !== 'undefined'){
			if (typeof annotations[y].flood !== 'undefined') {
				years[y].flood = annotations[y].flood;
			}
			if (typeof annotations[y].drought !== 'undefined') {
				years[y].drought = annotations[y].drought;
			}
		} 
	}
	
	var markup = template({
		years: years,
		fraction: 100/(max-min)
	}); 
	
	$container = $(markup);
	$container.find('.cyrsd-slide').first().addClass('curr');
	$trigger = $container.find('.cyrsd-trigger');

	$container.insertAfter($('#cyrsd-script'));
	$tables.remove();

	$layoutSwitch = $('.cyrsd-header button').on('click', function(){
		$('.cyrsd-header button').removeClass('active');
		$(this).addClass('active');
		if ($(this).hasClass('small-multiples')) {
			$('.cyrsd-container').addClass('small-multiples');
		} else {
			$('.cyrsd-container').removeClass('small-multiples');
		}
		return false;
	});

	width = $trigger.innerWidth();
	$(window).on('resize', function(){
		width = $trigger.innerWidth();
	});
	
	$handle = $('.cyrsd-handle');

	lastXY = {x:0,y:0};

	// Handle mouse events
	function mousemove(e) {
		handle(e.pageX);
		return false;
	}

	// Handle touch events
	function touchmove(e) {

		var x, y, dX, dY;
		x = e.originalEvent.touches[0].pageX;
		y = e.originalEvent.touches[0].pageY;

		dX = (Math.abs(lastXY.x-x));
		dY = (Math.abs(lastXY.y-y));

		if ( dX > dY ) {
			e.preventDefault();
			e.originalEvent.preventDefault();
			handle(x);
		}
		lastXY = {x:x,y:y};
	}

	function handle(x) {
		x = x - $trigger.offset().left + 0.5;

		if (x < 0 || x > width-0.5) {
			return;
		}

		$handle.css({
			left: x
		});
		$trigger
			.find('.cyrsd-slide')
				.removeClass('curr')
			.eq(posToSlide(x))
				.addClass('curr');
	}
	

	function posToSlide(x) {
		return Math.floor(x/(width/(max-min+1)));
	}

	$trigger.on('touchstart touchmove', touchmove);
	$trigger.on('mousemove', mousemove);

}

insertcss(css);
domready(init);
