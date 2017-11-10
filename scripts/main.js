function main() {
    update();
    render();
}

function update() {

}

function render() {
    ctx.clearRect(0, 0, display.width, display.height);

    for (let i = 0; i < landPoints.length; i++) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(landPoints[i][0].x, landPoints[i][0].y);
        for (let point of landPoints[i]) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.moveTo(landPoints[i][0].x, landPoints[i][0].y);
        
        for (let j = 0; j < landPoints[i].length - 2; j++) {
            ctx.quadraticCurveTo(landPoints[i][j + 1], landPoints[i][j + 1].y, landPoints[i][j + 2].x, landPoints[i][j + 2].y);
        }
        
        
        ctx.closePath();
        ctx.fill();
    }

    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.lineWidth = 3;
    for (let id in property) {
        ctx.beginPath();
        ctx.moveTo(property[id].x, property[id].y);
        for (let point of property[id]) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.fill();
    }
}

socket.on('initValues', function(data) {
    landPoints = data.landPoints;
    property = data.property;
    continents = data.continents;
    players = data.players;
});

socket.on('id', function(uID) {
    if (userID === null) userID = uID;
});

setInterval(main, 1000 / 100);
