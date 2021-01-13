/**
 * Component: Add Photo
 */

import React, { useCallback, ChangeEvent, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import AddLogoBackground from '../../assets/images/AddLogoBackground.png';

// Component styles
import { Container } from './styles';

interface IAddLogoProps {
    setSelectedFile(file: File | null): void;
    defaultFileURL?: string;
}

const AddLogo: React.FC<IAddLogoProps> = ({ setSelectedFile, defaultFileURL }) => {
    // When exists a default file, update the preview
    useEffect(() => {
        if(defaultFileURL) {
            // Getting image preview element
            const logoPreview = document.querySelector<HTMLImageElement>('#logo-preview');

            if(logoPreview && defaultFileURL) {
                // Add URL to image preview
                logoPreview.src = defaultFileURL;
            }
        }
    }, [defaultFileURL, setSelectedFile]);

    // Update logo selected file
    const handleSelectFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // Getting image preview element
        const logoPreview = document.querySelector<HTMLImageElement>('#logo-preview');

        // Getting file data
        const fileSelected = e.target.files?.item(0);

        if(logoPreview && fileSelected) {
            // Add URL to image preview
            logoPreview.src = URL.createObjectURL(fileSelected);

            // Update data from selected logo file
            setSelectedFile(fileSelected);
        }
    }, [setSelectedFile]);

    return (
      <Container>
        <img id="logo-preview" alt="Logo Preview" src={AddLogoBackground} />

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