/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/about",{

/***/ "./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[1]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[2]!./src/styles/card.module.css":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[1]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[2]!./src/styles/card.module.css ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(__webpack_require__.ts("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/next/dist/build/webpack/loaders/css-loader/src/runtime/api.js */ \"./node_modules/next/dist/build/webpack/loaders/css-loader/src/runtime/api.js\");\nvar ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(true);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* Card Container */\\r\\n.card_card__ppk8h {\\r\\n  display: flex;\\r\\n  flex-direction: row-reverse;\\r\\n  align-items: center;\\r\\n  padding: 15px;\\r\\n  width: 33%;\\r\\n  perspective: 1000px;\\r\\n  margin: 15px;\\r\\n}\\r\\n\\r\\n/* Small Version */\\r\\n.card_small__RpepU {\\r\\n  width: 100%; /* Smaller size */\\r\\n  height: 220px;\\r\\n  margin: 5%;\\r\\n}\\r\\n\\r\\n/* Inner Wrapper for Flip Effect */\\r\\n.card_inner__roPXt {\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  position: relative;\\r\\n  transform-style: preserve-3d;\\r\\n  transition: transform 0.5s;\\r\\n}\\r\\n\\r\\n/* Flip Effect */\\r\\n.card_flipped__bicz9 {\\r\\n  transform: rotateY(180deg);\\r\\n}\\r\\n\\r\\n/* Front and Back Common Styles */\\r\\n.card_front__W0Oa0, .card_back__3EZF_ {\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  position: absolute;\\r\\n  backface-visibility: hidden;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  border-radius: 10px;\\r\\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\\r\\n  background-color: #fff;\\r\\n  padding: 10px;\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n/* Front Side - Two Column Layout */\\r\\n.card_front__W0Oa0 {\\r\\n  background: linear-gradient(180deg, #9fbcda, #779fc6);\\r\\n  color: white;\\r\\n  display: grid;\\r\\n  grid-template-columns: 50% 50%; /* Two columns */\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n/* Image Container */\\r\\n.card_image-container__iLfEO {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n/* Profile Image */\\r\\n.card_image__Z_lwa {\\r\\n  width: 80%;\\r\\n  height: auto;\\r\\n  border-radius: 50%;\\r\\n  object-fit: cover;\\r\\n}\\r\\n\\r\\n/* Info Section (Name & Position) */\\r\\n.card_info__NONY1 {\\r\\n  font-size: 16px;\\r\\n  font-weight: 500;\\r\\n  opacity: 0.9;\\r\\n  margin-bottom: 15px;\\r\\n}\\r\\n\\r\\n.card_name__FO__c {\\r\\n  font-size: 18px;\\r\\n  font-weight: bold;\\r\\n}\\r\\n\\r\\n.card_position__5I_1m {\\r\\n  font-size: 14px;\\r\\n  opacity: 0.8;\\r\\n}\\r\\n\\r\\n/* Back Side */\\r\\n.card_back__3EZF_ {\\r\\n  background-color: #85a1c0;\\r\\n  color: white;\\r\\n  transform: rotateY(180deg);\\r\\n  padding: 20px;\\r\\n}\\r\\n\\r\\n/* Icons */\\r\\n\\r\\n.card_contactLink__IxNrH {\\r\\n  display: inline-block;\\r\\n  margin: 0 10px;\\r\\n}\\r\\n\\r\\n.card_icon__0VrzI {\\r\\n  width: 30px;\\r\\n  height: 30px;\\r\\n  vertical-align: middle;\\r\\n  margin-top: auto;\\r\\n  margin-right: auto; /* Space between icons */\\r\\n  transition: transform 0.3s ease;\\r\\n}\\r\\n\\r\\n.card_icon__0VrzI:hover {\\r\\n  transform: scale(1.1); /* Slight zoom effect on hover */\\r\\n}\\r\\n\", \"\",{\"version\":3,\"sources\":[\"webpack://src/styles/card.module.css\"],\"names\":[],\"mappings\":\"AAAA,mBAAmB;AACnB;EACE,aAAa;EACb,2BAA2B;EAC3B,mBAAmB;EACnB,aAAa;EACb,UAAU;EACV,mBAAmB;EACnB,YAAY;AACd;;AAEA,kBAAkB;AAClB;EACE,WAAW,EAAE,iBAAiB;EAC9B,aAAa;EACb,UAAU;AACZ;;AAEA,kCAAkC;AAClC;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,4BAA4B;EAC5B,0BAA0B;AAC5B;;AAEA,gBAAgB;AAChB;EACE,0BAA0B;AAC5B;;AAEA,iCAAiC;AACjC;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,2BAA2B;EAC3B,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,wCAAwC;EACxC,sBAAsB;EACtB,aAAa;EACb,kBAAkB;AACpB;;AAEA,mCAAmC;AACnC;EACE,qDAAqD;EACrD,YAAY;EACZ,aAAa;EACb,8BAA8B,EAAE,gBAAgB;EAChD,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA,oBAAoB;AACpB;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA,kBAAkB;AAClB;EACE,UAAU;EACV,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA,mCAAmC;AACnC;EACE,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,YAAY;AACd;;AAEA,cAAc;AACd;EACE,yBAAyB;EACzB,YAAY;EACZ,0BAA0B;EAC1B,aAAa;AACf;;AAEA,UAAU;;AAEV;EACE,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,gBAAgB;EAChB,kBAAkB,EAAE,wBAAwB;EAC5C,+BAA+B;AACjC;;AAEA;EACE,qBAAqB,EAAE,gCAAgC;AACzD\",\"sourcesContent\":[\"/* Card Container */\\r\\n.card {\\r\\n  display: flex;\\r\\n  flex-direction: row-reverse;\\r\\n  align-items: center;\\r\\n  padding: 15px;\\r\\n  width: 33%;\\r\\n  perspective: 1000px;\\r\\n  margin: 15px;\\r\\n}\\r\\n\\r\\n/* Small Version */\\r\\n.small {\\r\\n  width: 100%; /* Smaller size */\\r\\n  height: 220px;\\r\\n  margin: 5%;\\r\\n}\\r\\n\\r\\n/* Inner Wrapper for Flip Effect */\\r\\n.inner {\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  position: relative;\\r\\n  transform-style: preserve-3d;\\r\\n  transition: transform 0.5s;\\r\\n}\\r\\n\\r\\n/* Flip Effect */\\r\\n.flipped {\\r\\n  transform: rotateY(180deg);\\r\\n}\\r\\n\\r\\n/* Front and Back Common Styles */\\r\\n.front, .back {\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  position: absolute;\\r\\n  backface-visibility: hidden;\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  border-radius: 10px;\\r\\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\\r\\n  background-color: #fff;\\r\\n  padding: 10px;\\r\\n  text-align: center;\\r\\n}\\r\\n\\r\\n/* Front Side - Two Column Layout */\\r\\n.front {\\r\\n  background: linear-gradient(180deg, #9fbcda, #779fc6);\\r\\n  color: white;\\r\\n  display: grid;\\r\\n  grid-template-columns: 50% 50%; /* Two columns */\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n/* Image Container */\\r\\n.image-container {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n/* Profile Image */\\r\\n.image {\\r\\n  width: 80%;\\r\\n  height: auto;\\r\\n  border-radius: 50%;\\r\\n  object-fit: cover;\\r\\n}\\r\\n\\r\\n/* Info Section (Name & Position) */\\r\\n.info {\\r\\n  font-size: 16px;\\r\\n  font-weight: 500;\\r\\n  opacity: 0.9;\\r\\n  margin-bottom: 15px;\\r\\n}\\r\\n\\r\\n.name {\\r\\n  font-size: 18px;\\r\\n  font-weight: bold;\\r\\n}\\r\\n\\r\\n.position {\\r\\n  font-size: 14px;\\r\\n  opacity: 0.8;\\r\\n}\\r\\n\\r\\n/* Back Side */\\r\\n.back {\\r\\n  background-color: #85a1c0;\\r\\n  color: white;\\r\\n  transform: rotateY(180deg);\\r\\n  padding: 20px;\\r\\n}\\r\\n\\r\\n/* Icons */\\r\\n\\r\\n.contactLink {\\r\\n  display: inline-block;\\r\\n  margin: 0 10px;\\r\\n}\\r\\n\\r\\n.icon {\\r\\n  width: 30px;\\r\\n  height: 30px;\\r\\n  vertical-align: middle;\\r\\n  margin-top: auto;\\r\\n  margin-right: auto; /* Space between icons */\\r\\n  transition: transform 0.3s ease;\\r\\n}\\r\\n\\r\\n.icon:hover {\\r\\n  transform: scale(1.1); /* Slight zoom effect on hover */\\r\\n}\\r\\n\"],\"sourceRoot\":\"\"}]);\n// Exports\n___CSS_LOADER_EXPORT___.locals = {\n\t\"card\": \"card_card__ppk8h\",\n\t\"small\": \"card_small__RpepU\",\n\t\"inner\": \"card_inner__roPXt\",\n\t\"flipped\": \"card_flipped__bicz9\",\n\t\"front\": \"card_front__W0Oa0\",\n\t\"back\": \"card_back__3EZF_\",\n\t\"image-container\": \"card_image-container__iLfEO\",\n\t\"image\": \"card_image__Z_lwa\",\n\t\"info\": \"card_info__NONY1\",\n\t\"name\": \"card_name__FO__c\",\n\t\"position\": \"card_position__5I_1m\",\n\t\"contactLink\": \"card_contactLink__IxNrH\",\n\t\"icon\": \"card_icon__0VrzI\"\n};\nmodule.exports = ___CSS_LOADER_EXPORT___;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9jc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1s3XS5vbmVPZls3XS51c2VbMV0hLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbN10ub25lT2ZbN10udXNlWzJdIS4vc3JjL3N0eWxlcy9jYXJkLm1vZHVsZS5jc3MiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxrQ0FBa0MsbUJBQU8sQ0FBQyxzS0FBa0Y7QUFDNUg7QUFDQTtBQUNBLHFGQUFxRixvQkFBb0Isa0NBQWtDLDBCQUEwQixvQkFBb0IsaUJBQWlCLDBCQUEwQixtQkFBbUIsS0FBSyxtREFBbUQsbUJBQW1CLHNDQUFzQyxpQkFBaUIsS0FBSyxtRUFBbUUsa0JBQWtCLG1CQUFtQix5QkFBeUIsbUNBQW1DLGlDQUFpQyxLQUFLLG1EQUFtRCxpQ0FBaUMsS0FBSyxxRkFBcUYsa0JBQWtCLG1CQUFtQix5QkFBeUIsa0NBQWtDLG9CQUFvQiw2QkFBNkIsMEJBQTBCLDhCQUE4QiwwQkFBMEIsK0NBQStDLDZCQUE2QixvQkFBb0IseUJBQXlCLEtBQUssb0VBQW9FLDREQUE0RCxtQkFBbUIsb0JBQW9CLHNDQUFzQywyQ0FBMkMsOEJBQThCLDBCQUEwQixLQUFLLCtEQUErRCxvQkFBb0IsOEJBQThCLDBCQUEwQixLQUFLLG1EQUFtRCxpQkFBaUIsbUJBQW1CLHlCQUF5Qix3QkFBd0IsS0FBSyxtRUFBbUUsc0JBQXNCLHVCQUF1QixtQkFBbUIsMEJBQTBCLEtBQUssMkJBQTJCLHNCQUFzQix3QkFBd0IsS0FBSywrQkFBK0Isc0JBQXNCLG1CQUFtQixLQUFLLDhDQUE4QyxnQ0FBZ0MsbUJBQW1CLGlDQUFpQyxvQkFBb0IsS0FBSyxxREFBcUQsNEJBQTRCLHFCQUFxQixLQUFLLDJCQUEyQixrQkFBa0IsbUJBQW1CLDZCQUE2Qix1QkFBdUIsMEJBQTBCLCtEQUErRCxLQUFLLGlDQUFpQyw2QkFBNkIsc0NBQXNDLFdBQVcsa0dBQWtHLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxNQUFNLFlBQVksTUFBTSxzQkFBc0IsV0FBVyxVQUFVLE1BQU0sWUFBWSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTSxZQUFZLE9BQU8sWUFBWSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxXQUFXLFVBQVUsd0JBQXdCLGFBQWEsYUFBYSxhQUFhLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sWUFBWSxNQUFNLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxVQUFVLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxNQUFNLFdBQVcsS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEseUJBQXlCLGFBQWEsT0FBTyxLQUFLLHdCQUF3Qix5REFBeUQsb0JBQW9CLGtDQUFrQywwQkFBMEIsb0JBQW9CLGlCQUFpQiwwQkFBMEIsbUJBQW1CLEtBQUssdUNBQXVDLG1CQUFtQixzQ0FBc0MsaUJBQWlCLEtBQUssdURBQXVELGtCQUFrQixtQkFBbUIseUJBQXlCLG1DQUFtQyxpQ0FBaUMsS0FBSyx1Q0FBdUMsaUNBQWlDLEtBQUssNkRBQTZELGtCQUFrQixtQkFBbUIseUJBQXlCLGtDQUFrQyxvQkFBb0IsNkJBQTZCLDBCQUEwQiw4QkFBOEIsMEJBQTBCLCtDQUErQyw2QkFBNkIsb0JBQW9CLHlCQUF5QixLQUFLLHdEQUF3RCw0REFBNEQsbUJBQW1CLG9CQUFvQixzQ0FBc0MsMkNBQTJDLDhCQUE4QiwwQkFBMEIsS0FBSyxtREFBbUQsb0JBQW9CLDhCQUE4QiwwQkFBMEIsS0FBSyx1Q0FBdUMsaUJBQWlCLG1CQUFtQix5QkFBeUIsd0JBQXdCLEtBQUssdURBQXVELHNCQUFzQix1QkFBdUIsbUJBQW1CLDBCQUEwQixLQUFLLGVBQWUsc0JBQXNCLHdCQUF3QixLQUFLLG1CQUFtQixzQkFBc0IsbUJBQW1CLEtBQUssa0NBQWtDLGdDQUFnQyxtQkFBbUIsaUNBQWlDLG9CQUFvQixLQUFLLHlDQUF5Qyw0QkFBNEIscUJBQXFCLEtBQUssZUFBZSxrQkFBa0IsbUJBQW1CLDZCQUE2Qix1QkFBdUIsMEJBQTBCLCtEQUErRCxLQUFLLHFCQUFxQiw2QkFBNkIsc0NBQXNDLHVCQUF1QjtBQUNsak07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxBcnlhbiBQcmF0aWtcXERlc2t0b3BcXEVjZWxcXHBsYWNlbWVudC13ZWJzaXRlXFxzcmNcXHN0eWxlc1xcY2FyZC5tb2R1bGUuY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvY3NzLWxvYWRlci9zcmMvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18odHJ1ZSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBDYXJkIENvbnRhaW5lciAqL1xcclxcbi5jYXJkX2NhcmRfX3BwazhoIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcGFkZGluZzogMTVweDtcXHJcXG4gIHdpZHRoOiAzMyU7XFxyXFxuICBwZXJzcGVjdGl2ZTogMTAwMHB4O1xcclxcbiAgbWFyZ2luOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTbWFsbCBWZXJzaW9uICovXFxyXFxuLmNhcmRfc21hbGxfX1JwZXBVIHtcXHJcXG4gIHdpZHRoOiAxMDAlOyAvKiBTbWFsbGVyIHNpemUgKi9cXHJcXG4gIGhlaWdodDogMjIwcHg7XFxyXFxuICBtYXJnaW46IDUlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbm5lciBXcmFwcGVyIGZvciBGbGlwIEVmZmVjdCAqL1xcclxcbi5jYXJkX2lubmVyX19yb1BYdCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxyXFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41cztcXHJcXG59XFxyXFxuXFxyXFxuLyogRmxpcCBFZmZlY3QgKi9cXHJcXG4uY2FyZF9mbGlwcGVkX19iaWN6OSB7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRnJvbnQgYW5kIEJhY2sgQ29tbW9uIFN0eWxlcyAqL1xcclxcbi5jYXJkX2Zyb250X19XME9hMCwgLmNhcmRfYmFja19fM0VaRl8ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIEZyb250IFNpZGUgLSBUd28gQ29sdW1uIExheW91dCAqL1xcclxcbi5jYXJkX2Zyb250X19XME9hMCB7XFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjOWZiY2RhLCAjNzc5ZmM2KTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwJSA1MCU7IC8qIFR3byBjb2x1bW5zICovXFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbWFnZSBDb250YWluZXIgKi9cXHJcXG4uY2FyZF9pbWFnZS1jb250YWluZXJfX2lMZkVPIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qIFByb2ZpbGUgSW1hZ2UgKi9cXHJcXG4uY2FyZF9pbWFnZV9fWl9sd2Ege1xcclxcbiAgd2lkdGg6IDgwJTtcXHJcXG4gIGhlaWdodDogYXV0bztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbmZvIFNlY3Rpb24gKE5hbWUgJiBQb3NpdGlvbikgKi9cXHJcXG4uY2FyZF9pbmZvX19OT05ZMSB7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgb3BhY2l0eTogMC45O1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhcmRfbmFtZV9fRk9fX2Mge1xcclxcbiAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi5jYXJkX3Bvc2l0aW9uX181SV8xbSB7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBvcGFjaXR5OiAwLjg7XFxyXFxufVxcclxcblxcclxcbi8qIEJhY2sgU2lkZSAqL1xcclxcbi5jYXJkX2JhY2tfXzNFWkZfIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4NWExYzA7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi8qIEljb25zICovXFxyXFxuXFxyXFxuLmNhcmRfY29udGFjdExpbmtfX0l4TnJIIHtcXHJcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gIG1hcmdpbjogMCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZF9pY29uX18wVnJ6SSB7XFxyXFxuICB3aWR0aDogMzBweDtcXHJcXG4gIGhlaWdodDogMzBweDtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvOyAvKiBTcGFjZSBiZXR3ZWVuIGljb25zICovXFxyXFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FyZF9pY29uX18wVnJ6STpob3ZlciB7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IC8qIFNsaWdodCB6b29tIGVmZmVjdCBvbiBob3ZlciAqL1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vc3JjL3N0eWxlcy9jYXJkLm1vZHVsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsbUJBQW1CO0FBQ25CO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBLGtCQUFrQjtBQUNsQjtFQUNFLFdBQVcsRUFBRSxpQkFBaUI7RUFDOUIsYUFBYTtFQUNiLFVBQVU7QUFDWjs7QUFFQSxrQ0FBa0M7QUFDbEM7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQiw0QkFBNEI7RUFDNUIsMEJBQTBCO0FBQzVCOztBQUVBLGdCQUFnQjtBQUNoQjtFQUNFLDBCQUEwQjtBQUM1Qjs7QUFFQSxpQ0FBaUM7QUFDakM7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQiwyQkFBMkI7RUFDM0IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQix3Q0FBd0M7RUFDeEMsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUEsbUNBQW1DO0FBQ25DO0VBQ0UscURBQXFEO0VBQ3JELFlBQVk7RUFDWixhQUFhO0VBQ2IsOEJBQThCLEVBQUUsZ0JBQWdCO0VBQ2hELG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBLG9CQUFvQjtBQUNwQjtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBLGtCQUFrQjtBQUNsQjtFQUNFLFVBQVU7RUFDVixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQSxtQ0FBbUM7QUFDbkM7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQSxjQUFjO0FBQ2Q7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLDBCQUEwQjtFQUMxQixhQUFhO0FBQ2Y7O0FBRUEsVUFBVTs7QUFFVjtFQUNFLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFFLHdCQUF3QjtFQUM1QywrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxxQkFBcUIsRUFBRSxnQ0FBZ0M7QUFDekRcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogQ2FyZCBDb250YWluZXIgKi9cXHJcXG4uY2FyZCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDE1cHg7XFxyXFxuICB3aWR0aDogMzMlO1xcclxcbiAgcGVyc3BlY3RpdmU6IDEwMDBweDtcXHJcXG4gIG1hcmdpbjogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogU21hbGwgVmVyc2lvbiAqL1xcclxcbi5zbWFsbCB7XFxyXFxuICB3aWR0aDogMTAwJTsgLyogU21hbGxlciBzaXplICovXFxyXFxuICBoZWlnaHQ6IDIyMHB4O1xcclxcbiAgbWFyZ2luOiA1JTtcXHJcXG59XFxyXFxuXFxyXFxuLyogSW5uZXIgV3JhcHBlciBmb3IgRmxpcCBFZmZlY3QgKi9cXHJcXG4uaW5uZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XFxyXFxufVxcclxcblxcclxcbi8qIEZsaXAgRWZmZWN0ICovXFxyXFxuLmZsaXBwZWQge1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XFxyXFxufVxcclxcblxcclxcbi8qIEZyb250IGFuZCBCYWNrIENvbW1vbiBTdHlsZXMgKi9cXHJcXG4uZnJvbnQsIC5iYWNrIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGcm9udCBTaWRlIC0gVHdvIENvbHVtbiBMYXlvdXQgKi9cXHJcXG4uZnJvbnQge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzlmYmNkYSwgIzc3OWZjNik7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1MCUgNTAlOyAvKiBUd28gY29sdW1ucyAqL1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogSW1hZ2UgQ29udGFpbmVyICovXFxyXFxuLmltYWdlLWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBQcm9maWxlIEltYWdlICovXFxyXFxuLmltYWdlIHtcXHJcXG4gIHdpZHRoOiA4MCU7XFxyXFxuICBoZWlnaHQ6IGF1dG87XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSW5mbyBTZWN0aW9uIChOYW1lICYgUG9zaXRpb24pICovXFxyXFxuLmluZm8ge1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gIG9wYWNpdHk6IDAuOTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XFxyXFxufVxcclxcblxcclxcbi5uYW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMThweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4ucG9zaXRpb24ge1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgb3BhY2l0eTogMC44O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBCYWNrIFNpZGUgKi9cXHJcXG4uYmFjayB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODVhMWMwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJY29ucyAqL1xcclxcblxcclxcbi5jb250YWN0TGluayB7XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBtYXJnaW46IDAgMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24ge1xcclxcbiAgd2lkdGg6IDMwcHg7XFxyXFxuICBoZWlnaHQ6IDMwcHg7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbiAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bzsgLyogU3BhY2UgYmV0d2VlbiBpY29ucyAqL1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLmljb246aG92ZXIge1xcclxcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyAvKiBTbGlnaHQgem9vbSBlZmZlY3Qgb24gaG92ZXIgKi9cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5sb2NhbHMgPSB7XG5cdFwiY2FyZFwiOiBcImNhcmRfY2FyZF9fcHBrOGhcIixcblx0XCJzbWFsbFwiOiBcImNhcmRfc21hbGxfX1JwZXBVXCIsXG5cdFwiaW5uZXJcIjogXCJjYXJkX2lubmVyX19yb1BYdFwiLFxuXHRcImZsaXBwZWRcIjogXCJjYXJkX2ZsaXBwZWRfX2JpY3o5XCIsXG5cdFwiZnJvbnRcIjogXCJjYXJkX2Zyb250X19XME9hMFwiLFxuXHRcImJhY2tcIjogXCJjYXJkX2JhY2tfXzNFWkZfXCIsXG5cdFwiaW1hZ2UtY29udGFpbmVyXCI6IFwiY2FyZF9pbWFnZS1jb250YWluZXJfX2lMZkVPXCIsXG5cdFwiaW1hZ2VcIjogXCJjYXJkX2ltYWdlX19aX2x3YVwiLFxuXHRcImluZm9cIjogXCJjYXJkX2luZm9fX05PTlkxXCIsXG5cdFwibmFtZVwiOiBcImNhcmRfbmFtZV9fRk9fX2NcIixcblx0XCJwb3NpdGlvblwiOiBcImNhcmRfcG9zaXRpb25fXzVJXzFtXCIsXG5cdFwiY29udGFjdExpbmtcIjogXCJjYXJkX2NvbnRhY3RMaW5rX19JeE5ySFwiLFxuXHRcImljb25cIjogXCJjYXJkX2ljb25fXzBWcnpJXCJcbn07XG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[1]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[7].oneOf[7].use[2]!./src/styles/card.module.css\n"));

/***/ })

});