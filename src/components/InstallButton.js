import { useEffect, useState } from "react";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <button onClick={installApp} style={styles.button}>
      Install App
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "14px 22px",
    backgroundColor: "#ff69b4",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "14px",
    boxShadow: "0 8px 20px rgba(255,105,180,0.4)",
    cursor: "pointer",
    zIndex: 1000,
  },
};

export default InstallButton;
