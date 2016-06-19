var paper = null;

/**
 * Create a line/conection between two elements
 * @param {Number} relations_counter: Relations with other tables
 * @param {Number} inPosition: Table to draw
 * @param {array} obj1: Origin table
 * @param {array} obj2: Destiny table
 * @param {String} line: Line color
 * @param {String} bg: Table background
 * @return {JSON}: Relation data from Raphael
 */
Raphael.fn.connection = function (relations_counter, inPosition, obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
	var position = inPosition + 1;
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
		//Here is where lines are created
        p = [
		{x: bb1.x + (bb1.width / relations_counter) * (position / 2), y: bb1.y - 1},
		{x: bb1.x + (bb1.width / relations_counter) * (position / 2), y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + (bb1.height / relations_counter) * (position / 2)},
        {x: bb1.x + bb1.width + 1, y: bb1.y + (bb1.height / relations_counter) * (position / 2)},
        {x: bb2.x + (bb2.width / relations_counter) * (position / 2), y: bb2.y - 1},
        {x: bb2.x + (bb2.width / relations_counter) * (position / 2), y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + (bb2.height / relations_counter) * (position / 2)},
        {x: bb2.x + bb2.width + 1, y: bb2.y + (bb2.height / relations_counter) * (position / 2)}
        ],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "L", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill:"square", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

/**
 * Allows to move a table and changes its connections possitions
 * @param {array} obj1: Table in movement
 * @param {Number} relations_counter: Relations with other tables
 * @param {Number} position: Position of the line (first, second, third)
 */
Raphael.fn.DragConnection = function (obj1, relations_counter, position) {
	var line;
	var bg;
	if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
	relations_counter++;
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
		//Here is where lines are created
        p = [
		{x: bb1.x + (bb1.width / relations_counter) * ((position / 2) + 1), y: bb1.y - 1},
		{x: bb1.x + (bb1.width / relations_counter) * ((position / 2) + 1), y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + (bb1.height / relations_counter) * ((position / 2) + 1)},
        {x: bb1.x + bb1.width + 1, y: bb1.y + (bb1.height / relations_counter) * ((position / 2) + 1)},
        {x: bb2.x + (bb2.width / relations_counter) * ((position / 2) + 1), y: bb2.y - 1},
        {x: bb2.x + (bb2.width / relations_counter) * ((position / 2) + 1), y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + (bb2.height / relations_counter) * ((position / 2) + 1)},
        {x: bb2.x + bb2.width + 1, y: bb2.y + (bb2.height / relations_counter) * ((position / 2) + 1)}
		],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "L", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill:"square", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

/**
 * Initializes the table elements
 * @param {array} tables: List of tables to be drawed
 */
var TableListPresenter = function(tables) {

	var gotX = false;
	if(tables[0].x){
		gotX = true;
	}

    var dragger = function () {
            this.set.oBB = this.set.getBBox();
        },
        move = function (dx, dy) {
            var bb = this.set.getBBox();
            this.set.translate(this.set.oBB.x - bb.x + dx, this.set.oBB.y - bb.y + dy);
			
			// Here is where relations are made when a table is moved. They are drawn all together
			// Now I am going to validate the maximum number of relations to distribute the lines
			var relations_counter = 0;
			if(tables[0].relations){
				var relations = tables[0].relations;
				relations_counter = relations.length;
				for(var tables_counter = 0; tables_counter < tables.length; tables_counter++){
					current_relations = tables[tables_counter].relations;
					if(current_relations.length > relations_counter){
						relations_counter = current_relations.length;
					}
				}
			}
			
			if(relations_counter == 0){
				relations_counter = 1;
			}
			for (var i = connections.length; i--;) {
				paper.DragConnection(connections[i], relations_counter, i);
            }
            paper.safari();
        },
        up = function () {
            
        },
        connections = [];

    var sets = [];
	var settings;

	settings = {
		paper: {
			width: 500,
			height: 800,
			table: {
				gridColumns: 2,
				topOffset: 50,
				leftOffset: 50
			}
		},
		name: {
			rect: {
				width: 80,
				height: 20
			},
			text: {
				topOffset: 10,
				leftOffset: 5
			}            
		},
		column: {
			rect: {
				width: 80,
				height: 20
			},
			text: {
				topOffset: 10,
				leftOffset: 5
			}            
		}
	};

    var tableGrid = [];
    for (var i = settings.paper.table.gridColumns - 1; i >= 0; i--) {
        tableGrid.push(0);        
    }

    var currentGridColumn = 0;

    this.draw = function(element) {
		paper = new Raphael(
			element,
			settings.paper.height, 
			settings.paper.width
		);
        for(var tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            drawTable(tables[tableIndex]);
        }
		
		//Gets total relations number
		var total_relations = 0;
		if(tables[0].relations){
			var relations = tables[0].relations;
			total_relations = relations.length;
			for(var tables_counter = 0; tables_counter < tables.length; tables_counter++){
				current_relations = tables[tables_counter].relations;
				if(current_relations.length > total_relations){
					total_relations = current_relations.length;
				}
			}
		}
		
		if(total_relations == 0){
			total_relations = 1;
		}
			
		for(var sets_counter = 0; sets_counter < sets.length; sets_counter++){
			var relations = tables[sets_counter].relations;
			for(var relations_counter = 0; relations_counter < relations.length; relations_counter++){
                //Creates a new relation
				connections.push(paper.connection(total_relations, sets_counter, sets[sets_counter], sets[relations[relations_counter]], '#000'));
				//Draws the new relation
				for (var i = 0, ii = sets.length; i < ii; i++) {
					var color = Raphael.getColor();
					sets[i].attr({cursor: "move"});
					sets[i].drag(move, dragger, up);
				}
			}
		}
    }
	
	var leftTopPosition = 50;

    function drawTable(table) {
		var rectLeft;
		if(table.x){
			rectLeft = table.x;
		}else{
			rectLeft = leftTopPosition;
		}
        var set = paper.set();
		var rectTop;

		if(table.y){
			rectTop = table.y;
		}else{
			rectTop = leftTopPosition;
		}
        
        //Adds table name
		var name = table.name;
		var name_rect = paper.rect(
			rectLeft, 
			rectTop, 
			settings.name.rect.width, 
			settings.name.rect.height
		).attr({'fill': 'white'});
		var name_text = paper
			.text(
				rectLeft + settings.name.text.leftOffset, 
				rectTop + settings.name.text.topOffset, 
				name
			).attr({'text-anchor': 'start', 'font-weight': '900'});
		rectTop += settings.name.rect.height;
		set.push(name_rect);
		set.push(name_text);
		name_rect.set = set;
		name_text.set = set;
		
		//Adds table columns
        for (var i=0; i<table.columns.length;i++) {
			var column = table.columns[i];
            var rect = paper.rect(
                rectLeft, 
                rectTop, 
                settings.column.rect.width, 
                settings.column.rect.height
            ).attr({'fill': 'white'});
            var text = paper
                .text(
                    rectLeft + settings.column.text.leftOffset, 
                    rectTop + settings.column.text.topOffset, 
                    column
                ).attr({'text-anchor': 'start'});
            rectTop += settings.column.rect.height;
            set.push(rect);
            set.push(text);
            rect.set = set;
            text.set = set;
        }
        sets.push(set);
        updateTableGrid(rectTop);
		leftTopPosition = leftTopPosition + 50;
    }

    /**
     * Update the current column height in grid
     * and choose the shortest one for the next table
     */
    function updateTableGrid(rectTop) {
        tableGrid[currentGridColumn] 
            += rectTop + settings.paper.table.topOffset;
        var minColumnHeight = tableGrid[0];
        var shortestColumn = 0;
        for (var i = 1; i < tableGrid.length; i++) {
            if (tableGrid[i] < minColumnHeight) {
                shortestColumn = i;
                minColumnHeight = tableGrid[i];
            }
        };
        currentGridColumn = shortestColumn;
    }
	
};

/**
 * Creates the TableListPresenter to draw the tables
 */
window.onload = function() {  
    
    // First JSON with the tables data
    var tableListPresenter = new TableListPresenter([
        {
            name: '1. Person',
            columns: [
                'id',
                'name',
                'fk_id_company',
				'fk_id_degree'
            ],
			relations: [2]
        },
        {
            name: '2. Company',
            columns: [
                'id',
                'name',
                'type',
                'employees',
                'average_salary',
                'country',
                'net_income'
            ],
			relations: [0, 2, 3]
        },
        {
            name: '3. Degree',
            columns: [
                'id',
                'name',
                'department'
            ],
			relations: [3]
        },
		{
            name: '4. New',
            columns: [
                'id',
                'base',
                'multiplier'
            ],
			relations: []
        }
    ]);

    tableListPresenter.draw(document.getElementById('canvas_container'));
}

/**
 * Prints the current tables possitions in a JSON
 */
function saveState(){
	// Save
	var json = paper.toJSON();
    console.log('Paper:' + json);
}

/**
 * Restores a diagram from JSON input. The method uses tableListPresenter to load. It could be improved
 */
function restoreState(){

	//Clear current canvas
	var row = document.getElementById("row");
	row.removeChild(document.getElementById('canvas_container'));
	var element = document.createElement('div');
	element.id = 'canvas_container';
	var objBody = document.getElementById("row");
	objBody.appendChild(element);
	
	//Load
	var tableListPresenter = new TableListPresenter([
        {
            name: '1. Person',
            columns: [
                'id',
                'name',
                'fk_id_company',
				'fk_id_degree'
            ],
			relations: [2],
			x: 66,
			y: 171
        },
        {
            name: '2. Company',
            columns: [
                'id',
                'name',
                'type',
                'employees',
                'average_salary',
                'country',
                'net_income'
            ],
			relations: [0, 2, 3],
			x: 400,
			y: 81
        },
        {
            name: '3. Degree',
            columns: [
                'id',
                'name',
                'department'
            ],
			relations: [3],
			x: 239,
			y: 290
        },
		{
            name: '4. New',
            columns: [
                'id',
                'base',
                'multiplier'
            ],
			relations: [],
			x: 696,
			y: 143
        }
    ]);
	
	tableListPresenter.draw(document.getElementById('canvas_container'));
}
