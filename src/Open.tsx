import "./open.css";

const Open = () => {
  return (
    <div id="iframeContainerOpen" className="open">
      <iframe
        title="Iframe"
        src="https://alphaguilty.io/iframe/alphaguilty-onboarding"
        allow="scripts popups; clipboard-read; clipboard-write"
        id="alphaguilty-iframe"
        className="iframe"
      ></iframe>
    </div>
  );
};

export default Open;
