

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {

  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-4 w-full">
      <h2 className="text-xl font-semibold text-black">Extracted Text:</h2>
      <p className="whitespace-pre-wrap mt-2 text-orange-600">{text}</p> 
    </div>
  );
};

export default TextDisplay;
