module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img/");
	eleventyConfig.addPassthroughCopy("js/");
  return {
    dir: {
			input: "html/",
			output: "staging",
			includes: "_includes",
			layouts: "_layouts"
		},
		passthroughFileCopy: true
  };
};