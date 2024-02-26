// // common =================================================================
// MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
// const watchTarget = document.getElementById("app-container"); 
// // throttle MutationObserver 
// // from https://stackoverflow.com/a/52868150
//   const throttle = (func, limit) => {
//     let inThrottle;
//     return (...args) => {
//       if (!inThrottle) {
//         func(...args);
//         inThrottle = setTimeout(() => (inThrottle = false), limit);
//       }
//     };
//   };
// // ================================== END COMMON

// // query table resizer ============================================== 
// // source : https://htmldom.dev/resize-columns-of-a-table/   
// console.log("========= query table resizer v20220312 ============");

// const createResizableColumn = function (col, resizer) {
//   // Track the current position of mouse
//   let x = 0;
//   let w = 0;

//   const mouseDownHandler = function (e) {
//     // Get the current mouse position
//     x = e.clientX;

//     // Calculate the current width of column
//     const styles = window.getComputedStyle(col);
//     w = parseInt(styles.width, 10);

//     // Attach listeners for document's events
//     document.addEventListener("mousemove", mouseMoveHandler);
//     document.addEventListener("mouseup", mouseUpHandler);
//   };

//   const mouseMoveHandler = function (e) {
//     // Determine how far the mouse has been moved
//     const dx = e.clientX - x;
//     // Update the width of column
//     col.style.width = `${w + dx}px`;
//   };

//   // When user releases the mouse, remove the existing event listeners
//   const mouseUpHandler = function () {
//     document.removeEventListener("mousemove", mouseMoveHandler);
//     document.removeEventListener("mouseup", mouseUpHandler);
//   };
//   resizer.addEventListener("mousedown", mouseDownHandler);
// };

// const updateTables = function () {
//   // Query the table
//   const table = document.querySelectorAll(".table-auto:not(.table-resizable)");
//   for (let i = 0; i < table.length; i++) {
//     // Query all headers1
//     const cols = table[i].querySelectorAll("thead tr > th.whitespace-nowrap");
//     // Loop ver them
//     Array.from(cols).forEach((col) => {
//       // Create a resizer element
//       const resizer = document.createElement("div");
//       resizer.classList.add("query-table-resizer");
//       table[i].classList.add("table-resizable");
//       console.info("-- injected div.query-table-resizer --");
//       // Add a resizer element to the column
//       col.appendChild(resizer);
//       createResizableColumn(col, resizer);
//     });
//   }
// };
const bento = document.querySelector(".custom-query")
console.log("bento")
console.log(bento)
// const updateTablesThrottled = throttle(updateTables, 1000);
// const obsTable = new MutationObserver(updateTablesThrottled);
// obsTable.observe(watchTarget, {
//   subtree: true,
//   childList: true,
// }); 
// // ====================================================== query table resizer

// // namespace prefixes collapser =============================================
// function hideNamespace() {
//   console.info("====== LS HIDE NAMESPACE v20220314 =====");
//   let nmsp = document.querySelectorAll(
//     'a.page-ref[data-ref*="/"]:not(.hidden-namespace)'
//   );
//   for (var i = 0; i < nmsp.length; i++) {
//     if (nmsp[i].innerText.indexOf("/") !== -1) {
//       nmsp[i].innerHTML =
//         "<span style='color:rgb(133, 211, 81)'>..</span>" +
//         nmsp[i].innerText.substring(nmsp[i].innerText.lastIndexOf("/"));
//       nmsp[i].classList.add("hidden-namespace"); 
//       //console.info(" namespace off ==> " + nmsp[i].innerText);
//     }
//   }
// }

// const updateHideNamespace = throttle(hideNamespace, 1000);
// const obsNamespace = new MutationObserver(updateHideNamespace);
// obsNamespace.observe(watchTarget, {
//   subtree: true,
//   attributes: true,
// });
// //===================================== end of namespace prefixes collapser 

// // property data-refs =====================================
// // injects [data-refs-self='property'] attributes to property divs 
// // to be used in the next functions + custom.css

