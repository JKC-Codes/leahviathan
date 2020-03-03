let project = require('./project');
let pathPrefix = project.name + "/"

module.exports = {
  css: pathPrefix + 'css',
  img: pathPrefix + 'img',
  js: pathPrefix + 'js',
  root: pathPrefix + ''
}