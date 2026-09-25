export class CharacterManager {
    constructor() {
        this.currentCharacter =
            "relicario";


        this.profiles = {
            /*
             * =================================
             * RELICARIO
             * =================================
             */
            relicario: {
                id:
                    "relicario",

                name:
                    "El Silente de Bronce",

                title:
                    "El Relicario",

                maxHealth:
                    3,

                speed:
                    300,

                projectileWidth:
                    1,

                projectileDamage:
                    1
            },


            /*
             * =================================
             * APÓSTOL
             * =================================
             */
            apostol: {
                id:
                    "apostol",

                name:
                    "El Ermitaño Llagado",

                title:
                    "El Apóstol Incorrupto",

                /*
                 * Más resistente.
                 */
                maxHealth:
                    4,

                /*
                 * Bastante más lento.
                 */
                speed:
                    220,

                /*
                 * Proyectil ancho.
                 */
                projectileWidth:
                    1.9,

                /*
                 * Daño suficiente para
                 * notar diferencia.
                 */
                projectileDamage:
                    1.6
            },


            /*
             * =================================
             * VELO
             * =================================
             */
            velo: {
                id:
                    "velo",

                name:
                    "El Ejecutor de Plata",

                title:
                    "El Velo Inquisitorial",

                /*
                 * Frágil.
                 */
                maxHealth:
                    2,

                /*
                 * Muy rápido.
                 */
                speed:
                    430,

                /*
                 * Disparo fino.
                 */
                projectileWidth:
                    0.65,

                /*
                 * Alto daño.
                 */
                projectileDamage:
                    2.25
            }
        };
    }


    /*
     * =========================================
     * SELECCIÓN
     * =========================================
     */
    selectCharacter(
        characterId
    ) {
        if (
            !this.profiles[
                characterId
            ]
        ) {
            characterId =
                "relicario";
        }


        this.currentCharacter =
            characterId;


        console.log(
            "PERSONAJE SELECCIONADO:",
            this.getCurrentProfile()
                .title
        );
    }


    /*
     * =========================================
     * PERFIL
     * =========================================
     */
    getCurrentProfile() {
        return this.profiles[
            this.currentCharacter
        ];
    }


    getCurrentCharacterId() {
        return this.currentCharacter;
    }


    /*
     * =========================================
     * TIPO
     * =========================================
     */
    isRelicario() {
        return (
            this.currentCharacter ===
            "relicario"
        );
    }


    isApostol() {
        return (
            this.currentCharacter ===
            "apostol"
        );
    }


    isVelo() {
        return (
            this.currentCharacter ===
            "velo"
        );
    }


    /*
     * =========================================
     * APLICAR AL PLAYER
     * =========================================
     */
    applyToPlayer(
        player
    ) {
        const profile =
            this.getCurrentProfile();


        /*
         * Usamos el método
         * propio de Player.
         */
        player.setCharacterStats(
            {
                maxHealth:
                    profile.maxHealth,

                speed:
                    profile.speed
            }
        );


        console.log(
            "PERSONAJE APLICADO →",
            profile.title,

            "| VIDA:",
            player.health +
                "/" +
                player.maxHealth,

            "| VELOCIDAD:",
            player.baseSpeed,

            "| ANCHO:",
            profile.projectileWidth,

            "| DAÑO:",
            profile.projectileDamage
        );
    }


    /*
     * =========================================
     * PROYECTILES
     * =========================================
     */
    getProjectileModifiers() {
        const profile =
            this.getCurrentProfile();


        return {
            widthMultiplier:
                profile.projectileWidth,

            damageMultiplier:
                profile.projectileDamage
        };
    }


    /*
     * =========================================
     * RESET
     * =========================================
     */
    reset() {
        this.currentCharacter =
            "relicario";
    }
}