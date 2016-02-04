function generateVisualization(data){
	var obj = JSON.parse(data);

	var renderer, scene, camera, geometry, raycaster, object3d, INTERSECTED;
	var distance = 100;
	var particles = [];
	var projector, mouse = { x: 0, y: 0 };

	geometry  = new THREE.Geometry();
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 100000);
	scene = new THREE.Scene();
	renderer = new THREE.CanvasRenderer({alpha: true});
	//object3d = new THREE.Object3D();

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	scene.add(camera);

	// On determine la taille de la sphere selon la note du film
	var taille;
	if (obj.vote_average < 5) {
		taille = 1;
	} else if (5 < obj.vote_average && 8 > obj.vote_average) {
		taille = 50;
	} else {
		taille = 100;
	}

	// Création d'un noeud central pour le film
	//TODO gérer la taille
	var texture = THREE.ImageUtils.loadTexture( obj.image );

	var main = new THREE.Sprite( 
			new THREE.SpriteMaterial({
				map: texture
			})
		);

	main.userData = {
		type: obj.type,
		id: obj.id,
		title: obj.title,
		tagline: obj.tagline,
		overview: obj.overview,
		year: obj.release_date
	};

	main.scale.x = main.scale.y = Math.random() * taille + 5;

	main.position.x = 0;
	main.position.y = 0;
	main.position.z = 0;

	scene.add(main)
	particles.push(main)

	// {"id":65731,"character":"Jake Sully","name":"Sam Worthington","image":"http://image.tmdb.org/t/p/w300/9XzAE3ZnCnazub4xrSY8YBN7sNq.jpg"}

	for (var i=0; i<obj.actors.length; i++) {
		var texture2 = THREE.ImageUtils.loadTexture( obj.actors[i].image );
		var particle = new THREE.Sprite( 
			new THREE.SpriteMaterial({
				map: texture2
			})
		);

			// new THREE.SpriteCanvasMaterial({
			// 	color: Math.random() * 0x808080 + 0x808080,
			// 	opacity: 1,
			// 	program: function ( context ) {
			// 		context.lineWidth = 0.025;
			// 		context.beginPath();
			// 		context.arc( 0, 0, 1, 0, Math.PI * 2, true );
			// 		context.closePath();
			// 		context.fill();
			// 	},
			// })

		particle.userData = { 
			type: "person",
			id: obj.actors[i].id,
			name: obj.actors[i].name,
			character: obj.actors[i].character,
			generated: false
		};

		particle.position.x = Math.random() * distance * 2 - distance;
		particle.position.y = Math.random() * distance * 2 - distance;
		particle.position.z = Math.random() * distance * 2 - distance;
		// dimension de la particule
		particle.scale.x = particle.scale.y = Math.random() * 50 + 5;

		window.addEventListener('mousedown', onDocumentMouseDown, false);

		//lien entre particle
		
		geometry.vertices.push(new THREE.Vector3(main.position.x, main.position.y, main.position.z), new THREE.Vector3(particle.position.x, particle.position.y, particle.position.z)); 
		scene.add( particle );	
		particles.push( particle );
	}

	var line = new THREE.Line( geometry, 
		new THREE.LineBasicMaterial({ 
			color: "#AAA",
			opacity: 0.8
		})
	);

	scene.add(line);



	window.addEventListener('mousemove', onDocumentMouseMove, false);
	window.requestAnimationFrame(render);

	function onDocumentMouseMove( event ) {

		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = ( event.clientY / window.innerHeight ) * 2 + 1;

		//camera.position.x = (mouse.x- camera.position.x) * 0.05;
		//camera.position.y = (mouse.y - camera.position.y) * 0.05;

		camera.position.x = event.clientX - window.innerWidth/2;
		camera.position.y = event.clientY - window.innerHeight/2;

		camera.lookAt(scene.position);
		renderer.render( scene, camera );
	}

	// initialize object to perform world/screen calculations
	projector = new THREE.Projector();

	var mouseVector = new THREE.Vector3(); 	

	function onDocumentMouseDown( event ) {
		// update the picking ray with the camera and mouse position	
		raycaster.setFromCamera( mouse, camera );	

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( particles );

		if(intersects.length > 0) {
			//intersects[ 0 ].object.material.color.set( 0xff0000 );
			if(intersects[ 0 ].object.userData.type == "movie"){
				console.log("Title : "+intersects[ 0 ].object.userData.title+" Tagline : "+ intersects[ 0 ].object.userData.tagline);
			} else {
				console.log("Name : "+intersects[ 0 ].object.userData.name+" character : "+ intersects[ 0 ].object.userData.character);	
				generateNextNode("person", intersects[ 0 ].object);
			} 
		}

		
		
		renderer.render( scene, camera );
	}

	//camera.position.z = 100;
	//camera.lookAt(scene.position);

	function render() {
		// update the picking ray with the camera and mouse position	
		raycaster.setFromCamera( mouse, camera );	

		document.addEventListener('keydown',onDocumentKeyDown,false);

		renderer.render( scene, camera );
	}


	function onDocumentKeyDown(event){
		var delta = 5;
		event = event || window.event;
		var keycode = event.keyCode;
		
		switch(keycode){
			case 37 : //left arrow
			case 81: // Q
				console.log("left click");
				camera.position.x = camera.position.x - delta;
				camera.updateProjectionMatrix();
				render();
				break;
			case 38 : // up arrow 
			case 90: // Z
				camera.position.z = camera.position.z - delta;
				camera.updateProjectionMatrix();
				render()
				break;
			case 39 : // right arrow
			case 68: // D
				camera.position.x = camera.position.x + delta;
				camera.updateProjectionMatrix();
				render()
				break;
			case 40 : //down arrow
			case 83: // S
				camera.position.z = camera.position.z + delta;
				camera.updateProjectionMatrix();
				render()
				break;
			}
	}

	function generateNextNode(type, object){

		// LAUNCH NEW AJAX REQUEST

		if (!object.generated) {
				console.log("Generate next nodes ...");
				var length = 6;
				var obj2;
				
				for ( var i = 0; i<length; i++) {
					var particle = new THREE.Sprite( 
						new THREE.SpriteCanvasMaterial({
							color: Math.random() * 0x808080 + 0x808080,
							opacity: 1,
							program: function ( context ) {
								context.lineWidth = 0.025;
								context.beginPath();
								context.arc( 0, 0, 1, 0, Math.PI * 2, true );
								context.closePath();
								context.fill();
							},
						})
					);
					particle.userData = { 
						type: "movie",
						id: 5,
						name: "test",
						character: "character",
						generated: false
					};

					particle.position.x = Math.random() * distance * 2 - distance;
					particle.position.y = Math.random() * distance * 2 - distance;
					particle.position.z = Math.random() * distance * 2 - distance;
					// dimension de la particule
					particle.scale.x = particle.scale.y = Math.random() * 5 + 5;

					scene.add(particle);
					particles.push( particle );

					geometry.vertices.push(new THREE.Vector3(object.position.x, object.position.y, object.position.z), new THREE.Vector3(particle.position.x, particle.position.y, particle.position.z)); 
				}
				var line = new THREE.Line( geometry, 
					new THREE.LineBasicMaterial({ 
					color: "#AAA",
					opacity: 0.8
				})
			);
			object.generated = true;
		} else {
			console.log("Already generated");
		}

	}


	render();
}
