var baseLines,baseLinesLength,i,selected=0,level=1;
var configuration = {
	branding: {"name" : "XYZ cmpany" , "title" : "slect you codes"},
	levels : 3,
	levelDetails: [{count:8 ,rule: "min"}, 
				   {count:8, rule: "exact"},
                   {count:6, rule: "exact"}]
}

//-------------------------------------------------------------------------------------------
//Calling API and creating all the baseLines buttons with values
$(document).ready(function() {
    $.ajax({
        url: "https://cn80zv9qg7.execute-api.ap-south-1.amazonaws.com/dev"
    }).then(function(data) {
        data.sort(dynamicSort("Quality"));
        baseLines=data;
        baseLinesLength=baseLines.length;
        for (i = 0; i<baseLinesLength; i++) {
            $(".main").append('<div class="btn-group"><button type="button" class="Qual  btn " id="qual_'+i+'" onclick="baseLine('+i+')">'+baseLines[i].Quality+'</button><button type="button" class="QualMeaning btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" id="qualmeaning_'+i+'"><span class="caret"></span></button><div class="dropdown-menu">'+baseLines[i].Meaning+'</div></div>');
            $("#currentCount").text(selected+levelCount());

        }
    });
});

//---------------------------------------------------------------------------------------

function submitInitial(){
    if( levelCheck()=="true")
    {
        rebootRemove();
        selected = 0 ;
        level++;
        $("#currentCount").text(selected+levelCount());
        for(i=0;i<baseLinesLength;i++)
        {
            if(baseLines[i].Status==1)
            {
                baseLines[i].Level++;
                baseLines[i].Status=0;
            }
        }
        if(configuration.levels>=level)
        rebootAdd();
        else
        sumbitOrdering();
 
    }
 }

//----------------------------------------------------------------------------------

function submitFinal(){
    document.getElementById("titleHead").textContent="Congratulations!!!, This is who you are";
    var x = document.getElementById("orderit");
    x.style.display = "none";
    var m = document.getElementById("FinalTable");
    m.style.display = "block";
    var n = document.getElementById("Submit_Final");
    n.style.display = "none";
    var idsInOrder = $("#sortable_quality").sortable("toArray");
    for(i=0;i<idsInOrder.length;i++)
    $("#addquality").append('<tr><th>'+baseLines[idsInOrder[i]].Quality+'</th><th>'+baseLines[idsInOrder[i]].Meaning+'</th></tr>');

}

//-----------------------------------------------------------------------------------

function baseLine(i){
    var property = document.getElementById('qual_'+i);
    if(configuration.levelDetails[level-1].rule=="exact" && baseLines[i].Status==0)
    {
        if(configuration.levelDetails[level-1].count==selected)
        return;
    }
    if(baseLines[i].Status==0)
    {   property.style.backgroundColor="#404040"
        baseLines[i].Status=1;
        selected++;
        $("#currentCount").text(selected+levelCount());
    }
    else if(baseLines[i].Status==1)
    {
        property.style.backgroundColor="#0000FF"
        baseLines[i].Status=0;
    selected--;
    $("#currentCount").text(selected+levelCount());
    }
}

//-----------------------------functions used within another functions-----------------------

function levelCount(){
    return level==1?"/24+":level==2?"/24":"/6";
}

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

//------------------------------------------------------------------------------------------------------

function rebootRemove(){
    var element;
    for(i = 0 ; i<baseLinesLength ; i++)
    {if(baseLines[i].Level==level)
   { element = document.getElementById('qual_'+i);    
    element.parentNode.removeChild(element);
    element = document.getElementById('qualmeaning_'+i);
    element.parentNode.removeChild(element);
    }
}

//---------------------------------------------------------------------------------------------

}
function rebootAdd(){
    for (i = 0; i<baseLinesLength; i++) {
        if(baseLines[i].Level==level)
        $(".main").append('<div class="btn-group"><button type="button" class="Qual  btn " id="qual_'+i+'" onclick="baseLine('+i+')">'+baseLines[i].Quality+'</button><button type="button" class="QualMeaning btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" id="qualmeaning_'+i+'"><span class="caret"></span></button><div class="dropdown-menu">'+baseLines[i].Meaning+'</div></div>');
    }
   

}

//------------------------------------------------------------------------------------------

function levelCheck()
{
    
    if(configuration.levelDetails[level-1].rule=="min")
    {if(configuration.levelDetails[level-1].count<=selected)
    return "true";
    }
     else if(configuration.levelDetails[level-1].rule=="exact")
    {if(configuration.levelDetails[level-1].count==selected)
    return "true";
    }
    else
    return "false";
    
}

//------------------------------------------------------------------------------------------

function sumbitOrdering(){
    document.getElementById("titleHead").textContent="Order your qualities ";
    var x = document.getElementById("Submit_Initial");
    x.style.display = "none";
    var n = document.getElementById("Submit_Final");
    n.style.display = "block";
    var m = document.getElementById("orderit");
    m.style.display = "block";
    var m = document.createElement("UL");
    for(i=0;i<baseLinesLength;i++)
    {
        if(baseLines[i].Level==level)
        {
            $("#sortable_quality").append('<li id="'+i+'">'+baseLines[i].Quality+'</li>');
        }
    }
}
$(function() {
    $( "#sortable_quality" ).sortable();
 });