/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe */

describe("Clase GameBoard", function(){
   
    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();

    });


/*- mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.
*/

   it("Coleccion de objetos", function(){
 
    //Creamos objetos y comprobamos que se añaden
    var board = new GameBoard();  
    board.add(new PlayerShip()); 
    board.add(new PlayerShip());
    expect(board.objects.length).toEqual(2); 
    
    //Comprobamos que se une uno de los objetos a la lista para ser eliminados
    board.resetRemoved();
    board.remove(board.objects[0]);
    expect(board.removed.length).toEqual(1);  
    
    //Comprobamos que el objeto deseado se ha borrado y el otro permanece en la lista
    board.finalizeRemoved();
    expect(board.objects.length).toEqual(1);  

   });




/* - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga
*/    
      it("interacción con Game", function(){
 
        //Creamos dos objetos en la lista
        var board = new GameBoard();  
        board.add(new PlayerShip());
        board.add(new PlayerShip());
        expect(board.objects.length).toEqual(2); 
        
        //Programamos los spys para cada función de cada objeto
        spyOn(board.objects[1], "step");
        spyOn(board.objects[0], "step");
        spyOn(board.objects[1], "draw");
        spyOn(board.objects[0], "draw");
        
        //Comprobamos que al llamar la función en GameBoard, ésta se ocupa  
        //de ejecutar los metodos en cada uno de los objetos de la lista
        var dt = 1;
        board.step(dt);
        expect(board.objects[0].step).toHaveBeenCalled();
        expect(board.objects[1].step).toHaveBeenCalled();
 	      
        board.draw(ctx);
        expect(board.objects[1].draw).toHaveBeenCalled();
        expect(board.objects[0].draw).toHaveBeenCalled();
	     
    });   
    

/*- debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/


    it("detectar colision", function(){
    var board = new GameBoard();
    
    //Creamos dos objetos con coordenadas específicas,
    //para empezar no se tocan
    
    var naveJugador = {x:1,y:1,w:4,h:4};
    var naveEnemiga = {x:6,y:6,w:4,h:4};
    
    board.add(naveJugador);
    board.add(naveEnemiga);
    
    //Comprobamos que no hay overlap
    expect(board.overlap(naveJugador,naveEnemiga)).toBe(false);
    
    //Añadimos un nuevo objeto que sí se toque con nave Jugador
    var naveEnemiga2 = {x:1,y:3,w:4,h:4};
    board.add(naveEnemiga2);
    
    //Ahora sí existe overlap
    expect(board.overlap(naveJugador,naveEnemiga2)).toBe(true);
    
    //Comprobamos que detecta la nave que es
    
    expect(board.collide(naveJugador)).toBe(naveEnemiga2);
    
    
    
    
    }); 







});
