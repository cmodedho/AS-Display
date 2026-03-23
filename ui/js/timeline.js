(() => {
    const stage = document.querySelector(".layout.content");
    const sceneRegistry = Array.isArray(window.AmblerSceneRegistry)
        ? window.AmblerSceneRegistry
        : [];

    if (!stage || sceneRegistry.length === 0) {
        return;
    }

    const sceneNodes = new Map(
        Array.from(stage.querySelectorAll(".scene")).map((sceneNode) => [
            sceneNode.dataset.sceneId,
            sceneNode
        ])
    );

    const scenes = sceneRegistry.filter((scene) => sceneNodes.has(scene.id));

    if (scenes.length === 0) {
        return;
    }

    let currentSceneIndex = 0;

    const setActiveScene = (activeSceneId) => {
        sceneNodes.forEach((sceneNode, sceneId) => {
            const isActive = sceneId === activeSceneId;
            sceneNode.classList.toggle("is-active", isActive);
            sceneNode.classList.remove("is-entering");
            sceneNode.classList.remove("is-entered");

            if (isActive) {
                sceneNode.removeAttribute("aria-hidden");
            } else {
                sceneNode.setAttribute("aria-hidden", "true");
            }
        });
    };

    const playScene = () => {
        const scene = scenes[currentSceneIndex];
        const sceneNode = sceneNodes.get(scene.id);

        if (!sceneNode) {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
            playScene();
            return;
        }

        const enterDurationMs = Math.max(0, Number(scene.enterDurationMs) || 0);
        const sceneDurationMs = Math.max(
            enterDurationMs,
            Number(scene.durationMs) || 0
        );

        setActiveScene(scene.id);
        sceneNode.classList.add("is-entering");
        scene.onEnter?.(sceneNode, { scene, stage });

        window.setTimeout(() => {
            sceneNode.classList.remove("is-entering");
            sceneNode.classList.add("is-entered");
            scene.onEntered?.(sceneNode, { scene, stage });
        }, enterDurationMs);

        window.setTimeout(() => {
            scene.onExit?.(sceneNode, { scene, stage });
            if (scenes.length === 1) {
                return;
            }
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
            playScene();
        }, sceneDurationMs);
    };

    playScene();
})();
