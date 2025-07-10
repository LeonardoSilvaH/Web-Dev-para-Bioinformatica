var glviewer = null

document.onload = readPDB("1bga.pdb")

function readPDB(id){
    var txt = id;

    $.get(txt, function(d){
        moldata = data = d
        
        glviewer = $3Dmol.createViewer("pdb", {
            defaultcolors: $3Dmol.rasmolElementColors
        });

        glviewer.setBackgroundColor(0x242830)

        receptorModel = m = glviewer.addModel(data, "pqr");

        glviewer.setStyle({}, {cartoon:{color:spectrum}});
        glviewer.addSurface($3Dmol.SurfaceType, {opacity:0.3});

        atoms = m.selectedAtoms({});
        for ( var i in atoms) {
            var atom = atoms[i];
            atom.clickable = true;
            atom.callback = atomcallback;
        }  
        
        glviewer.mapAtomProperties($3Dmol.applyPartialCharges);
        glviewer.Zoomto();
        glviewer.render();
    });

}
