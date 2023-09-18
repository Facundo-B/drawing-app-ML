class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = size
        this.canvas.height = size
        this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d");
        this.paths = []
        this.isDrawing = false

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onpointerdown = (evt) => {
            const mouse = this.#getMouse(evt);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        this.canvas.onpointermove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1]
                lastPath.push(mouse);
                this.#redraw();
            }
        }

        this.canvas.onpointerup = () => {
            this.isDrawing = false
        }
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
    }
}