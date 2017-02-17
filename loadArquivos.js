var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        processXml(this);
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/luucasv/teste/master/dado.xml", true);
xhttp.send();

function processXml(req){
	var xml = req.responseText, xmldoc = $.parseXML(xml), $xml = $(xmldoc);
	var txt = '';
	txt += '<div class="panel panel-transparent">';
	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#accordion" href="#mini-provas">';
    txt += '<h4 class="panel-title"> Mini-Provas </h4> </div>';
	txt += '<div id="mini-provas" class="panel-collapse collapse">';
    txt += '<div class="panel-body">';
    txt += '<div class="panel-group container" id="sub">';
    txt += '<div class="panel panel-transparent">';
	$xml.find("mini-provas").find("semestre").each(function(){
	    var name =  $(this).attr('id'), id = name.replace(".", "-");
	    console.log(name + " " + id);
    	txt += '<div class="panel-heading opcaoArquivos" data-toggle="collapse" data-parent="#sub" href="#' + id + '">';
		txt += '<h6 class="panel-title">' + name + '</h6> </div>';

		txt += '<div id="' + id + '" class="panel-collapse collapse">';
   		txt += '<div class="panel-body">';
   		txt += '<ul class="list-group">';
		// console.log($(this).attr('id'));
		$(this).find('arquivo').each(function(){
			txt += '<li class="list-group-item justify-content-between">' + $(this).find('nome').text() + '</li>';
			// console.log($(this).find('nome').text());
// 			console.log($(this).find('caminho').text());
		});
		txt += '</ul></div></div>'
	});
	txt += '</div></div></div></div>';
// 	$xml.find("provas").find("semestre").each(function(){
// 		console.log($(this).attr('id'));
// 		$(this).find('arquivo').each(function(){
// 			console.log($(this).find('nome').text());
// 			console.log($(this).find('caminho').text());
// 		});
// 	});
// 	$xml.find("slides").find("semestre").each(function(){
// 		console.log($(this).attr('id'));
// 		$(this).find('arquivo').each(function(){
// 			console.log($(this).find('nome').text());
// 			console.log($(this).find('caminho').text());
// 		});
// 	});
	txt += '</ div>';
	console.log(txt);
	document.getElementById("accordion").innerHTML = txt;
}