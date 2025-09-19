"use client";

import React, { useEffect } from "react";
import { ErrorIcon, CloseIcon } from "./icons";
import { ERROR_TTL } from "@/app/config";

type ToastProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto-dismiss after X milliseconds
  type?: 'error' | 'warning' | 'info'; // Different toast types
};

export default function Toast({ message, isVisible, onClose, duration = ERROR_TTL, type = 'error' }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'error' ? 'bg-error' : type === 'warning' ? 'bg-warning' : 'bg-info';

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${bgColor} text-white rounded-lg shadow-lg w-[327px]`}>
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