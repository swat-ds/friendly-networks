import * as React from "react";

const Viewer = ({ imageId }) => {
  // console.log(imageId);
  const baseURl = "https://digitalcollections.tricolib.brynmawr.edu/node/";
  const postfix = "/manifest";
  let url = baseURl + imageId + postfix;
  // Create a ref for the viewer.
  const viewerRef = React.useRef(null);
  const [viewer, setViewer] = React.useState(null);

  React.useEffect(() => {
    if (url && viewer) {
      viewer.open(url);
    }
  }, [url]);

  // When the component mounts, check if window and document are available. If they aren't,
  // then we can't render the viewer.
  // If they are available, the OpenSeaDragon viewer will be lazy loaded, and instantiated.
  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      import("openseadragon").then((OpenSeaDragon) => {
        // Set the tile sources.
        //Getting the id ready to feed to viewer

        const InitOpenSeadragon = () => {
          viewer && viewer.destroy();

          const tileSources = [encodeURI(url)];
          // Create the viewer.
          const viewer = new OpenSeaDragon.default({
            element: viewerRef.current,
            // sequenceMode: true,
            tileSources: tileSources,
            showNavigator: true,
            // Initial rotation angle

            // Show rotation buttons
            showRotationControl: true,
            prefixUrl: "//openseadragon.github.io/openseadragon/images/",
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
