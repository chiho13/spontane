function OffsetLocation() {
    const component = {};
    component.getCoords = function(x, y, LAT, ZOOM) {
        var degreesPerPixelX = 360 / Math.pow(2, ZOOM + 8);
        var degreesPerPixelY = 360 / Math.pow(2, ZOOM + 8) * Math.cos(LAT * Math.PI / 180);
    
        return {
            lat: degreesPerPixelY * ( y - window.innerHeight / 2),
            lon: degreesPerPixelX * ( x  - window.innerWidth / 2),
        };
    }

    return component;
   
}

export default OffsetLocation;