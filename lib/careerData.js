function careerData(rawData, colors) {
    self = {
        content: [ ],
        quadrants: [ ]
    };

    var symbolMov = { 
        '*': 'triangle',
        '&': 'cross',
        '-': 'diamond'
    };

    var len = function(object) {
        var i = 0;
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                i++;
            }
        }
        return i;
    };
    
    var cleanName = function(name) {
        return name.replace(/[\*\-\&]/, '');
    };

    var defineMovement = function(name) {
        var movement = symbolMov[name[0]];
        return movement !== undefined ? movement : 'circle';
    };

    var addToContent = function(quadrant) {
        var i = 1;
        var quadrantIndex = self.quadrants.length + 1;
        for (var item in rawData[quadrant]) {
            self.content.push({
                name: cleanName(item),
                movement: defineMovement(item), 
                pc: {
                    r: (Math.abs(4 - rawData[quadrant][item]) * 100) + ((40 / len(rawData[quadrant]) * i)) + 40,
                    t: (quadrantIndex == 1 ? 90 : quadrantIndex == 2 ? 20 : quadrantIndex == 3 ? 200 : 280) + ((60 / len(rawData[quadrant]) * i))
                },
                color: colors[quadrantIndex-1]
            });
            i++;
        }
    };

    self.createData = function () {
        for (var quadrant in rawData) {
            var start = self.content.length;
            addToContent(quadrant);
            var end = self.content.length;

            self.quadrants.push({
                name: quadrant, 
                start: 
                start, 
                end: end
            });
        }

        return self;
    };

    return self;
};
