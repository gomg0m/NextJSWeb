
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


const photos = [
    {
      src: "images/OlympicHallInternal1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal2.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal3.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal4.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal5.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal6.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallInternal7.png",
      width: 4,
      height: 3
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