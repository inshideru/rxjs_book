function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroshots);
}

Rx.Observable
    .combineLatest(StarStream, SpaceShip, Enemies, heroShots,
    function(stars, spaceship, enemies, heroshots) {
        return {
            stars: stars,
            spaceship: spaceship,
            enemies: enemies,
            heroshots: heroshots
        };
    })
    .sample(SPEED)
    .subscribe(renderScene);
