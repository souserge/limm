class Level {
    constructor(levelId, tilelayerData, eventlayerData, tilesize, wid, hei, xoff, yoff, cr, cg, cb) {
        this.id = levelId;
        this.tilesize = tilesize;

        this.size = {
            x: wid,
            y: hei
        }
        this.offset = {
            x: xoff,
            y: yoff
        }

        this.color = {
            r: cr,
            g: cg,
            b: cb
        }

        this.tilelayer = new Tilelayer(tilelayerData, this.tilesize, this.size, this.offset, this.color);
        this.eventlayer = new Eventlayer(eventlayerData, this.tilesize, this.size, this.offset);
    }

    render() {
        background(this.color.r*0.5, this.color.g*0.5, this.color.b*0.5);
        this.tilelayer.renderMap();
    }
}