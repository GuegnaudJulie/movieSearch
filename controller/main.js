$( document ).ready(function() {
	$("#tab_titre").addClass("active");
	$("#titre").addClass("active");

	$("#tab_detail").click(function() {
		$("#tab_detail").addClass("active");
		$("#tab_titre").removeClass("active");
		$("#detail").addClass("active");
		$("#titre").removeClass("active");
	});

	$("#tab_titre").click(function() {
		$("#tab_detail").removeClass("active");
		$("#tab_titre").addClass("active");
		$("#detail").removeClass("active");
		$("#titre").addClass("active");
	});
	

	$("#ajout_form").click(function() {
	    $("#ajout").append('<div class="input-group">'+
	        '<div class="input-group-btn">'+
	          '<button type="button" class="btn btn-default dropdown-toggle type_membre" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sélection <span class="caret"></span></button>'+
	          '<ul class="dropdown-menu">'+
	            '<li><a href="#">Acteur</a></li>'+
	            '<li><a href="#">Réalisateur</a></li>'+
	          '</ul>'+
	        '</div>'+
	        '<input type="text" class="form-control nom_membre" placeholder="Nom" aria-label="basic-addon1">'+
	      '</div>');
	  });

	$("#btn_recherche").click(function() {
		//var e = $( "#nav_recherche" ).find( ".active" );
	});

	$("#btn_reset").click(function() {
		$("#ajout").html("");
		$("input").val("");
	});

	$("#select_movies").select2({

		ajax: {
			dataType: 'json',
	        url: "https://api.themoviedb.org/3/search/movie",
	        data: function(params){
	        	return{
	        		query: params.term,
	        		api_key: "a1c65ce9d24b2d4ed117f413bb94a122"
	        	}
	        },
	        /*success: function(data) {
	            console.log(data)
	            for (var i = 0; i < data['results'].length; i++) {
	                var result = data['results'][i]
	                console.log(result['id']+" - "+result['title'])
	            }
	        },*/

			processResults: function (data, params) {
				// parse the results into the format expected by Select2
				// since we are using custom formatting functions we do not need to
				// alter the remote JSON data, except to indicate that infinite
				// scrolling can be used
				params.page = params.page || 1;
		
				return {
					results: data.results,
					pagination: {
						more: (params.page * 30) < data.total_count
					}
				};
			},
			cache: true
		},

		escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
		minimumInputLength: 1,
		templateResult: formatRepo, // omitted for brevity, see the source of this page
		templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
	});

	function formatRepo(data){
		if(data.loading) return data.title;

		markup = "<p>"+data.title+"</p>";
		return markup;
	};

	function formatRepoSelection(data){
		$("#id_titre").val(data.id);
		return data.title;
	};

});