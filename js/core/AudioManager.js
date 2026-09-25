export class AudioManager {
    constructor() {
        /*
         * =====================================
         * COLECCIONES
         * =====================================
         */
        this.music = {};
        this.sfx = {};


        /*
         * =====================================
         * VOLUMEN
         * =====================================
         */
        this.musicVolume = 0.38;
        this.sfxVolume = 0.48;


        /*
         * =====================================
         * ESTADO MÚSICA
         * =====================================
         */
        this.currentMusic = null;
        this.currentMusicName = null;

        this.desiredMusicName = null;

        this.enabled = true;

        this.fadeInterval = null;


        /*
         * =====================================
         * DESBLOQUEO DE AUDIO DEL NAVEGADOR
         * =====================================
         */
        this.audioUnlocked = false;

        this.installUnlockListeners();
    }


    /*
     * =========================================
     * DESBLOQUEAR AUDIO
     * =========================================
     */
    installUnlockListeners() {
        const unlock = () => {
            if (
                this.audioUnlocked
            ) {
                return;
            }


            this.audioUnlocked = true;


            /*
             * Si ya había una música solicitada
             * antes de la primera interacción,
             * intentamos reproducirla ahora.
             */
            if (
                this.desiredMusicName
            ) {
                this.playMusic(
                    this.desiredMusicName,
                    1.5
                );
            }


            window.removeEventListener(
                "keydown",
                unlock
            );


            window.removeEventListener(
                "mousedown",
                unlock
            );


            window.removeEventListener(
                "touchstart",
                unlock
            );
        };


        window.addEventListener(
            "keydown",
            unlock
        );


        window.addEventListener(
            "mousedown",
            unlock
        );


        window.addEventListener(
            "touchstart",
            unlock
        );
    }


    /*
     * =========================================
     * REGISTRAR MÚSICA
     * =========================================
     */
    registerMusic(
        name,
        src
    ) {
        const audio =
            new Audio(src);


        audio.loop = true;

        audio.preload = "auto";

        audio.volume =
            this.musicVolume;


        this.music[name] =
            audio;
    }


    /*
     * =========================================
     * REGISTRAR SFX
     * =========================================
     */
    registerSFX(
        name,
        src
    ) {
        const audio =
            new Audio(src);


        audio.preload =
            "auto";


        audio.volume =
            this.sfxVolume;


        this.sfx[name] =
            audio;
    }


    /*
     * =========================================
     * REPRODUCIR MÚSICA
     *
     * fadeSeconds:
     * 0 = inmediato
     * >0 = entrada suave
     * =========================================
     */
    playMusic(
        name,
        fadeSeconds = 0
    ) {
        this.desiredMusicName =
            name;


        if (
            !this.enabled
        ) {
            return;
        }


        const music =
            this.music[name];


        if (
            !music
        ) {
            console.warn(
                "Música no registrada:",
                name
            );


            return;
        }


        /*
         * Si ya está sonando,
         * no reiniciarla.
         */
        if (
            this.currentMusic ===
            music &&
            !music.paused
        ) {
            return;
        }


        /*
         * Detener la anterior.
         */
        if (
            this.currentMusic &&
            this.currentMusic !== music
        ) {
            this.stopMusicImmediate();
        }


        this.currentMusic =
            music;


        this.currentMusicName =
            name;


        /*
         * Reiniciar pista.
         */
        try {
            music.currentTime =
                0;
        } catch (
            error
        ) {
            // Nada.
        }


        /*
         * Fade-in.
         */
        if (
            fadeSeconds > 0
        ) {
            music.volume =
                0;
        } else {
            music.volume =
                this.musicVolume;
        }


        const promise =
            music.play();


        if (
            promise &&
            typeof promise.catch ===
                "function"
        ) {
            promise
                .then(
                    () => {
                        this.audioUnlocked =
                            true;


                        if (
                            fadeSeconds > 0
                        ) {
                            this.fadeIn(
                                music,
                                fadeSeconds
                            );
                        }
                    }
                )
                .catch(
                    () => {
                        /*
                         * Chrome probablemente
                         * bloqueó autoplay.
                         *
                         * Se intentará otra vez con
                         * primera interacción.
                         */
                    }
                );
        }
    }


    /*
     * =========================================
     * CAMBIO SUAVE DE MÚSICA
     * =========================================
     */
    crossFadeTo(
        name,
        duration = 1.5
    ) {
        this.desiredMusicName =
            name;


        if (
            !this.enabled
        ) {
            return;
        }


        const nextMusic =
            this.music[name];


        if (
            !nextMusic
        ) {
            console.warn(
                "Música no registrada:",
                name
            );


            return;
        }


        /*
         * Ya está sonando esa misma.
         */
        if (
            this.currentMusicName ===
            name
        ) {
            return;
        }


        /*
         * Sin música previa.
         */
        if (
            !this.currentMusic
        ) {
            this.playMusic(
                name,
                duration
            );


            return;
        }


        this.clearFade();


        const oldMusic =
            this.currentMusic;


        const oldStartVolume =
            oldMusic.volume;


        /*
         * Preparar nueva música.
         */
        try {
            nextMusic.currentTime =
                0;
        } catch (
            error
        ) {
            // Nada.
        }


        nextMusic.volume =
            0;


        const playPromise =
            nextMusic.play();


        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {
            playPromise.catch(
                () => {}
            );
        }


        const start =
            performance.now();


        const totalMs =
            Math.max(
                100,
                duration * 1000
            );


        this.fadeInterval =
            setInterval(
                () => {
                    const elapsed =
                        performance.now() -
                        start;


                    const progress =
                        Math.min(
                            1,
                            elapsed /
                                totalMs
                        );


                    oldMusic.volume =
                        oldStartVolume *
                        (
                            1 -
                            progress
                        );


                    nextMusic.volume =
                        this.musicVolume *
                        progress;


                    if (
                        progress >= 1
                    ) {
                        clearInterval(
                            this.fadeInterval
                        );


                        this.fadeInterval =
                            null;


                        oldMusic.pause();


                        try {
                            oldMusic.currentTime =
                                0;
                        } catch (
                            error
                        ) {
                            // Nada.
                        }


                        oldMusic.volume =
                            this.musicVolume;


                        nextMusic.volume =
                            this.musicVolume;


                        this.currentMusic =
                            nextMusic;


                        this.currentMusicName =
                            name;
                    }
                },
                30
            );
    }


    /*
     * =========================================
     * FADE IN
     * =========================================
     */
    fadeIn(
        audio,
        duration = 1.5
    ) {
        this.clearFade();


        const start =
            performance.now();


        const totalMs =
            Math.max(
                100,
                duration * 1000
            );


        this.fadeInterval =
            setInterval(
                () => {
                    const elapsed =
                        performance.now() -
                        start;


                    const progress =
                        Math.min(
                            1,
                            elapsed /
                                totalMs
                        );


                    audio.volume =
                        this.musicVolume *
                        progress;


                    if (
                        progress >= 1
                    ) {
                        clearInterval(
                            this.fadeInterval
                        );


                        this.fadeInterval =
                            null;


                        audio.volume =
                            this.musicVolume;
                    }
                },
                30
            );
    }


    /*
     * =========================================
     * FADE OUT
     * =========================================
     */
    fadeOut(
        duration = 1.5
    ) {
        if (
            !this.currentMusic
        ) {
            return;
        }


        this.clearFade();


        const music =
            this.currentMusic;


        const startVolume =
            music.volume;


        const start =
            performance.now();


        const totalMs =
            Math.max(
                100,
                duration * 1000
            );


        this.fadeInterval =
            setInterval(
                () => {
                    const elapsed =
                        performance.now() -
                        start;


                    const progress =
                        Math.min(
                            1,
                            elapsed /
                                totalMs
                        );


                    music.volume =
                        startVolume *
                        (
                            1 -
                            progress
                        );


                    if (
                        progress >= 1
                    ) {
                        clearInterval(
                            this.fadeInterval
                        );


                        this.fadeInterval =
                            null;


                        music.pause();


                        try {
                            music.currentTime =
                                0;
                        } catch (
                            error
                        ) {
                            // Nada.
                        }


                        music.volume =
                            this.musicVolume;


                        if (
                            this.currentMusic ===
                            music
                        ) {
                            this.currentMusic =
                                null;


                            this.currentMusicName =
                                null;
                        }
                    }
                },
                30
            );
    }


    /*
     * =========================================
     * DETENER INMEDIATAMENTE
     * =========================================
     */
    stopMusicImmediate() {
        this.clearFade();


        if (
            !this.currentMusic
        ) {
            return;
        }


        this.currentMusic.pause();


        try {
            this.currentMusic.currentTime =
                0;
        } catch (
            error
        ) {
            // Nada.
        }


        this.currentMusic.volume =
            this.musicVolume;


        this.currentMusic =
            null;


        this.currentMusicName =
            null;
    }


    /*
     * =========================================
     * DETENER
     * =========================================
     */
    stopMusic() {
        this.desiredMusicName =
            null;


        this.stopMusicImmediate();
    }


    /*
     * =========================================
     * LIMPIAR FADE
     * =========================================
     */
    clearFade() {
        if (
            this.fadeInterval
        ) {
            clearInterval(
                this.fadeInterval
            );


            this.fadeInterval =
                null;
        }
    }


    /*
     * =========================================
     * SFX
     * =========================================
     */
    playSFX(
        name,
        volumeMultiplier = 1
    ) {
        if (
            !this.enabled
        ) {
            return;
        }


        const original =
            this.sfx[name];


        if (
            !original
        ) {
            return;
        }


        const clone =
            original.cloneNode();


        clone.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    this.sfxVolume *
                        volumeMultiplier
                )
            );


        const promise =
            clone.play();


        if (
            promise &&
            typeof promise.catch ===
                "function"
        ) {
            promise.catch(
                () => {}
            );
        }
    }


    /*
     * =========================================
     * VOLUMEN MÚSICA
     * =========================================
     */
    setMusicVolume(
        volume
    ) {
        this.musicVolume =
            Math.max(
                0,
                Math.min(
                    1,
                    volume
                )
            );


        for (
            const music
            of Object.values(
                this.music
            )
        ) {
            music.volume =
                this.musicVolume;
        }
    }


    /*
     * =========================================
     * VOLUMEN SFX
     * =========================================
     */
    setSFXVolume(
        volume
    ) {
        this.sfxVolume =
            Math.max(
                0,
                Math.min(
                    1,
                    volume
                )
            );


        for (
            const sound
            of Object.values(
                this.sfx
            )
        ) {
            sound.volume =
                this.sfxVolume;
        }
    }


    /*
     * =========================================
     * ACTIVAR / DESACTIVAR
     * =========================================
     */
    setEnabled(
        enabled
    ) {
        this.enabled =
            enabled;


        if (
            !enabled
        ) {
            this.stopMusic();
        }
    }
}