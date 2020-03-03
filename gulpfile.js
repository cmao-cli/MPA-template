const spawn = require('child_process').spawn,
  gulp = require('gulp'),
  requireAll = require('require-all'),
  runSequence = require('run-sequence').use(gulp),
  webuiGulp = require('@mlz/webui-gulp')
    .use(gulp)
    .loadTasks();

requireAll({
  dirname: __dirname + '/gulp',
  filter: /(.*)\.js$/,
  recursive: true
});