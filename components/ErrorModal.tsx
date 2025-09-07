"use client";

import { useEffect } from "react";
import ClientOnly from "./ClientOnly";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
  type?: "error" | "warning" | "info";
  showRetry?: boolean;
  onRetry?: () => void;
}

export default function ErrorModal({
  isOpen,
  onClose,
  title = "Transaction Failed",
  message,
  details,
  type = "error",
  showRetry = false,
  onRetry,
}: ErrorModalProps) {
  // Auto-close after 10 seconds for non-critical errors
  useEffect(() => {
    if (isOpen && type !== "error") {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case "error":
        return {
          icon: "❌",
          bgGradient: "from-red-500 to-rose-500",
          borderColor: "border-red-500/20",
          textColor: "text-red-300",
          iconBg: "bg-red-500/10",
        };
      case "warning":
        return {
          icon: "⚠️",
          bgGradient: "from-yellow-500 to-orange-500",
          borderColor: "border-yellow-500/20",
          textColor: "text-yellow-300",
          iconBg: "bg-yellow-500/10",
        };
      case "info":
        return {
          icon: "ℹ️",
          bgGradient: "from-blue-500 to-cyan-500",
          borderColor: "border-blue-500/20",
          textColor: "text-blue-300",
          iconBg: "bg-blue-500/10",
        };
      default:
        return {
          icon: "❌",
          bgGradient: "from-red-500 to-rose-500",
          borderColor: "border-red-500/20",
          textColor: "text-red-300",
          iconBg: "bg-red-500/10",
        };
    }
  };

  const { icon, bgGradient, borderColor, textColor, iconBg } = getIconAndColors();

  return (
    <ClientOnly>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="health-vault-card p-8 max-w-lg w-full mx-4 slide-up text-center">
          {/* Animated Icon */}
          <div className={`w-20 h-20 bg-gradient-to-br ${bgGradient} rounded-3xl flex items-center justify-center mx-auto mb-6 ${type === 'error' ? 'animate-pulse' : ''}`}>
            <span className="text-4xl">{icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-slate-50 mb-4">{title}</h3>

          {/* Main Message */}
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            {message}
          </p>

          {/* Details (if provided) */}
          {details && (
            <div className={`${iconBg} ${borderColor} border p-4 rounded-lg mb-6 text-left`}>
              <h4 className={`${textColor} font-semibold mb-2 flex items-center space-x-2`}>
                <span>🔍</span>
                <span>Technical Details</span>
              </h4>
              <p className="text-slate-200 text-sm font-mono break-all">
                {details}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            {showRetry && onRetry && (
              <button 
                onClick={onRetry}
                className="health-vault-button w-full"
              >
                🔄 Retry Transaction
              </button>
            )}
            
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 text-slate-400 hover:text-slate-200 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
            >
              Close
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
            <h4 className="text-slate-300 font-semibold mb-2 flex items-center justify-center space-x-2">
              <span>💡</span>
              <span>Need Help?</span>
            </h4>
            <p className="text-slate-400 text-sm">
              {type === "error" 
                ? "Check your wallet connection and try again. If the problem persists, contact support."
                : "This is a temporary issue. Please try again in a few moments."
              }
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-md flex items-center justify-center">
                <span className="text-sm">🔐</span>
              </div>
              <p className="text-emerald-300 text-xs font-medium">
                Your data remains secure with ZAMA FHE encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
