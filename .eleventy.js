let path = require('./html/_data/path');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("js/");
	eleventyConfig.addWatchTarget("./sass/");
  return {
    dir: {
			input: "html/",
			output: "staging" + path.site,
			includes: "_includes",
			layouts: "_layouts"
		},
		passthroughFileCopy: true,
		pathPrefix: path.site
  };
};