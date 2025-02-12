"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/jobs",{

/***/ "./src/pages/jobs.js":
/*!***************************!*\
  !*** ./src/pages/jobs.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ \"./node_modules/@swc/helpers/esm/_ts_generator.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _jobcard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jobcard */ \"./src/pages/jobcard.js\");\n/* harmony import */ var _styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Jobportal.module.css */ \"./src/styles/Jobportal.module.css\");\n/* harmony import */ var _styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar JobPortal = function() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_5__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), 2), jobs = _useState[0], setJobs = _useState[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"JobPortal.useEffect\": function() {\n            var fetchJobs = {\n                \"JobPortal.useEffect.fetchJobs\": /*#__PURE__*/ (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__._)(function() {\n                    var res, data, uniqueJobs, error;\n                    return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__._)(this, function(_state) {\n                        switch(_state.label){\n                            case 0:\n                                _state.trys.push([\n                                    0,\n                                    3,\n                                    ,\n                                    4\n                                ]);\n                                return [\n                                    4,\n                                    fetch(\"/api/auth/jobs\")\n                                ];\n                            case 1:\n                                res = _state.sent();\n                                return [\n                                    4,\n                                    res.json()\n                                ];\n                            case 2:\n                                data = _state.sent();\n                                if (data.userjobs) {\n                                    // Remove duplicate jobs based on job ID\n                                    uniqueJobs = data.userjobs.reduce({\n                                        \"JobPortal.useEffect.fetchJobs.uniqueJobs\": function(acc, job) {\n                                            if (!acc.find({\n                                                \"JobPortal.useEffect.fetchJobs.uniqueJobs\": function(j) {\n                                                    return j._id === job._id;\n                                                }\n                                            }[\"JobPortal.useEffect.fetchJobs.uniqueJobs\"])) {\n                                                acc.push(job);\n                                            }\n                                            return acc;\n                                        }\n                                    }[\"JobPortal.useEffect.fetchJobs.uniqueJobs\"], []);\n                                    setJobs(uniqueJobs);\n                                } else {\n                                    setJobs([]);\n                                }\n                                return [\n                                    3,\n                                    4\n                                ];\n                            case 3:\n                                error = _state.sent();\n                                console.error(\"Error fetching jobs:\", error);\n                                return [\n                                    3,\n                                    4\n                                ];\n                            case 4:\n                                return [\n                                    2\n                                ];\n                        }\n                    });\n                })\n            }[\"JobPortal.useEffect.fetchJobs\"];\n            fetchJobs();\n        }\n    }[\"JobPortal.useEffect\"], []);\n    // Function to handle job application\n    var applyForJob = /*#__PURE__*/ function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_6__._)(function(jobId) {\n            var user, userId, res, data, error;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_7__._)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        // Check if the user is logged in\n                        if (!localStorage.getItem(\"user\")) {\n                            alert(\"Please log in to apply for this job!\");\n                            return [\n                                2\n                            ]; // Stop execution if the user is not logged in\n                        }\n                        // Parse user data from localStorage\n                        user = JSON.parse(localStorage.getItem(\"user\"));\n                        userId = user._id; // Assuming `user._id` exists in localStorage\n                        _state.label = 1;\n                    case 1:\n                        _state.trys.push([\n                            1,\n                            4,\n                            ,\n                            5\n                        ]);\n                        return [\n                            4,\n                            fetch(\"/api/auth/apply\", {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    user_id: userId,\n                                    job_id: jobId\n                                })\n                            })\n                        ];\n                    case 2:\n                        res = _state.sent();\n                        return [\n                            4,\n                            res.json()\n                        ];\n                    case 3:\n                        data = _state.sent();\n                        if (res.ok) {\n                            alert(\"Successfully applied for the job!\");\n                        } else {\n                            alert(data.message || \"Failed to apply. Please try again.\");\n                        }\n                        return [\n                            3,\n                            5\n                        ];\n                    case 4:\n                        error = _state.sent();\n                        console.error(\"Error applying for job:\", error);\n                        alert(\"An error occurred. Please try again.\");\n                        return [\n                            3,\n                            5\n                        ];\n                    case 5:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function applyForJob(jobId) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().welcomeSection),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"Welcome to Your Career Hub!\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                        lineNumber: 75,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Stay connected with \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: \"modern opportunities\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 77,\n                                columnNumber: 31\n                            }, _this),\n                            \" and \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: \"exciting career paths\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 77,\n                                columnNumber: 73\n                            }, _this),\n                            \". Join us today and get access to \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: \"exclusive job listings\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 78,\n                                columnNumber: 43\n                            }, _this),\n                            \"!\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                        lineNumber: 76,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().authButtons),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                href: \"/signup\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().signupBtn),\n                                    children: \"Sign Up\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                    lineNumber: 82,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 81,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                href: \"/login\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().loginBtn),\n                                    children: \"Login\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                    lineNumber: 85,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 84,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                        lineNumber: 80,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                lineNumber: 74,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().jobsSection),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Latest Job Opportunities\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                        lineNumber: 92,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().jobGrid),\n                        children: jobs.length > 0 ? jobs.map(function(job) {\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().jobCardWrapper),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_jobcard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                    job: job,\n                                    onApply: applyForJob\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                    lineNumber: 97,\n                                    columnNumber: 17\n                                }, _this)\n                            }, job._id, false, {\n                                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                                lineNumber: 96,\n                                columnNumber: 15\n                            }, _this);\n                        }) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: (_styles_Jobportal_module_css__WEBPACK_IMPORTED_MODULE_3___default().noJobs),\n                            children: \"No job postings available right now.\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                            lineNumber: 101,\n                            columnNumber: 13\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                        lineNumber: 93,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\adiap\\\\OneDrive\\\\Documents\\\\ecommerce-clothing\\\\src\\\\pages\\\\jobs.js\",\n        lineNumber: 72,\n        columnNumber: 5\n    }, _this);\n};\n_s(JobPortal, \"Q0mbvptFv5mszAZqWDb/1cpBDtw=\");\n_c = JobPortal;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JobPortal);\nvar _c;\n$RefreshReg$(_c, \"JobPortal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBV3ZDLGlGQUFrQjs7a0NBQ2hDLDhEQUFDbUQ7a0NBQUc7Ozs7OztrQ0FDSiw4REFBQ2I7d0JBQUlDLFdBQVd2Qyw2RUFBYztrQ0FDM0JHLEtBQUtrRCxNQUFNLEdBQUcsSUFDYmxELEtBQUttRCxHQUFHLENBQUMsU0FBQ3ZDO2lEQUNSLDhEQUFDdUI7Z0NBQWtCQyxXQUFXdkMsb0ZBQXFCOzBDQUNqRCw0RUFBQ0QsZ0RBQU9BO29DQUFDZ0IsS0FBS0E7b0NBQUt5QyxTQUFTbkM7Ozs7OzsrQkFEcEJOLElBQUlHLEdBQUc7Ozs7OzJDQUtuQiw4REFBQ3lCOzRCQUFFSixXQUFXdkMsNEVBQWE7c0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXpDO0dBckdNRTtLQUFBQTtBQXVHTixpRUFBZUEsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhZGlhcFxcT25lRHJpdmVcXERvY3VtZW50c1xcZWNvbW1lcmNlLWNsb3RoaW5nXFxzcmNcXHBhZ2VzXFxqb2JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBKb2JDYXJkIGZyb20gXCIuL2pvYmNhcmRcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vc3R5bGVzL0pvYnBvcnRhbC5tb2R1bGUuY3NzXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuXHJcbmNvbnN0IEpvYlBvcnRhbCA9ICgpID0+IHtcclxuICBjb25zdCBbam9icywgc2V0Sm9ic10gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaEpvYnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL2F1dGgvam9ic1wiKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICBpZiAoZGF0YS51c2Vyam9icykge1xyXG4gICAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZSBqb2JzIGJhc2VkIG9uIGpvYiBJRFxyXG4gICAgICAgICAgY29uc3QgdW5pcXVlSm9icyA9IGRhdGEudXNlcmpvYnMucmVkdWNlKChhY2MsIGpvYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWFjYy5maW5kKChqKSA9PiBqLl9pZCA9PT0gam9iLl9pZCkpIHtcclxuICAgICAgICAgICAgICBhY2MucHVzaChqb2IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICBzZXRKb2JzKHVuaXF1ZUpvYnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRKb2JzKFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGpvYnM6XCIsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaEpvYnMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSBqb2IgYXBwbGljYXRpb25cclxuICBjb25zdCBhcHBseUZvckpvYiA9IGFzeW5jIChqb2JJZCkgPT4ge1xyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSkge1xyXG4gICAgICBhbGVydChcIlBsZWFzZSBsb2cgaW4gdG8gYXBwbHkgZm9yIHRoaXMgam9iIVwiKTtcclxuICAgICAgcmV0dXJuOyAvLyBTdG9wIGV4ZWN1dGlvbiBpZiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBQYXJzZSB1c2VyIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgIGNvbnN0IHVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSk7XHJcbiAgICBjb25zdCB1c2VySWQgPSB1c2VyLl9pZDsgLy8gQXNzdW1pbmcgYHVzZXIuX2lkYCBleGlzdHMgaW4gbG9jYWxTdG9yYWdlXHJcbiAgXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvYXV0aC9hcHBseVwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLy8gU2VuZCBKU09OIGRhdGFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9pZDogdXNlcklkLCBqb2JfaWQ6IGpvYklkIH0pLCAvLyBDb252ZXJ0IG9iamVjdCB0byBKU09OIHN0cmluZ1xyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICBhbGVydChcIlN1Y2Nlc3NmdWxseSBhcHBsaWVkIGZvciB0aGUgam9iIVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChkYXRhLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gYXBwbHkuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYXBwbHlpbmcgZm9yIGpvYjpcIiwgZXJyb3IpO1xyXG4gICAgICBhbGVydChcIkFuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcclxuICAgIH1cclxuICB9O1xyXG4gIFxyXG5cclxuXHJcbiAgXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgIHsvKiDwn5S3IFdlbGNvbWUgU2VjdGlvbiAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy53ZWxjb21lU2VjdGlvbn0+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gWW91ciBDYXJlZXIgSHViITwvaDE+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICBTdGF5IGNvbm5lY3RlZCB3aXRoIDxzdHJvbmc+bW9kZXJuIG9wcG9ydHVuaXRpZXM8L3N0cm9uZz4gYW5kIDxzdHJvbmc+ZXhjaXRpbmcgY2FyZWVyIHBhdGhzPC9zdHJvbmc+LlxyXG4gICAgICAgICAgSm9pbiB1cyB0b2RheSBhbmQgZ2V0IGFjY2VzcyB0byA8c3Ryb25nPmV4Y2x1c2l2ZSBqb2IgbGlzdGluZ3M8L3N0cm9uZz4hXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYXV0aEJ1dHRvbnN9PlxyXG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9zaWdudXBcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5zaWdudXBCdG59PlNpZ24gVXA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvbG9naW5cIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5sb2dpbkJ0bn0+TG9naW48L2J1dHRvbj5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Lyog8J+UtyBKb2IgTGlzdGluZ3MgU2VjdGlvbiAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5qb2JzU2VjdGlvbn0+XHJcbiAgICAgICAgPGgyPkxhdGVzdCBKb2IgT3Bwb3J0dW5pdGllczwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5qb2JHcmlkfT5cclxuICAgICAgICAgIHtqb2JzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIGpvYnMubWFwKChqb2IpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17am9iLl9pZH0gY2xhc3NOYW1lPXtzdHlsZXMuam9iQ2FyZFdyYXBwZXJ9PlxyXG4gICAgICAgICAgICAgICAgPEpvYkNhcmQgam9iPXtqb2J9IG9uQXBwbHk9e2FwcGx5Rm9ySm9ifSAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMubm9Kb2JzfT5ObyBqb2IgcG9zdGluZ3MgYXZhaWxhYmxlIHJpZ2h0IG5vdy48L3A+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKb2JQb3J0YWw7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiSm9iQ2FyZCIsInN0eWxlcyIsIkxpbmsiLCJKb2JQb3J0YWwiLCJqb2JzIiwic2V0Sm9icyIsImZldGNoSm9icyIsInJlcyIsImRhdGEiLCJ1bmlxdWVKb2JzIiwiZXJyb3IiLCJmZXRjaCIsImpzb24iLCJ1c2Vyam9icyIsInJlZHVjZSIsImFjYyIsImpvYiIsImZpbmQiLCJqIiwiX2lkIiwicHVzaCIsImNvbnNvbGUiLCJhcHBseUZvckpvYiIsImpvYklkIiwidXNlciIsInVzZXJJZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhbGVydCIsIkpTT04iLCJwYXJzZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5Iiwic3RyaW5naWZ5IiwidXNlcl9pZCIsImpvYl9pZCIsIm9rIiwibWVzc2FnZSIsImRpdiIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsIndlbGNvbWVTZWN0aW9uIiwiaDEiLCJwIiwic3Ryb25nIiwiYXV0aEJ1dHRvbnMiLCJocmVmIiwiYnV0dG9uIiwic2lnbnVwQnRuIiwibG9naW5CdG4iLCJqb2JzU2VjdGlvbiIsImgyIiwiam9iR3JpZCIsImxlbmd0aCIsIm1hcCIsImpvYkNhcmRXcmFwcGVyIiwib25BcHBseSIsIm5vSm9icyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/jobs.js\n"));

/***/ })

});