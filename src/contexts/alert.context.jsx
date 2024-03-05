import { Alert, PortalContainer } from "base-ui-react";
import React, { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alertProps, setAlertProps] = useState(null);
  const [open, setOpen] = useState(false);

  const showAlert = useCallback((props) => {
    setAlertProps(props);
    setOpen(true);
    setTimeout(() => setOpen(false), 5000); // Automatically close the alert after 5 seconds
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {open && alertProps && (
        <PortalContainer
          style={{
            position: "fixed",
            bottom: "32px",
            right: "96px",
            background: "#fff",
            borderRadius: "8px",
            paddingRight: "66px",
            border: "1px solid #DDE2E5",
          }}
        >
          <Alert
            {...alertProps}
            open={open}
            onClose={handleClose}
            style={{ position: "fixed" }}
          />
        </PortalContainer>
      )}
    </AlertContext.Provider>
  );
};
