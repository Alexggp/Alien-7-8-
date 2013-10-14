/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores 
*/

describe("Clase PlayerMissile", function(){
   
    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();

    });
    
/*
  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile
*/
 it("sprite missile", function(){
    Game = {};
    expect(sprites["missile"]).toBeDefined(); 
    expect (PlayerMissile).toBeDefined();
	});

/*
  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles
*/
  it("Disparar",function(){
    Game = {width: 320, height: 480, keys: {'fire': false}};
   
    SpriteSheet = { 
      map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }},
    };

    var board = new GameBoard();
    board.add(new PlayerShip());  
   
    //Comprobamos que antes de disparar solo existe la nave en la lista 
    //de objetos. 
    expect(board.objects.length).toBe(1);
   
    Game = {keys: {'fire': true}};  
    var dt = 1;
    board.step(dt);
    
    //Comprobamos que tras el disparo, se crean dos objetos nuevo, que
    //obviamente son los misiles. 
    expect(board.objects.length).toBe(3);
    
    //Comprobamos que las coordenadas del primer misil (board.objects[1])
    //con respecto a la posicion de la nave (board.objects[0]) son correctas.
    expect(board.objects[1].x).toBe(board.objects[0].x - board.objects[1].w/2);
    expect(board.objects[1].y).toBe(board.objects[0].y+board.objects[0].h/2- board.objects[1].h);
    
    //Comprobamos que las coordenadas del segundo misil (board.objects[2])
    //con respecto a la posicion de la nave (board.objects[0]) son correctas.
    expect(board.objects[2].x).toBe(board.objects[0].x+board.objects[0].w - board.objects[2].w/2);
    expect(board.objects[2].y).toBe(board.objects[0].y+board.objects[0].h/2- board.objects[2].h);
  });


/*
  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/
 });
