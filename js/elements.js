var elementos=[
	{
		"tag":"A",
		"HTMLContent":"<a>link</a>",
		"presentationInfo":	{
			"Label":"link",
			"img":"/img/paleta/link.png"
		},
		"category":"Basicos",
		"helper":{
			"content":"<p><textarea rows=\"4\" cols=\"40\" placeholder=\"Escriba aqui el contenido de su link\"></textarea></p>\
					  <p><textarea rows=\"1\" cols=\"40\" placeholder=\"Escriba aqui la direccion del link\"></textarea></p>",
			"managment":function(e){helperLink(e)},
		}
	},
	{
		"tag":"P",
		"HTMLContent":"<p>parrafo</p>",
		"presentationInfo":	{
			"Label":"parrafo",
			"img":"/img/paleta/parrafo.png"
		},
		"category":"Basicos",
		"helper":{
			"content":"<textarea rows=\"5\" cols=\"40\" placeholder=\"Escriba aqui el contenido de su parrafo\"></textarea>",
			"managment":function(e){helperParagraph(e)},
		}
	},
	{
		"tag":"DIV",
		"HTMLContent":"<div class=\"containerStart\"> </div>",
		"presentationInfo":	{
			"Label":"div",
			"img":"/img/paleta/div.png"
		},
		"category":"Basicos",
		"helper":{
			"content":"",//Un DIV no debe contener texto, solo es un separador bloque
			"managment":function(e){helperDiv(e)}
		}
	},
	// {
		// "tag":"IMG",
		// "HTMLContent":"<img alt=\"imagen\"/>",
		// "presentationInfo":	{
			// "Label":"imagen",
			// "img":"/img/paleta/imagen.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"<p><textarea rows=\"1\" cols=\"40\" placeholder=\"Aqui puede escribir un texto alternativo\"></textarea></p>\
					  // <p><button type=\"button\">Escoger imagen...</button></p>",
			// "managment":function(){}
		// }
	// },
	{
		"tag":"H",
		"HTMLContent":"<h1>Titulo o subtitulo</h1>",
		"presentationInfo":	{
			"Label":"titulo",
			"img":"/img/paleta/h1.png"
		},
		"category":"Basicos",
		"helper":{
			"content":"<p><textarea rows=\"1\" cols=\"40\" placeholder=\"Escriba aqui el contenido del titulo\"></textarea></p>\
			           <p><label>Tipo:</label><input type=\"number\" min=\"1\" max=\"6\" value=\"1\"/></p>",
			"managment":function(e){helperH(e)}
		}
	},
	// {
		// "HTMLContent":"<h2>heading2</h2>",
		// "presentationInfo":	{
			// "Label":"h2",
			// "img":"/img/paleta/h2.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	// {
		// "HTMLContent":"<h3>heading3</h3>",
		// "presentationInfo":	{
			// "Label":"h3",
			// "img":"/img/paleta/h3.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	// {
		// "HTMLContent":"<h4>heading4</h4>",
		// "presentationInfo":	{
			// "Label":"h4",
			// "img":"/img/paleta/h4.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	// {
		// "HTMLContent":"<h5>heading5</h5>",
		// "presentationInfo":	{
			// "Label":"h5",
			// "img":"/img/paleta/h5.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	// {
		// "HTMLContent":"<h6>heading6</h6>",
		// "presentationInfo":	{
			// "Label":"h6",
			// "img":"/img/paleta/h6.png"
		// },
		// "category":"Basicos",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	{
		"tag":"FORM",
		"HTMLContent":"<form class=\"containerStart\"> </form>",
		"presentationInfo":	{
			"Label":"formulario",
			"img":"/img/paleta/formulario.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<p><label>Action:</label><textarea rows=\"1\" cols=\"37\" placeholder=\"Donde se enviaran los datos\"></textarea></p>\
			           <p><label>Metodo:</label><select><option>Ninguno</option><option>get</option><option>post</option></select></p>",
			           "managment":function(e){helperForm(e)}
		}
	},
	{
		"tag":"LABEL",
		"HTMLContent":"<label>label</label>",
		"presentationInfo":	{
			"Label":"etiqueta",
			"img":"/img/paleta/label.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<textarea rows=\"1\" cols=\"35\" placeholder=\"Escriba aqui el contenido de la etiqueta\"></textarea>",
			"managment":function(e){helperLabel(e)}
		}
	},
	{
		"tag":"INPUT TEXT",
		"HTMLContent":"<input type=\"text\" placeholder=\"texto\" disabled/>",
		"presentationInfo":	{
			"Label":"texto",
			"img":"/img/paleta/text.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<p><textarea rows=\"1\" cols=\"35\" placeholder=\"Aqui puede poner un valor inicial\"></textarea></p>\
					  <p><textarea rows=\"1\" cols=\"35\" placeholder=\"Aqui puede poner un mensaje\"></textarea></p>",
			"managment":function(e){helperText(e)}
		}
	},
	{
		"tag":"INPUT PASSWORD",
		"HTMLContent":"<input type=\"password\" placeholder=\"password\" disabled/>",
		"presentationInfo":	{
			"Label":"password",
			"img":"/img/paleta/password.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<textarea rows=\"1\" cols=\"35\" placeholder=\"Aqui puede poner un mensaje\"></textarea>",
			"managment":function(e){helperPsswd(e)}
		}
	},
	{
		"tag":"INPUT BUTTON",
		"HTMLContent":"<input type=\"button\" value=\"boton\" disabled/>",
		"presentationInfo":	{
			"Label":"boton",
			"img":"/img/paleta/boton.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<textarea rows=\"1\" cols=\"35\" placeholder=\"Escriba aqui el contenido del boton\"></textarea>",
			"managment":function(e){helperButton(e)}
		}
	},
	{
		"tag":"INPUT RESET",
		"HTMLContent":"<input type=\"reset\" value=\"reset\" disabled/>",
		"presentationInfo":	{
			"Label":"reset",
			"img":"/img/paleta/reset.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<textarea rows=\"1\" cols=\"35\" placeholder=\"Escriba aqui el contenido del reset\"></textarea>",
			"managment":function(e){helperButton(e)}
		}
	},
	{
		"tag":"INPUT SUBMIT",
		"HTMLContent":"<input type=\"submit\" value=\"submit\" disabled/>",
		"presentationInfo":	{
			"Label":"submit",
			"img":"/img/paleta/submit.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<textarea rows=\"1\" cols=\"35\" placeholder=\"Escriba aqui el contenido del submit\"></textarea>",
			"managment":function(e){helperButton(e)}
		}
	},
	// {
		// "HTMLContent":"<fieldset><legend>fieldset</legend></fieldset>",
		// "presentationInfo":	{
			// "Label":"fieldset",
			// "img":"/img/paleta/fieldset.png"
		// },
		// "category":"Formularios",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	// {
		// "HTMLContent":"<input type=\"radio\"/>",
		// "presentationInfo":	{
			// "Label":"radiobutton",
			// "img":"/img/paleta/radio.png"
		// },
		// "category":"Formularios",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	{
		"tag":"INPUT CHECKBOX",
		"HTMLContent":"<input type=\"checkbox\"/>",
		"presentationInfo":	{
			"Label":"checkbox",
			"img":"/img/paleta/checkbox.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<p><label>Estado por defecto:</label><input type=\"checkbox\"/></p>",
			"managment":function(e){helperSwitch(e)}
		}
	},
	// {
		// "HTMLContent":"<input type=\"file\"/>",
		// "presentationInfo":	{
			// "Label":"file",
			// "img":"/img/paleta/file.png"
		// },
		// "category":"Formularios",
		// "helper":{
			// "content":"",
			// "managment":function(){}
		// }
	// },
	{
		"tag":"INPUT TIME",
		"HTMLContent":"<input type=\"time\" disabled/>",
		"presentationInfo":	{
			"Label":"hora",
			"img":"/img/paleta/time.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<label>Valor:</label><input type=\"time\"/>",
			"managment":function(e){helperGenericInput(e)}
		}
	},
	{
		"tag":"INPUT DATE",
		"HTMLContent":"<input type=\"date\" disabled/>",
		"presentationInfo":	{
			"Label":"fecha",
			"img":"/img/paleta/date.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<label>Valor:</label><input type=\"date\"/>",
			"managment":function(e){helperGenericInput(e)}
		}
	},
	{
		"tag":"INPUT COLOR",
		"HTMLContent":"<input type=\"color\" disabled/>",
		"presentationInfo":	{
			"Label":"color picker",
			"img":"/img/paleta/color.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<label>Valor:</label><input type=\"color\"/>",
			"managment":function(e){helperGenericInput(e)}
		}
	},
	{
		"tag":"INPUT RANGE",
		"HTMLContent":"<input type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"50\" disabled/>",
		"presentationInfo":	{
			"Label":"trackbar",
			"img":"/img/paleta/range.png"
		},
		"category":"Formularios",
		"helper":{
			"content":"<p><label>Valor:</label><input type=\"number\" value=\"50\"/></p>\
					   <p><label>Minimo:</label><input type=\"number\" value=\"0\"/></p>\
			           <p><label>Maximo:</label><input type=\"number\" value=\"100\"/></p>\
			           <p><label>Paso:</label><input type=\"number\" value=\"1\"/></p>",
			"managment":function(e){helperRange(e)}
		}
	},
	{
		"tag":"LOGIN",
		"HTMLContent":"\
		<section class=\"container\">\
			<div class=\"login\">\
			  <h2>Login</h2>\
			  <form method=\"post\" action=\"\">\
				<p><input type=\"text\" name=\"login\" placeholder=\"Username\" disabled/></p>\
				<p><input type=\"password\" name=\"password\" placeholder=\"Password\" disabled/></p>\
				<p class=\"remember_me\">\
				  <label>\
					<input type=\"checkbox\" name=\"remember_me\" id=\"remember_me \" disabled/>\
					No cerrar sesion\
				  </label>\
				</p>\
				<p class=\"submit\"><input type=\"submit\" name=\"submit\" value=\"Login\" disabled/yyy></p>\
			  </form>\
			  <div class=\"login-help\">\
				  <p>Perdio su password? <a href=\"index.html\">Haga click aqui!</a></p>\
				</div>\
			</div>\
		  </section>",
		"presentationInfo":	{
			"Label":"login",
			"img":"/img/paleta/login.png"
		},
		"category":"Prefabricados",
		"helper":{
			"content":"",
			"managment":function(){}
		}
	},
];

// __________
// compuestos
// ----------
// footer
// header
// login* compuesto
// menu lateral
// menu superior
// articulo       es solo un contenedor sin mas quiza no necesite imagen
// details        este es raro, funciona como un menu desplegable pero no esta hecho para eso exactamente, titulo con summary
// ____________

var categorias=["Basicos","Formularios","Prefabricados"];

function elementoPorLabel(label){
	var ret=null;
	[].forEach.call(elementos,function(obj){
		if(obj.presentationInfo.Label==label){
			ret=obj;
		}
	});
	return ret;
}

function elementoPorTag(element){
	var ret=null;
	var tag=element.tagName;
	if(element.classList.contains("divInput")) tag=element.firstChild.tagName;
	if(tag=="INPUT") tag+=" "+element.firstChild.type.toUpperCase();
	if(tag.length==2&&tag.substr(0,1)=="H") tag="H";
	[].forEach.call(elementos,function(obj){
		if(obj.tag==tag){
			ret=obj;
		}
	});
	return ret;
}