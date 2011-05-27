describe('Career Data', function () {
    it ('should have content and quadrants', function () {
        var cData = careerData({ }, [ ]);

        expect(cData.content).toEqual([ ]);
        expect(cData.quadrants).toEqual([ ]);
    });

    it ('should have the data and its quadrants', function () {
        var rawData = {
            'Name 1': {
                'Item 1': 1
            },
            'Name 2': {
                'Item 2': 1
            },
            'Name 3': {
                'Item 3': 1
            },
            'Name 4': {
                'Item 4': 1
            }
        };
        var quadrantColors = [ 'Color 1', 'Color 2', 'Color 3', 'Color 4' ];

        var cData = careerData(rawData, quadrantColors).createData();

        expect(cData.content[0].name).toBe('Item 1');
        expect(cData.content[0].color).toBe('Color 1');
        expect(cData.quadrants[0].name).toBe('Name 1');
    });

    it ('items should not have the symbols for definition of movements', function () {
        var rawData = { 
            'Name 1': {
                '*Item 1': 2,
                '-Item 2': 1,
                '&Item 3': 1
            }
        };
        var quadrantColors = [ '', '', '', '' ];

        var cData = careerData(rawData, quadrantColors).createData();

        expect(cData.content[0].name).toBe('Item 1');
        expect(cData.content[1].name).toBe('Item 2');
        expect(cData.content[2].name).toBe('Item 3');
    });

    it ('should have the movement determined by the symbol prefix from the item', function () {
        var rawData = { 
            'Name 1': {
                'Item 1': 2,
                '*Item 2': 2,
                '-Item 3': 1,
                '&Item 4': 1
            }
        };
        var quadrantColors = [ '', '', '', '' ];

        var cData = careerData(rawData, quadrantColors).createData();

        expect(cData.content[0].movement).toBe('circle');
        expect(cData.content[1].movement).toBe('triangle');
        expect(cData.content[2].movement).toBe('diamond');
        expect(cData.content[3].movement).toBe('cross');
    });

});
