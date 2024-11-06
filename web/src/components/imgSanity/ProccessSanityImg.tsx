const ImgSanity = ({
  imageLink,
  image,
  altText,
  style,
  className,
  id,
  loading,
  aspectRatio,
  maxWidth = 1920,
}: {
  imageLink: any;
  image?: any;
  altText?: string;
  style?: any;
  className?: string;
  id?: string;
  loading?: "eager" | "lazy";
  aspectRatio?: string | string[];
  maxWidth?: number;
}) => {

  const breakpoints = [480, 768, 1050, 1450, 1920];

  //
  //
  // Src, srcset, sizes (use maxWidth as number that is the largest size for image to process / prevent unnecessary upscaling by sanity)
  //
  let imgSrc = `${imageLink}?w=${maxWidth}&fm=webp`
  let imgSrcSet = breakpoints
    .filter(bp => bp <= maxWidth)
    .map(bp => `${imageLink}?w=${bp}&fm=webp ${bp}w`)
    .join(', ');

  let imgSizes = breakpoints
    .filter(bp => bp <= maxWidth)
    .map(bp => `(max-width: ${bp}px) ${bp}px`)
    .join(', ') + `, ${maxWidth}px`;

  let addedImgStyles;
  let addedWrapperStyles;

  //
  //
  // Hotspot and Aspect Ratio Styles
  //
  // Hotspot
  function generateHotspotStyles(hotspot: { height: number, width: number, x: number, y: number }) {
    const xPosition = Math.round(hotspot.x * 100);
    const yPosition = Math.round(hotspot.y * 100);
  
    return `${xPosition}% ${yPosition}%`;
  }
  
  // Aspect Ratio
  function generateAspectRatioStyles(aspectRatio: string | string[]) {
    if (typeof aspectRatio === 'string') {
      return aspectRatio;
    }
    const aspectRatioStyles = aspectRatio.reduce((styles, ratio, index) => {
      const breakpoint = breakpoints[index];
      if (breakpoint) {
        styles[`@media (min-width: ${breakpoint})`] = { aspectRatio: ratio };
      }
      return styles;
    }, {});

    return aspectRatioStyles;
  }

  // create the inline styles
  if (style) {
    addedImgStyles = style;
  }
  if (image?.hotspot) {
    const hotspotStyles = generateHotspotStyles(image.hotspot);
    addedImgStyles = { objectFit: 'cover', objectPosition: hotspotStyles };
  }
  if (aspectRatio) {
    addedWrapperStyles = generateAspectRatioStyles(aspectRatio);
    addedImgStyles = { ...addedImgStyles, width: '100%', height: '100%' };
  }

  // image component defined here so it can be conditionally wrapped below
  const ImageComponent = (
    <img
      src={imgSrc}
      srcSet={imgSrcSet}
      sizes={imgSizes}
      alt={altText || "Kawasaki Commercial Image"}
      className={className || ""}
      id={id || ""}
      style={addedImgStyles}
      loading={loading || "lazy"}
    />
  );


  return (
    addedWrapperStyles ? 
    <span style={addedWrapperStyles}>{ImageComponent}</span> :
    <>{ImageComponent}</>
  );
}

export default ImgSanity;