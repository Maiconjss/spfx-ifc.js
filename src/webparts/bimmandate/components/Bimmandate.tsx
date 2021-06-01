import * as React from 'react';
import Dropzone from 'react-dropzone';
import { IBimmandateProps } from './IBimmandateProps';
import { ClippingComponent, Viewer } from './view';
import { Axes, Grid } from './view/components';


const Bimmandate: React.FC<IBimmandateProps> = () => {
  let viewer: Viewer;
  let grid;
  let axes;
  let clipping: ClippingComponent;

  const dropzoneRef:any = React.createRef();

  React.useEffect(() => {
    let  container:any = document.getElementById("viewer-container");
    viewer = new Viewer(container);
    // @ts-ignore
    viewer.ifcLoader.setWasmPath("../../");

    grid = new Grid(viewer, 100,100);
    axes = new Axes(viewer);
    clipping = new ClippingComponent(viewer); 

    viewer = viewer;

  },[]);


 const  onDrop = (files: any[]) => {
  viewer.loadIfc(files[0],true);
};

const handleToggleClipping = () => {
    clipping.active = !clipping.active;
}

const handleClickOpen = () => {
    dropzoneRef.current.open()
}
 
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100vh"}}>
    <aside style={{ width: 50 }}>
        <h1 onClick={handleClickOpen}>
            <hr />vOK
        </h1>
        <h1 onClick={handleToggleClipping}>
            <hr /> DROP
        </h1>
    </aside>
    <Dropzone ref={dropzoneRef} onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
          </div>
        )}
    </Dropzone>
    <div style={{ flex: "1 1 auto", border: "solid red 1px", minWidth: 0}}>
        <div id="viewer-container" style={{ position: 'relative', height: "100%", width: "100%"}} />
    </div>
</div>
    );
  
}

export default Bimmandate;