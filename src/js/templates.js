module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["src/templates/year.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"cyrsd-container\">\n	<div class=\"cyrsd-header\">\n		<h2>Interactive: 100 years of drought</h2>\n		<h3>Blah...</h3>\n	</div>\n\n	<div class=\"cyrsd-trigger\">\n		<div class=\"cyrsd-key\">\n			<h4>Rainfall</h4>\n			<ol>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Highest on record</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Very much above average</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Above average</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Average</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Below average</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Very much below average</li>\n				<li><div class=\"cyrsd-key-color-highest\"></div> Lowest on record</li>\n			</ol>\n		</div>\n\n		<div class=\"cyrsd-scrubber\">\n			<div class=\"cyrsd-handle\"></div>\n			<div class=\"cyrsd-yrs\"></div>\n			<div class=\"cyrsd-scale\"></div>\n		</div>\n\n\n	</div>\n\n	<p class=\"cyrsd-credit\">Source: BOM</p>\n</div>";
  });

return this["JST"];

};