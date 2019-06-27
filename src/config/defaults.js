var defaults = {};

//table measurements
defaults.table = {
    minlength: 0,
    minbreadth: 0,
    maxlength: 5,
    maxbreadth: 5,
};

//commands permitted
defaults.commands = {
    actions: ["PLACE", "MOVE", "REPORT", "LEFT", "RIGHT"],
    directions: ['NORTH', 'SOUTH', 'EAST', 'WEST']
};

module.exports = defaults;