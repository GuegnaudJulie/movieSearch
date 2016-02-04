$( document ).ready(function() {
	$("#affiche_form").load('/view/form_recherche_titre.html');
	//$("#tab_titre").className= "active";
	$("#tab_titre").addClass("active");

	$("#tab_detail").click(function() {
		$("#tab_detail").addClass("active");
		$("#tab_titre").removeClass("active");
		$("#affiche_form").load('/view/form_recherche_detail.html');
	});

	$("#tab_titre").click(function() {
		$("#tab_detail").removeClass("active");
		$("#tab_titre").addClass("active");
		$("#affiche_form").load('/view/form_recherche_titre.html');
	});

});