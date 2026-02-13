$(document).ready(function() {
    // Obtener el elemento select
    var selectIdioma = $('#selectIdioma');
    var traduccionesGuardadas = localStorage.getItem('traducciones');
    var idiomaSeleccionado = localStorage.getItem('idiomaSeleccionado');

    // Obtener el elemento donde se mostrarán las traducciones
    var elementosTraducir = $('[data-translate]');

    //Si tengo cargado otro idioma
    if (idiomaSeleccionado == "en"){
        selectIdioma.val('en');
    } else {
        selectIdioma.val('es');
    }

    // Función para cargar las traducciones desde el almacenamiento local o desde el archivo JSON
    function cargarTraducciones(callback) {
        
        // Intentar cargar las traducciones desde el almacenamiento local
        if (traduccionesGuardadas && idiomaSeleccionado) {
           var traducciones = JSON.parse(traduccionesGuardadas);
            // Llamar al callback con las traducciones y el idioma seleccionado
            callback(traducciones, idiomaSeleccionado);


        } else {
            // Si no hay traducciones guardadas, cargarlas desde el archivo JSON
            $.getJSON('translations.json', function(traducciones) {
                // Guardar las traducciones en el almacenamiento local
                localStorage.setItem('traducciones', JSON.stringify(traducciones));
                // Llamar al callback con las traducciones
                callback(traducciones, 'es');
            });
        }
    }

    // Función para cambiar el idioma
    function cambiarIdioma(traducciones) {

        // Obtener el idioma seleccionado del select
        var idiomaSeleccionado = selectIdioma.val();
        
        // Guardar el idioma seleccionado en el almacenamiento local
        localStorage.setItem('idiomaSeleccionado', idiomaSeleccionado);
        
        // Obtener las traducciones correspondientes al idioma seleccionado
        var traduccionesIdioma = traducciones[idiomaSeleccionado];
        
        // Iterar sobre los elementos que tienen atributo data-translate
        elementosTraducir.each(function() {
            // Obtener la clave de traducción del atributo data-translate
            var claveTraduccion = $(this).attr('data-translate');
            
            // Obtener el texto traducido correspondiente a la clave
            var textoTraducido = traduccionesIdioma[claveTraduccion];
            
            // Asignar el texto traducido al elemento
            $(this).text(textoTraducido);
        });
    }

    // Esperar a que se haga clic en un botón con la clase "custom-select"
    $(".custom-select").click(function() {
        var contenido = $(".select-selected").text();
        if (contenido == "🇬🇧 English"){
            selectIdioma.val('en');
        } else {
            selectIdioma.val('es');
        }
        // Cargar las traducciones para el nuevo idioma
        cargarTraducciones(cambiarIdioma);
    });

    // Llamar a la función cargarTraducciones al cargar la página para establecer el idioma inicial
    cargarTraducciones(cambiarIdioma);

    // Establecer el idioma inicial al cargar la página
    var idiomaInicial = localStorage.getItem('idiomaSeleccionado');
    if (idiomaInicial) {
        selectIdioma.val(idiomaInicial);
        cargarTraducciones(cambiarIdioma);
    }



    // Lógica para los select personalizados
    $(".custom-select").each(function () {
        var selElmnt = $(this).find("select")[0];
        if (!selElmnt) return; // Check if select element exists

        var ll = selElmnt.length;

        var a = $("<div>").addClass("select-selected").html(selElmnt.options[selElmnt.selectedIndex].innerHTML);
        $(this).append(a);

        var b = $("<div>").addClass("select-items select-hide");
        for (var j = 1; j < ll; j++) {
            var c = $("<div>").html(selElmnt.options[j].innerHTML);
            c.on("click", function (e) {
                var s = $(this).parent().parent().find("select")[0];
                var sl = s.length;
                var h = $(this).parent().prev();
                for (var i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == $(this).html()) {
                        s.selectedIndex = i;
                        h.html($(this).html());
                        var y = $(this).parent().find(".same-as-selected");
                        y.removeClass("same-as-selected");
                        $(this).addClass("same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.append(c);
        }
        $(this).append(b);

        a.on("click", function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            $(this).next().toggleClass("select-hide");
            $(this).toggleClass("select-arrow-active");
        });
    });

    function closeAllSelect(elmnt) {
        var x = $(".select-items");
        var y = $(".select-selected");
        var xl = x.length;
        var yl = y.length;
        var arrNo = [];
        y.each(function (i) {
            if (elmnt == this) {
                arrNo.push(i);
            } else {
                $(this).removeClass("select-arrow-active");
            }
        });
        x.each(function (i) {
            if (arrNo.indexOf(i) === -1) {
                $(this).addClass("select-hide");
            }
        });
    }

    $(document).on("click", function () {
        closeAllSelect();
    });
});
