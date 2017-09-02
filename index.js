
const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
const csscolors = require('css-color-names');


function convertColors(node) {
  if (node.type === 'word' && csscolors.hasOwnProperty(node.value)) {
    node.value = csscolors[node.value].toUpperCase();
  }
}

module.exports = postcss.plugin('postcss-colornames-to-hex', (options) => (root) => {
  root.walkDecls(decl => {
    decl.value = valueParser(decl.value).walk(convertColors).toString();
  });
});
