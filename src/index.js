'use strict';

var proj = require('./proj');
var mod = require('./mod');
var util = require('./util');
var pkg = require('../package.json');

module.exports = {
    command: 'init <type>',
    description: pkg.description,
    options: [
        [ '-t, --template <uri>', 'template zip url' ],
        [ '    --type <type>', 'shortcut of template option' ],
        [ '-f, --force', 'force to fetch new template' ],
        [ '-c, --cwd', 'generate module at cwd' ]
    ],
    action: function(type, command) {

        // parse argvs
        var template = util.getAlias(command.template || command.type || type);
        var force = command.force;
        var alias = command.as;
        var cwd = command.cwd;
      
        // template should be an url or a local dir
        if (!/^https?:\/\//.test(template) && !util.existsDirectory(template)) {
          console.error('Can not load template: ' + template);
          return;
        }
      
        // generate a project if type is proj or alias to an url or is a local dir
        if ((type !== 'mod' && type !== 'page') && (type === 'proj' || /^https?:\/\//.test(util.getAlias(type)) || util.existsDirectory(type))) {
          proj(template, force);
        } else {
          mod(type, template, force, cwd);
        }
    
        // // save alias
        // if (alias && template && alias !== template) {
        //   util.setAlias(alias, template);
        // }
    }
};