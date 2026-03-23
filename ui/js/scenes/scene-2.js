(() => {
    const sceneTwo = {
        id: "scene-2",
        durationMs: 5000,
        enterDurationMs: 950,
        timeline: {
            startMs: 2500,
            enterEndMs: 3450,
            endMs: 7500
        },
        onEnter(sceneElement) {
            sceneElement.style.setProperty("--scene-2-enter-ms", `${sceneTwo.enterDurationMs}ms`);
        }
    };

    window.AmblerSceneRegistry = window.AmblerSceneRegistry || [];
    window.AmblerSceneRegistry.push(sceneTwo);
})();
