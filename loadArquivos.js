var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        processXml(this);
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/Valgueiro/SiteMonitoria/master/arquivos.xml", true);
xhttp.send();

var original = $('#accordion').position().top;


function addAcordion(name, sub){
	var txt = "";
	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#accordion" href="#' + name + '">';
    txt += '<h4 class="panel-title">'+ name +'</h4> </div>';
	txt += '<div id="' + name + '" class="panel-collapse collapse">';
    txt += '<div class="panel-body">';
    if(sub){
    	txt += '<div class="panel-group container" id="sub' + name + '">';
   		txt += '<div class="panel panel-transparent">';
    }
    return txt;
}

function processXml(req){
	var xml = req.responseText, xmldoc = $.parseXML(xml), $xml = $(xmldoc);
	var txt = '';
	txt += '<div class="panel panel-transparent">';
	txt += addAcordion("Mini-Provas", true);
	$xml.find("mini-provas").find("semestre").each(function(){
	    var name =  $(this).attr('id'), id = "mini-provas" +  name.replace(".", "-");
	    
    	txt += '<div class="panel-heading opcaoArquivos " data-toggle="collapse" data-parent="#subMini-Provas" href="#' + id + '">';
		txt += '<h6 class="panel-title">' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			var link = $(this).find('caminho').text();
			txt += '<li class="list-group-item justify-content-between> <a onclick="window.open(\'' + link + '\')">' + $(this).find('nome').text() + '</a></li>';
		});
		txt += '</ul></div></div>'
	});
	txt += '</div></div></div></div>';

	txt += addAcordion("Provas", true);
	$xml.find("provas").find("semestre").each(function(){
		var name =  $(this).attr('id'), id = "provas" + name.replace(".", "-");
	    
    	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#subProvas" href="#' + id + '">';
		txt += '<h6 class="panel-title">' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			txt += '<li class="list-group-item justify-content-between">' + $(this).find('nome').text() + '</li>';
		});
		txt += '</ul></div></div>';
	});
	txt += '</div></div></div></div>';

	txt += addAcordion("Slides", false);
	$xml.find("slides").each(function(){
	   txt += '<ul class="list-group">';

		$(this).find('arquivo').each(function(){
			txt += '<li class="list-group-item justify-content-between">' + $(this).find('nome').text() + '</li>';
		});
		txt += '</ul></div></div>'; 
	});
	txt += '</div></div>';
	txt += '</ div>';
	console.log(txt);
	document.getElementById("accordion").innerHTML = txt;
}