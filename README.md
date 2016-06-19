# dbgraph
Database diagrams, using JSON input

This an old solution I developed a couple of years ago and I want to share it. It was my first JS approach to solve a real problem in a big application. It is simple: Generate database diagrams, with a commonly used input, with ease of integration.

What do you need?
-----------------
Just a text editor and a Web browser

Input example
-------------
```javascript
[
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
]
```

What was used?
-------------
 - Raphaël JS 2.1.2 - JavaScript Vector Library: Drawing of tables and relationships

    http://dmitrybaranovskiy.github.io/raphael/
 - Raphaël JSON: To export generated diagrams as a JSON

    https://github.com/AliasIO/Raphael.JSON
 - Scalable Vector Graphics (SVG): To export generated diagrams into images

    https://www.w3.org/2000/svg
