
/**
 * Exports the current diagram in .SVG format. It works in Chrome.
 * Firefox used to work, but now is displaying a token error
 */
function putImage(){
	var data = "data:image/svg+xml," +
			   "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>" +
				 "<foreignObject width='100%' height='100%'>" +
				   "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:40px'>" +
					 
					 document.getElementById("canvas_container").innerHTML +
				   
				   "</div>" +
				 "</foreignObject>" +
			   "</svg>";
	
	//First, I am going to create the image
	var img = document.getElementById("export_img");
	img.src = data;
	var src = document.getElementById("new_img");
	src.appendChild(img);
	
	//Now, I am going to put the image into a canvas and download it later
	var exportcanvas = document.getElementById("export_canvas");
	var ctx = exportcanvas.getContext("2d");
	var exportimage = document.getElementById("export_img");
	ctx.drawImage(exportimage,10,10);
	
	//Hiding tags because after select 'Save as image' button it must download the file
	img.style.display = 'none';
	exportcanvas.style.display = 'none';
	
	//Generating a new file to download the image
	window.location.href = img.src.replace('image/png', 'image/octet-stream');
}
