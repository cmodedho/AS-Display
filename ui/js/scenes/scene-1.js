(() => {
    const sceneOne = {
        id: "scene-1",
        durationMs: 2500,
        enterDurationMs: 333,
        timeline: {
            startMs: 0,
            enterEndMs: 333,
            endMs: 2500
        },
        onEnter(sceneElement) {
            sceneElement.style.setProperty("--scene-1-enter-ms", `${sceneOne.enterDurationMs}ms`);
        }
    };

    window.AmblerSceneRegistry = window.AmblerSceneRegistry || [];
    window.AmblerSceneRegistry.push(sceneOne);
})();
