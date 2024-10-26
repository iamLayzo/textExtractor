import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import LanguageSelector from "./components/LanguageSelector";
import { recognizeTextFromImage } from "./services/ocrService";
import ProgressBar from "./components/ProgressBar";
import TextDisplay from "./components/TextDisplay";
import Button from "./components/Button";
import Pattern from "./components/Pattern"; 

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["eng"]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelect = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setErrorMessage(null);
    } else {
      setImage(null); 
      setText("");
      setErrorMessage(null);
      setProgress(0);
    }
  };

  const extractText = async () => {
    if (image) {
      setText("");
      setProgress(0);
      setIsExtracting(true);
      setErrorMessage(null);

      try {
        const extractedText = await recognizeTextFromImage(
          image,
          selectedLanguages,
          setProgress
        );
        if (extractedText.trim().length === 0) {
          setErrorMessage("No text could be extracted from the image.");
        } else {
          setText(extractedText);
        }
      } catch (error) {
        setErrorMessage(
          "Error extracting text from the image. Please try again."
        );
      } finally {
        setIsExtracting(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-gray-300 flex flex-col items-center justify-center p-4">
      <Pattern /> {/* Fondo de patrón */}
      <h1 className="text-4xl font-bold mb-2 text-center text-white">
      ImageTextScan
      </h1>
      <p className="text-lg mb-4 text-center text-white">
        Easily extract text from images and convert it into editable content
        with just a click.
      </p>
      <div className="flex flex-col items-center w-full max-w-md space-y-4 p-6 rounded-lg shadow-lg bg-gray-900">
        <FileUploader onImageSelect={handleImageSelect} />

        <LanguageSelector
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {image && (
          <Button
            variant="primary"
            size="lg"
            onClick={extractText}
            isLoading={isExtracting}
            className="w-full mt-4"
          >
            Extract Text
          </Button>
        )}

        {progress > 0 && <ProgressBar progress={progress} />}

        {text && <TextDisplay text={text} />}
      </div>
    </div>
  );
};

export default App;
