<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js"></script>
    <script type="text/javascript" src="/controller/main.js"></script>
    <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    <link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.min.css" rel="stylesheet" />
    <link href="http://pingendo.github.io/pingendo-bootstrap/themes/default/bootstrap.css" rel="stylesheet" />
  </head>
  
  <body>
    <div class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><span>SearchMovies</span></a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li class="active">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-4">

            <ul class="nav nav-tabs" id="nav_recherche">
              <li role="presentation" id="tab_titre" ><a href="#">Recherche par titre</a></li>
              <li role="presentation" id="tab_detail"><a href="#">Recherche par détail</a></li>
            </ul>

            <div class="col-md-12" id="affiche_form"></div>

            <div class="col-md-12" style="margin-top:2em; text-align:center;">
              <button class="btn btn-default" id="btn_recherche">Rechercher</button>
              <button class="btn btn-default" id="btn_reset">Reset</button>
            </div>

          <div class="col-md-8">
            <div class="col-md-12" id="contenu"></div>
          </div>
        </div>
      </div>
    </div>
  </body>

</html>

<script type="text/javascript">
  $("#btn_recherche").click(function() {
    var e = $( "#nav_recherche" ).find( ".active" );
  });

  $("#btn_reset").click(function() {
    $("#ajout").html("");
    $("input").val("");
  });
</script>