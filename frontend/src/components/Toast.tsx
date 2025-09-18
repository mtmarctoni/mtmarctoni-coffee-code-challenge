"use client";

import React, { useEffect } from "react";
import { ErrorIcon, CloseIcon } from "./icons";

type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto-dismiss after X milliseconds
};

export default function Toast({ message, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-error text-white rounded-lg shadow-lg w-[327px]">
        <div className="flex items-center gap-3 p-4">
          {/* Error Icon */}
          <div className="flex-shrink-0">
            <ErrorIcon className="w-6 h-6 text-white" />
          </div>
          
          {/* Message */}
          <div className="flex-1">
            <p className="text-sm font-medium text-white leading-tight">
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
            aria-label="Close notification"
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}