// console.log("========= property data-ref v20220715 ============");
// const addPropDataRef = function () {
//   console.log("addPropDataRef running...");
//   const propertiesBlocks = document.querySelectorAll(
//     "#main-content-container .page.relative > .relative .block-properties:not(.datarefd)" //.page.relative > .relative => main container only
//   );
//   for (let i = 0; i < propertiesBlocks.length; i++) {
//     const propertySpan = propertiesBlocks[i].children;
//     Array.from(propertySpan).forEach((divProp) => {
//       console.log("   divProp : ", divProp);
//       let propName = divProp.firstChild.innerText;
//       console.log("   property : ", propName);
//       divProp.setAttribute("data-refs-self", propName);
//       switch (propName) {
//         case "cover-pic":
//           document
//             .querySelector(".page.relative > .relative .page-blocks-inner")
//             .classList.add("has-coverPic");
//           console.log("   .has-coverPic injected");
//           break;
//         case "cover-pic-height":
//           console.log("   .has-coverPic injected");
//           break; // TODO
//       }
//     });
//     propertiesBlocks[i].classList.add("datarefd");
//   }
// };

// const addPropDataRefThrottled = throttle(addPropDataRef, 1000);
// const obsProps = new MutationObserver(addPropDataRefThrottled);
// obsProps.observe(
//   watchTarget,
//   {
//     subtree: true,
//     childList: true,
//   }
// );

// // =====================================end of property data-refs

// // add bg-pic =======================================
// console.log("========= bg-pic v20220327 ============");
// const addbgPic = function () {
//   console.log("addbgPic running...");
//   const bgPic = document.querySelectorAll(
//     "[data-refs-self='bg-pic']"
//   );
//   console.log("has bgpic : ", bgPic.length);
//   if (bgPic.length > 0) {
//     const bgPica = Array.from(bgPic).filter(
//       (item) => !item.closest(".references-blocks")
//     );
//     console.log("bg-pic exists : ", bgPica.length);
//     console.log("bg-pic parent : ", bgPica);
//     if (bgPica.length > 0) {
//       const bgPicUrl = bgPica[0].getElementsByTagName("img")[0].src;
//       console.log("bg-pic url : ", bgPicUrl);
//       document.getElementById(
//         "main-content-container"
//       ).style.backgroundImage = "url(" + bgPicUrl + ")";
//     }
//   } else {
//     document.getElementById("main-content-container").removeAttribute("style");
//   };
// };
// const addbgPicThrottled = throttle(addbgPic, 1000);
// const addbg = new MutationObserver(addbgPicThrottled);
// addbg.observe(watchTarget, {
//   subtree: true,
//   childList: true,
// });
// // =====================================end of bg-pic

// // ============ BETTER-SIDEBAR rotate closed tabs in right sidebar=========
// // ============ remove if you don't use the better-sidebar.css=============
// console.log("========= rsidebar fold 90° ============");
// const foldTab = function () {
//   let foldedTab = document.querySelectorAll(
//     ".sidebar-item.content > .flex.flex-col > .flex.flex-row"
//   );
//   if (foldedTab.length > 0) {
//     let foldedTabsArray = Array.from(foldedTab);
//     console.log("sidebar tabs : ", foldedTabsArray.length);
//     for (let i = 0; i < foldedTabsArray.length; i++) {
//       if (foldedTabsArray[i].nextElementSibling.classList.contains("hidden")) {
//         // console.log("fold detected: ", foldedTabsArray[i].nextElementSibling, " is folded.");
//         let tab = foldedTabsArray[i].closest(".sidebar-item.content");
//         tab.classList.add("folded");
//       } else {
//         if (
//           foldedTabsArray[i].nextElementSibling.classList.contains("initial") &&
//           foldedTabsArray[i]
//             .closest(".sidebar-item.content")
//             .classList.contains("folded")
//         ) {
//           console.log("this one is unfolded !!!");
//           let tab = foldedTabsArray[i].closest(".sidebar-item.content");
//           tab.classList.remove("folded");
//         }
//       }
//     }
//   }
// };
// const foldTabthrottled = throttle(foldTab, 300);
// const foldTabs = new MutationObserver(foldTabthrottled);
// const sidebarTarget = document.querySelector(".sidebar-item-list");
// foldTabs.observe(watchTarget, {
//   subtree: true,
//   childList: true,
//   attributes: true,
// });
// // =================== end of rotate closed tabs in right sidebar =========

// // ====== LS-TWITTER-EMBED =============================================
// console.info('====== LS-TWITTER-EMBED ======');
// // add twitter script and meta tags to head
// var s = document.createElement("script");
// s.type = "text/javascript";
// s.src = "https://platform.twitter.com/widgets.js";
// s.async = true;
// var m = document.createElement("meta");
// m.name = "twitter:widgets:theme";
// m.content = "dark";
// document.head.append(s, m);

