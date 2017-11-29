const PIC_LIMIT = 10;

var buttonList = ["cat", "dog", "fox", "rabbit", "hamster", "skunk", "bear"];
var currentData = [];//array of objects

function drawButtons(){

	$("#buttons").empty();

	for(var i = 0; i< buttonList.length; i++){
		let newButton = $("<button>");
		newButton.attr("data", i);
		newButton.addClass("btn_item");
		newButton.text(buttonList[i]);
		$("#buttons").append(newButton);
	}
}

function drawPictures(){

	$("#pictures").empty();
	
	for(var j = 0; j< currentData.length; j++){
		
		var obj = currentData[j];

		var divImage = $("<div>").addClass("img_object");
		divImage.html("<p>Rating: "+obj.rating+"</p>");
		
		var image = $("<img>").attr("src", obj.still);
		image.attr("id", obj.id);
		image.addClass("pic");
		
		divImage.append(image);

		$("#pictures").append(divImage);

	}
}

function togglePicture(){

	var id = $(this).attr("id");
	var state = currentData[id].state;
	if(state == 0){
		currentData[id].state = 1;
		$("#"+id).attr("src", currentData[id].moving);
	}
	else {
		currentData[id].state = 0;
		$("#"+id).attr("src", currentData[id].still);		
	}

}

function fillData(data){

	// console.log(data);
	currentData = [];
	
	for(var i = 0; i < data.data.length; i++){
		
		var image = {
			id     : i,
			rating : data.data[i].rating,
			still  : data.data[i].images.fixed_height_still.url,
			moving : data.data[i].images.fixed_height.url,
			state : 0
		}
		currentData.push(image);
	}

	drawPictures();
}
//===================

$(document).ready( function(){

    var type3 = "matrix";
    var queryURL3 = "https://www.omdbapi.com/?t=" + type3 + "&y=&plot=short&apikey=trilogy";

	console.log("start");
	drawButtons();

	$("#buttons").on("click", ".btn_item", function(){
		
		var btnId = $(this).attr("data");
		var item = buttonList[btnId];

	    var key = "1ROu3LRRg9uXQqWwBhobIJ3mouIRCdW8";
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+item+"&api_key="+key+"&limit="+PIC_LIMIT+"&rating=pg-13";

	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    })
	    .done(function(response) { fillData(response); })
	    .fail(function(){
	    	$("#pictures").empty();
	    	$("#pictures").text("Something went wrong....");
	    });

	});

	$("#add_button").on("click", function(){

        event.preventDefault();
        var text = $("#button_text").val().trim();
        if( text ) buttonList.push(text);
        $("#button_text").val("");
        drawButtons();
	});

	$("#pictures").on("click",".pic", togglePicture);

});
