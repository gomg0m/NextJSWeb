
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


const photos = [
    {
      src: "images/OlympicHallStage1.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallStage2.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallStage3.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallStage4.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallStage5.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallStage6.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallStage7.png",
      width: 4,
      height: 3
    },
    {
      src: "images/OlympicHallStage8.png",
      width: 1,
      height: 1
    },
    {
      src: "images/OlympicHallStage9.png",
      width: 3,
      height: 4
    },
    {
      src: "images/OlympicHallStage10.png",
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