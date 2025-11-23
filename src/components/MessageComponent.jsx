import React from "react";

const MessageComponent = ({ type = "success", text, onClose }) => {
    if (!text) return null;

    const isSuccess = type === "success";
    const bgColor = isSuccess ? "bg-green-600" : "bg-red-600";

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl transition-opacity duration-300 transform text-white ${bgColor}`}
        >
            <div className="flex items-center">
                {/* Icono */}
                <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isSuccess ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"
                        />
                    )}
                </svg>

                <p className="font-semibold">{text}</p>

                {/* Botón de cierre solo en mensajes de error */}
                {!isSuccess && (
                    <button
                        onClick={onClose}
                        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default MessageComponent;
