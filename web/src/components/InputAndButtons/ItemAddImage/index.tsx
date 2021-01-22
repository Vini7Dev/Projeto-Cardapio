/**
 * Component: Item Add Image
 */

import React, { useCallback, ChangeEvent, useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';

import DefaultFoodImage from '../../../assets/images/DefaultFoodImage.png';

// Component styles
import { Container } from './styles';

interface IItemAddImageProps {
    setSelectedImage(file: File): void;
    defaultFileName?: string;
    defaultFileURL?: string;
}

const ItemAddImage: React.FC<IItemAddImageProps> = ({
    setSelectedImage,
    defaultFileName,
    defaultFileURL,
    ...rest
}) => {
    // Logo URL state
    const [previewURL, setPreviewURL] = useState('');

    // When exists a default file, update the image URL
    useEffect(() => {
        if(defaultFileName && defaultFileURL) {
            setPreviewURL(defaultFileURL);
        } else {
            setPreviewURL(DefaultFoodImage);
        }
    }, [defaultFileName, defaultFileURL, setPreviewURL]);

    // Update image selected file
    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            // Getting file data
            const fileSelected = e.target.files[0];

            if(fileSelected) {
                // Update data from selected image file
                setSelectedImage(fileSelected);

                // Update preview image URL
                setPreviewURL(URL.createObjectURL(fileSelected));
            }
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
              data-testid="add-file-input"
              onChange={handleSelectFile}
              accept=".png, .jpg, .jpeg"
              {...rest}
            />
          </label>
        </div>
      </Container>
    );
}

export default ItemAddImage;