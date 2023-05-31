import * as React from "react";

const Viewer = ({ tileSources, currentPage }) => {
  // Create a ref for the viewer.
  const viewerRef = React.useRef(null);
  const [viewer, setViewer] = React.useState(null);

  React.useEffect(() => {
    if (tileSources && viewer) {
      viewer.goToPage(currentPage);
    }
  }, [currentPage]);

  // When the component mounts, check if window and document are available. If they aren't,
  // then we can't render the viewer.
  // If they are available, the OpenSeaDragon viewer will be lazy loaded, and instantiated.
  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      import("openseadragon").then((OpenSeaDragon) => {

        const InitOpenSeadragon = () => {
          viewer && viewer.destroy();
          
          // Create the viewer.
          const viewer = new OpenSeaDragon.default({
            element: viewerRef.current,
            tileSources: tileSources,
            showNavigator: true,
            showRotationControl: true, // Show rotation buttons
            prefixUrl: "//openseadragon.github.io/openseadragon/images/",
            nextButton: "nonexistant",
            previousButton: "nonexistant",
            sequenceMode: true,
          });
          setViewer(viewer);
        };
        InitOpenSeadragon();
      });
    }
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <div
      id="openseadragon"
      ref={viewerRef}
      style={{ height: "85vh", width: "100%" }}
    />
  );
};

export default Viewer;