// function embedTwitter() {
//   let isTweet = document.querySelectorAll(
//     "a.external-link[href^='https://twitter.com"
//   );
//   for (let i = 0; i < isTweet.length; i++) {
//     if (isTweet[i].children[0] === undefined) {
//       var requestUrl =
//         "https://publish.twitter.com/oembed?omit_script=1&url=" +
//         isTweet[i].href + "&limit=8&theme=dark&maxwidth=550&maxheight=600";
//       var oReq = new XMLHttpRequest();
//       oReq.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//           var data = JSON.parse(this.responseText);
//           console.log(
//             'requestUrl      : ', requestUrl,
//             '\noReq.response : ', oReq.response,
//             '\ndata          : ', data,
//             '\ndata.html     : ', data.html
//             );
//             insertResponse(data, i);
//           }
//         }
//       oReq.open("GET", requestUrl, true);
//       oReq.send();
//     }
//   }

//   function insertResponse(data, i) {
//     var insTw = document.createElement("div");
//     insTw.className = "twembed";
//     insTw.innerHTML = data.html;
//     isTweet[i].appendChild(insTw);
//     console.log("embedding Tweets...");
//     twttr.widgets.load();
//   }
// };
// const embTwthrottled = throttle(embedTwitter, 1000);
// const embTw = new MutationObserver(embTwthrottled);
// const embTwTarget = document.getElementById('main-container');
// embTw.observe(embTwTarget, {
//   subtree: true,
//   childList: true,
// });
// // =============================================== end of twitter embed =

.setStatic(function onParentEvalStarted(container){
    const btnRemove = Kits.createElementOfClass("button", "out", "X");
    const divRow = Kits.createElementOfClass("div", "out", btnRemove, "...running...");

    const wrapper = container.getElementsByClassName("block-content-wrapper")[0];
    wrapper.append(divRow);

    Kits.addClickEventToButton(Kits.onRemoveClicked.bind(null, wrapper), btnRemove);
    return divRow;
})
.setStatic(function onRemoveClicked(wrapper, e){
    if (!e.ctrlKey) return e.target.parentElement.remove();
    if (!e.shiftKey) {
        return Kits.removeElems(wrapper.querySelectorAll("div.out"));
    }

    const divs = document.querySelectorAll("div.ls-block div[data-lang]");
    Array.prototype.forEach.call(divs, (div)=>{
        const container = div.closest("div.ls-block");
        Kits.removeElems(container.querySelectorAll("div.out"));
    });
})
.setStatic(function onRootRunFailed(er){
    Msg.error("run failed");
    throw(er);
})
.setStatic(function onRootRunFinished(nofCodeblocks, res){
    Msg.success("ran " + nofCodeblocks + " codeblock(s)");
    return res;
})
.setStatic(function removeElems(elems){
    Array.prototype.forEach.call(elems, (elem)=>elem.remove() );
})
.setStatic(function runRoot(root){
    var begin;
    const dependencies = {};
    var prom = new Promise( (resolve)=>begin=resolve )
        .then(Kits.loadDependencies.bind(null, dependencies));

    var nofCodeblocks = 0;
    const blocks = (root.children) ? [root] : logseq.api.get_page_blocks_tree(root.name);
    blocks.forEach(Kits.traverseBlocksTree, (block)=>{
        const content = block.content;
        const codeStart = content.indexOf("```") + 3;
        if (codeStart < 3) return;

        const langEnd = content.search(/\w\W/);
        const strLang = content.slice(codeStart, langEnd + 1);
        var lang = logseq.Language[strLang];
        if (!lang) return;

        if (!lang.eval) dependencies[lang._key] = lang;
        const lineEnd = content.indexOf("\n", codeStart);
        const codeEnd = content.indexOf("```", lineEnd);
        if (codeEnd < 0) return;

        nofCodeblocks += 1;
        const code = content.slice(lineEnd, codeEnd);
        prom = prom.then( ()=>lang.eval(code) );
    });

    begin();
    return prom
        .then(Kits.onRootRunFinished.bind(null, nofCodeblocks))
        .catch(Kits.onRootRunFailed);
})
.setStatic(function runPageByName(pageName){
    var page = logseq.api.get_page(pageName);
    if (page) return Kits.runRoot(page);

    Msg.warning("page not found");
    return Promise.resolve();
})
.setStatic(function traverseBlocksTree(block){
    if (Array.isArray(block)) return;

    this(block);
    block.children.forEach(traverseBlocksTree, this);
});

