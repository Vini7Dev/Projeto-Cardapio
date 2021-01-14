/**
 * Component: Add Photo
 */

import React, { useCallback, ChangeEvent, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import AddLogoBackground from '../../assets/images/AddLogoBackground.png';

// Component styles
import { Container } from './styles';

interface IAddLogoProps {
    setSelectedFile(file: File | null): void;
    defaultFileURL?: string;
}

const AddLogo: React.FC<IAddLogoProps> = ({ setSelectedFile, defaultFileURL }) => {
    // Logo URL state
    const [imageURL, setImageURL] = useState('');

    // When exists a default file, update the image URL
    useEffect(() => {
        if(defaultFileURL) {
            setImageURL(defaultFileURL);
        }
    }, [defaultFileURL, setSelectedFile]);

    // Update logo selected file
    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // Getting file data
        const fileSelected = e.target.files?.item(0);

        if(fileSelected) {
            // Update data from selected logo file
            setSelectedFile(fileSelected);

            // Update preview image URL
            setImageURL(URL.createObjectURL(fileSelected));
        }
    }, [setSelectedFile]);

    return (
      <Container imageURL={imageURL || AddLogoBackground}>
        <div className="preview-image-show" />

        <label htmlFor="file-input">
          <FiPlus size={40} color="#FFFFFF" />

          <input
            id="file-input"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleSelectFile}
          />
        </label>
      </Container>
    );
}

export default AddLogo;