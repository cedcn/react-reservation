webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_reservation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-reservation */ "./node_modules/react-reservation/esm/index.js");
/* harmony import */ var react_reservation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_reservation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var moment_locale_zh_cn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment/locale/zh-cn */ "./node_modules/moment/locale/zh-cn.js");
/* harmony import */ var moment_locale_zh_cn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment_locale_zh_cn__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/cedcn/code/cedcn/react-reservation/examples/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;








const gainCalendarQuotas = () => {
  return [{
    day: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(1, 'day'),
    remaining: 1
  }, {
    day: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(3, 'day'),
    remaining: 0
  }, {
    day: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(10, 'day'),
    remaining: 100
  }, {
    day: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(20, 'day'),
    remaining: 88
  }];
};

const gainTimeBucketQuotas = () => {
  return [{
    start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 10:10'),
    end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:20'),
    remaining: 1
  }, {
    start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:30'),
    end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 13:30'),
    remaining: 0
  }, {
    start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 13:30'),
    end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 15:30'),
    remaining: 32
  }];
};

const IndexPage = () => {
  const {
    0: locale,
    1: setLocale
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('zh-cn');

  const onLocaleChange = e => {
    setLocale(e.target.value);
  };

  moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale(locale);
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, __jsx("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, "Reservation"), __jsx("meta", {
    charSet: "utf-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: undefined
  }), __jsx("meta", {
    name: "viewport",
    content: "initial-scale=1.0, width=device-width",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: undefined
  })), __jsx("div", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "4046755642",
    __self: undefined
  }, ".container.jsx-4046755642{width:100%;max-width:768px;margin-left:auto;margin-right:auto;}h1.jsx-4046755642{text-align:center;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jZWRjbi9jb2RlL2NlZGNuL3JlYWN0LXJlc2VydmF0aW9uL2V4YW1wbGVzL3BhZ2VzL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQ29CLEFBR3dCLEFBT08sV0FORixPQU9sQixTQU5tQixpQkFDQyxrQkFDcEIiLCJmaWxlIjoiL1VzZXJzL2NlZGNuL2NvZGUvY2VkY24vcmVhY3QtcmVzZXJ2YXRpb24vZXhhbXBsZXMvcGFnZXMvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdhbnRkJ1xuaW1wb3J0IFJlc2VydmF0aW9uQ2FsZW5kYXIsIHsgUmVzZXJ2YXRpb25UaW1lQnVja2V0IH0gZnJvbSAncmVhY3QtcmVzZXJ2YXRpb24nXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5pbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcydcbmltcG9ydCAnbW9tZW50L2xvY2FsZS96aC1jbidcblxuY29uc3QgZ2FpbkNhbGVuZGFyUXVvdGFzID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHsgZGF5OiBtb21lbnQoKS5hZGQoMSwgJ2RheScpLCByZW1haW5pbmc6IDEgfSxcbiAgICB7IGRheTogbW9tZW50KCkuYWRkKDMsICdkYXknKSwgcmVtYWluaW5nOiAwIH0sXG4gICAgeyBkYXk6IG1vbWVudCgpLmFkZCgxMCwgJ2RheScpLCByZW1haW5pbmc6IDEwMCB9LFxuICAgIHsgZGF5OiBtb21lbnQoKS5hZGQoMjAsICdkYXknKSwgcmVtYWluaW5nOiA4OCB9LFxuICBdXG59XG5cbmNvbnN0IGdhaW5UaW1lQnVja2V0UXVvdGFzID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHsgc3RhcnQ6IG1vbWVudCgnMjAyMC0wMi0wNCAxMDoxMCcpLCBlbmQ6IG1vbWVudCgnMjAyMC0wMi0wNCAxMToyMCcpLCByZW1haW5pbmc6IDEgfSxcbiAgICB7IHN0YXJ0OiBtb21lbnQoJzIwMjAtMDItMDQgMTE6MzAnKSwgZW5kOiBtb21lbnQoJzIwMjAtMDItMDQgMTM6MzAnKSwgcmVtYWluaW5nOiAwIH0sXG4gICAgeyBzdGFydDogbW9tZW50KCcyMDIwLTAyLTA2IDEzOjMwJyksIGVuZDogbW9tZW50KCcyMDIwLTAyLTA2IDE1OjMwJyksIHJlbWFpbmluZzogMzIgfSxcbiAgXVxufVxuXG5jb25zdCBJbmRleFBhZ2U6IE5leHRQYWdlID0gKCkgPT4ge1xuICBjb25zdCBbbG9jYWxlLCBzZXRMb2NhbGVdID0gdXNlU3RhdGUoJ3poLWNuJylcblxuICBjb25zdCBvbkxvY2FsZUNoYW5nZSA9IChlOiBhbnkpID0+IHtcbiAgICBzZXRMb2NhbGUoZS50YXJnZXQudmFsdWUpXG4gIH1cblxuICBtb21lbnQubG9jYWxlKGxvY2FsZSlcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPlJlc2VydmF0aW9uPC90aXRsZT5cbiAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cImluaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGhcIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDc2OHB4O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaDEge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UmFkaW8uR3JvdXAgb25DaGFuZ2U9e29uTG9jYWxlQ2hhbmdlfSBkZWZhdWx0VmFsdWU9e2xvY2FsZX0+XG4gICAgICAgICAgICAgIDxSYWRpby5CdXR0b24gdmFsdWU9XCJ6aC1jblwiPuS4reaWhzwvUmFkaW8uQnV0dG9uPlxuICAgICAgICAgICAgICA8UmFkaW8uQnV0dG9uIHZhbHVlPVwiZW5cIj7oi7Hmloc8L1JhZGlvLkJ1dHRvbj5cbiAgICAgICAgICAgIDwvUmFkaW8uR3JvdXA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgxPlJlc2VydmF0aW9uPC9oMT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyPlJlcGVhdCA8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uQ2FsZW5kYXIgY2VsbFJlbmRlcj17KCkgPT4gPGRpdj4xMjM8L2Rpdj59IC8+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25DYWxlbmRhciBhZHZhbmNlIC8+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25DYWxlbmRhciBxdW90YXM9e2dhaW5DYWxlbmRhclF1b3Rhc30gLz5cbiAgICAgICAgICAgIDxoMj5SZXBlYXQsIHNldCBkaXNhYmxlZCB3ZWVrcyBhbmQgc2V0IGRpc2FibGVkIGRheXM8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uQ2FsZW5kYXIgZGF5cz17eyBkaXNhYmxlZFdlZWtzOiBbMCwgNl0sIGRpc2FibGVkRGF5czogW21vbWVudCgnMjAyMC0wNC0wMycpXSB9fSAvPlxuICAgICAgICAgICAgPGgyPlJlcGVhdCwgc2V0IHN0YXJ0IGRheSBhbmQgc2V0IGVuZCBkYXk8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uQ2FsZW5kYXIgZGF5cz17eyBzdGFydERheTogbW9tZW50KCcyMDIwLTAyLTAzJyksIGVuZERheTogbW9tZW50KCcyMDIwLTA1LTAzJykgfX0gLz5cbiAgICAgICAgICAgIDxoMj5TcGVjaWZpZWQgZGF5czwvaDI+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25DYWxlbmRhciBkYXlzPXtbbW9tZW50KCcyMDIwLTA0LTAzJyksIG1vbWVudCgnMjAyMC0wMi0wNCcpXX0gLz5cbiAgICAgICAgICAgIDxoMj5UaW1lIEJ1Y2tldDwvaDI+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25UaW1lQnVja2V0XG4gICAgICAgICAgICAgIGRheXM9e3sgc3RhcnREYXk6IG1vbWVudCgnMjAyMC0wMi0wMycpLCBlbmREYXk6IG1vbWVudCgnMjAyMC0wNS0wMycpIH19XG4gICAgICAgICAgICAgIHJhbmdlcz17W1xuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMCwgMTBdLCBlbmQ6IFsxMSwgMjBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzExLCAzMF0sIGVuZDogWzEzLCAzMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTMsIDMwXSwgZW5kOiBbMTUsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxNSwgMzBdLCBlbmQ6IFsyMCwgMzBdIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgIGNlbGxSZW5kZXI9eygpID0+IDxkaXY+NDU2PC9kaXY+fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxSZXNlcnZhdGlvblRpbWVCdWNrZXRcbiAgICAgICAgICAgICAgZGF5cz17eyBzdGFydERheTogbW9tZW50KCcyMDIwLTAyLTAzJyksIGVuZERheTogbW9tZW50KCcyMDIwLTA1LTAzJykgfX1cbiAgICAgICAgICAgICAgcmFuZ2VzPXtbXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzEwLCAxMF0sIGVuZDogWzExLCAyMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTEsIDMwXSwgZW5kOiBbMTMsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMywgMzBdLCBlbmQ6IFsxNSwgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzE1LCAzMF0sIGVuZDogWzIwLCAzMF0gfSxcbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8aDI+VGltZSBCdWNrZXQgd2l0aCBxdW90YXM8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uVGltZUJ1Y2tldFxuICAgICAgICAgICAgICByYW5nZXM9e1tcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTAsIDEwXSwgZW5kOiBbMTEsIDIwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMSwgMzBdLCBlbmQ6IFsxMywgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzE3LCAzMF0sIGVuZDogWzIwLCAzMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTUsIDMwXSwgZW5kOiBbMjAsIDMwXSB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICBhZHZhbmNlXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGgyPlRpbWUgQnVja2V0IHdpdGggcXVvdGFzPC9oMj5cbiAgICAgICAgICAgIDxSZXNlcnZhdGlvblRpbWVCdWNrZXRcbiAgICAgICAgICAgICAgcmFuZ2VzPXtbXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzEwLCAxMF0sIGVuZDogWzExLCAyMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTEsIDMwXSwgZW5kOiBbMTMsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMywgMzBdLCBlbmQ6IFsxNSwgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzE1LCAzMF0sIGVuZDogWzIwLCAzMF0gfSxcbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgbW9kZT1cInRhYnNcIlxuICAgICAgICAgICAgICBjZWxsUmVuZGVyPXsoKSA9PiA8ZGl2Pjc4OTwvZGl2Pn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UmVzZXJ2YXRpb25UaW1lQnVja2V0XG4gICAgICAgICAgICAgIGRheXM9e3tcbiAgICAgICAgICAgICAgICBzdGFydERheTogbW9tZW50KCcyMDIwLTAyLTAzJyksXG4gICAgICAgICAgICAgICAgZW5kRGF5OiBtb21lbnQoJzIwMjAtMDUtMDMnKSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZERheXM6IFttb21lbnQoJzIwMjAtMDItMDcnKV0sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHJhbmdlcz17W1xuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMCwgMTBdLCBlbmQ6IFsxMSwgMjBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzExLCAzMF0sIGVuZDogWzEzLCAzMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTMsIDMwXSwgZW5kOiBbMTUsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxNSwgMzBdLCBlbmQ6IFsyMCwgMzBdIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgIHF1b3Rhcz17Z2FpblRpbWVCdWNrZXRRdW90YXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGgyPlRpbWUgQnVja2V0IGxpc3Q8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uVGltZUJ1Y2tldFxuICAgICAgICAgICAgICBkYXlzPXt7IHN0YXJ0RGF5OiBtb21lbnQoJzIwMjAtMDItMDMnKSwgZW5kRGF5OiBtb21lbnQoJzIwMjAtMDUtMDMnKSB9fVxuICAgICAgICAgICAgICByYW5nZXM9e1tcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTAsIDEwXSwgZW5kOiBbMTEsIDIwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMSwgMzBdLCBlbmQ6IFsxMywgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzEzLCAzMF0sIGVuZDogWzE1LCAzMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTUsIDMwXSwgZW5kOiBbMjAsIDMwXSB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICBtb2RlPVwidGFic1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGgyPlRpbWUgQnVja2V0IGxpc3Qgd2l0aCBxdW90YXM8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uVGltZUJ1Y2tldFxuICAgICAgICAgICAgICBkYXlzPXt7XG4gICAgICAgICAgICAgICAgZW5kRGF5OiBtb21lbnQoJzIwMjAtMDUtMDMnKSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcmFuZ2VzPXtbXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzEwLCAxMF0sIGVuZDogWzExLCAyMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTEsIDMwXSwgZW5kOiBbMTMsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMywgMzBdLCBlbmQ6IFsxNSwgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzE1LCAzMF0sIGVuZDogWzIwLCAzMF0gfSxcbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgbW9kZT1cInRhYnNcIlxuICAgICAgICAgICAgICBxdW90YXM9e1tcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBtb21lbnQoJzIwMjAtMDItMDQgMTA6MTAnKSwgZW5kOiBtb21lbnQoJzIwMjAtMDItMDQgMTE6MjAnKSwgcmVtYWluaW5nOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogbW9tZW50KCcyMDIwLTAyLTA0IDExOjMwJyksIGVuZDogbW9tZW50KCcyMDIwLTAyLTA0IDEzOjMwJyksIHJlbWFpbmluZzogMCB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IG1vbWVudCgnMjAyMC0wMi0wNiAxMzozMCcpLCBlbmQ6IG1vbWVudCgnMjAyMC0wMi0wNiAxNTozMCcpLCByZW1haW5pbmc6IDMyIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGgyPlRpbWUgQnVja2V0IGxpc3Qgd2l0aCBhc3luYyBxdW90YXM8L2gyPlxuICAgICAgICAgICAgPFJlc2VydmF0aW9uVGltZUJ1Y2tldFxuICAgICAgICAgICAgICBkYXlzPXt7XG4gICAgICAgICAgICAgICAgZW5kRGF5OiBtb21lbnQoJzIwMjAtMDUtMDMnKSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcmFuZ2VzPXtbXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzEwLCAxMF0sIGVuZDogWzExLCAyMF0gfSxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBbMTEsIDMwXSwgZW5kOiBbMTMsIDMwXSB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IFsxMywgMzBdLCBlbmQ6IFsxNSwgMzBdIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogWzE1LCAzMF0sIGVuZDogWzIwLCAzMF0gfSxcbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgbW9kZT1cInRhYnNcIlxuICAgICAgICAgICAgICBxdW90YXM9e1tcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBtb21lbnQoJzIwMjAtMDItMDQgMTA6MTAnKSwgZW5kOiBtb21lbnQoJzIwMjAtMDItMDQgMTE6MjAnKSwgcmVtYWluaW5nOiAxIH0sXG4gICAgICAgICAgICAgICAgeyBzdGFydDogbW9tZW50KCcyMDIwLTAyLTA0IDExOjMwJyksIGVuZDogbW9tZW50KCcyMDIwLTAyLTA0IDEzOjMwJyksIHJlbWFpbmluZzogMCB9LFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IG1vbWVudCgnMjAyMC0wMi0wNiAxMzozMCcpLCBlbmQ6IG1vbWVudCgnMjAyMC0wMi0wNiAxNTozMCcpLCByZW1haW5pbmc6IDMyIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgIGFkdmFuY2VcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlXG4iXX0= */\n/*@ sourceURL=/Users/cedcn/code/cedcn/react-reservation/examples/pages/index.tsx */"), __jsx("div", {
    className: "jsx-4046755642" + " " + "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }, __jsx("br", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: undefined
  }), __jsx("div", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: undefined
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Radio"].Group, {
    onChange: onLocaleChange,
    defaultValue: locale,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: undefined
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Radio"].Button, {
    value: "zh-cn",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  }, "\u4E2D\u6587"), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Radio"].Button, {
    value: "en",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, "\u82F1\u6587"))), __jsx("h1", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: undefined
  }, "Reservation"), __jsx("div", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: undefined
  }, __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: undefined
  }, "Repeat "), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    cellRender: () => __jsx("div", {
      className: "jsx-4046755642",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: undefined
    }, "123"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  }), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    advance: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: undefined
  }), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    quotas: gainCalendarQuotas,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }, "Repeat, set disabled weeks and set disabled days"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    days: {
      disabledWeeks: [0, 6],
      disabledDays: [moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-04-03')]
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  }, "Repeat, set start day and set end day"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }, "Specified days"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4___default.a, {
    days: [moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-04-03'), moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04')],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, "Time Bucket"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    cellRender: () => __jsx("div", {
      className: "jsx-4046755642",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: undefined
    }, "456"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  }), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: undefined
  }, "Time Bucket with quotas"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [17, 30],
      end: [20, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    advance: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106
    },
    __self: undefined
  }, "Time Bucket with quotas"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    mode: "tabs",
    cellRender: () => __jsx("div", {
      className: "jsx-4046755642",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 115
      },
      __self: undefined
    }, "789"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    },
    __self: undefined
  }), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03'),
      disabledDays: [moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-07')]
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    quotas: gainTimeBucketQuotas,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131
    },
    __self: undefined
  }, "Time Bucket list"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      startDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-03'),
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    mode: "tabs",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142
    },
    __self: undefined
  }, "Time Bucket list with quotas"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    mode: "tabs",
    quotas: [{
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 10:10'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:20'),
      remaining: 1
    }, {
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:30'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 13:30'),
      remaining: 0
    }, {
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 13:30'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 15:30'),
      remaining: 32
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143
    },
    __self: undefined
  }), __jsx("h2", {
    className: "jsx-4046755642",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160
    },
    __self: undefined
  }, "Time Bucket list with async quotas"), __jsx(react_reservation__WEBPACK_IMPORTED_MODULE_4__["ReservationTimeBucket"], {
    days: {
      endDay: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-05-03')
    },
    ranges: [{
      start: [10, 10],
      end: [11, 20]
    }, {
      start: [11, 30],
      end: [13, 30]
    }, {
      start: [13, 30],
      end: [15, 30]
    }, {
      start: [15, 30],
      end: [20, 30]
    }],
    mode: "tabs",
    quotas: [{
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 10:10'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:20'),
      remaining: 1
    }, {
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 11:30'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-04 13:30'),
      remaining: 0
    }, {
      start: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 13:30'),
      end: moment__WEBPACK_IMPORTED_MODULE_2___default()('2020-02-06 15:30'),
      remaining: 32
    }],
    advance: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161
    },
    __self: undefined
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ })

})
//# sourceMappingURL=index.js.f55293c0c32193d9978f.hot-update.js.map