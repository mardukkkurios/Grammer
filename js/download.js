$(document).ready(function(){
 $("button.download").click(function(){//Al hacer click en el boton
  //configuracion de la ventana de guardado, el tipo lo designa como ventana de guardado, necesita el permiso filesystem:write;
  //suggestedName es elnombre que mostrara la ventana para el nombre del archivo
  //y accepts:extensions son las extensiones de los archivos que mostrara la ventana
  var config = {type: 'saveFile',suggestedName:'NuevoProyectoGrammer.zip',accepts:[{extensions:['zip']}]};
  //se le pasa la configuracion de la ventana y una funcion que se ejecuta cuando todo salga bien y se seleccione/cree un archivo
  //opcionalmente se puede pasar otra funcion que se ejecute cuando suceda un error
  chrome.fileSystem.chooseEntry(config, function(writableEntry) {//Esto muestra la ventanaGuardar como...
	//Al crearse o seleccionarse el archivo
	var zip= new JSZip();//creamos el .zip
	/******************************************************
	*****                                             *****
	*****                                             *****
	*****     Aqui deben generarse los archivos       *****
	*****    que se vayan a introducir en el zip      *****
	*****                                             *****
	*****                                             *****
	******************************************************/
	zip.file(writableEntry.name.replace('zip','txt'), "Probando la descarga de archivos junto con la libreria JSZIP\n");//agregando archivos
	//y el contenido de estos
    var blob = new Blob([zip.generate({type:"blob"})], {type: 'zip'});//ESto crea el Blob que se guardara en el sistema local
	//se le envia lainformacion q contendra el Blob, para eso se usa zip.generate y es imprescindible que se le indique type;blob
	//si no se le indica no funcionara; el segundo parametro es el tipo MIME del archivo y es opcional
    writeFileEntry(writableEntry, blob, function(e) {//mandamos a guardar los datos, el blob en el writObleEntry que representa
	//al archivo, la funcion ultima se llama cuando sucede algun error
   });
  });
 });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Proximamente esto estara documentado como se debe pero por ahora no tocar mas abajo de esta linea //////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////








function writeFileEntry(writableEntry, opt_blob, callback) {
  if (!writableEntry) {
    
    return;
  }

  writableEntry.createWriter(function(writer) {

    
    writer.onwriteend = callback;

    // If we have data, write it to the file. Otherwise, just use the file we
    // loaded.
    if (opt_blob) {
      writer.truncate(opt_blob.size);
      waitForIO(writer, function() {
        writer.seek(0);
        writer.write(opt_blob);
      });
    } 
    else {
      chosenEntry.file(function(file) {
        writer.truncate(file.fileSize);
        waitForIO(writer, function() {
          writer.seek(0);
          writer.write(file);
        });
      });
    }
  }, function(){});
}

function waitForIO(writer, callback) {
  // set a watchdog to avoid eventual locking:
  var start = Date.now();
  // wait for a few seconds
  var reentrant = function() {
    if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
      setTimeout(reentrant, 100);
      return;
    }
    if (writer.readyState===writer.WRITING) {
      console.error("Write operation taking too long, aborting!"+
        " (current writer readyState is "+writer.readyState+")");
      writer.abort();
    } 
    else {
      callback();
    }
  };
  setTimeout(reentrant, 100);
}