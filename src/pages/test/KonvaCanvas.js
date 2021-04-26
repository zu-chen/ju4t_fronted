import React, { useState } from "react";
import { Stage, Layer, Text, Circle, Image } from "react-konva";
import useImage from "use-image";

// image for canvas
// const LionImage = () => {
//   const [image] = useImage("/img/products/cookie-svgrepo-com.svg");
//   return <Image id="test-drag-img" image={image} draggable />;
// };

const KonvaCanvas = () => {
  // state for the positions of text
  const [isDraggingText, setisDraggingText] = useState(false);
  const [xText, setXText] = useState(20);
  const [yText, setYText] = useState(20);

  // state for the positions of the circle
  const [isDraggingCircle, setisDraggingCircle] = useState(false);
  const [xCircle, setXCircle] = useState(50);
  const [yCircle, setYCircle] = useState(250);

  // state fot the canvas image (initially a transparent image)
  const [canvasImg, setCanvasImg] = useState(
    "/img/products/transparent-block.svg"
  );
  // theImage will be passed to <Image>
  const [theImage] = useImage(canvasImg);

  // access konva node
  const cookieRef = React.useRef(null);

  // this function is for the dragBoundFunc of Konva that sets canvas bounds (restrict item movement within canvas), or else you wouldbe able to drag an item off canvas
  const restrictMovement = (pos) => {
    // restrict x movement
    let newX;
    if (pos.x < 0) {
      newX = 0;
    } else if (pos.x > 190) {
      newX = 190;
    } else newX = pos.x;

    // restrict y movement
    let newY;
    if (pos.y < 0) {
      newY = 0;
    } else if (pos.y > 548) {
      newY = 548;
    } else newY = pos.y;

    return {
      x: newX,
      y: newY,
    };
  };

  return (
    <div className="container">
      <h1>Konva Canvas test</h1>
      <Stage width={293} height={563}>
        <Layer>
          <Text
            text="Draggable text"
            fontSize={15}
            x={xText}
            y={yText}
            draggable
            fill={isDraggingText ? "green" : "black"}
            onDragStart={() => {
              setisDraggingText(true);
            }}
            onDragEnd={(e) => {
              setisDraggingText(false);
              setXText(e.target.x());
              setYText(e.target.y());
            }}
            dragBoundFunc={restrictMovement}
          />
          <Circle
            x={xCircle}
            y={yCircle}
            radius={50}
            draggable
            fill={isDraggingCircle ? "green" : "black"}
            onDragStart={() => {
              setisDraggingCircle(true);
            }}
            onDragEnd={(e) => {
              setisDraggingCircle(false);
              setXCircle(e.target.x());
              setYCircle(e.target.y());
            }}
          />
          <Image
            id="test-drag-img"
            ref={cookieRef}
            image={theImage}
            draggable
          />
        </Layer>
      </Stage>

      {/* test file upload */}
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Example file input</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              accept="image/*"
              name="testImage"
              onChange={(e) => {
                const output = document.querySelector("#output");

                // show uplodad file
                console.log(e.target.files[0]);
                let generatedImgURL = URL.createObjectURL(e.target.files[0]);
                output.src = generatedImgURL;

                // set canvas image
                setCanvasImg(generatedImgURL);
              }}
            />
          </div>
        </form>
        <img id="output" width="200" alt="img" />
      </div>
    </div>
  );
};

export default KonvaCanvas;
