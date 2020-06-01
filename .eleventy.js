let path = require('./html/_data/path');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("js/");
	eleventyConfig.setBrowserSyncConfig({
    files: "./staging" + path.site + "/**/css/**/*"
  });
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