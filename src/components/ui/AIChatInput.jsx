import React, { useState, useRef } from "react";
import { createSupportTicket } from "../../services/support";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Code,
  BookOpen,
  PenTool,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIAssistantInterface() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const [reasonEnabled, setReasonEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);


  const [activeCommandCategory, setActiveCommandCategory] = useState(null);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const commandSuggestions = {
    suggestions: [
      "Mon produit est venu casse",
      "Je n'ai pas recu la commande",
      "J'ai pas recu le bon produit",
      "Je veux un remboursement",
      "Je veux echanger le produit c'est pas la bonne taille",
    ],

  };


  const handleUploadFile = () => {
  fileInputRef.current.click();
};


const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  setUploadedFiles((prev) => [
    ...prev,
    ...files
  ]);
};

  const handleCommandSelect = (command) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

 const handleSendMessage = async () => {
  if (!inputValue.trim() && uploadedFiles.length === 0) return;

  try {
    const image =
      uploadedFiles.find(file => file.type.startsWith("image/")) || null;

    const audio =
      uploadedFiles.find(file => file.type.startsWith("audio/")) || null;

    const response = await createSupportTicket({
  description: inputValue,
  image,
  audio,
});

setResponseMessage({
  motif: response.texte_recherche,
  regle: response.rag.regle,
  statut: response.rag.statut.Statut,
});
    setInputValue("");
    setUploadedFiles([]);

  } catch (error) {
    setResponseMessage("Une erreur est survenue lors de l'envoi.");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-900 p-6">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">



        {/* Logo with animated gradient */}
        <div className="mb-8 w-20 h-20 relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="fuchsia-950"
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            className="w-full h-full"
          >
            <g clipPath="url(#cs_clip_1_ellipse-12)">
              <mask
                id="cs_mask_1_ellipse-12"
                style={{ maskType: "alpha" }}
                width="200"
                height="200"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <g mask="url(#cs_mask_1_ellipse-12)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path
                  fill="#0066FF"
                  fillOpacity="0.33"
                  d="M200 0H0v200h200V0z"
                ></path>
                <g
                  filter="url(#filter0_f_844_2811)"
                  className="animate-gradient"
                >
                  <path fill="#0066FF" d="M110 32H18v68h92V32z"></path>
                  <path fill="#0044FF" d="M188-24H15v98h173v-98z"></path>
                  <path fill="#0099FF" d="M175 70H5v156h170V70z"></path>
                  <path fill="#00CCFF" d="M230 51H100v103h130V51z"></path>
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_844_2811"
                width="385"
                height="410"
                x="-75"
                y="-104"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  result="effect1_foregroundBlur_844_2811"
                  stdDeviation="40"
                ></feGaussianBlur>
              </filter>
              <clipPath id="cs_clip_1_ellipse-12">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
              </clipPath>
            </defs>
            <g
              style={{ mixBlendMode: "overlay" }}
              mask="url(#cs_mask_1_ellipse-12)"
            >
              <path
                fill="gray"
                stroke="transparent"
                d="M200 0H0v200h200V0z"
                filter="url(#cs_noise_1_ellipse-12)"
              ></path>
            </g>
            <defs>
              <filter
                id="cs_noise_1_ellipse-12"
                width="100%"
                height="100%"
                x="0%"
                y="0%"
                filterUnits="objectBoundingBox"
              >
                <feTurbulence
                  baseFrequency="0.6"
                  numOctaves="5"
                  result="out1"
                  seed="4"
                ></feTurbulence>
                <feComposite
                  in="out1"
                  in2="SourceGraphic"
                  operator="in"
                  result="out2"
                ></feComposite>
                <feBlend
                  in="SourceGraphic"
                  in2="out2"
                  mode="overlay"
                  result="out3"
                ></feBlend>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Welcome message */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold bg-clip-text  bg-gradient-to-r from-blue-600 to-blue-400 mb-2">
               SMART HELP
            </h1>
            <p className="text-white max-w-md">
              Comment puisse-je vous aider?
            </p>
          </motion.div>
        </div>

{responseMessage && (
  <div className="w-full mb-4 p-5 bg-indigo-200 border border-gray-200 rounded-xl shadow-sm">
    
    <div className="mb-3">
      <span className="font-semibold text-blue-600">
        Motif de recherche :
      </span>
      <p className="text-gray-700">
        {responseMessage.motif}
      </p>
    </div>

    <div className="mb-3">
      <span className="font-semibold text-blue-600">
        Règle :
      </span>
      <p className="text-gray-700">
        {responseMessage.regle}
      </p>
    </div>

    <div>
      <span className="font-semibold text-blue-600">
        Statut :
      </span>
      <p className="text-gray-700">
        {responseMessage.statut}
      </p>
    </div>

  </div>
)}

        {/* Input area with integrated functions and file upload */}
        

        <div className="w-full bg-white border border-white-200 rounded-xl shadow-sm overflow mb-4">
          <div className="p-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Posez votre question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-gray-700 text-base outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 py-1 px-2 rounded-md border border-gray-200"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-gray-700">{file.name}</span>
                    <button
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search, Deep Research, Reason functions and actions */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex justify-end w-full">
      
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() && uploadedFiles.length === 0}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  inputValue.trim() || uploadedFiles.length > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upload files */}
          <div className="px-4 py-2 border-t border-gray-100">
                <input
                ref={fileInputRef}
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
                />
            <button
              onClick={handleUploadFile}
              className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors"
            >
              {showUploadAnimation ? (
                <motion.div
                  className="flex space-x-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                      variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: i * 0.1,
                          },
                        },
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Upload Files</span>
            </button>
          </div>
        </div>

        {/* Command categories */}
                      <div className="w-full grid grid-cols-1 gap-4 mb-4">
          <CommandButton
            icon={<BookOpen className="w-5 h-5" />}
            label="suggestions"
            isActive={activeCommandCategory === "suggestions"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "suggestions" ? null : "suggestions"
              )
            }
          />

        </div>

        {/* Command suggestions */}
<AnimatePresence>
  {activeCommandCategory && (
    <>
      {/* Fond sombre */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActiveCommandCategory(null)}
      />

      {/* Fenêtre modale */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.25 }}
      >
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

          {/* En-tête */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">
              Suggestions
            </h2>

            <button
              onClick={() => setActiveCommandCategory(null)}
              className="text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>

          {/* Liste */}
          <div className="max-h-96 overflow-y-auto">
            {commandSuggestions[activeCommandCategory].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleCommandSelect(suggestion)}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-blue-50 transition"
              >
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 text-left">
                  {suggestion}
                </span>
              </button>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
      </div>
    </div>
  );
}

function CommandButton({ icon, label, isActive, onClick }){
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
        isActive
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default AIAssistantInterface;