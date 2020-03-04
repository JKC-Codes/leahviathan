let project = require('./html/_data/_project');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("css/");
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("js/");
  return {
    dir: {
			input: "html/",
			output: "staging" + project.name,
			includes: "_templates/"
		},
		passthroughFileCopy: true,
		pathPrefix: project.name
  };
};