var baseLines,baseLinesLength,i,selected=0,level=1;

//----------------------------------------------------------------------------------

function levelCount(){
    return level==1?"/24+":level==2?"/24":"/6";
}
$("#currentCount").text(selected+levelCount());

//--------------------------------------------------------------------------------------

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

//-------------------------------------------------------------------------------------------

$(document).ready(function() {
    $.ajax({
        url: "https://cn80zv9qg7.execute-api.ap-south-1.amazonaws.com/dev"
    }).then(function(data) {
        data.sort(dynamicSort("Quality"));
        baseLines=data;
        console.log(baseLines);
        baseLinesLength=baseLines.length;
        console.log(baseLinesLength);
        for (i = 0; i<baseLinesLength; i++) {
            $(".main").append('<div class="btn-group"><button type="button" class="Qual  btn " id="qual_'+i+'" onclick="labelfunc('+i+')">'+baseLines[i].Quality+'</button><button type="button" class="QualMeaning btn dropdown-toggle" id="qualmeaning_'+i+'" onclick="labelfuncmeaning('+i+')"></button></div>');
        }
    });
});

//------------------------------------------------------------------------------------------------------


function labelfunc(i){
    selected++;
    $("#currentCount").text(selected+levelCount());
}
