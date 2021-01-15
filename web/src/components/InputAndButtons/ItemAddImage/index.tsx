/**
 * Component: Item Add Image
 */

import React, { useCallback, ChangeEvent, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

// Component styles
import { Container } from './styles';

interface IItemAddImageProps {
    setSelectedImage(file: File): void;
}

const ItemAddImage: React.FC<IItemAddImageProps> = ({
    setSelectedImage,
}) => {
    // Logo URL state
    const [previewURL, setPreviewURL] = useState('');

    // Update image selected file
    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // Getting file data
        const fileSelected = e.target.files?.item(0);

        if(fileSelected) {
            // Update data from selected image file
            setSelectedImage(fileSelected);

            // Update preview image URL
            setPreviewURL(URL.createObjectURL(fileSelected));
        }
    }, [setSelectedImage]);

    return (
      <Container imageURL={previewURL}>
        <div id="image-preview" />


        <div id="add-file-input-area">
          <label htmlFor="add-file-input" id="add-file-label">
            <FiCamera size={25} />

            Adicionar imagem

            <input
              type="file"
              id="add-file-input"
              onChange={handleSelectFile}
              accept=".png, .jpg, .jpeg"
            />
          </label>
        </div>
      </Container>
    );
}

export default ItemAddImage;