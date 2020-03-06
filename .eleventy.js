let project = require('./html/_data/project');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("js/");
	eleventyConfig.addWatchTarget("./sass/");
  return {
    dir: {
			input: "html/",
			output: "staging" + project.name,
			includes: "_includes",
			layouts: "_layouts"
		},
		passthroughFileCopy: true,
		pathPrefix: project.name
  };
};