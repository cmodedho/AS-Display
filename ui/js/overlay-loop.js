(() => {
    const overlay = document.querySelector(".layout.overlay.outer");
    const edges = document.querySelector(".layout.overlay.edges");

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

    [...overlays, ...edgeOverlays].forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    let index = 0;

    const applyFrame = () => {
        overlay.style.backgroundImage = `url("${overlays[index]}")`;
        edges.style.backgroundImage = `url("${edgeOverlays[index]}")`;
        index = (index + 1) % overlays.length;
    };

    applyFrame();
    window.setInterval(applyFrame, 500);
})();
