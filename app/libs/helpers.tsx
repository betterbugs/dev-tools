const detectBrowser = () => {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Edg/")) {
      return "edge";
    }
  }
  return "chrome";
};

export { detectBrowser };
