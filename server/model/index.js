var mongoose = require("mongoose");
module.exports = {
    init : init,
    userModel : require("./user"),
    profileModel : require("./profile")
}
var config = require("../config");
function init(){
    return mongoose.connect(config.mongoUrl,{});
}

mongoose.connection.on('connected', function() {
    console.info('MongoDB event connected : ' + config.mongoUrl);
});

mongoose.connection.once('open', function() {
    if (config.isProduction) {
        console.debug('MongoDB connected');
    } else {
        console.debug('MongoDB connected [%s]', config.mongoUrl);
    }
})
mongoose.connection.on('disconnected', function() {
    logger.info('MongoDB event disconnected');
    if (config.isProduction) {
        console.warn('MongoDB event disconnected ');
    } else {
        consolewarn('MongoDB event disconnected : ' + config.mongoUrl);
    }
});
