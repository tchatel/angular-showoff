'use strict';


describe('GameStore controllers', function () {

    describe('CatalogCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/catalog.json').
                respond(
                    [
                        {
                            "ref": "RFTG",
                            "name": "Race for the Galaxy",
                            "designer": "Thomas Lehmann",
                            "intro": "Votre objectif : construire l'empire spatial le plus puissant et prospère de tous les temps !",
                            "desc": "<p>In the card game <i>Race for the Galaxy</i>, players build galactic civilizations by playing game cards in front of them that represent worlds or technical and social developments. Some worlds allow players to produce goods, which can be consumed later to gain either card draws or victory points when the appropriate technologies are available to them. These are mainly provided by the developments and worlds that are not able to produce, but the fancier production worlds also give these bonuses.</p><p>At the beginning of each round, players each select, secretly and simultaneously, one of the seven roles which correspond to the phases in which the round progresses. By selecting a role, players activate that phase for this round, giving each player the opportunity to perform that phase's action. For example, if one player chooses the settle role, each player has the opportunity to settle one of the planets from their hand. The player who has chosen the role, however, gets a bonus that applies only to him. But bonuses may also be acquired through developments, so one must be aware when another player also takes advantage of his choice of role.</p>",
                            "price": 25.00
                        },

                        {
                            "ref": "AGOT",
                            "name": "Le Trône de Fer",
                            "designer": "Christian T. Petersen",
                            "intro": "Prenez le contrôle d'une des grandes maisons de Westeros et entrez dans une lutte sans merci pour le Trône de Fer!",
                            "desc": "<p>War and chaos are engulfing the lands of Westeros. The great Houses are vying for control of the Iron Throne using the old tools of intrigue and war. Yet while the war for Westeros rages, grave dangers gather in the cold North, and an ancient enemy is gaining momentum in the distant East.</p><p>In <i>A Game of Thrones: The Board Game</i>, players take control of one of the great Houses of Westeros. Via resource management, diplomacy, and cunning, they seek to win dominance over the land. Players must give orders to armies, control important characters, gather resources for the coming winter, and survive the onslaught of their enemies. A unique phase mechanic, battle resolution, and special ordering system make for an engaging game in which all players are actively involved at all times.</p>",
                            "price": 50.00
                        },

                        {
                            "ref": "TS",
                            "name": "Twilight Struggle",
                            "designer": "Jason Matthews, Ananda Gupta",
                            "intro": "Le jeu historique qui retrace les luttes de pouvoir entre les deux grandes puissances en 45 ans de Guerre Froide.",
                            "desc": "<p>\"Now the trumpet summons us again, not as a call to bear arms, though arms we need; not as a call to battle, though embattled we are – but a call to bear the burden of a long twilight struggle...\"<br>– John F. Kennedy</p><p>In 1945, unlikely allies toppled Hitler's war machine, while humanity's most devastating weapons forced the Japanese Empire to its knees in a storm of fire. Where once there stood many great powers, there then stood only two. The world had scant months to sigh its collective relief before a new conflict threatened. Unlike the titanic struggles of the preceding decades, this conflict would be waged not primarily by soldiers and tanks, but by spies and politicians, scientists and intellectuals, artists and traitors. Twilight Struggle is a two-player game simulating the forty-five year dance of intrigue, prestige, and occasional flares of warfare between the Soviet Union and the United States. The entire world is the stage on which these two titans fight to make the world safe for their own ideologies and ways of life. The game begins amidst the ruins of Europe as the two new \"superpowers\" scramble over the wreckage of the Second World War, and ends in 1989, when only the United States remained standing.</p><p>Twilight Struggle inherits its fundamental systems from the card-driven classics We the People and Hannibal: Rome vs. Carthage. It is a quick-playing, low-complexity game in that tradition. The game map is a world map of the period, whereon players move units and exert influence in attempts to gain allies and control for their superpower. As with GMT's other card-driven games, decision-making is a challenge; how to best use one's cards and units given consistently limited resources.</p><p>Twilight Struggle's Event cards add detail and flavor to the game. They cover a vast array of historical happenings, from the Arab-Israeli conflicts of 1948 and 1967, to Vietnam and the U.S. peace movement, to the Cuban Missile Crisis and other such incidents that brought the world to the brink of nuclear annihilation. Subsystems capture the prestige-laden Space Race as well as nuclear tensions, with the possibility of game-ending nuclear war.</p>",
                            "price": 45.00
                        }
                    ]
                );

            scope = $rootScope.$new();
            ctrl = $controller(CatalogCtrl, {$scope: scope});
        }));

        it('should create "catalog" model with 3 games fetched from xhr', function () {
            expect(scope.catalog).toBeUndefined();
            $httpBackend.flush();
            expect(scope.catalog.length).toBe(3);
            expect(scope.catalog[0].ref).toBe("RFTG");
            expect(scope.catalog[1].ref).toBe("AGOT");
            expect(scope.catalog[2].ref).toBe("TS");
        });

    });

    describe('GameCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/AGOT.json').
                respond(
                    {
                        "ref": "AGOT",
                        "name": "Le Trône de Fer",
                        "designer": "Christian T. Petersen",
                        "intro": "Prenez le contrôle d'une des grandes maisons de Westeros et entrez dans une lutte sans merci pour le Trône de Fer!",
                        "desc": "<p>War and chaos are engulfing the lands of Westeros. The great Houses are vying for control of the Iron Throne using the old tools of intrigue and war. Yet while the war for Westeros rages, grave dangers gather in the cold North, and an ancient enemy is gaining momentum in the distant East.</p><p>In <i>A Game of Thrones: The Board Game</i>, players take control of one of the great Houses of Westeros. Via resource management, diplomacy, and cunning, they seek to win dominance over the land. Players must give orders to armies, control important characters, gather resources for the coming winter, and survive the onslaught of their enemies. A unique phase mechanic, battle resolution, and special ordering system make for an engaging game in which all players are actively involved at all times.</p>",
                        "price": 50.00,
                        "images": ["AGOT-1.jpg","AGOT-2.jpg","AGOT-3.jpg"]
                    }
                );

            scope = $rootScope.$new();
            ctrl = $controller(CatalogCtrl, {$scope: scope});
        }));

        it('should create "catalog" model with 3 games fetched from xhr', function () {
            expect(scope.game).toBeUndefined();
            $httpBackend.flush();
            expect(scope.game.ref).toBe("AGOT");
        });

    });

});