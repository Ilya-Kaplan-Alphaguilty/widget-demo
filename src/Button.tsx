import { Helmet } from "react-helmet";

const Button = () => {
  return (
    <>
      <Helmet>
        <script>
          {`let iframeContainer;
      let head;
      let iframe;
      let button;
      let closeButton;
      let body;

      const ALPHAGUILTY_DOMAIN = "https://alphaguilty.io";
      const QUEST_LINK_TITLE = "alphaguilty-onboarding";
      const BUTTON_NAME = "AlphaGuilty onboarding";

      const transportMessage = (event) => {
        if (
          event.origin === ALPHAGUILTY_DOMAIN &&
          (event.data.type !== "localStorage" ||
            event.data.method === "getItemResult")
        ) {
          iframe.contentWindow.postMessage(event.data, ALPHAGUILTY_DOMAIN);
        }
      };

      const localStorageProvider = (event) => {
        if (
          event.data.type === "localStorage" &&
          event.origin === ALPHAGUILTY_DOMAIN
        ) {
          if (event.data.method === "getItem") {
            const value = localStorage.getItem(event.data.data.key) || null;

            iframe.contentWindow.postMessage(
              {
                type: "localStorage",
                method: "getItemResult",
                data: { key: event.data.data.key, value },
              },
              ALPHAGUILTY_DOMAIN
            );
          }
          if (event.data.method === "setItem") {
            localStorage.setItem(event.data.data.key, event.data.data.value);
          }
          if (event.data.method === "removeItem") {
            localStorage.removeItem(event.data.data.key);
          }
          if (event.data.method === "clear") {
            localStorage.clear();
          }
        }
      };

      let timeout = null;
      const openIframe = () => {
        clearTimeout(timeout);
        iframeContainer
          .querySelector("#alphaguilty-iframe")
          .classList.remove("closed");
        iframeContainer.classList.remove("closing");
        iframeContainer.classList.add("open");
      };

      const closeAnimationTime = 1000;
      const closeIframe = () => {
        iframeContainer.classList.remove("open");
        iframeContainer.classList.add("closing");
        timeout = setTimeout(() => {
          iframeContainer
            .querySelector("#alphaguilty-iframe")
            .classList.add("closed");
        }, closeAnimationTime);
      };

      const onLoadIframe = () => {
        iframeContainer.querySelector(".loader").style.display = "none";
      };

      const createHTML = () => {
        body.insertAdjacentHTML(
          "beforeend",
          \`<div id="iframeContainer"></div>\`
        );

        iframeContainer = document.getElementById("iframeContainer");

        head.insertAdjacentHTML(
          "beforeend",
          "<style>#iframeContainer .loader { z-index: 1001 !important; opacity: 1 !important; background: #101313 !important; display: flex; align-items: center; justify-content: center;}@keyframes MuiCircularProgress-keyframes-circular-rotate { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); }}#iframeContainer .MuiCircularProgress-svg { display: block; width: 40px; height: 40px; animation: 1.4s linear infinite MuiCircularProgress-keyframes-circular-rotate;}#iframeContainer .MuiCircularProgress-circle { stroke: #87f696; stroke-dasharray: 80px, 200px; stroke-dashoffset: 0;}#iframeContainer { position: relative; z-index: 1000;}#iframeContainer .firstWrapper { position: fixed; right: 20px; bottom: 40px; border: 0.1px solid #87f696; border-radius: 30px; padding: 2px; transition: opacity 1s ease; opacity: 1;}#iframeContainer .secondWrapper { border: 0.2px solid #87f696; border-radius: 30px; padding: 2px;}#iframeContainer #openQuestButton { cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 10px; background: #202020; border: 0.4px solid #87f696; border-radius: 60px; box-shadow: 0 1px 24px 0 rgba(95, 206, 110, 0.45); color: #fafafa; font-size: 14px; font-weight: 500; line-height: 16px;}#iframeContainer #alphaguilty-iframe.closed { width: 0; height: 0;}#iframeContainer.open .firstWrapper { display: none; opacity: 0;}#iframeContainer #openQuestButton .icon { margin-right: 5px;}#iframeContainer .iframe { width: 0; height: 0; position: fixed; border: none; bottom: 0; right: 0; z-index: 1000; opacity: 0; transition: opacity 1s ease;}#iframeContainer.open .iframe { width: 100vw; height: 100%; opacity: 1;}#iframeContainer #alphaguiltyCloseButton { display: none; opacity: 0; transition: opacity 1s ease;}#iframeContainer.open #alphaguiltyCloseButton { cursor: pointer; display: block; background: 0 0; border: none; outline: 0; padding: 0; width: 24px; height: 24px; position: fixed; bottom: calc(100% - 38px); right: 16px; z-index: 1001; opacity: 1;}@media screen and (min-width: 744px) { #iframeContainer.open .iframe { width: 360px; height: 70%; right: 37px; bottom: 42px; border-radius: 16px; border: 0.5px solid #87f696; } #iframeContainer.open #alphaguiltyCloseButton { bottom: calc(70% + 4px); right: 53px; }}@media screen and (min-width: 834px) { #iframeContainer.open .iframe { width: 550px; right: 47px; bottom: 32px; } #iframeContainer.open #alphaguiltyCloseButton { bottom: calc(70% - 6px); right: 63px; }}@media screen and (min-width: 1440px) { #iframeContainer.open .iframe { bottom: 60px; right: 60px; } #iframeContainer.open #alphaguiltyCloseButton { bottom: calc(70% + 22px); right: 76px; }}#iframeContainer.closing .firstWrapper { display: block; opacity: 1; transition: opacity 1s ease;}#iframeContainer.closing .iframe { width: 0; height: 0; opacity: 0; transition: opacity 1s ease;}#iframeContainer.closing #alphaguiltyCloseButton { display: none; opacity: 0; transition: opacity 1s ease;}@media screen and (min-width: 300px) { #iframeContainer.closing .iframe { width: 100%; height: 100%; right: 0; bottom: 0; border-radius: 16px; border: 0.5px solid #87f696; } #iframeContainer.closing #alphaguiltyCloseButton { bottom: calc(70% + 4px); right: 53px; }}@media screen and (min-width: 744px) { #iframeContainer.closing .iframe { width: 360px; height: 70%; right: 37px; bottom: 42px; border-radius: 16px; border: 0.5px solid #87f696; } #iframeContainer.closing #alphaguiltyCloseButton { bottom: calc(70% + 4px); right: 53px; }}@media screen and (min-width: 834px) { #iframeContainer.closing .iframe { width: 550px; right: 47px; bottom: 32px; } #iframeContainer.closing #alphaguiltyCloseButton { bottom: calc(70% - 6px); right: 63px; }}@media screen and (min-width: 1440px) { #iframeContainer.closing .iframe { bottom: 60px; right: 60px; } #iframeContainer.closing #alphaguiltyCloseButton { bottom: calc(70% + 22px); right: 76px; }}</style>"
        );
        const svgLoader = \`<svg class="MuiCircularProgress-svg" viewBox="22 22 44 44"><circle class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle></svg>\`;
        iframeContainer.innerHTML = \`<div class="iframe loader">$\{svgLoader}</div><iframe title="Iframe" src="$\{ALPHAGUILTY_DOMAIN}/iframe/$\{QUEST_LINK_TITLE}" onload="onLoadIframe()" allow="scripts popups; clipboard-read; clipboard-write" id="alphaguilty-iframe" class="iframe"></iframe><button id="alphaguiltyCloseButton"><svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M19.0596 4.91724L4.94087 19.0828" stroke="#FAFAFA" strokeWidth="1.5"/><path d="M19.083 19.0593L4.91748 4.94062" stroke="#FAFAFA" strokeWidth="1.5"/></svg></button><div class="firstWrapper"><div class="secondWrapper"><button id="openQuestButton"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5217 23.5703C18.6237 23.5703 23.5703 18.6237 23.5703 12.5217C23.5703 6.41977 18.6237 1.47315 12.5217 1.47315C6.41977 1.47315 1.47315 6.41977 1.47315 12.5217C1.47315 18.6237 6.41977 23.5703 12.5217 23.5703ZM12.5217 25.0435C19.4373 25.0435 25.0435 19.4373 25.0435 12.5217C25.0435 5.60617 19.4373 0 12.5217 0C5.60617 0 0 5.60617 0 12.5217C0 19.4373 5.60617 25.0435 12.5217 25.0435Z" fill="#87F696"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5244 2.94531L13.1952 4.3087L18.3991 14.8858H20.3355L18.7987 15.6981L20.4472 19.0486H18.7818L17.477 16.3966L12.8763 18.8281L12.5266 19.0129L12.177 18.8281L7.57267 16.3947L6.26694 19.0486H4.60156L6.25097 15.6962L4.71775 14.8858H6.64964L11.8536 4.3087L12.5244 2.94531ZM8.23207 15.0545L12.5266 17.3242L16.8176 15.0563L12.5244 6.33024L8.23207 15.0545Z" fill="#87F696"/><path d="M13.3827 12.7183C13.3048 12.5902 13.1972 12.4919 13.0597 12.4232C12.9268 12.3546 12.7688 12.3203 12.5855 12.3203C12.2464 12.3203 11.9784 12.4301 11.7814 12.6497C11.5889 12.8693 11.4927 13.1644 11.4927 13.535C11.4927 13.9514 11.5958 14.2694 11.802 14.489C12.0127 14.704 12.3174 14.8115 12.7161 14.8115C13.188 14.8115 13.5248 14.5988 13.7264 14.1733H12.3724V13.2056H14.8879V14.5096C14.7825 14.7658 14.6267 15.006 14.4205 15.2302C14.2189 15.4543 13.9623 15.6396 13.6508 15.786C13.3392 15.9279 12.9841 15.9988 12.5855 15.9988C12.0998 15.9988 11.6691 15.8959 11.2934 15.69C10.9223 15.4795 10.6336 15.189 10.4274 14.8184C10.2258 14.4432 10.125 14.0154 10.125 13.535C10.125 13.0592 10.2258 12.636 10.4274 12.2654C10.6336 11.8902 10.9223 11.5997 11.2934 11.3938C11.6645 11.1834 12.0929 11.0781 12.5786 11.0781C13.188 11.0781 13.692 11.2245 14.0906 11.5173C14.4893 11.8102 14.7367 12.2105 14.8329 12.7183H13.3827Z" fill="#87F696"/></svg>$\{BUTTON_NAME}</button></div></div>\`;
      };

      const onLoad = () => {
        body = document.querySelector("body");
        head = document.querySelector("head");

        createHTML();

        iframe = document.getElementById("alphaguilty-iframe");
        button = document.getElementById("openQuestButton");
        closeButton = document.getElementById("alphaguiltyCloseButton");

        window.addEventListener("message", transportMessage);
        window.addEventListener("message", localStorageProvider);
        button.addEventListener("click", openIframe);
        closeButton.addEventListener("click", closeIframe);
      };

      window.addEventListener("load", onLoad);`}
        </script>
      </Helmet>
    </>
  );
};

export default Button;
