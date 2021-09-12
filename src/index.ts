const root = document.createElement("div");
document.body.appendChild(root);
root.innerHTML = 'init';

declare const getCommon: () => string;
root.innerHTML = getCommon();
