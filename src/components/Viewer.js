import * as React from "react";
// import OpenSeaDragon from "openseadragon"

const Viewer = ({ tileSources, currentPage }) => {
  // Create a ref for the viewer.
  const viewerRef = React.useRef(null);
  const [viewer, setViewer] = React.useState(null);

  React.useEffect(() => {
    if (tileSources && viewer) {
      viewer.goToPage(currentPage);
    }
  }, [currentPage, tileSources.length, viewer]);

  // When the component mounts, check if window and document are available.
  // If they aren't, then we can't render the viewer.
  // If they are available, the OpenSeaDragon viewer will be 
  // lazy loaded, and instantiated.
  React.useEffect(() => {
    if (
      tileSources.length > 0
      && typeof window !== "undefined" 
      && typeof document !== "undefined"
  ) {
      import("openseadragon").then((OpenSeaDragon) => {
        const InitOpenSeadragon = (viewerParam, tileParam) => {
          viewerParam && viewerParam.destroy();
          
          // Create the viewer.
          const newViewer = new OpenSeaDragon.default({
            element: viewerRef.current,
            tileSources: tileParam,
            showNavigator: true,
            showRotationControl: true,
            prefixUrl: "//openseadragon.github.io/openseadragon/images/",
            nextButton: "nonexistant",
            previousButton: "nonexistant",
            sequenceMode: true,
          });
          setViewer(newViewer);
        };
        InitOpenSeadragon(viewer, tileSources);
      });
    }
  }, [tileSources.length]);

  return (
    <div
      id="openseadragon"
      ref={viewerRef}
      style={{ height: "85vh", width: "100%" }}
    />
  );
};

export default Viewer;
