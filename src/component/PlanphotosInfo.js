
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const photos = [
    {
      src: "images/OlympicHallDrawing1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallDrawing2.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallDrawing3.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallDrawing4.png",
      width: 3,
      height: 4
    },
  ];
  

  export default function PictureView() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
    
    return (
      <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }