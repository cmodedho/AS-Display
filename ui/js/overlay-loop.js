(() => {
    const overlay = document.querySelector(".layout.overlay.outer");
    const edges = document.querySelector(".layout.overlay.edges");
    const burn = document.querySelector(".layout.overlay.burn");
    const vectors = document.querySelector(".layout.overlay.vectors");

    if (!overlay || !edges) {
        return;
    }

    const overlays = [
        "/assets/graphic/Paper Overlay 1.png",
        "/assets/graphic/Paper Overlay 2.png",
        "/assets/graphic/Paper Overlay 3.png",
        "/assets/graphic/Paper Overlay 4.png"
    ];

    const edgeOverlays = [
        "/assets/graphic/Paper Edges 1.png",
        "/assets/graphic/Paper Edges 2.png",
        "/assets/graphic/Paper Edges 3.png",
        "/assets/graphic/Paper Edges 4.png"
    ];

    const vectorOverlays = Array.from(
        { length: 10 },
        (_, i) => `/assets/graphic/Paper Vector ${i + 1}.png`
    );

    const burnOverlays = Array.from(
        { length: 6 },
        (_, i) => `/assets/graphic/Color Burn ${i + 1}.png`
    );

    const shuffle = (items) => {
        const shuffled = [...items];
        for (let i = shuffled.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    [...overlays, ...edgeOverlays, ...burnOverlays, ...vectorOverlays].forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    let overlayIndex = 0;
    let edgeOrder = shuffle(edgeOverlays);
    let edgeIndex = 0;
    let burnOrder = shuffle(burnOverlays);
    let burnIndex = 0;
    let vectorOrder = shuffle(vectorOverlays);
    let vectorIndex = 0;

    const nextEdgeFrame = () => {
        if (edgeIndex >= edgeOrder.length) {
            const lastShown = edgeOrder[edgeOrder.length - 1];
            edgeOrder = shuffle(edgeOverlays);

            if (edgeOrder.length > 1 && edgeOrder[0] === lastShown) {
                [edgeOrder[0], edgeOrder[1]] = [edgeOrder[1], edgeOrder[0]];
            }

            edgeIndex = 0;
        }

        const frame = edgeOrder[edgeIndex];
        edgeIndex += 1;
        return frame;
    };

    const nextVectorFrame = () => {
        if (vectorIndex >= vectorOrder.length) {
            const lastShown = vectorOrder[vectorOrder.length - 1];
            vectorOrder = shuffle(vectorOverlays);

            if (vectorOrder.length > 1 && vectorOrder[0] === lastShown) {
                [vectorOrder[0], vectorOrder[1]] = [vectorOrder[1], vectorOrder[0]];
            }

            vectorIndex = 0;
        }

        const frame = vectorOrder[vectorIndex];
        vectorIndex += 1;
        return frame;
    };

    const nextBurnFrame = () => {
        if (burnIndex >= burnOrder.length) {
            const lastShown = burnOrder[burnOrder.length - 1];
            burnOrder = shuffle(burnOverlays);

            if (burnOrder.length > 1 && burnOrder[0] === lastShown) {
                [burnOrder[0], burnOrder[1]] = [burnOrder[1], burnOrder[0]];
            }

            burnIndex = 0;
        }

        const frame = burnOrder[burnIndex];
        burnIndex += 1;
        return frame;
    };

    const applyFrame = () => {
        overlay.style.backgroundImage = `url("${overlays[overlayIndex]}")`;
        edges.style.backgroundImage = `url("${nextEdgeFrame()}")`;
        overlayIndex = (overlayIndex + 1) % overlays.length;

        if (burn) {
            burn.style.backgroundImage = `url("${nextBurnFrame()}")`;
        }

        if (vectors) {
            vectors.style.backgroundImage = `url("${nextVectorFrame()}")`;
        }
    };

    applyFrame();
    window.setInterval(applyFrame, 500);
})();
