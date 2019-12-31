
function LifeGame() {
    this.widthX = undefined;
    this.heightY = undefined;
    this.speed = 100;
    this.loop = undefined;
    this.timer = undefined;
    this.generation = 0;
    //this.lifeBoard = undefined;
    //this.oldLifeBoard = undefined;
    //this.neighboursCount = undefined;
    this.deadBorderPadding = 2;

    this.createRandomGame = function createRandomGame(x, y) {
        this.widthX = x;
        this.heightY = y;
        var alive = 1;
        var dead = -1;

        this.lifeBoard = new Array(this.widthX + this.deadBorderPadding);
        this.neighboursCount = new Array(this.widthX + this.deadBorderPadding);

        for (var row = 0; row < this.widthX + this.deadBorderPadding; row++) {

            this.lifeBoard[row] = new Array(this.heightY + this.deadBorderPadding);
            this.neighboursCount[row] = new Array(this.heightY + this.deadBorderPadding);

            for (var col = 0; col < this.heightY + this.deadBorderPadding; col++) {
                this.lifeBoard[row][col] = 0;
                this.neighboursCount[row][col] = 0;
            }
        }

        for (var row = 1; row < this.widthX + 1; row++) {
            for (var col = 1; col < this.heightY + 1; col++) {

                this.lifeBoard[row][col] = (Math.random() * 5 | 0) == 0 ? 1 : 0;

                var vitalSign = this.lifeBoard[row][col] > 0 ? 1 : -1;
                this.adjustNeighbourCount(row, col, vitalSign, this.neighboursCount);
            }
        }

        return this.lifeBoard;
    };

    this.GetLifeBoard = function GetLifeBoard() {

        var currentLifeBoard = new Array(this.widthX);
        for (var row = 1; row < this.widthX + 1; row++) {
            currentLifeBoard[row-1] = new Array(this.heightY);
            for (var col = 1; col < this.heightY + 1; col++) {
                currentLifeBoard[row-1][col-1] = this.lifeBoard[row][col];
            }
        }

        return currentLifeBoard;
    };

    this.setLifePoint = function setLifePoint(row, col, vitalSign) {

        row++; col++
        this.lifeBoard[row][col] = vitalSign;

        if (this.lifeBoard[row][col] > 0)
            this.adjustNeighbourCount(row, col, 1, this.neighboursCount);
        else
            this.adjustNeighbourCount(row, col, -1, this.neighboursCount);

        this.oldLifeBoard = undefined;
    };

    this.tick = function tick() {

        var alive = 1;
        var dead = 0;

        var nextL = new Array(this.widthX + this.deadBorderPadding);
        var nextN = new Array(this.widthX + this.deadBorderPadding);
        for (var row = 0; row < this.widthX + 2; row++) {
            nextL[row] = new Array(this.heightY + this.deadBorderPadding);
            nextN[row] = new Array(this.heightY + this.deadBorderPadding);
            for (var col = 0; col < this.heightY + 2; col++) {
                nextL[row][col] = this.lifeBoard[row][col];
                nextN[row][col] = this.neighboursCount[row][col];
            }
        }

        for (var row = 1; row <= this.widthX; row++) {
            for (var col = 1; col <= this.heightY; col++) {
                var neighbourCount = this.neighboursCount[row][col];
                if (this.lifeBoard[row][col] == 0) {
                    if (neighbourCount == 3) {
                        nextL[row][col] = alive;
                        this.adjustNeighbourCount(row, col, alive, nextN);
                    }
                } else {
                    if (neighbourCount < 2 || neighbourCount > 3) {
                        nextL[row][col] = dead;
                        this.adjustNeighbourCount(row, col, dead-1, nextN);
                    }
                }
            }
        }

        this.oldLifeBoard = this.lifeBoard;
        this.lifeBoard = nextL;
        this.neighboursCount = nextN;
        this.generation++;
    };

    this.adjustNeighbourCount = function adjustNeighbourCount(row, col, vitalSign, nextN) {
        var bot = row - 1;
        var top = row + 1;

        var lef = col - 1;
        var rig = col + 1;

        nextN[bot][lef] = nextN[bot][lef] > 0 ? nextN[bot][lef] + vitalSign : vitalSign;
        nextN[row][lef] = nextN[row][lef] > 0 ? nextN[row][lef] + vitalSign : vitalSign;
        nextN[top][lef] = nextN[top][lef] > 0 ? nextN[top][lef] + vitalSign : vitalSign;
        nextN[top][col] = nextN[top][col] > 0 ? nextN[top][col] + vitalSign : vitalSign;
        nextN[top][rig] = nextN[top][rig] > 0 ? nextN[top][rig] + vitalSign : vitalSign;
        nextN[row][rig] = nextN[row][rig] > 0 ? nextN[row][rig] + vitalSign : vitalSign;
        nextN[bot][rig] = nextN[bot][rig] > 0 ? nextN[bot][rig] + vitalSign : vitalSign;
        nextN[bot][col] = nextN[bot][col] > 0 ? nextN[bot][col] + vitalSign : vitalSign;
    };
}
