"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/profile",{

/***/ "./src/pages/user/signinsignup.js":
/*!****************************************!*\
  !*** ./src/pages/user/signinsignup.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ \"./src/pages/user/login.js\");\n/* harmony import */ var _signup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup */ \"./src/pages/user/signup.js\");\n/* harmony import */ var _styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/User-signinsignup.module.css */ \"./src/styles/User-signinsignup.module.css\");\n/* harmony import */ var _styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar Signinsignup = function(param) {\n    var setUser = param.setUser, setLoginsign = param.setLoginsign;\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), 2), isLogin = _useState[0], setIsLogin = _useState[1];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().signupsignincontainer),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().signupsignbuttonContainer),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"\".concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().loginButton), \" \").concat(isLogin ? (_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().active) : \"\"),\n                        onClick: function() {\n                            return setIsLogin(true);\n                        },\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"\".concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().signupButton), \" \").concat(!isLogin ? (_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().active) : \"\"),\n                        onClick: function() {\n                            return setIsLogin(false);\n                        },\n                        children: \"Signup\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().formWrapper),\n                children: isLogin ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"\".concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().form), \" \").concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().show)),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_login__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        setUser: setUser,\n                        setLoginsign: setLoginsign\n                    }, void 0, false, {\n                        fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                        lineNumber: 28,\n                        columnNumber: 13\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                    lineNumber: 27,\n                    columnNumber: 11\n                }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"\".concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().form), \" \").concat((_styles_User_signinsignup_module_css__WEBPACK_IMPORTED_MODULE_4___default().show)),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_signup__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        setUser: setUser,\n                        setLoginsign: setLoginsign\n                    }, void 0, false, {\n                        fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                        lineNumber: 32,\n                        columnNumber: 13\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, _this)\n            }, void 0, false, {\n                fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\placement-website\\\\src\\\\pages\\\\user\\\\signinsignup.js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, _this);\n};\n_s(Signinsignup, \"juHMKC6x2j1wnRvCiB5VrABnZyE=\");\n_c = Signinsignup;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Signinsignup);\nvar _c;\n$RefreshReg$(_c, \"Signinsignup\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvdXNlci9zaWduaW5zaWdudXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDTDtBQUNFO0FBQ2lDO0FBRS9ELElBQU1JLGVBQWU7UUFBR0MsZ0JBQUFBLFNBQVNDLHFCQUFBQTs7SUFDL0IsSUFBOEJOLFlBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxXQUFoQ08sVUFBdUJQLGNBQWRRLGFBQWNSO0lBRTlCLHFCQUNFLDhEQUFDUztRQUFJQyxXQUFXUCxtR0FBNEI7OzBCQUMxQyw4REFBQ007Z0JBQUlDLFdBQVdQLHVHQUFnQzs7a0NBQzlDLDhEQUFDVTt3QkFDQ0gsV0FBVyxHQUF5QkgsT0FBdEJKLHlGQUFrQixFQUFDLEtBQWdDLE9BQTdCSSxVQUFVSixvRkFBYSxHQUFHO3dCQUM5RGEsU0FBUzttQ0FBTVIsV0FBVzs7a0NBQzNCOzs7Ozs7a0NBR0QsOERBQUNLO3dCQUNDSCxXQUFXLEdBQTBCLE9BQXZCUCwwRkFBbUIsRUFBQyxLQUFpQyxPQUE5QixDQUFDSSxVQUFVSixvRkFBYSxHQUFHO3dCQUNoRWEsU0FBUzttQ0FBTVIsV0FBVzs7a0NBQzNCOzs7Ozs7Ozs7Ozs7MEJBSUgsOERBQUNDO2dCQUFJQyxXQUFXUCx5RkFBa0I7MEJBQy9CSSx3QkFDQyw4REFBQ0U7b0JBQUlDLFdBQVcsR0FBa0JQLE9BQWZBLGtGQUFXLEVBQUMsS0FBZSxPQUFaQSxrRkFBVzs4QkFDM0MsNEVBQUNGLDhDQUFLQTt3QkFBQ0ksU0FBU0E7d0JBQVNDLGNBQWNBOzs7Ozs7Ozs7OzBDQUd6Qyw4REFBQ0c7b0JBQUlDLFdBQVcsR0FBa0JQLE9BQWZBLGtGQUFXLEVBQUMsS0FBZSxPQUFaQSxrRkFBVzs4QkFDM0MsNEVBQUNELCtDQUFNQTt3QkFBQ0csU0FBU0E7d0JBQVNDLGNBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXBEO0dBaENNRjtLQUFBQTtBQWtDTixpRUFBZUEsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsiRDpcXHBsYWNlbWVudC13ZWJzaXRlXFxzcmNcXHBhZ2VzXFx1c2VyXFxzaWduaW5zaWdudXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IExvZ2luIGZyb20gXCIuL2xvZ2luXCI7XHJcbmltcG9ydCBTaWdudXAgZnJvbSBcIi4vc2lnbnVwXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy9Vc2VyLXNpZ25pbnNpZ251cC5tb2R1bGUuY3NzXCI7XHJcblxyXG5jb25zdCBTaWduaW5zaWdudXAgPSAoeyBzZXRVc2VyLCBzZXRMb2dpbnNpZ24gfSkgPT4ge1xyXG4gIGNvbnN0IFtpc0xvZ2luLCBzZXRJc0xvZ2luXSA9IHVzZVN0YXRlKHRydWUpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zaWdudXBzaWduaW5jb250YWluZXJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNpZ251cHNpZ25idXR0b25Db250YWluZXJ9PlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLmxvZ2luQnV0dG9ufSAke2lzTG9naW4gPyBzdHlsZXMuYWN0aXZlIDogXCJcIn1gfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNMb2dpbih0cnVlKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBMb2dpblxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLnNpZ251cEJ1dHRvbn0gJHshaXNMb2dpbiA/IHN0eWxlcy5hY3RpdmUgOiBcIlwifWB9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0xvZ2luKGZhbHNlKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBTaWdudXBcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9ybVdyYXBwZXJ9PlxyXG4gICAgICAgIHtpc0xvZ2luID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5mb3JtfSAke3N0eWxlcy5zaG93fWB9PlxyXG4gICAgICAgICAgICA8TG9naW4gc2V0VXNlcj17c2V0VXNlcn0gc2V0TG9naW5zaWduPXtzZXRMb2dpbnNpZ259IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5mb3JtfSAke3N0eWxlcy5zaG93fWB9PlxyXG4gICAgICAgICAgICA8U2lnbnVwIHNldFVzZXI9e3NldFVzZXJ9IHNldExvZ2luc2lnbj17c2V0TG9naW5zaWdufSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2lnbmluc2lnbnVwO1xyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJMb2dpbiIsIlNpZ251cCIsInN0eWxlcyIsIlNpZ25pbnNpZ251cCIsInNldFVzZXIiLCJzZXRMb2dpbnNpZ24iLCJpc0xvZ2luIiwic2V0SXNMb2dpbiIsImRpdiIsImNsYXNzTmFtZSIsInNpZ251cHNpZ25pbmNvbnRhaW5lciIsInNpZ251cHNpZ25idXR0b25Db250YWluZXIiLCJidXR0b24iLCJsb2dpbkJ1dHRvbiIsImFjdGl2ZSIsIm9uQ2xpY2siLCJzaWdudXBCdXR0b24iLCJmb3JtV3JhcHBlciIsImZvcm0iLCJzaG93Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/user/signinsignup.js\n"));

/***/ })

});