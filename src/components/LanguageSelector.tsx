import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { supportedLanguages } from '../utils/supportedMimeTypes';

interface LanguageSelectorProps {
  selectedLanguages: string[]; 
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>; 
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguages,
  setSelectedLanguages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null); 

  const toggleLanguage = (languageValue: string) => {
    setSelectedLanguages((prevSelected: string[]) =>
      prevSelected.includes(languageValue)
        ? prevSelected.filter((lang) => lang !== languageValue)
        : [...prevSelected, languageValue]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-72 mx-auto" ref={selectorRef}>
      <div className="relative">
        <div
          className="bg-orange-400 text-white p-3 rounded-md flex items-center justify-between cursor-pointer hover:bg-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {selectedLanguages.length > 0
              ? selectedLanguages
                  .map((langValue) => supportedLanguages.find((lang) => lang.value === langValue)?.label || langValue)
                  .join(', ')
              : 'Select languages...'}
          </span>
          <ChevronDown className="ml-2 flex-shrink-0 text-white" size={20} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-orange-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {supportedLanguages.map((language) => (
              <div
                key={language.value}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-200"
                onClick={() => toggleLanguage(language.value)}
              >
                <div
                  className={`w-5 h-5 rounded-sm mr-2 flex items-center justify-center ${
                    selectedLanguages.includes(language.value)
                      ? 'bg-orange-400'
                      : 'border border-gray-400'
                  }`}
                >
                  {selectedLanguages.includes(language.value) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <span className="text-gray-700">{language.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
