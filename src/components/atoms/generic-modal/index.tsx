"use client";

import React, { useEffect, useRef } from "react";
import './index.css';

const GenericModal = ({ isOpen, onClose, children, customClasses = "", customStyles = {} }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onClose();
      }
  };

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = modalRef.current?.querySelectorAll(focusableElements)[0] as HTMLElement;
    const focusableContent = modalRef.current?.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent?.[focusableContent.length - 1] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      const isTabPressed = e.key === "Tab";

      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", trapFocus);

    firstFocusableElement?.focus();

    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", trapFocus);

      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start h-full z-30">
      <div
        ref={modalRef}
        className={`rounded-lg p-5 h-auto flex flex-col relative ${customClasses}`}
        style={customStyles}
      >
        <button
          className="absolute top-4 right-8 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
