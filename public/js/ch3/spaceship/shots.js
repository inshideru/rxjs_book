var playerFiring = Rx.Observable
    .merge(
    Rx.Observable.fromEvent(canvas, 'click'),
    Rx.Observable.fromEvent(canvas, 'keydown')
        .filter(function (evt) { return evt.keycode === 32; })
    )
    .sample(200)
    .timestamp();

var heroShots = Rx.Observable
    .combineLatest(
    playerFiring,
    SpaceShip,
    function (shotEvents, spaceShip) {
        return {
            timestamp: shotEvents.timestamp,
            x: spaceShip.x
        };
    })
    .distinctUntilChanged(function (shot) { return shot.timestamp; })
    .scan(function (shotArray, shot) {
        shotArray.push({ x: shot.x, y: HERO_Y });
        return shotArray;
    }, []);

var SHOOTING_SPEED = 15;
function paintHeroShots(heroShots, enemies) {
    heroShots.forEach(function (shot, i) {
        for (var l = 0; l < enemies.length; l++) {
            var enemy = enemies[l];
            if (!enemy.isDead && collision(shot, enemy)) {
                enemy.isDead = true;
                shot.x = shot.y = -100;
                break;
            }
        }
        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    });
}

function isVisible(obj) {
    return obj.x > -40 && obj.x < canvas.width + 40 && obj.y > -40 && obj.y < canvas.height + 40;
}

var ENEMY_FREQ = 1500;
var ENEMY_SHOOTING_FREQ = 750;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function (enemyArray) {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
            shots: []
        };

        Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function () {
            enemy.shots.push({ x: enemy.x, y: enemy.y });
            enemy.shots = enemy.shots.filter(isVisible);
        });

        enemyArray.push(enemy);
        return enemyArray.filter(isVisible);
    }, []);

function collision(target1, target2) {
    return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
        (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}