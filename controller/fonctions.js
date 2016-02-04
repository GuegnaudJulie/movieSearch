function ajouter(){
	$("#ajout").append('<br/>'+
		'<select id="liste_type_membre" name="Type" size="1">' +
			'<option class="type_membre">Acteur' +
			'<option class="type_membre">Réalisateur' +
			'<option class="type_membre">Producteur' +
		'</select>' +
		'<input type="text" class="nom_membre" placeholder="nom">');
};

function supprimer(){
	$("#ajout").html("");
	$("#first_input").val("");
	$("#nom_titre").val("");
};

function recherche(){if ($(".nom_membre").val() != ""){
		vue_arbre();
	}
	else if ($("#nom_titre").val() != "") {
		vue_film();
	};
	
}

function vue_arbre(){
	//$("#portfolio").load('arbre_filmographie.php');
};

function vue_film(){
	$("#portfolio").load('detail_film.html');
};
