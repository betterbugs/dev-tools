const detectBrowser = () => {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Edg/")) {
      return "edge";
    }
  }
  return "chrome";
};

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export { detectBrowser, cn };
