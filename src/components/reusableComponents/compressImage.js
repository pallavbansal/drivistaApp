import ImageResizer from 'react-native-image-resizer';

async function compressImage(imagePath) {
  // Define the maximum dimensions for the compressed image
  const maxWidth = 800; // You can adjust this value as needed
  const maxHeight = 800; // You can adjust this value as needed

  // Set the quality for the compressed image (0 to 100)
  const quality = 75; // You can adjust this value as needed

  try {
    // Compress the image
    const compressedImage = await ImageResizer.createResizedImage(
      imagePath,
      maxWidth,
      maxHeight,
      'JPEG',
      quality,
      0,
      undefined,
      false
    );

    // The compressed image is now available at compressedImage.uri
    return compressedImage;
  } catch (error) {
    console.error('Error compressing image:', error);
    return null; // Return null in case of an error
  }
}

export { compressImage };
