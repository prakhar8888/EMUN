"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

// Create the context
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Global State: User Authentication (Ready for backend integration)
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Global State: Conference Data
  const [activeConference, setActiveConference] = useState({
    name: "MUNSphere Global Summit",
    year: new Date().getFullYear(),
    status: "registration_open"
  });

  // Global State: Notifications (Toasts)
  const [notifications, setNotifications] = useState([]);

  // Simulate initial auth check on mount
  useEffect(() => {
    const initAuth = async () => {
      // Placeholder for future API call: const response = await fetch('/api/auth/me');
      setTimeout(() => {
        setIsAuthLoading(false);
      }, 1000);
    };
    initAuth();
  }, []);

  // Authentication Methods
  const login = async (credentials) => {
    // Future backend integration goes here
    setUser({ id: "1", name: "Eleanor Sterling", role: "Secretariat" });
    notify("Successfully authenticated. Welcome back.", "success");
  };

  const logout = () => {
    // Future backend integration goes here
    setUser(null);
    notify("You have been securely logged out.", "info");
  };

  // Notification Methods
  const notify = useCallback((message, type = "info", duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  }, []);

  // Values exposed to the rest of the application
  const value = {
    user,
    isAuthLoading,
    activeConference,
    login,
    logout,
    notify,
  };

  return (
    <AppContext.Provider value={value}>
      {children}

      {/* Global Notification Renderer */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col space-y-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map((note) => (
            <NotificationToast
              key={note.id}
              notification={note}
              onClose={() => removeNotification(note.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Internal Toast Component for the Notification System
function NotificationToast({ notification, onClose }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-burnished-gold" />,
    error: <AlertCircle className="w-5 h-5 text-mahogany" />,
    info: <Info className="w-5 h-5 text-royal-teal" />
  };

  const borderColors = {
    success: "border-burnished-gold/50",
    error: "border-mahogany/50",
    info: "border-royal-teal/50"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`flex items-start p-4 space-x-3 bg-deep-navy/95 backdrop-blur-md text-white rounded-lg shadow-2xl border ${borderColors[notification.type]} max-w-sm w-full pointer-events-auto`}
      layout
    >
      <div className="shrink-0 mt-0.5">{icons[notification.type]}</div>
      <div className="flex-1 text-sm font-medium leading-relaxed tracking-wide">
        {notification.message}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 p-1 text-gray-400 hover:text-white transition-colors focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
