var through = require('through2');
module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var content = file.contents.toString();
        if (file.relative.match(options.regex)){

            var firstIndex=content.indexOf(options.ruler);
            var wrapper=0;
            var matched=false;
            var lastIndex=-1;
            for(var i=firstIndex+1;i<content.length;i++){
                lastIndex=i;
                if (content[i]==='{'){
                    matched=true;
                    wrapper ++;
                } else if (content[i]==='}'){
                    wrapper --;
                }
                if (matched && wrapper===0){
                    break;
                }

            }

            content=content.substr(0, firstIndex) +(options.emptyFun ? options.ruler+" {}" :'')+ content.substr(lastIndex+1);

        }

        file.contents = Buffer.from(content, 'utf8');

        this.push(file);

        cb();
    });
};