const Msg = Module.setChild("Msg")
.setStatic(function cond(status, msg){
    if (Msg.state === "on") Msg.ofStatus(msg, status);
});
Msg.error = Msg.cond.bind(null, "error");
Msg.info = Msg.cond.bind(null, "info");
Msg.success = Msg.cond.bind(null, "success");
Msg.warning = Msg.cond.bind(null, "warning");
Msg.ofStatus = logseq.api.show_msg;
Msg.state = "off";

const JS = Language.setChild("javascript")
.setStatic(function eval(code){
    return AsyncFunction(code)();
});

const Python = Language.setChild("python")
.setStatic(function load(uri){
    Msg.ofStatus("Preparing python...", "info");
    return import(uri || Python.pyodideUri)
        .then(Python.onLoaderFetched)
        .then(Python.onPyodideLoaded)
        .catch(Python.onFail);
})
.setStatic(function onLoaderFetched(loader){
    return loader.loadPyodide();
})
.setStatic(function onPyodideLoaded(Pyodide){
    Python.Pyodide = Pyodide;
    Python.eval = Pyodide.runPythonAsync.bind(Pyodide);
    Msg.ofStatus("Python ready", "success");
});
Python.onFail = Kits.onLoadFailed.bind(null, "pyodide");
Python.pyodideUri = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.mjs";

const R = Language.setChild("r")
.setStatic(function load(uri){
    Msg.ofStatus("Preparing R...", "info");
    return import(uri || R.webrUri)
        .then(R.onModuleFetched)
        .then(R.onWebrLoaded)
        .catch(R.onFail);
})
.setStatic(function onModuleFetched(module){
    R.module = module;
    const webR = new module.WebR();
    return webR.init().then( ()=>webR );
})
.setStatic(function arrayFromRes(res){
    if (res.toArray) return res.toArray().then(arrayFromRes);
    if (!Array.isArray(res)) return Promise.resolve(res);
    return Promise.all(res.map(arrayFromRes));
})
.setStatic(function onWebrLoaded(Webr){
    R.Webr = Webr;
    R.eval = function(code){
        return Webr.evalR(code).then(R.arrayFromRes);
    }
    Msg.ofStatus("R ready", "success");
});
R.onFail = Kits.onLoadFailed.bind(null, "webr");
R.webrUri = "https://webr.r-wasm.org/latest/webr.mjs";

const kits = logseq.kits = Concept.setChild("kits")
kits.evalpage = Kits.addClickEventToButton.bind(null, function onEvalPageClicked(e){
    document.querySelectorAll("div.ls-block div[data-lang]").forEach( (div)=>{
        Kits.evalDiv(div.closest("div.ls-block"));
    });
});
kits.evalparent = Kits.addClickEventToButton.bind(null, function onEvalParentClicked(e){
    const child = e.target.closest("div.ls-block");
    Kits.evalDiv(child.parentElement.closest("div.ls-block"));
});
kits.runpage = Kits.addClickEventToButton.bind(null, function onRunPageClicked(e){
    var pageName = e.target.dataset.pageName || "";
    if (pageName === "current page") {
        const page = logseq.api.get_current_page();
        if (page) pageName = page.name;
    }
    Kits.runPageByName(pageName);
});
kits.togglemsg = Kits.addClickEventToButton.bind(null, function onToggleMsgClicked(e){
    Msg.state = (Msg.state === "on") ? "off" : "on";
    Msg.ofStatus("Messages " + Msg.state, "success");
});

const kitelems = document.getElementsByClassName("kit");
const kitsObserver = new MutationObserver(function onMutated(){
    var nofFound = 0;
    const missing = ["Missing kit(s): "];

    const proms = Array.prototype.map.call(kitelems, (elem)=>{
        const data = elem.dataset;
        const status = data.kitStatus;
        if (status === "handled") return;

        if (data.pageName === "$1") {
            data.pageName = "current page";
            elem.textContent = elem.textContent.replace("page $1", "current page");
        }

        data.kitStatus = "handled";
        const kitName = data.kit;
        return Kits.getKitByName(kitName).then( (handler)=>{
                if (typeof handler !== "function") {
                    missing.push(kitName);
                    return;
                }

                handler(elem);
                nofFound += 1;
            });
    });

    Promise.all(proms).then( ()=>{
        Kits.onObserverFinished(nofFound, missing);
    });
});
kitsObserver.observe(document.getElementById("app-container"), {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"]
});
Msg.ofStatus("kits ok", "success");