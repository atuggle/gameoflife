var game;
var widthX = 50;
var heightY = 55;

module("Game of life", {
    setup: function () {
        game = new LifeGame(widthX, heightY);
        game.createRandomGame(widthX, heightY);
    }
});

test("Game initialized and board created according to size specified", function () {
    var board = game.GetLifeBoard();

    equal(board.length, widthX);
    equal(board[0].length, heightY);
});

test("Game with live and dead cells", function () {
    var board = game.GetLifeBoard();

    var initialValue = board[0][0];
    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            if (initialValue != board[row][col])
                expect(0);
        }
    }
});

test("Game.tick() increments generation", function () {
    var board = game.GetLifeBoard();
    var initalGen = game.generation;
    game.tick();

    equal(initalGen+1, game.generation);
});

test("Rule 1): live cell dies because it has less than two live neighbours", function () {
    var board = game.GetLifeBoard();

    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            game.setLifePoint([row], [col], 0);
        }
    }

    game.setLifePoint(3, 3, 1);
    game.tick();

    board = game.GetLifeBoard();
    equal(board[3][3], 0);
});

test("Rule 2.A): live cell with 2 live neighbors lives on", function () {
    var board = game.GetLifeBoard();

    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            game.setLifePoint([row], [col], 0);
        }
    }

    game.setLifePoint(3, 3, 1);

    game.setLifePoint(4, 3, 1); //top
    game.setLifePoint(2, 3, 1); //bottom

    game.tick();

    board = game.GetLifeBoard();
    equal(board[3][3], 1);
});

test("Rule 2.B): live cell with 3 live neighbors lives on", function () {
    var board = game.GetLifeBoard();

    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            game.setLifePoint([row], [col], 0);
        }
    }

    game.setLifePoint(3, 3, 1);

    game.setLifePoint(4, 3, 1); //top
    game.setLifePoint(2, 3, 1); //bottom
    game.setLifePoint(3, 4, 1); //right

    game.tick();

    board = game.GetLifeBoard();
    equal(board[3][3], 1);
});

test("Rule 3): live cell dies because it has more than 3 live neighbours", function () {
    var board = game.GetLifeBoard();

    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            game.setLifePoint([row], [col], 1);
        }
    }

    game.tick();

    board = game.GetLifeBoard();
    equal(board[3][3], 0);
});


test("Rule 4): dead cell with 3 live neighbors becomes alive", function () {
    var board = game.GetLifeBoard();

    for (var row = 0; row < widthX; row++) {
        for (var col = 0; col < heightY; col++) {
            game.setLifePoint([row], [col], 0);
        }
    }

    game.setLifePoint(3, 3, 1);

    game.setLifePoint(4, 3, 1); //top
    game.setLifePoint(2, 3, 1); //bottom
    game.setLifePoint(3, 4, 1); //right

    game.tick();

    board = game.GetLifeBoard();
    equal(board[3][3], 1);
});