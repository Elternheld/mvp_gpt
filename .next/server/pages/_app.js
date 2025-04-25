"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/ui/use-toast.tsx":
/*!*************************************!*\
  !*** ./components/ui/use-toast.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToastProvider: () => (/* binding */ ToastProvider),\n/* harmony export */   useToast: () => (/* binding */ useToast)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ useToast,ToastProvider auto */ \n\nconst ToastContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createContext(undefined);\nfunction useToast() {\n    const context = react__WEBPACK_IMPORTED_MODULE_1__.useContext(ToastContext);\n    if (!context) {\n        throw new Error(\"useToast must be used within a ToastProvider\");\n    }\n    return context;\n}\nfunction ToastProvider({ children }) {\n    const [toasts, setToasts] = react__WEBPACK_IMPORTED_MODULE_1__.useState([]);\n    const showToast = (toast)=>{\n        const id = Math.random().toString(36).substring(7);\n        setToasts((prev)=>[\n                ...prev,\n                {\n                    ...toast,\n                    id\n                }\n            ]);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ToastContext.Provider, {\n        value: {\n            toasts,\n            showToast\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\AKhal\\\\mvp_gpt\\\\components\\\\ui\\\\use-toast.tsx\",\n        lineNumber: 38,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvdWkvdXNlLXRvYXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRzhCO0FBZTlCLE1BQU1DLDZCQUFlRCxnREFBbUIsQ0FBK0JHO0FBRWhFLFNBQVNDO0lBQ2QsTUFBTUMsVUFBVUwsNkNBQWdCLENBQUNDO0lBQ2pDLElBQUksQ0FBQ0ksU0FBUztRQUNaLE1BQU0sSUFBSUUsTUFBTTtJQUNsQjtJQUNBLE9BQU9GO0FBQ1Q7QUFFTyxTQUFTRyxjQUFjLEVBQUVDLFFBQVEsRUFBaUM7SUFDdkUsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdYLDJDQUFjLENBQVUsRUFBRTtJQUV0RCxNQUFNYSxZQUFZLENBQUNDO1FBQ2pCLE1BQU1DLEtBQUtDLEtBQUtDLE1BQU0sR0FBR0MsUUFBUSxDQUFDLElBQUlDLFNBQVMsQ0FBQztRQUNoRFIsVUFBVSxDQUFDUyxPQUFTO21CQUFJQTtnQkFBTTtvQkFBRSxHQUFHTixLQUFLO29CQUFFQztnQkFBRzthQUFFO0lBQ2pEO0lBRUEscUJBQ0UsOERBQUNkLGFBQWFvQixRQUFRO1FBQUNDLE9BQU87WUFBRVo7WUFBUUc7UUFBVTtrQkFDL0NKOzs7Ozs7QUFHUCIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBS2hhbFxcbXZwX2dwdFxcY29tcG9uZW50c1xcdWlcXHVzZS10b2FzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXG5cInVzZSBjbGllbnRcIlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFRvYXN0ID0ge1xuICBpZDogc3RyaW5nXG4gIHRpdGxlPzogc3RyaW5nXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nXG4gIGR1cmF0aW9uPzogbnVtYmVyXG4gIHZhcmlhbnQ/OiBcImRlZmF1bHRcIiB8IFwiZGVzdHJ1Y3RpdmVcIlxufVxuXG50eXBlIFRvYXN0Q29udGV4dFR5cGUgPSB7XG4gIHRvYXN0czogVG9hc3RbXVxuICBzaG93VG9hc3Q6ICh0b2FzdDogVG9hc3QpID0+IHZvaWRcbn1cblxuY29uc3QgVG9hc3RDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dDxUb2FzdENvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUb2FzdCgpOiBUb2FzdENvbnRleHRUeXBlIHtcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoVG9hc3RDb250ZXh0KVxuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VUb2FzdCBtdXN0IGJlIHVzZWQgd2l0aGluIGEgVG9hc3RQcm92aWRlclwiKVxuICB9XG4gIHJldHVybiBjb250ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2FzdFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgY29uc3QgW3RvYXN0cywgc2V0VG9hc3RzXSA9IFJlYWN0LnVzZVN0YXRlPFRvYXN0W10+KFtdKVxuXG4gIGNvbnN0IHNob3dUb2FzdCA9ICh0b2FzdDogVG9hc3QpID0+IHtcbiAgICBjb25zdCBpZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KVxuICAgIHNldFRvYXN0cygocHJldikgPT4gWy4uLnByZXYsIHsgLi4udG9hc3QsIGlkIH1dKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8VG9hc3RDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHRvYXN0cywgc2hvd1RvYXN0IH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVG9hc3RDb250ZXh0LlByb3ZpZGVyPlxuICApXG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJUb2FzdENvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwidW5kZWZpbmVkIiwidXNlVG9hc3QiLCJjb250ZXh0IiwidXNlQ29udGV4dCIsIkVycm9yIiwiVG9hc3RQcm92aWRlciIsImNoaWxkcmVuIiwidG9hc3RzIiwic2V0VG9hc3RzIiwidXNlU3RhdGUiLCJzaG93VG9hc3QiLCJ0b2FzdCIsImlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwicHJldiIsIlByb3ZpZGVyIiwidmFsdWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/ui/use-toast.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_use_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui/use-toast */ \"(pages-dir-node)/./components/ui/use-toast.tsx\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_use_toast__WEBPACK_IMPORTED_MODULE_2__.ToastProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\AKhal\\\\mvp_gpt\\\\pages\\\\_app.tsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\AKhal\\\\mvp_gpt\\\\pages\\\\_app.tsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMEI7QUFDaUM7QUFFM0QsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBTztJQUMxQyxxQkFDRSw4REFBQ0gsbUVBQWFBO2tCQUNaLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQUtoYWxcXG12cF9ncHRcXHBhZ2VzXFxfYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUb2FzdFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdWkvdXNlLXRvYXN0XCI7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogYW55KSB7XG4gIHJldHVybiAoXG4gICAgPFRvYXN0UHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Ub2FzdFByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDsiXSwibmFtZXMiOlsiUmVhY3QiLCJUb2FzdFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();