var baseLines,baseLinesLength,i;
$(document).ready(function() {
    $.ajax({
        url: "https://cn80zv9qg7.execute-api.ap-south-1.amazonaws.com/dev"
    }).then(function(data) {
        console.log(data);
        baseLines=data;
        baseLinesLength=(baseLines.length-1);
        for (i = 0; i<baseLinesLength; i++) {
            $(".main").append("<button type='button' class='Qual' id='qual_"+i+"' onclick='labelfunc("+i+")'>"+baseLines[i].Quality+"</button>")
        }
    });
});