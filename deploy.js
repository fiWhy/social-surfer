const ghpages = require('gh-pages');

ghpages.publish('dist', {
    branch: 'master',
    repo: 'git@github.com:fiWhy/fiwhy.github.io.git'
}, function () {
    console.log('Published!');
});