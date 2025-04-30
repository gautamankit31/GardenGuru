import { useState, useEffect } from "react";
import { geminiChat } from "../services/operations/Gemini";
import { useDispatch, useSelector } from "react-redux";

export const GeminiChat = () => {
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { userPrompts, botConversations, loading } = useSelector(
    (state) => state.gemini
  );
  const dispatch = useDispatch();

  const handleUserInput = () => {
    if (image || inputText) {
      dispatch(geminiChat(image, inputText, token));
      setImage(null);
      setInputText("");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePromptClick = (text) => {
    setInputText(text);
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [userPrompts, botConversations]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
      {/* Chat container */}
      <div
        id="chat-container"
        className="w-full h-96 bg-gray-100 p-4 rounded-lg overflow-y-scroll mb-4 space-y-4"
      >
        {/* Initial prompt if no messages */}
        {userPrompts.length === 0 && (
          <div className="text-center text-gray-700 space-y-3 mt-10">
            <h2 className="text-xl font-semibold">How can I help you today?</h2>
            <div className="flex flex-col items-center gap-2">
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
                onClick={() => handlePromptClick("Tell me more about this plant?")}
              >
                Tell me more about this plant?
              </button>
              <button
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
                onClick={() => handlePromptClick("Help me cure this disease.")}
              >
                Help me cure this disease.
              </button>
            </div>
          </div>
        )}

        {/* Interleaving user prompts and bot responses */}
        {userPrompts.map((prompt, index) => (
          <div key={`chat-pair-${index}`}>
            {/* User prompt */}
            <div className="flex justify-end mb-2">
              <div className="bg-[#20b43c] text-white p-3 rounded-lg max-w-xs self-end">
                <p><strong>You:</strong> {prompt}</p>
              </div>
            </div>

            {/* Bot response */}
            {botConversations[index] && (
              <div className="flex justify-start mb-2">
                <div className="bg-[#20b486] text-white p-3 rounded-lg max-w-xs self-start">
                  <p><strong>Gemini:</strong> {botConversations[index].resp}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Display selected image before sending */}
        {image && (
          <div key={`user-image`} className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs self-end">
              <p><strong>You:</strong></p>
              <img
                src={URL.createObjectURL(image)}
                alt="user-uploaded"
                className="w-32 h-32 object-cover rounded-md mt-2"
              />
            </div>
          </div>
        )}

        {/* Loading message */}
        {loading && (
          <div className="text-gray-500 italic text-center mt-2">
            <p><em>Hold on, baby...</em></p>
          </div>
        )}
      </div>

      {/* Input field, image input, and send button */}
      <div className="flex w-full max-w-3xl">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black-500"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="p-3 border border-gray-300"
        />
        <button
          onClick={handleUserInput}
          className="p-3 bg-[#20b486] text-white rounded-r-lg hover:bg-[#20b43c] transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};
