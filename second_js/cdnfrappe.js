var frappe = (function () {
  "use strict";
  function t(t, e) {
    return "string" == typeof t ? (e || document).querySelector(t) : t || null;
  }
  function e(t) {
    var e = t.getBoundingClientRect();
    return {
      top:
        e.top + (document.documentElement.scrollTop || document.body.scrollTop),
      left:
        e.left +
        (document.documentElement.scrollLeft || document.body.scrollLeft),
    };
  }
  function i(t) {
    var e = t.getBoundingClientRect();
    return (
      e.top >= 0 &&
      e.left >= 0 &&
      e.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      e.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function n(t) {
    var e = window.getComputedStyle(t),
      i = parseFloat(e.paddingLeft) + parseFloat(e.paddingRight);
    return t.clientWidth - i;
  }
  function a(t, e, i) {
    var n = document.createEvent("HTMLEvents");
    n.initEvent(e, !0, !0);
    for (var a in i) n[a] = i[a];
    return t.dispatchEvent(n);
  }
  function s(t) {
    return t.titleHeight + t.margins.top + t.paddings.top;
  }
  function r(t) {
    return t.margins.left + t.paddings.left;
  }
  function o(t) {
    return (
      t.margins.top +
      t.margins.bottom +
      t.paddings.top +
      t.paddings.bottom +
      t.titleHeight +
      t.legendHeight
    );
  }
  function l(t) {
    return (
      t.margins.left + t.margins.right + t.paddings.left + t.paddings.right
    );
  }
  function u(t) {
    return parseFloat(t.toFixed(2));
  }
  function h(t, e, i) {
    var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    i || (i = n ? t[0] : t[t.length - 1]);
    var a = new Array(Math.abs(e)).fill(i);
    return (t = n ? a.concat(t) : t.concat(a));
  }
  function c(t, e) {
    return (t + "").length * e;
  }
  function d(t, e) {
    return { x: Math.sin(t * Xt) * e, y: Math.cos(t * Xt) * e };
  }
  function p(t, e) {
    var i = void 0,
      n = void 0;
    return t <= e ? ((i = e - t), (n = t)) : ((i = t - e), (n = e)), [i, n];
  }
  function f(t, e) {
    var i =
      arguments.length > 2 && void 0 !== arguments[2]
        ? arguments[2]
        : e.length - t.length;
    return i > 0 ? (t = h(t, i)) : (e = h(e, i)), [t, e];
  }
  function v(t, e) {
    if (t) return t.length > e ? t.slice(0, e - 3) + "..." : t;
  }
  function g(t) {
    var e = void 0;
    if ("number" == typeof t) e = t;
    else if ("string" == typeof t && ((e = Number(t)), Number.isNaN(e)))
      return t;
    var i = Math.floor(Math.log10(Math.abs(e)));
    if (i <= 2) return e;
    var n = Math.floor(i / 3),
      a = Math.pow(10, i - 3 * n) * +(e / Math.pow(10, i)).toFixed(1);
    return Math.round(100 * a) / 100 + " " + ["", "K", "M", "B", "T"][n];
  }
  function y(t) {
    return t > 255 ? 255 : t < 0 ? 0 : t;
  }
  function m(t, e) {
    var i = $t(t),
      n = !1;
    "#" == i[0] && ((i = i.slice(1)), (n = !0));
    var a = parseInt(i, 16),
      s = y((a >> 16) + e),
      r = y(((a >> 8) & 255) + e),
      o = y((255 & a) + e);
    return (n ? "#" : "") + (o | (r << 8) | (s << 16)).toString(16);
  }
  function b(t) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
  }
  function x(t, e) {
    return "string" == typeof t ? (e || document).querySelector(t) : t || null;
  }
  function k(t, e) {
    var i = document.createElementNS("http://www.w3.org/2000/svg", t);
    for (var n in e) {
      var a = e[n];
      if ("inside" === n) x(a).appendChild(i);
      else if ("around" === n) {
        var s = x(a);
        s.parentNode.insertBefore(i, s), i.appendChild(s);
      } else
        "styles" === n
          ? "object" === (void 0 === a ? "undefined" : Et(a)) &&
            Object.keys(a).map(function (t) {
              i.style[t] = a[t];
            })
          : ("className" === n && (n = "class"),
            "innerHTML" === n ? (i.textContent = a) : i.setAttribute(n, a));
    }
    return i;
  }
  function w(t, e) {
    return k("linearGradient", {
      inside: t,
      id: e,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    });
  }
  function A(t, e, i, n) {
    return k("stop", {
      inside: t,
      style: "stop-color: " + i,
      offset: e,
      "stop-opacity": n,
    });
  }
  function P(t, e, i, n) {
    return k("svg", { className: e, inside: t, width: i, height: n });
  }
  function L(t) {
    return k("defs", { inside: t });
  }
  function T(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
      n = { className: t, transform: e };
    return i && (n.inside = i), k("g", n);
  }
  function C(t) {
    return k("path", {
      className:
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      d: t,
      styles: {
        stroke:
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : "none",
        fill:
          arguments.length > 3 && void 0 !== arguments[3]
            ? arguments[3]
            : "none",
        "stroke-width":
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
      },
    });
  }
  function O(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = i.x + t.x,
      o = i.y + t.y,
      l = i.x + e.x,
      u = i.y + e.y;
    return (
      "M" +
      i.x +
      " " +
      i.y +
      "\n\t\tL" +
      r +
      " " +
      o +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      u +
      " z"
    );
  }
  function M(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = i.x + t.x,
      o = i.y + t.y,
      l = i.x + e.x,
      u = 2 * i.y,
      h = i.y + e.y;
    return (
      "M" +
      i.x +
      " " +
      i.y +
      "\n\t\tL" +
      r +
      " " +
      o +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      u +
      " z\n\t\tL" +
      r +
      " " +
      u +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      h +
      " z"
    );
  }
  function D(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = i.x + t.x,
      o = i.y + t.y,
      l = i.x + e.x,
      u = i.y + e.y;
    return (
      "M" +
      r +
      " " +
      o +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      u
    );
  }
  function N(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = i.x + t.x,
      o = i.y + t.y,
      l = i.x + e.x,
      u = 2 * n + o,
      h = i.y + t.y;
    return (
      "M" +
      r +
      " " +
      o +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      u +
      "\n\t\tM" +
      r +
      " " +
      u +
      "\n\t\tA " +
      n +
      " " +
      n +
      " 0 " +
      s +
      " " +
      (a ? 1 : 0) +
      "\n\t\t" +
      l +
      " " +
      h
    );
  }
  function S(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      n = "path-fill-gradient-" + e + "-" + (i ? "lighter" : "default"),
      a = w(t, n),
      s = [1, 0.6, 0.2];
    return (
      i && (s = [0.4, 0.2, 0]),
      A(a, "0%", e, s[0]),
      A(a, "50%", e, s[1]),
      A(a, "100%", e, s[2]),
      n
    );
  }
  function E(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Vt,
      s =
        arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "none";
    return k("rect", {
      className: "percentage-bar",
      x: t,
      y: e,
      width: i,
      height: n,
      fill: s,
      styles: {
        stroke: m(s, -25),
        "stroke-dasharray": "0, " + (n + i) + ", " + i + ", " + n,
        "stroke-width": a,
      },
    });
  }
  function _(t, e, i, n) {
    var a =
        arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "none",
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
      r = { className: t, x: e, y: i, width: n, height: n, fill: a };
    return (
      Object.keys(s).map(function (t) {
        r[t] = s[t];
      }),
      k("rect", r)
    );
  }
  function z(t, e, i) {
    var n =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
      a = arguments[4];
    a =
      arguments.length > 5 && void 0 !== arguments[5] && arguments[5]
        ? v(a, te)
        : a;
    var s = {
        className: "legend-bar",
        x: 0,
        y: 0,
        width: i,
        height: "2px",
        fill: n,
      },
      r = k("text", {
        className: "legend-dataset-text",
        x: 0,
        y: 0,
        dy: 2 * ee + "px",
        "font-size": 1.2 * ee + "px",
        "text-anchor": "start",
        fill: ne,
        innerHTML: a,
      }),
      o = k("g", { transform: "translate(" + t + ", " + e + ")" });
    return o.appendChild(k("rect", s)), o.appendChild(r), o;
  }
  function W(t, e, i) {
    var n =
        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none",
      a = arguments[4],
      s = { className: "legend-dot", cx: 0, cy: 0, r: i, fill: n },
      r = k("text", {
        className: "legend-dataset-text",
        x: 0,
        y: 0,
        dx: ee + "px",
        dy: ee / 3 + "px",
        "font-size": 1.2 * ee + "px",
        "text-anchor": "start",
        fill: ne,
        innerHTML: a,
      }),
      o = k("g", { transform: "translate(" + t + ", " + e + ")" });
    return o.appendChild(k("circle", s)), o.appendChild(r), o;
  }
  function H(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
      s = a.fontSize || ee;
    return k("text", {
      className: t,
      x: e,
      y: i,
      dy: (void 0 !== a.dy ? a.dy : s / 2) + "px",
      "font-size": s + "px",
      fill: a.fill || ne,
      "text-anchor": a.textAnchor || "start",
      innerHTML: n,
    });
  }
  function j(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
    a.stroke || (a.stroke = ie);
    var s = k("line", {
        className: "line-vertical " + a.className,
        x1: 0,
        x2: 0,
        y1: i,
        y2: n,
        styles: { stroke: a.stroke },
      }),
      r = k("text", {
        x: 0,
        y: i > n ? i + Zt : i - Zt - ee,
        dy: ee + "px",
        "font-size": ee + "px",
        "text-anchor": "middle",
        innerHTML: e + "",
      }),
      o = k("g", { transform: "translate(" + t + ", 0)" });
    return o.appendChild(s), o.appendChild(r), o;
  }
  function F(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
    a.stroke || (a.stroke = ie),
      a.lineType || (a.lineType = ""),
      a.shortenNumbers && (e = g(e));
    var s = k("line", {
        className:
          "line-horizontal " +
          a.className +
          ("dashed" === a.lineType ? "dashed" : ""),
        x1: i,
        x2: n,
        y1: 0,
        y2: 0,
        styles: { stroke: a.stroke },
      }),
      r = k("text", {
        x: i < n ? i - Zt : i + Zt,
        y: 0,
        dy: ee / 2 - 2 + "px",
        "font-size": ee + "px",
        "text-anchor": i < n ? "end" : "start",
        innerHTML: e + "",
      }),
      o = k("g", { transform: "translate(0, " + t + ")", "stroke-opacity": 1 });
    return (
      (0 !== r && "0" !== r) || (o.style.stroke = "rgba(27, 31, 35, 0.6)"),
      o.appendChild(s),
      o.appendChild(r),
      o
    );
  }
  function I(t, e, i) {
    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    n.pos || (n.pos = "left"),
      n.offset || (n.offset = 0),
      n.mode || (n.mode = "span"),
      n.stroke || (n.stroke = ie),
      n.className || (n.className = "");
    var a = -1 * Qt,
      s = "span" === n.mode ? i + Qt : 0;
    return (
      "tick" === n.mode && "right" === n.pos && ((a = i + Qt), (s = i)),
      (a += n.offset),
      (s += n.offset),
      F(t, e, a, s, {
        stroke: n.stroke,
        className: n.className,
        lineType: n.lineType,
        shortenNumbers: n.shortenNumbers,
      })
    );
  }
  function R(t, e, i) {
    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    n.pos || (n.pos = "bottom"),
      n.offset || (n.offset = 0),
      n.mode || (n.mode = "span"),
      n.stroke || (n.stroke = ie),
      n.className || (n.className = "");
    var a = i + Qt,
      s = "span" === n.mode ? -1 * Qt : i;
    return (
      "tick" === n.mode && "top" === n.pos && ((a = -1 * Qt), (s = 0)),
      j(t, e, a, s, {
        stroke: n.stroke,
        className: n.className,
        lineType: n.lineType,
      })
    );
  }
  function Y(t, e, i) {
    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    n.labelPos || (n.labelPos = "right");
    var a = k("text", {
        className: "chart-label",
        x: "left" === n.labelPos ? Zt : i - c(e, 5) - Zt,
        y: 0,
        dy: ee / -2 + "px",
        "font-size": ee + "px",
        "text-anchor": "start",
        innerHTML: e + "",
      }),
      s = F(t, "", 0, i, {
        stroke: n.stroke || ie,
        className: n.className || "",
        lineType: n.lineType,
      });
    return s.appendChild(a), s;
  }
  function B(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
      s = t - e,
      r = k("rect", {
        className: "bar mini",
        styles: {
          fill: "rgba(228, 234, 239, 0.49)",
          stroke: ie,
          "stroke-dasharray": i + ", " + s,
        },
        x: 0,
        y: 0,
        width: i,
        height: s,
      });
    a.labelPos || (a.labelPos = "right");
    var o = k("text", {
        className: "chart-label",
        x: "left" === a.labelPos ? Zt : i - c(n + "", 4.5) - Zt,
        y: 0,
        dy: ee / -2 + "px",
        "font-size": ee + "px",
        "text-anchor": "start",
        innerHTML: n + "",
      }),
      l = k("g", { transform: "translate(0, " + e + ")" });
    return l.appendChild(r), l.appendChild(o), l;
  }
  function V(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
      o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {},
      l = p(e, o.zeroLine),
      u = Ft(l, 2),
      h = u[0],
      c = u[1];
    (c -= r), 0 === h && ((h = o.minHeight), (c -= o.minHeight));
    var d = k("rect", {
      className: "bar mini",
      style: "fill: " + n,
      "data-point-index": s,
      x: t,
      y: c,
      width: i,
      height: h,
    });
    if ((a += "") || a.length) {
      d.setAttribute("y", 0), d.setAttribute("x", 0);
      var f = k("text", {
          className: "data-point-value",
          x: i / 2,
          y: 0,
          dy: (ee / 2) * -1 + "px",
          "font-size": ee + "px",
          "text-anchor": "middle",
          innerHTML: a,
        }),
        v = k("g", {
          "data-point-index": s,
          transform: "translate(" + t + ", " + c + ")",
        });
      return v.appendChild(d), v.appendChild(f), v;
    }
    return d;
  }
  function U(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      r = k("circle", {
        style: "fill: " + n,
        "data-point-index": s,
        cx: t,
        cy: e,
        r: i,
      });
    if ((a += "") || a.length) {
      r.setAttribute("cy", 0), r.setAttribute("cx", 0);
      var o = k("text", {
          className: "data-point-value",
          x: 0,
          y: 0,
          dy: (ee / 2) * -1 - i + "px",
          "font-size": ee + "px",
          "text-anchor": "middle",
          innerHTML: a,
        }),
        l = k("g", {
          "data-point-index": s,
          transform: "translate(" + t + ", " + e + ")",
        });
      return l.appendChild(r), l.appendChild(o), l;
    }
    return r;
  }
  function G(t, e, i) {
    var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
      s = e
        .map(function (e, i) {
          return t[i] + "," + e;
        })
        .join("L"),
      r = C("M" + s, "line-graph-path", i);
    if (n.heatline) {
      var o = S(a.svgDefs, i);
      r.style.stroke = "url(#" + o + ")";
    }
    var l = { path: r };
    if (n.regionFill) {
      var u = S(a.svgDefs, i, !0),
        h =
          "M" +
          t[0] +
          "," +
          a.zeroLine +
          "L" +
          s +
          "L" +
          t.slice(-1)[0] +
          "," +
          a.zeroLine;
      l.region = C(h, "region-fill", "none", "url(#" + u + ")");
    }
    return l;
  }
  function q(t, e, i, n) {
    var a = "string" == typeof e ? e : e.join(", ");
    return [
      t,
      { transform: i.join(", ") },
      n,
      he,
      "translate",
      { transform: a },
    ];
  }
  function X(t, e, i) {
    return q(t, [i, 0], [e, 0], le);
  }
  function J(t, e, i) {
    return q(t, [0, i], [0, e], le);
  }
  function K(t, e, i, n) {
    var a = e - i,
      s = t.childNodes[0];
    return [
      [
        s,
        { height: a, "stroke-dasharray": s.getAttribute("width") + ", " + a },
        le,
        he,
      ],
      q(t, [0, n], [0, i], le),
    ];
  }
  function $(t, e, i, n) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
      s = p(
        i,
        (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {})
          .zeroLine
      ),
      r = Ft(s, 2),
      o = r[0],
      l = r[1];
    return (
      (l -= a),
      "rect" !== t.nodeName
        ? [
            [t.childNodes[0], { width: n, height: o }, re, he],
            q(
              t,
              t.getAttribute("transform").split("(")[1].slice(0, -1),
              [e, l],
              le
            ),
          ]
        : [[t, { width: n, height: o, x: e, y: l }, re, he]]
    );
  }
  function Q(t, e, i) {
    return "circle" !== t.nodeName
      ? [
          q(
            t,
            t.getAttribute("transform").split("(")[1].slice(0, -1),
            [e, i],
            le
          ),
        ]
      : [[t, { cx: e, cy: i }, re, he]];
  }
  function Z(t, e, i, n) {
    var a = [],
      s = i
        .map(function (t, i) {
          return e[i] + "," + t;
        })
        .join("L"),
      r = [t.path, { d: "M" + s }, oe, he];
    if ((a.push(r), t.region)) {
      var o = e[0] + "," + n + "L",
        l = "L" + e.slice(-1)[0] + ", " + n,
        u = [t.region, { d: "M" + o + s + l }, oe, he];
      a.push(u);
    }
    return a;
  }
  function tt(t, e) {
    return [t, { d: e }, re, he];
  }
  function et(t, e, i) {
    var n =
        arguments.length > 3 && void 0 !== arguments[3]
          ? arguments[3]
          : "linear",
      a =
        arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : void 0,
      s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
      r = t.cloneNode(!0),
      o = t.cloneNode(!0);
    for (var l in e) {
      var u = void 0;
      u =
        "transform" === l
          ? document.createElementNS(
              "http://www.w3.org/2000/svg",
              "animateTransform"
            )
          : document.createElementNS("http://www.w3.org/2000/svg", "animate");
      var h = s[l] || t.getAttribute(l),
        c = e[l],
        d = {
          attributeName: l,
          from: h,
          to: c,
          begin: "0s",
          dur: i / 1e3 + "s",
          values: h + ";" + c,
          keySplines: ce[n],
          keyTimes: "0;1",
          calcMode: "spline",
          fill: "freeze",
        };
      a && (d.type = a);
      for (var p in d) u.setAttribute(p, d[p]);
      r.appendChild(u),
        a ? o.setAttribute(l, "translate(" + c + ")") : o.setAttribute(l, c);
    }
    return [r, o];
  }
  function it(t, e) {
    (t.style.transform = e),
      (t.style.webkitTransform = e),
      (t.style.msTransform = e),
      (t.style.mozTransform = e),
      (t.style.oTransform = e);
  }
  function nt(t, e) {
    var i = [],
      n = [];
    e.map(function (t) {
      var e = t[0],
        a = e.parentNode,
        s = void 0,
        r = void 0;
      t[0] = e;
      var o = et.apply(void 0, It(t)),
        l = Ft(o, 2);
      (s = l[0]), (r = l[1]), i.push(r), n.push([s, a]), a.replaceChild(s, e);
    });
    var a = t.cloneNode(!0);
    return (
      n.map(function (t, n) {
        t[1].replaceChild(i[n], t[0]), (e[n][0] = i[n]);
      }),
      a
    );
  }
  function at(t, e, i) {
    if (0 !== i.length) {
      var n = nt(e, i);
      e.parentNode == t && (t.removeChild(e), t.appendChild(n)),
        setTimeout(function () {
          n.parentNode == t && (t.removeChild(n), t.appendChild(e));
        }, ue);
    }
  }
  function st(t, e) {
    var i = document.createElement("a");
    i.style = "display: none";
    var n = new Blob(e, { type: "image/svg+xml; charset=utf-8" }),
      a = window.URL.createObjectURL(n);
    (i.href = a),
      (i.download = t),
      document.body.appendChild(i),
      i.click(),
      setTimeout(function () {
        document.body.removeChild(i), window.URL.revokeObjectURL(a);
      }, 300);
  }
  function rt(e) {
    var i = e.cloneNode(!0);
    i.classList.add("chart-container"),
      i.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
      i.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    var n = t.create("style", { innerHTML: de });
    i.insertBefore(n, i.firstChild);
    var a = t.create("div");
    return a.appendChild(i), a.innerHTML;
  }
  function ot(t) {
    var e = new Date(t);
    return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e;
  }
  function lt(t) {
    var e = t.getDate(),
      i = t.getMonth() + 1;
    return [
      t.getFullYear(),
      (i > 9 ? "" : "0") + i,
      (e > 9 ? "" : "0") + e,
    ].join("-");
  }
  function ut(t) {
    return new Date(t.getTime());
  }
  function ht(t, e) {
    var i = vt(t);
    return Math.ceil(ct(i, e) / ge);
  }
  function ct(t, e) {
    var i = me * ye;
    return (ot(e) - ot(t)) / i;
  }
  function dt(t, e) {
    return t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear();
  }
  function pt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      i = be[t];
    return e ? i.slice(0, 3) : i;
  }
  function ft(t, e) {
    return new Date(e, t + 1, 0);
  }
  function vt(t) {
    var e = ut(t),
      i = e.getDay();
    return 0 !== i && gt(e, -1 * i), e;
  }
  function gt(t, e) {
    t.setDate(t.getDate() + e);
  }
  function yt(t, e, i) {
    var n = Object.keys(we).filter(function (e) {
        return t.includes(e);
      }),
      a = we[n[0]];
    return Object.assign(a, { constants: e, getData: i }), new ke(a);
  }
  function mt(t) {
    if (0 === t) return [0, 0];
    if (isNaN(t)) return { mantissa: -6755399441055744, exponent: 972 };
    var e = t > 0 ? 1 : -1;
    if (!isFinite(t)) return { mantissa: 4503599627370496 * e, exponent: 972 };
    t = Math.abs(t);
    var i = Math.floor(Math.log10(t));
    return [e * (t / Math.pow(10, i)), i];
  }
  function bt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      i = Math.ceil(t),
      n = Math.floor(e),
      a = i - n,
      s = a,
      r = 1;
    a > 5 && (a % 2 != 0 && (a = ++i - n), (s = a / 2), (r = 2)),
      a <= 2 && (r = a / (s = 4)),
      0 === a && ((s = 5), (r = 1));
    for (var o = [], l = 0; l <= s; l++) o.push(n + r * l);
    return o;
  }
  function xt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      i = mt(t),
      n = Ft(i, 2),
      a = n[0],
      s = n[1],
      r = e ? e / Math.pow(10, s) : 0,
      o = bt((a = a.toFixed(6)), r);
    return (o = o.map(function (t) {
      return t * Math.pow(10, s);
    }));
  }
  function kt(t) {
    function e(t, e) {
      for (var i = xt(t), n = i[1] - i[0], a = 0, s = 1; a < e; s++)
        (a += n), i.unshift(-1 * a);
      return i;
    }
    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = Math.max.apply(Math, It(t)),
      a = Math.min.apply(Math, It(t)),
      s = [];
    if (n >= 0 && a >= 0) mt(n)[1], (s = i ? xt(n, a) : xt(n));
    else if (n > 0 && a < 0) {
      var r = Math.abs(a);
      n >= r
        ? (mt(n)[1], (s = e(n, r)))
        : (mt(r)[1],
          (s = e(r, n).map(function (t) {
            return -1 * t;
          })));
    } else if (n <= 0 && a <= 0) {
      var o = Math.abs(a),
        l = Math.abs(n);
      mt(o)[1],
        (s = (s = i ? xt(o, l) : xt(o)).reverse().map(function (t) {
          return -1 * t;
        }));
    }
    return s;
  }
  function wt(t) {
    var e = At(t);
    return t.indexOf(0) >= 0
      ? t.indexOf(0)
      : t[0] > 0
      ? (-1 * t[0]) / e
      : (-1 * t[t.length - 1]) / e + (t.length - 1);
  }
  function At(t) {
    return t[1] - t[0];
  }
  function Pt(t) {
    return t[t.length - 1] - t[0];
  }
  function Lt(t, e) {
    return u(e.zeroLine - t * e.scaleMultiplier);
  }
  function Tt(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      n = e.reduce(function (e, i) {
        return Math.abs(i - t) < Math.abs(e - t) ? i : e;
      });
    return i ? e.indexOf(n) : n;
  }
  function Ct(t, e) {
    for (
      var i = Math.max.apply(Math, It(t)), n = 1 / (e - 1), a = [], s = 0;
      s < e;
      s++
    ) {
      var r = i * (n * s);
      a.push(r);
    }
    return a;
  }
  function Ot(t, e) {
    return e.filter(function (e) {
      return e < t;
    }).length;
  }
  function Mt(t, e) {
    t.labels = t.labels || [];
    var i = t.labels.length,
      n = t.datasets,
      a = new Array(i).fill(0);
    return (
      n || (n = [{ values: a }]),
      n.map(function (t) {
        if (t.values) {
          var n = t.values;
          n =
            (n = n.map(function (t) {
              return isNaN(t) ? 0 : t;
            })).length > i
              ? n.slice(0, i)
              : h(n, i - n.length, 0);
        } else t.values = a;
        t.chartType || (Bt.includes(e), (t.chartType = e));
      }),
      t.yRegions &&
        t.yRegions.map(function (t) {
          if (t.end < t.start) {
            var e = [t.end, t.start];
            (t.start = e[0]), (t.end = e[1]);
          }
        }),
      t
    );
  }
  function Dt(t) {
    var e = t.labels.length,
      i = new Array(e).fill(0),
      n = {
        labels: t.labels.slice(0, -1),
        datasets: t.datasets.map(function (t) {
          return { name: "", values: i.slice(0, -1), chartType: t.chartType };
        }),
      };
    return (
      t.yMarkers && (n.yMarkers = [{ value: 0, label: "" }]),
      t.yRegions && (n.yRegions = [{ start: 0, end: 0, label: "" }]),
      n
    );
  }
  function Nt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
      n = t / e.length;
    n <= 0 && (n = 1);
    var a = n / Ut;
    return e.map(function (t, e) {
      return (
        (t += "").length > a &&
          (i
            ? e % Math.ceil(t.length / a) != 0 && (t = "")
            : (t =
                a - 3 > 0 ? t.slice(0, a - 3) + " ..." : t.slice(0, a) + "..")),
        t
      );
    });
  }
  function St() {
    var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "line",
      e = arguments[1],
      i = arguments[2];
    return "axis-mixed" === t
      ? ((i.type = "line"), new Te(e, i))
      : Oe[t]
      ? new Oe[t](e, i)
      : void console.error("Undefined chart type: " + t);
  }
  !(function (t, e) {
    void 0 === e && (e = {});
    var i = e.insertAt;
    if (t && "undefined" != typeof document) {
      var n = document.head || document.getElementsByTagName("head")[0],
        a = document.createElement("style");
      (a.type = "text/css"),
        "top" === i && n.firstChild
          ? n.insertBefore(a, n.firstChild)
          : n.appendChild(a),
        a.styleSheet
          ? (a.styleSheet.cssText = t)
          : a.appendChild(document.createTextNode(t));
    }
  })(
    '.chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#ffffff;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ol,.graph-svg-tip ul{padding-left:0;display:-webkit-box;display:-ms-flexbox;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:" ";border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}'
  );
  var Et =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    _t =
      ((function () {
        function t(t) {
          this.value = t;
        }
        function e(e) {
          function i(t, e) {
            return new Promise(function (i, a) {
              var o = { key: t, arg: e, resolve: i, reject: a, next: null };
              r ? (r = r.next = o) : ((s = r = o), n(t, e));
            });
          }
          function n(i, s) {
            try {
              var r = e[i](s),
                o = r.value;
              o instanceof t
                ? Promise.resolve(o.value).then(
                    function (t) {
                      n("next", t);
                    },
                    function (t) {
                      n("throw", t);
                    }
                  )
                : a(r.done ? "return" : "normal", r.value);
            } catch (t) {
              a("throw", t);
            }
          }
          function a(t, e) {
            switch (t) {
              case "return":
                s.resolve({ value: e, done: !0 });
                break;
              case "throw":
                s.reject(e);
                break;
              default:
                s.resolve({ value: e, done: !1 });
            }
            (s = s.next) ? n(s.key, s.arg) : (r = null);
          }
          var s, r;
          (this._invoke = i),
            "function" != typeof e.return && (this.return = void 0);
        }
        "function" == typeof Symbol &&
          Symbol.asyncIterator &&
          (e.prototype[Symbol.asyncIterator] = function () {
            return this;
          }),
          (e.prototype.next = function (t) {
            return this._invoke("next", t);
          }),
          (e.prototype.throw = function (t) {
            return this._invoke("throw", t);
          }),
          (e.prototype.return = function (t) {
            return this._invoke("return", t);
          });
      })(),
      function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }),
    zt = (function () {
      function t(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n);
        }
      }
      return function (e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
      };
    })(),
    Wt = function t(e, i, n) {
      null === e && (e = Function.prototype);
      var a = Object.getOwnPropertyDescriptor(e, i);
      if (void 0 === a) {
        var s = Object.getPrototypeOf(e);
        return null === s ? void 0 : t(s, i, n);
      }
      if ("value" in a) return a.value;
      var r = a.get;
      if (void 0 !== r) return r.call(n);
    },
    Ht = function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    },
    jt = function (t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    },
    Ft = (function () {
      function t(t, e) {
        var i = [],
          n = !0,
          a = !1,
          s = void 0;
        try {
          for (
            var r, o = t[Symbol.iterator]();
            !(n = (r = o.next()).done) &&
            (i.push(r.value), !e || i.length !== e);
            n = !0
          );
        } catch (t) {
          (a = !0), (s = t);
        } finally {
          try {
            !n && o.return && o.return();
          } finally {
            if (a) throw s;
          }
        }
        return i;
      }
      return function (e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })(),
    It = function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
      }
      return Array.from(t);
    };
  t.create = function (e, i) {
    var n = document.createElement(e);
    for (var a in i) {
      var s = i[a];
      if ("inside" === a) t(s).appendChild(n);
      else if ("around" === a) {
        var r = t(s);
        r.parentNode.insertBefore(n, r), n.appendChild(r);
      } else
        "styles" === a
          ? "object" === (void 0 === s ? "undefined" : Et(s)) &&
            Object.keys(s).map(function (t) {
              n.style[t] = s[t];
            })
          : a in n
          ? (n[a] = s)
          : n.setAttribute(a, s);
    }
    return n;
  };
  var Rt = {
      margins: { top: 10, bottom: 10, left: 20, right: 20 },
      paddings: { top: 20, bottom: 40, left: 30, right: 10 },
      baseHeight: 240,
      titleHeight: 20,
      legendHeight: 30,
      titleFontSize: 12,
    },
    Yt = 700,
    Bt = ["line", "bar"],
    Vt = 2,
    Ut = 7,
    Gt = [
      "light-blue",
      "blue",
      "violet",
      "red",
      "orange",
      "yellow",
      "green",
      "light-green",
      "purple",
      "magenta",
      "light-grey",
      "dark-grey",
    ],
    qt = {
      bar: Gt,
      line: Gt,
      pie: Gt,
      percentage: Gt,
      heatmap: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
      donut: Gt,
    },
    Xt = Math.PI / 180,
    Jt = (function () {
      function e(t) {
        var i = t.parent,
          n = void 0 === i ? null : i,
          a = t.colors,
          s = void 0 === a ? [] : a;
        _t(this, e),
          (this.parent = n),
          (this.colors = s),
          (this.titleName = ""),
          (this.titleValue = ""),
          (this.listValues = []),
          (this.titleValueFirst = 0),
          (this.x = 0),
          (this.y = 0),
          (this.top = 0),
          (this.left = 0),
          this.setup();
      }
      return (
        zt(e, [
          {
            key: "setup",
            value: function () {
              this.makeTooltip();
            },
          },
          {
            key: "refresh",
            value: function () {
              this.fill(), this.calcPosition();
            },
          },
          {
            key: "makeTooltip",
            value: function () {
              var e = this;
              (this.container = t.create("div", {
                inside: this.parent,
                className: "graph-svg-tip comparison",
                innerHTML:
                  '<span class="title"></span>\n\t\t\t\t<ul class="data-point-list"></ul>\n\t\t\t\t<div class="svg-pointer"></div>',
              })),
                this.hideTip(),
                (this.title = this.container.querySelector(".title")),
                (this.dataPointList = this.container.querySelector(
                  ".data-point-list"
                )),
                this.parent.addEventListener("mouseleave", function () {
                  e.hideTip();
                });
            },
          },
          {
            key: "fill",
            value: function () {
              var e = this,
                i = void 0;
              this.index &&
                this.container.setAttribute("data-point-index", this.index),
                (i = this.titleValueFirst
                  ? "<strong>" + this.titleValue + "</strong>" + this.titleName
                  : this.titleName +
                    "<strong>" +
                    this.titleValue +
                    "</strong>"),
                (this.title.innerHTML = i),
                (this.dataPointList.innerHTML = ""),
                this.listValues.map(function (i, n) {
                  var a = e.colors[n] || "black",
                    s =
                      0 === i.formatted || i.formatted ? i.formatted : i.value,
                    r = t.create("li", {
                      styles: { "border-top": "3px solid " + a },
                      innerHTML:
                        '<strong style="display: block;">' +
                        (0 === s || s ? s : "") +
                        "</strong>\n\t\t\t\t\t" +
                        (i.title ? i.title : ""),
                    });
                  e.dataPointList.appendChild(r);
                });
            },
          },
          {
            key: "calcPosition",
            value: function () {
              var t = this.container.offsetWidth;
              (this.top = this.y - this.container.offsetHeight - 5),
                (this.left = this.x - t / 2);
              var e = this.parent.offsetWidth - t,
                i = this.container.querySelector(".svg-pointer");
              if (this.left < 0)
                (i.style.left = "calc(50% - " + -1 * this.left + "px)"),
                  (this.left = 0);
              else if (this.left > e) {
                var n = "calc(50% + " + (this.left - e) + "px)";
                (i.style.left = n), (this.left = e);
              } else i.style.left = "50%";
            },
          },
          {
            key: "setValues",
            value: function (t, e) {
              var i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                n =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : [],
                a =
                  arguments.length > 4 && void 0 !== arguments[4]
                    ? arguments[4]
                    : -1;
              (this.titleName = i.name),
                (this.titleValue = i.value),
                (this.listValues = n),
                (this.x = t),
                (this.y = e),
                (this.titleValueFirst = i.valueFirst || 0),
                (this.index = a),
                this.refresh();
            },
          },
          {
            key: "hideTip",
            value: function () {
              (this.container.style.top = "0px"),
                (this.container.style.left = "0px"),
                (this.container.style.opacity = "0");
            },
          },
          {
            key: "showTip",
            value: function () {
              (this.container.style.top = this.top + "px"),
                (this.container.style.left = this.left + "px"),
                (this.container.style.opacity = "1");
            },
          },
        ]),
        e
      );
    })(),
    Kt = {
      "light-blue": "#7cd6fd",
      blue: "#5e64ff",
      violet: "#743ee2",
      red: "#ff5858",
      orange: "#ffa00a",
      yellow: "#feef72",
      green: "#28a745",
      "light-green": "#98d85b",
      purple: "#b554ff",
      magenta: "#ffa3ef",
      black: "#36114C",
      grey: "#bdd3e6",
      "light-grey": "#f0f4f7",
      "dark-grey": "#b8c2cc",
    },
    $t = function (t) {
      return Kt[t] || t;
    },
    Qt = 6,
    Zt = 4,
    te = 15,
    ee = 10,
    ie = "#dadada",
    ne = "#ffffff",
    ae = {
      bar: function (t) {
        var e = void 0;
        "rect" !== t.nodeName &&
          ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
        var i = t.cloneNode();
        return (
          (i.style.fill = "#000000"),
          (i.style.opacity = "0.4"),
          e && i.setAttribute("transform", e),
          i
        );
      },
      dot: function (t) {
        var e = void 0;
        "circle" !== t.nodeName &&
          ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
        var i = t.cloneNode(),
          n = t.getAttribute("r"),
          a = t.getAttribute("fill");
        return (
          i.setAttribute("r", parseInt(n) + 4),
          i.setAttribute("fill", a),
          (i.style.opacity = "0.6"),
          e && i.setAttribute("transform", e),
          i
        );
      },
      heat_square: function (t) {
        var e = void 0;
        "circle" !== t.nodeName &&
          ((e = t.getAttribute("transform")), (t = t.childNodes[0]));
        var i = t.cloneNode(),
          n = t.getAttribute("r"),
          a = t.getAttribute("fill");
        return (
          i.setAttribute("r", parseInt(n) + 4),
          i.setAttribute("fill", a),
          (i.style.opacity = "0.6"),
          e && i.setAttribute("transform", e),
          i
        );
      },
    },
    se = {
      bar: function (t, e) {
        var i = void 0;
        "rect" !== t.nodeName &&
          ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
        var n = ["x", "y", "width", "height"];
        Object.values(t.attributes)
          .filter(function (t) {
            return n.includes(t.name) && t.specified;
          })
          .map(function (t) {
            e.setAttribute(t.name, t.nodeValue);
          }),
          i && e.setAttribute("transform", i);
      },
      dot: function (t, e) {
        var i = void 0;
        "circle" !== t.nodeName &&
          ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
        var n = ["cx", "cy"];
        Object.values(t.attributes)
          .filter(function (t) {
            return n.includes(t.name) && t.specified;
          })
          .map(function (t) {
            e.setAttribute(t.name, t.nodeValue);
          }),
          i && e.setAttribute("transform", i);
      },
      heat_square: function (t, e) {
        var i = void 0;
        "circle" !== t.nodeName &&
          ((i = t.getAttribute("transform")), (t = t.childNodes[0]));
        var n = ["cx", "cy"];
        Object.values(t.attributes)
          .filter(function (t) {
            return n.includes(t.name) && t.specified;
          })
          .map(function (t) {
            e.setAttribute(t.name, t.nodeValue);
          }),
          i && e.setAttribute("transform", i);
      },
    },
    re = 350,
    oe = 350,
    le = re,
    ue = 250,
    he = "easein",
    ce = {
      ease: "0.25 0.1 0.25 1",
      linear: "0 0 1 1",
      easein: "0.1 0.8 0.2 1",
      easeout: "0 0 0.58 1",
      easeinout: "0.42 0 0.58 1",
    },
    de =
      ".chart-container{position:relative;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.chart-container .axis,.chart-container .chart-label{fill:#555b51}.chart-container .axis line,.chart-container .chart-label line{stroke:#dadada}.chart-container .dataset-units circle{stroke:#fff;stroke-width:2}.chart-container .dataset-units path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container .dataset-path{stroke-width:2px}.chart-container .path-group path{fill:none;stroke-opacity:1;stroke-width:2px}.chart-container line.dashed{stroke-dasharray:5,3}.chart-container .axis-line .specific-value{text-anchor:start}.chart-container .axis-line .y-line{text-anchor:end}.chart-container .axis-line .x-line{text-anchor:middle}.chart-container .legend-dataset-text{fill:#6c7680;font-weight:600}.graph-svg-tip{position:absolute;z-index:99999;padding:10px;font-size:12px;color:#959da5;text-align:center;background:rgba(0,0,0,.8);border-radius:3px}.graph-svg-tip ul{padding-left:0;display:flex}.graph-svg-tip ol{padding-left:0;display:flex}.graph-svg-tip ul.data-point-list li{min-width:90px;flex:1;font-weight:600}.graph-svg-tip strong{color:#dfe2e5;font-weight:600}.graph-svg-tip .svg-pointer{position:absolute;height:5px;margin:0 0 0 -5px;content:' ';border:5px solid transparent;border-top-color:rgba(0,0,0,.8)}.graph-svg-tip.comparison{padding:0;text-align:left;pointer-events:none}.graph-svg-tip.comparison .title{display:block;padding:10px;margin:0;font-weight:600;line-height:1;pointer-events:none}.graph-svg-tip.comparison ul{margin:0;white-space:nowrap;list-style:none}.graph-svg-tip.comparison li{display:inline-block;padding:5px 10px}",
    pe = void 0,
    fe = (function () {
      function e(t, i) {
        if (
          (_t(this, e),
          (this.parent = "string" == typeof t ? document.querySelector(t) : t),
          !(this.parent instanceof HTMLElement))
        )
          throw new Error("No `parent` element to render on was provided.");
        (this.rawChartArgs = i),
          (this.title = i.title || ""),
          (this.type = i.type || ""),
          (this.realData = this.prepareData(i.data)),
          (this.data = this.prepareFirstData(this.realData)),
          (this.colors = this.validateColors(i.colors, this.type)),
          (this.config = {
            showTooltip: 1,
            showLegend: 1,
            isNavigable: i.isNavigable || 0,
            animate: 1,
            truncateLegends: i.truncateLegends || 0,
          }),
          (this.measures = JSON.parse(JSON.stringify(Rt)));
        var n = this.measures;
        this.setMeasures(i),
          this.title.length || (n.titleHeight = 0),
          this.config.showLegend || (n.legendHeight = 0),
          (this.argHeight = i.height || n.baseHeight),
          (this.state = {}),
          (this.options = {}),
          (this.initTimeout = Yt),
          this.config.isNavigable && (this.overlays = []),
          this.configure(i);
      }
      return (
        zt(e, [
          {
            key: "prepareData",
            value: function (t) {
              return t;
            },
          },
          {
            key: "prepareFirstData",
            value: function (t) {
              return t;
            },
          },
          {
            key: "validateColors",
            value: function (t, e) {
              var i = [];
              return (
                (t = (t || []).concat(qt[e])).forEach(function (t) {
                  var e = $t(t);
                  b(e)
                    ? i.push(e)
                    : console.warn('"' + t + '" is not a valid color.');
                }),
                i
              );
            },
          },
          { key: "setMeasures", value: function () {} },
          {
            key: "configure",
            value: function () {
              var t = this.argHeight;
              (this.baseHeight = t),
                (this.height = t - o(this.measures)),
                (pe = this.boundDrawFn.bind(this)),
                window.addEventListener("resize", pe),
                window.addEventListener(
                  "orientationchange",
                  this.boundDrawFn.bind(this)
                );
            },
          },
          {
            key: "boundDrawFn",
            value: function () {
              this.draw(!0);
            },
          },
          {
            key: "unbindWindowEvents",
            value: function () {
              window.removeEventListener("resize", pe),
                window.removeEventListener(
                  "orientationchange",
                  this.boundDrawFn.bind(this)
                );
            },
          },
          {
            key: "setup",
            value: function () {
              this.makeContainer(),
                this.updateWidth(),
                this.makeTooltip(),
                this.draw(!1, !0);
            },
          },
          {
            key: "makeContainer",
            value: function () {
              this.parent.innerHTML = "";
              var e = { inside: this.parent, className: "chart-container" };
              this.independentWidth &&
                (e.styles = { width: this.independentWidth + "px" }),
                (this.container = t.create("div", e));
            },
          },
          {
            key: "makeTooltip",
            value: function () {
              (this.tip = new Jt({
                parent: this.container,
                colors: this.colors,
              })),
                this.bindTooltip();
            },
          },
          { key: "bindTooltip", value: function () {} },
          {
            key: "draw",
            value: function () {
              var t = this,
                e =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0],
                i =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1];
              this.updateWidth(),
                this.calc(e),
                this.makeChartArea(),
                this.setupComponents(),
                this.components.forEach(function (e) {
                  return e.setup(t.drawArea);
                }),
                this.render(this.components, !1),
                i &&
                  ((this.data = this.realData),
                  setTimeout(function () {
                    t.update(t.data);
                  }, this.initTimeout)),
                this.renderLegend(),
                this.setupNavigation(i);
            },
          },
          { key: "calc", value: function () {} },
          {
            key: "updateWidth",
            value: function () {
              (this.baseWidth = n(this.parent)),
                (this.width = this.baseWidth - l(this.measures));
            },
          },
          {
            key: "makeChartArea",
            value: function () {
              this.svg && this.container.removeChild(this.svg);
              var t = this.measures;
              (this.svg = P(
                this.container,
                "frappe-chart chart",
                this.baseWidth,
                this.baseHeight
              )),
                (this.svgDefs = L(this.svg)),
                this.title.length &&
                  (this.titleEL = H(
                    "title",
                    t.margins.left,
                    t.margins.top,
                    this.title,
                    {
                      fontSize: t.titleFontSize,
                      fill: "#666666",
                      dy: t.titleFontSize,
                    }
                  ));
              var e = s(t);
              (this.drawArea = T(
                this.type + "-chart chart-draw-area",
                "translate(" + r(t) + ", " + e + ")"
              )),
                this.config.showLegend &&
                  ((e += this.height + t.paddings.bottom),
                  (this.legendArea = T(
                    "chart-legend",
                    "translate(" + r(t) + ", " + e + ")"
                  ))),
                this.title.length && this.svg.appendChild(this.titleEL),
                this.svg.appendChild(this.drawArea),
                this.config.showLegend && this.svg.appendChild(this.legendArea),
                this.updateTipOffset(r(t), s(t));
            },
          },
          {
            key: "updateTipOffset",
            value: function (t, e) {
              this.tip.offset = { x: t, y: e };
            },
          },
          {
            key: "setupComponents",
            value: function () {
              this.components = new Map();
            },
          },
          {
            key: "update",
            value: function (t) {
              t || console.error("No data to update."),
                (this.data = this.prepareData(t)),
                this.calc(),
                this.render();
            },
          },
          {
            key: "render",
            value: function () {
              var t = this,
                e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.components,
                i =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1];
              this.config.isNavigable &&
                this.overlays.map(function (t) {
                  return t.parentNode.removeChild(t);
                });
              var n = [];
              e.forEach(function (t) {
                n = n.concat(t.update(i));
              }),
                n.length > 0
                  ? (at(this.container, this.svg, n),
                    setTimeout(function () {
                      e.forEach(function (t) {
                        return t.make();
                      }),
                        t.updateNav();
                    }, 400))
                  : (e.forEach(function (t) {
                      return t.make();
                    }),
                    this.updateNav());
            },
          },
          {
            key: "updateNav",
            value: function () {
              this.config.isNavigable && (this.makeOverlay(), this.bindUnits());
            },
          },
          { key: "renderLegend", value: function () {} },
          {
            key: "setupNavigation",
            value: function () {
              var t = this,
                e =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0];
              this.config.isNavigable &&
                e &&
                (this.bindOverlay(),
                (this.keyActions = {
                  13: this.onEnterKey.bind(this),
                  37: this.onLeftArrow.bind(this),
                  38: this.onUpArrow.bind(this),
                  39: this.onRightArrow.bind(this),
                  40: this.onDownArrow.bind(this),
                }),
                document.addEventListener("keydown", function (e) {
                  i(t.container) &&
                    ((e = e || window.event),
                    t.keyActions[e.keyCode] && t.keyActions[e.keyCode]());
                }));
            },
          },
          { key: "makeOverlay", value: function () {} },
          { key: "updateOverlay", value: function () {} },
          { key: "bindOverlay", value: function () {} },
          { key: "bindUnits", value: function () {} },
          { key: "onLeftArrow", value: function () {} },
          { key: "onRightArrow", value: function () {} },
          { key: "onUpArrow", value: function () {} },
          { key: "onDownArrow", value: function () {} },
          { key: "onEnterKey", value: function () {} },
          { key: "addDataPoint", value: function () {} },
          { key: "removeDataPoint", value: function () {} },
          { key: "getDataPoint", value: function () {} },
          { key: "setCurrentDataPoint", value: function () {} },
          { key: "updateDataset", value: function () {} },
          {
            key: "export",
            value: function () {
              var t = rt(this.svg);
              st(this.title || "Chart", [t]);
            },
          },
        ]),
        e
      );
    })(),
    ve = (function (t) {
      function e(t, i) {
        return (
          _t(this, e),
          jt(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i))
        );
      }
      return (
        Ht(e, t),
        zt(e, [
          {
            key: "configure",
            value: function (t) {
              Wt(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "configure",
                this
              ).call(this, t),
                (this.config.maxSlices = t.maxSlices || 20),
                (this.config.maxLegendPoints = t.maxLegendPoints || 20);
            },
          },
          {
            key: "calc",
            value: function () {
              var t = this,
                e = this.state,
                i = this.config.maxSlices;
              e.sliceTotals = [];
              var n = this.data.labels
                  .map(function (e, i) {
                    var n = 0;
                    return (
                      t.data.datasets.map(function (t) {
                        n += t.values[i];
                      }),
                      [n, e]
                    );
                  })
                  .filter(function (t) {
                    return t[0] >= 0;
                  }),
                a = n;
              if (n.length > i) {
                n.sort(function (t, e) {
                  return e[0] - t[0];
                }),
                  (a = n.slice(0, i - 1));
                var s = 0;
                n.slice(i - 1).map(function (t) {
                  s += t[0];
                }),
                  a.push([s, "Rest"]),
                  (this.colors[i - 1] = "grey");
              }
              (e.labels = []),
                a.map(function (t) {
                  e.sliceTotals.push(t[0]), e.labels.push(t[1]);
                }),
                (e.grandTotal = e.sliceTotals.reduce(function (t, e) {
                  return t + e;
                }, 0)),
                (this.center = { x: this.width / 2, y: this.height / 2 });
            },
          },
          {
            key: "renderLegend",
            value: function () {
              var t = this,
                e = this.state;
              (this.legendArea.textContent = ""),
                (this.legendTotals = e.sliceTotals.slice(
                  0,
                  this.config.maxLegendPoints
                ));
              var i = 0,
                n = 0;
              this.legendTotals.map(function (a, s) {
                var r = 110,
                  o = Math.floor((t.width - l(t.measures)) / r);
                t.legendTotals.length < o &&
                  (r = t.width / t.legendTotals.length),
                  i > o && ((i = 0), (n += 20));
                var u = W(r * i + 5, n, 5, t.colors[s], e.labels[s] + ": " + a);
                t.legendArea.appendChild(u), i++;
              });
            },
          },
        ]),
        e
      );
    })(fe),
    ge = 7,
    ye = 1e3,
    me = 86400,
    be = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    xe = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ke = (function () {
      function t(e) {
        var i = e.layerClass,
          n = void 0 === i ? "" : i,
          a = e.layerTransform,
          s = void 0 === a ? "" : a,
          r = e.constants,
          o = e.getData,
          l = e.makeElements,
          u = e.animateElements;
        _t(this, t),
          (this.layerTransform = s),
          (this.constants = r),
          (this.makeElements = l),
          (this.getData = o),
          (this.animateElements = u),
          (this.store = []),
          (this.labels = []),
          (this.layerClass = n),
          (this.layerClass =
            "function" == typeof this.layerClass
              ? this.layerClass()
              : this.layerClass),
          this.refresh();
      }
      return (
        zt(t, [
          {
            key: "refresh",
            value: function (t) {
              this.data = t || this.getData();
            },
          },
          {
            key: "setup",
            value: function (t) {
              this.layer = T(this.layerClass, this.layerTransform, t);
            },
          },
          {
            key: "make",
            value: function () {
              this.render(this.data), (this.oldData = this.data);
            },
          },
          {
            key: "render",
            value: function (t) {
              var e = this;
              (this.store = this.makeElements(t)),
                (this.layer.textContent = ""),
                this.store.forEach(function (t) {
                  e.layer.appendChild(t);
                }),
                this.labels.forEach(function (t) {
                  e.layer.appendChild(t);
                });
            },
          },
          {
            key: "update",
            value: function () {
              var t =
                !(arguments.length > 0 && void 0 !== arguments[0]) ||
                arguments[0];
              this.refresh();
              var e = [];
              return t && (e = this.animateElements(this.data) || []), e;
            },
          },
        ]),
        t
      );
    })(),
    we = {
      donutSlices: {
        layerClass: "donut-slices",
        makeElements: function (t) {
          return t.sliceStrings.map(function (e, i) {
            var n = C(e, "donut-path", t.colors[i], "none", t.strokeWidth);
            return (n.style.transition = "transform .3s;"), n;
          });
        },
        animateElements: function (t) {
          return this.store.map(function (e, i) {
            return tt(e, t.sliceStrings[i]);
          });
        },
      },
      pieSlices: {
        layerClass: "pie-slices",
        makeElements: function (t) {
          return t.sliceStrings.map(function (e, i) {
            var n = C(e, "pie-path", "none", t.colors[i]);
            return (n.style.transition = "transform .3s;"), n;
          });
        },
        animateElements: function (t) {
          return this.store.map(function (e, i) {
            return tt(e, t.sliceStrings[i]);
          });
        },
      },
      percentageBars: {
        layerClass: "percentage-bars",
        makeElements: function (t) {
          var e = this;
          return t.xPositions.map(function (i, n) {
            return E(
              i,
              0,
              t.widths[n],
              e.constants.barHeight,
              e.constants.barDepth,
              t.colors[n]
            );
          });
        },
        animateElements: function (t) {
          if (t) return [];
        },
      },
      yAxis: {
        layerClass: "y axis",
        makeElements: function (t) {
          var e = this;
          return t.positions.map(function (i, n) {
            return I(i, t.labels[n], e.constants.width, {
              mode: e.constants.mode,
              pos: e.constants.pos,
              shortenNumbers: e.constants.shortenNumbers,
            });
          });
        },
        animateElements: function (t) {
          var e = t.positions,
            i = t.labels,
            n = this.oldData.positions,
            a = this.oldData.labels,
            s = f(n, e),
            r = Ft(s, 2);
          (n = r[0]), (e = r[1]);
          var o = f(a, i),
            l = Ft(o, 2);
          return (
            (a = l[0]),
            (i = l[1]),
            this.render({ positions: n, labels: i }),
            this.store.map(function (t, i) {
              return J(t, e[i], n[i]);
            })
          );
        },
      },
      xAxis: {
        layerClass: "x axis",
        makeElements: function (t) {
          var e = this;
          return t.positions.map(function (i, n) {
            return R(i, t.calcLabels[n], e.constants.height, {
              mode: e.constants.mode,
              pos: e.constants.pos,
            });
          });
        },
        animateElements: function (t) {
          var e = t.positions,
            i = t.calcLabels,
            n = this.oldData.positions,
            a = this.oldData.calcLabels,
            s = f(n, e),
            r = Ft(s, 2);
          (n = r[0]), (e = r[1]);
          var o = f(a, i),
            l = Ft(o, 2);
          return (
            (a = l[0]),
            (i = l[1]),
            this.render({ positions: n, calcLabels: i }),
            this.store.map(function (t, i) {
              return X(t, e[i], n[i]);
            })
          );
        },
      },
      yMarkers: {
        layerClass: "y-markers",
        makeElements: function (t) {
          var e = this;
          return t.map(function (t) {
            return Y(t.position, t.label, e.constants.width, {
              labelPos: t.options.labelPos,
              mode: "span",
              lineType: "dashed",
            });
          });
        },
        animateElements: function (t) {
          var e = f(this.oldData, t),
            i = Ft(e, 2);
          this.oldData = i[0];
          var n = (t = i[1]).map(function (t) {
              return t.position;
            }),
            a = t.map(function (t) {
              return t.label;
            }),
            s = t.map(function (t) {
              return t.options;
            }),
            r = this.oldData.map(function (t) {
              return t.position;
            });
          return (
            this.render(
              r.map(function (t, e) {
                return { position: r[e], label: a[e], options: s[e] };
              })
            ),
            this.store.map(function (t, e) {
              return J(t, n[e], r[e]);
            })
          );
        },
      },
      yRegions: {
        layerClass: "y-regions",
        makeElements: function (t) {
          var e = this;
          return t.map(function (t) {
            return B(t.startPos, t.endPos, e.constants.width, t.label, {
              labelPos: t.options.labelPos,
            });
          });
        },
        animateElements: function (t) {
          var e = f(this.oldData, t),
            i = Ft(e, 2);
          this.oldData = i[0];
          var n = (t = i[1]).map(function (t) {
              return t.endPos;
            }),
            a = t.map(function (t) {
              return t.label;
            }),
            s = t.map(function (t) {
              return t.startPos;
            }),
            r = t.map(function (t) {
              return t.options;
            }),
            o = this.oldData.map(function (t) {
              return t.endPos;
            }),
            l = this.oldData.map(function (t) {
              return t.startPos;
            });
          this.render(
            o.map(function (t, e) {
              return {
                startPos: l[e],
                endPos: o[e],
                label: a[e],
                options: r[e],
              };
            })
          );
          var u = [];
          return (
            this.store.map(function (t, e) {
              u = u.concat(K(t, s[e], n[e], o[e]));
            }),
            u
          );
        },
      },
      heatDomain: {
        layerClass: function () {
          return "heat-domain domain-" + this.constants.index;
        },
        makeElements: function (t) {
          var e = this,
            i = this.constants,
            n = i.index,
            a = i.colWidth,
            s = i.rowHeight,
            r = i.squareSize,
            o = i.xTranslate,
            l = 0;
          return (
            (this.serializedSubDomains = []),
            t.cols.map(function (t, i) {
              1 === i &&
                e.labels.push(
                  H("domain-name", o, -12, pt(n, !0).toUpperCase(), {
                    fontSize: 9,
                  })
                ),
                t.map(function (t, i) {
                  if (t.fill) {
                    var n = {
                        "data-date": t.yyyyMmDd,
                        "data-value": t.dataValue,
                        "data-day": i,
                      },
                      a = _("day", o, l, r, t.fill, n);
                    e.serializedSubDomains.push(a);
                  }
                  l += s;
                }),
                (l = 0),
                (o += a);
            }),
            this.serializedSubDomains
          );
        },
        animateElements: function (t) {
          if (t) return [];
        },
      },
      barGraph: {
        layerClass: function () {
          return "dataset-units dataset-bars dataset-" + this.constants.index;
        },
        makeElements: function (t) {
          var e = this.constants;
          return (
            (this.unitType = "bar"),
            (this.units = t.yPositions.map(function (i, n) {
              return V(
                t.xPositions[n],
                i,
                t.barWidth,
                e.color,
                t.labels[n],
                n,
                t.offsets[n],
                {
                  zeroLine: t.zeroLine,
                  barsWidth: t.barsWidth,
                  minHeight: e.minHeight,
                }
              );
            })),
            this.units
          );
        },
        animateElements: function (t) {
          var e = t.xPositions,
            i = t.yPositions,
            n = t.offsets,
            a = t.labels,
            s = this.oldData.xPositions,
            r = this.oldData.yPositions,
            o = this.oldData.offsets,
            l = this.oldData.labels,
            u = f(s, e),
            h = Ft(u, 2);
          (s = h[0]), (e = h[1]);
          var c = f(r, i),
            d = Ft(c, 2);
          (r = d[0]), (i = d[1]);
          var p = f(o, n),
            v = Ft(p, 2);
          (o = v[0]), (n = v[1]);
          var g = f(l, a),
            y = Ft(g, 2);
          (l = y[0]),
            (a = y[1]),
            this.render({
              xPositions: s,
              yPositions: r,
              offsets: o,
              labels: a,
              zeroLine: this.oldData.zeroLine,
              barsWidth: this.oldData.barsWidth,
              barWidth: this.oldData.barWidth,
            });
          var m = [];
          return (
            this.store.map(function (a, s) {
              m = m.concat(
                $(a, e[s], i[s], t.barWidth, n[s], { zeroLine: t.zeroLine })
              );
            }),
            m
          );
        },
      },
      lineGraph: {
        layerClass: function () {
          return "dataset-units dataset-line dataset-" + this.constants.index;
        },
        makeElements: function (t) {
          var e = this.constants;
          return (
            (this.unitType = "dot"),
            (this.paths = {}),
            e.hideLine ||
              (this.paths = G(
                t.xPositions,
                t.yPositions,
                e.color,
                { heatline: e.heatline, regionFill: e.regionFill },
                { svgDefs: e.svgDefs, zeroLine: t.zeroLine }
              )),
            (this.units = []),
            e.hideDots ||
              (this.units = t.yPositions.map(function (i, n) {
                return U(
                  t.xPositions[n],
                  i,
                  t.radius,
                  e.color,
                  e.valuesOverPoints ? t.values[n] : "",
                  n
                );
              })),
            Object.values(this.paths).concat(this.units)
          );
        },
        animateElements: function (t) {
          var e = t.xPositions,
            i = t.yPositions,
            n = t.values,
            a = this.oldData.xPositions,
            s = this.oldData.yPositions,
            r = this.oldData.values,
            o = f(a, e),
            l = Ft(o, 2);
          (a = l[0]), (e = l[1]);
          var u = f(s, i),
            h = Ft(u, 2);
          (s = h[0]), (i = h[1]);
          var c = f(r, n),
            d = Ft(c, 2);
          (r = d[0]),
            (n = d[1]),
            this.render({
              xPositions: a,
              yPositions: s,
              values: n,
              zeroLine: this.oldData.zeroLine,
              radius: this.oldData.radius,
            });
          var p = [];
          return (
            Object.keys(this.paths).length &&
              (p = p.concat(Z(this.paths, e, i, t.zeroLine))),
            this.units.length &&
              this.units.map(function (t, n) {
                p = p.concat(Q(t, e[n], i[n]));
              }),
            p
          );
        },
      },
    },
    Ae = (function (t) {
      function i(t, e) {
        _t(this, i);
        var n = jt(
          this,
          (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)
        );
        return (n.type = "percentage"), n.setup(), n;
      }
      return (
        Ht(i, t),
        zt(i, [
          {
            key: "setMeasures",
            value: function (t) {
              var e = this.measures;
              this.barOptions = t.barOptions || {};
              var i = this.barOptions;
              (i.height = i.height || 20),
                (i.depth = i.depth || Vt),
                (e.paddings.right = 30),
                (e.legendHeight = 60),
                (e.baseHeight = 8 * (i.height + 0.5 * i.depth));
            },
          },
          {
            key: "setupComponents",
            value: function () {
              var t = this.state,
                e = [
                  [
                    "percentageBars",
                    {
                      barHeight: this.barOptions.height,
                      barDepth: this.barOptions.depth,
                    },
                    function () {
                      return {
                        xPositions: t.xPositions,
                        widths: t.widths,
                        colors: this.colors,
                      };
                    }.bind(this),
                  ],
                ];
              this.components = new Map(
                e.map(function (t) {
                  var e = yt.apply(void 0, It(t));
                  return [t[0], e];
                })
              );
            },
          },
          {
            key: "calc",
            value: function () {
              var t = this;
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "calc",
                this
              ).call(this);
              var e = this.state;
              (e.xPositions = []), (e.widths = []);
              var n = 0;
              e.sliceTotals.map(function (i) {
                var a = (t.width * i) / e.grandTotal;
                e.widths.push(a), e.xPositions.push(n), (n += a);
              });
            },
          },
          { key: "makeDataByIndex", value: function () {} },
          {
            key: "bindTooltip",
            value: function () {
              var t = this,
                i = this.state;
              this.container.addEventListener("mousemove", function (n) {
                var a = t.components.get("percentageBars").store,
                  s = n.target;
                if (a.includes(s)) {
                  var r = a.indexOf(s),
                    o = e(t.container),
                    l = e(s),
                    u = l.left - o.left + parseInt(s.getAttribute("width")) / 2,
                    h = l.top - o.top,
                    c =
                      (t.formattedLabels && t.formattedLabels.length > 0
                        ? t.formattedLabels[r]
                        : t.state.labels[r]) + ": ",
                    d = i.sliceTotals[r] / i.grandTotal;
                  t.tip.setValues(u, h, {
                    name: c,
                    value: (100 * d).toFixed(1) + "%",
                  }),
                    t.tip.showTip();
                }
              });
            },
          },
        ]),
        i
      );
    })(ve),
    Pe = (function (t) {
      function i(t, e) {
        _t(this, i);
        var n = jt(
          this,
          (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)
        );
        return (
          (n.type = "pie"), (n.initTimeout = 0), (n.init = 1), n.setup(), n
        );
      }
      return (
        Ht(i, t),
        zt(i, [
          {
            key: "configure",
            value: function (t) {
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "configure",
                this
              ).call(this, t),
                (this.mouseMove = this.mouseMove.bind(this)),
                (this.mouseLeave = this.mouseLeave.bind(this)),
                (this.hoverRadio = t.hoverRadio || 0.1),
                (this.config.startAngle = t.startAngle || 0),
                (this.clockWise = t.clockWise || !1);
            },
          },
          {
            key: "calc",
            value: function () {
              var t = this;
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "calc",
                this
              ).call(this);
              var e = this.state;
              this.radius =
                this.height > this.width ? this.center.x : this.center.y;
              var n = this.radius,
                a = this.clockWise,
                s = e.slicesProperties || [];
              (e.sliceStrings = []), (e.slicesProperties = []);
              var r = 180 - this.config.startAngle;
              e.sliceTotals.map(function (i, o) {
                var l = r,
                  u = (i / e.grandTotal) * 360,
                  h = u > 180 ? 1 : 0,
                  c = a ? -u : u,
                  p = (r += c),
                  f = d(l, n),
                  v = d(p, n),
                  g = t.init && s[o],
                  y = void 0,
                  m = void 0;
                t.init
                  ? ((y = g ? g.startPosition : f), (m = g ? g.endPosition : f))
                  : ((y = f), (m = v));
                var b =
                  360 === u
                    ? M(y, m, t.center, t.radius, a, h)
                    : O(y, m, t.center, t.radius, a, h);
                e.sliceStrings.push(b),
                  e.slicesProperties.push({
                    startPosition: f,
                    endPosition: v,
                    value: i,
                    total: e.grandTotal,
                    startAngle: l,
                    endAngle: p,
                    angle: c,
                  });
              }),
                (this.init = 0);
            },
          },
          {
            key: "setupComponents",
            value: function () {
              var t = this.state,
                e = [
                  [
                    "pieSlices",
                    {},
                    function () {
                      return {
                        sliceStrings: t.sliceStrings,
                        colors: this.colors,
                      };
                    }.bind(this),
                  ],
                ];
              this.components = new Map(
                e.map(function (t) {
                  var e = yt.apply(void 0, It(t));
                  return [t[0], e];
                })
              );
            },
          },
          {
            key: "calTranslateByAngle",
            value: function (t) {
              var e = this.radius,
                i = this.hoverRadio,
                n = d(t.startAngle + t.angle / 2, e);
              return "translate3d(" + n.x * i + "px," + n.y * i + "px,0)";
            },
          },
          {
            key: "hoverSlice",
            value: function (t, i, n, a) {
              if (t) {
                var s = this.colors[i];
                if (n) {
                  it(
                    t,
                    this.calTranslateByAngle(this.state.slicesProperties[i])
                  ),
                    (t.style.fill = m(s, 50));
                  var r = e(this.svg),
                    o = a.pageX - r.left + 10,
                    l = a.pageY - r.top - 10,
                    u =
                      (this.formatted_labels && this.formatted_labels.length > 0
                        ? this.formatted_labels[i]
                        : this.state.labels[i]) + ": ",
                    h = (
                      (100 * this.state.sliceTotals[i]) /
                      this.state.grandTotal
                    ).toFixed(1);
                  this.tip.setValues(o, l, { name: u, value: h + "%" }),
                    this.tip.showTip();
                } else
                  it(t, "translate3d(0,0,0)"),
                    this.tip.hideTip(),
                    (t.style.fill = s);
              }
            },
          },
          {
            key: "bindTooltip",
            value: function () {
              this.container.addEventListener("mousemove", this.mouseMove),
                this.container.addEventListener("mouseleave", this.mouseLeave);
            },
          },
          {
            key: "mouseMove",
            value: function (t) {
              var e = t.target,
                i = this.components.get("pieSlices").store,
                n = this.curActiveSliceIndex,
                a = this.curActiveSlice;
              if (i.includes(e)) {
                var s = i.indexOf(e);
                this.hoverSlice(a, n, !1),
                  (this.curActiveSlice = e),
                  (this.curActiveSliceIndex = s),
                  this.hoverSlice(e, s, !0, t);
              } else this.mouseLeave();
            },
          },
          {
            key: "mouseLeave",
            value: function () {
              this.hoverSlice(
                this.curActiveSlice,
                this.curActiveSliceIndex,
                !1
              );
            },
          },
        ]),
        i
      );
    })(ve),
    Le = (function (t) {
      function e(t, i) {
        _t(this, e);
        var n = jt(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)
        );
        (n.type = "heatmap"), (n.countLabel = i.countLabel || "");
        var a = ["Sunday", "Monday"],
          s = a.includes(i.startSubDomain) ? i.startSubDomain : "Sunday";
        return (n.startSubDomainIndex = a.indexOf(s)), n.setup(), n;
      }
      return (
        Ht(e, t),
        zt(e, [
          {
            key: "setMeasures",
            value: function (t) {
              var e = this.measures;
              (this.discreteDomains = 0 === t.discreteDomains ? 0 : 1),
                (e.paddings.top = 36),
                (e.paddings.bottom = 0),
                (e.legendHeight = 24),
                (e.baseHeight = 12 * ge + o(e));
              var i = this.data,
                n = this.discreteDomains ? 12 : 0;
              this.independentWidth = 12 * (ht(i.start, i.end) + n) + l(e);
            },
          },
          {
            key: "updateWidth",
            value: function () {
              var t = this.discreteDomains ? 12 : 0,
                e = this.state.noOfWeeks ? this.state.noOfWeeks : 52;
              this.baseWidth = 12 * (e + t) + l(this.measures);
            },
          },
          {
            key: "prepareData",
            value: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : this.data;
              if (t.start && t.end && t.start > t.end)
                throw new Error("Start date cannot be greater than end date.");
              if (
                (t.start ||
                  ((t.start = new Date()),
                  t.start.setFullYear(t.start.getFullYear() - 1)),
                t.end || (t.end = new Date()),
                (t.dataPoints = t.dataPoints || {}),
                parseInt(Object.keys(t.dataPoints)[0]) > 1e5)
              ) {
                var e = {};
                Object.keys(t.dataPoints).forEach(function (i) {
                  var n = new Date(i * ye);
                  e[lt(n)] = t.dataPoints[i];
                }),
                  (t.dataPoints = e);
              }
              return t;
            },
          },
          {
            key: "calc",
            value: function () {
              var t = this.state;
              (t.start = ut(this.data.start)),
                (t.end = ut(this.data.end)),
                (t.firstWeekStart = ut(t.start)),
                (t.noOfWeeks = ht(t.start, t.end)),
                (t.distribution = Ct(Object.values(this.data.dataPoints), 5)),
                (t.domainConfigs = this.getDomains());
            },
          },
          {
            key: "setupComponents",
            value: function () {
              var t = this,
                e = this.state,
                i = this.discreteDomains ? 0 : 1,
                n = e.domainConfigs.map(function (n, a) {
                  return [
                    "heatDomain",
                    {
                      index: n.index,
                      colWidth: 12,
                      rowHeight: 12,
                      squareSize: 10,
                      xTranslate:
                        12 *
                        e.domainConfigs
                          .filter(function (t, e) {
                            return e < a;
                          })
                          .map(function (t) {
                            return t.cols.length - i;
                          })
                          .reduce(function (t, e) {
                            return t + e;
                          }, 0),
                    },
                    function () {
                      return e.domainConfigs[a];
                    }.bind(t),
                  ];
                });
              this.components = new Map(
                n.map(function (t, e) {
                  var i = yt.apply(void 0, It(t));
                  return [t[0] + "-" + e, i];
                })
              );
              var a = 0;
              xe.forEach(function (e, i) {
                if ([1, 3, 5].includes(i)) {
                  var n = H("subdomain-name", -6, a, e, {
                    fontSize: 10,
                    dy: 8,
                    textAnchor: "end",
                  });
                  t.drawArea.appendChild(n);
                }
                a += 12;
              });
            },
          },
          {
            key: "update",
            value: function (t) {
              t || console.error("No data to update."),
                (this.data = this.prepareData(t)),
                this.draw(),
                this.bindTooltip();
            },
          },
          {
            key: "bindTooltip",
            value: function () {
              var t = this;
              this.container.addEventListener("mousemove", function (e) {
                t.components.forEach(function (i) {
                  var n = i.store,
                    a = e.target;
                  if (n.includes(a)) {
                    var s = a.getAttribute("data-value"),
                      r = a.getAttribute("data-date").split("-"),
                      o = pt(parseInt(r[1]) - 1, !0),
                      l = t.container.getBoundingClientRect(),
                      u = a.getBoundingClientRect(),
                      h = parseInt(e.target.getAttribute("width")),
                      c = u.left - l.left + h / 2,
                      d = u.top - l.top,
                      p = s + " " + t.countLabel,
                      f = " on " + o + " " + r[0] + ", " + r[2];
                    t.tip.setValues(
                      c,
                      d,
                      { name: f, value: p, valueFirst: 1 },
                      []
                    ),
                      t.tip.showTip();
                  }
                });
              });
            },
          },
          {
            key: "renderLegend",
            value: function () {
              var t = this;
              this.legendArea.textContent = "";
              var e = 0,
                i = H("subdomain-name", e, 12, "Less", { fontSize: 11, dy: 9 });
              (e = 30),
                this.legendArea.appendChild(i),
                this.colors.slice(0, 5).map(function (i, n) {
                  var a = _("heatmap-legend-unit", e + 15 * n, 12, 10, i);
                  t.legendArea.appendChild(a);
                });
              var n = H("subdomain-name", e + 75 + 3, 12, "More", {
                fontSize: 11,
                dy: 9,
              });
              this.legendArea.appendChild(n);
            },
          },
          {
            key: "getDomains",
            value: function () {
              for (
                var t = this.state,
                  e = [t.start.getMonth(), t.start.getFullYear()],
                  i = e[0],
                  n = e[1],
                  a = [t.end.getMonth(), t.end.getFullYear()],
                  s = a[0] - i + 1 + 12 * (a[1] - n),
                  r = [],
                  o = ut(t.start),
                  l = 0;
                l < s;
                l++
              ) {
                var u = t.end;
                if (!dt(o, t.end)) {
                  var h = [o.getMonth(), o.getFullYear()];
                  u = ft(h[0], h[1]);
                }
                r.push(this.getDomainConfig(o, u)), gt(u, 1), (o = u);
              }
              return r;
            },
          },
          {
            key: "getDomainConfig",
            value: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "",
                i = [t.getMonth(), t.getFullYear()],
                n = i[0],
                a = i[1],
                s = vt(t),
                r = { index: n, cols: [] };
              gt((e = ut(e) || ft(n, a)), 1);
              for (var o = ht(s, e), l = [], u = void 0, h = 0; h < o; h++)
                (u = this.getCol(s, n)),
                  l.push(u),
                  gt((s = new Date(u[ge - 1].yyyyMmDd)), 1);
              return (
                void 0 !== u[ge - 1].dataValue &&
                  (gt(s, 1), l.push(this.getCol(s, n, !0))),
                (r.cols = l),
                r
              );
            },
          },
          {
            key: "getCol",
            value: function (t, e) {
              for (
                var i =
                    arguments.length > 2 &&
                    void 0 !== arguments[2] &&
                    arguments[2],
                  n = this.state,
                  a = ut(t),
                  s = [],
                  r = 0;
                r < ge;
                r++, gt(a, 1)
              ) {
                var o = {},
                  l = a >= n.start && a <= n.end;
                i || a.getMonth() !== e || !l
                  ? (o.yyyyMmDd = lt(a))
                  : (o = this.getSubDomainConfig(a)),
                  s.push(o);
              }
              return s;
            },
          },
          {
            key: "getSubDomainConfig",
            value: function (t) {
              var e = lt(t),
                i = this.data.dataPoints[e];
              return {
                yyyyMmDd: e,
                dataValue: i || 0,
                fill: this.colors[Ot(i, this.state.distribution)],
              };
            },
          },
        ]),
        e
      );
    })(fe),
    Te = (function (t) {
      function i(t, e) {
        _t(this, i);
        var n = jt(
          this,
          (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)
        );
        return (
          (n.barOptions = e.barOptions || {}),
          (n.lineOptions = e.lineOptions || {}),
          (n.type = e.type || "line"),
          (n.init = 1),
          n.setup(),
          n
        );
      }
      return (
        Ht(i, t),
        zt(i, [
          {
            key: "setMeasures",
            value: function () {
              this.data.datasets.length <= 1 &&
                ((this.config.showLegend = 0),
                (this.measures.paddings.bottom = 30));
            },
          },
          {
            key: "configure",
            value: function (t) {
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "configure",
                this
              ).call(this, t),
                (t.axisOptions = t.axisOptions || {}),
                (t.tooltipOptions = t.tooltipOptions || {}),
                (this.config.xAxisMode = t.axisOptions.xAxisMode || "span"),
                (this.config.yAxisMode = t.axisOptions.yAxisMode || "span"),
                (this.config.xIsSeries = t.axisOptions.xIsSeries || 0),
                (this.config.shortenYAxisNumbers =
                  t.axisOptions.shortenYAxisNumbers || 0),
                (this.config.formatTooltipX = t.tooltipOptions.formatTooltipX),
                (this.config.formatTooltipY = t.tooltipOptions.formatTooltipY),
                (this.config.valuesOverPoints = t.valuesOverPoints);
            },
          },
          {
            key: "prepareData",
            value: function () {
              return Mt(
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : this.data,
                this.type
              );
            },
          },
          {
            key: "prepareFirstData",
            value: function () {
              return Dt(
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : this.data
              );
            },
          },
          {
            key: "calc",
            value: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              this.calcXPositions(),
                t ||
                  this.calcYAxisParameters(
                    this.getAllYValues(),
                    "line" === this.type
                  ),
                this.makeDataByIndex();
            },
          },
          {
            key: "calcXPositions",
            value: function () {
              var t = this.state,
                e = this.data.labels;
              (t.datasetLength = e.length),
                (t.unitWidth = this.width / t.datasetLength),
                (t.xOffset = t.unitWidth / 2),
                (t.xAxis = {
                  labels: e,
                  positions: e.map(function (e, i) {
                    return u(t.xOffset + i * t.unitWidth);
                  }),
                });
            },
          },
          {
            key: "calcYAxisParameters",
            value: function (t) {
              var e = kt(
                  t,
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "false"
                ),
                i = this.height / Pt(e),
                n = At(e) * i,
                a = this.height - wt(e) * n;
              (this.state.yAxis = {
                labels: e,
                positions: e.map(function (t) {
                  return a - t * i;
                }),
                scaleMultiplier: i,
                zeroLine: a,
              }),
                this.calcDatasetPoints(),
                this.calcYExtremes(),
                this.calcYRegions();
            },
          },
          {
            key: "calcDatasetPoints",
            value: function () {
              var t = this.state,
                e = function (e) {
                  return e.map(function (e) {
                    return Lt(e, t.yAxis);
                  });
                };
              t.datasets = this.data.datasets.map(function (t, i) {
                var n = t.values,
                  a = t.cumulativeYs || [];
                return {
                  name: t.name,
                  index: i,
                  chartType: t.chartType,
                  values: n,
                  yPositions: e(n),
                  cumulativeYs: a,
                  cumulativeYPos: e(a),
                };
              });
            },
          },
          {
            key: "calcYExtremes",
            value: function () {
              var t = this.state;
              if (this.barOptions.stacked)
                return void (t.yExtremes =
                  t.datasets[t.datasets.length - 1].cumulativeYPos);
              (t.yExtremes = new Array(t.datasetLength).fill(9999)),
                t.datasets.map(function (e) {
                  e.yPositions.map(function (e, i) {
                    e < t.yExtremes[i] && (t.yExtremes[i] = e);
                  });
                });
            },
          },
          {
            key: "calcYRegions",
            value: function () {
              var t = this.state;
              this.data.yMarkers &&
                (this.state.yMarkers = this.data.yMarkers.map(function (e) {
                  return (
                    (e.position = Lt(e.value, t.yAxis)),
                    e.options || (e.options = {}),
                    e
                  );
                })),
                this.data.yRegions &&
                  (this.state.yRegions = this.data.yRegions.map(function (e) {
                    return (
                      (e.startPos = Lt(e.start, t.yAxis)),
                      (e.endPos = Lt(e.end, t.yAxis)),
                      e.options || (e.options = {}),
                      e
                    );
                  }));
            },
          },
          {
            key: "getAllYValues",
            value: function () {
              var t,
                e = this,
                i = "values";
              if (this.barOptions.stacked) {
                i = "cumulativeYs";
                var n = new Array(this.state.datasetLength).fill(0);
                this.data.datasets.map(function (t, a) {
                  var s = e.data.datasets[a].values;
                  t[i] = n = n.map(function (t, e) {
                    return t + s[e];
                  });
                });
              }
              var a = this.data.datasets.map(function (t) {
                return t[i];
              });
              return (
                this.data.yMarkers &&
                  a.push(
                    this.data.yMarkers.map(function (t) {
                      return t.value;
                    })
                  ),
                this.data.yRegions &&
                  this.data.yRegions.map(function (t) {
                    a.push([t.end, t.start]);
                  }),
                (t = []).concat.apply(t, It(a))
              );
            },
          },
          {
            key: "setupComponents",
            value: function () {
              var t = this,
                e = [
                  [
                    "yAxis",
                    {
                      mode: this.config.yAxisMode,
                      width: this.width,
                      shortenNumbers: this.config.shortenYAxisNumbers,
                    },
                    function () {
                      return this.state.yAxis;
                    }.bind(this),
                  ],
                  [
                    "xAxis",
                    { mode: this.config.xAxisMode, height: this.height },
                    function () {
                      var t = this.state;
                      return (
                        (t.xAxis.calcLabels = Nt(
                          this.width,
                          t.xAxis.labels,
                          this.config.xIsSeries
                        )),
                        t.xAxis
                      );
                    }.bind(this),
                  ],
                  [
                    "yRegions",
                    { width: this.width, pos: "right" },
                    function () {
                      return this.state.yRegions;
                    }.bind(this),
                  ],
                ],
                i = this.state.datasets.filter(function (t) {
                  return "bar" === t.chartType;
                }),
                n = this.state.datasets.filter(function (t) {
                  return "line" === t.chartType;
                }),
                a = i.map(function (e) {
                  var n = e.index;
                  return [
                    "barGraph-" + e.index,
                    {
                      index: n,
                      color: t.colors[n],
                      stacked: t.barOptions.stacked,
                      valuesOverPoints: t.config.valuesOverPoints,
                      minHeight: 0 * t.height,
                    },
                    function () {
                      var t = this.state,
                        e = t.datasets[n],
                        a = this.barOptions.stacked,
                        s = this.barOptions.spaceRatio || 0.5,
                        r = t.unitWidth * (1 - s),
                        o = r / (a ? 1 : i.length),
                        l = t.xAxis.positions.map(function (t) {
                          return t - r / 2;
                        });
                      a ||
                        (l = l.map(function (t) {
                          return t + o * n;
                        }));
                      var u = new Array(t.datasetLength).fill("");
                      this.config.valuesOverPoints &&
                        (u =
                          a && e.index === t.datasets.length - 1
                            ? e.cumulativeYs
                            : e.values);
                      var h = new Array(t.datasetLength).fill(0);
                      return (
                        a &&
                          (h = e.yPositions.map(function (t, i) {
                            return t - e.cumulativeYPos[i];
                          })),
                        {
                          xPositions: l,
                          yPositions: e.yPositions,
                          offsets: h,
                          labels: u,
                          zeroLine: t.yAxis.zeroLine,
                          barsWidth: r,
                          barWidth: o,
                        }
                      );
                    }.bind(t),
                  ];
                }),
                s = n.map(function (e) {
                  var i = e.index;
                  return [
                    "lineGraph-" + e.index,
                    {
                      index: i,
                      color: t.colors[i],
                      svgDefs: t.svgDefs,
                      heatline: t.lineOptions.heatline,
                      regionFill: t.lineOptions.regionFill,
                      hideDots: t.lineOptions.hideDots,
                      hideLine: t.lineOptions.hideLine,
                      valuesOverPoints: t.config.valuesOverPoints,
                    },
                    function () {
                      var t = this.state,
                        e = t.datasets[i],
                        n =
                          t.yAxis.positions[0] < t.yAxis.zeroLine
                            ? t.yAxis.positions[0]
                            : t.yAxis.zeroLine;
                      return {
                        xPositions: t.xAxis.positions,
                        yPositions: e.yPositions,
                        values: e.values,
                        zeroLine: n,
                        radius: this.lineOptions.dotSize || 4,
                      };
                    }.bind(t),
                  ];
                }),
                r = [
                  [
                    "yMarkers",
                    { width: this.width, pos: "right" },
                    function () {
                      return this.state.yMarkers;
                    }.bind(this),
                  ],
                ];
              e = e.concat(a, s, r);
              var o = ["yMarkers", "yRegions"];
              (this.dataUnitComponents = []),
                (this.components = new Map(
                  e
                    .filter(function (e) {
                      return !o.includes(e[0]) || t.state[e[0]];
                    })
                    .map(function (e) {
                      var i = yt.apply(void 0, It(e));
                      return (
                        (e[0].includes("lineGraph") ||
                          e[0].includes("barGraph")) &&
                          t.dataUnitComponents.push(i),
                        [e[0], i]
                      );
                    })
                ));
            },
          },
          {
            key: "makeDataByIndex",
            value: function () {
              var t = this;
              this.dataByIndex = {};
              var e = this.state,
                i = this.config.formatTooltipX,
                n = this.config.formatTooltipY;
              e.xAxis.labels.map(function (a, s) {
                var r = t.state.datasets.map(function (e, i) {
                  var a = e.values[s];
                  return {
                    title: e.name,
                    value: a,
                    yPos: e.yPositions[s],
                    color: t.colors[i],
                    formatted: n ? n(a) : a,
                  };
                });
                t.dataByIndex[s] = {
                  label: a,
                  formattedLabel: i ? i(a) : a,
                  xPos: e.xAxis.positions[s],
                  values: r,
                  yExtreme: e.yExtremes[s],
                };
              });
            },
          },
          {
            key: "bindTooltip",
            value: function () {
              var t = this;
              this.container.addEventListener("mousemove", function (i) {
                var n = t.measures,
                  a = e(t.container),
                  o = i.pageX - a.left - r(n),
                  l = i.pageY - a.top;
                l < t.height + s(n) && l > s(n)
                  ? t.mapTooltipXPosition(o)
                  : t.tip.hideTip();
              });
            },
          },
          {
            key: "mapTooltipXPosition",
            value: function (t) {
              var e = this.state;
              if (e.yExtremes) {
                var i = Tt(t, e.xAxis.positions, !0),
                  n = this.dataByIndex[i];
                this.tip.setValues(
                  n.xPos + this.tip.offset.x,
                  n.yExtreme + this.tip.offset.y,
                  { name: n.formattedLabel, value: "" },
                  n.values,
                  i
                ),
                  this.tip.showTip();
              }
            },
          },
          {
            key: "renderLegend",
            value: function () {
              var t = this,
                e = this.data;
              e.datasets.length > 1 &&
                ((this.legendArea.textContent = ""),
                e.datasets.map(function (e, i) {
                  var n = z(
                    100 * i,
                    "0",
                    100,
                    t.colors[i],
                    e.name,
                    t.config.truncateLegends
                  );
                  t.legendArea.appendChild(n);
                }));
            },
          },
          {
            key: "makeOverlay",
            value: function () {
              var t = this;
              if (this.init) return void (this.init = 0);
              this.overlayGuides &&
                this.overlayGuides.forEach(function (t) {
                  var e = t.overlay;
                  e.parentNode.removeChild(e);
                }),
                (this.overlayGuides = this.dataUnitComponents.map(function (t) {
                  return { type: t.unitType, overlay: void 0, units: t.units };
                })),
                void 0 === this.state.currentIndex &&
                  (this.state.currentIndex = this.state.datasetLength - 1),
                this.overlayGuides.map(function (e) {
                  var i = e.units[t.state.currentIndex];
                  (e.overlay = ae[e.type](i)),
                    t.drawArea.appendChild(e.overlay);
                });
            },
          },
          {
            key: "updateOverlayGuides",
            value: function () {
              this.overlayGuides &&
                this.overlayGuides.forEach(function (t) {
                  var e = t.overlay;
                  e.parentNode.removeChild(e);
                });
            },
          },
          {
            key: "bindOverlay",
            value: function () {
              var t = this;
              this.parent.addEventListener("data-select", function () {
                t.updateOverlay();
              });
            },
          },
          {
            key: "bindUnits",
            value: function () {
              var t = this;
              this.dataUnitComponents.map(function (e) {
                e.units.map(function (e) {
                  e.addEventListener("click", function () {
                    var i = e.getAttribute("data-point-index");
                    t.setCurrentDataPoint(i);
                  });
                });
              }),
                this.tip.container.addEventListener("click", function () {
                  var e = t.tip.container.getAttribute("data-point-index");
                  t.setCurrentDataPoint(e);
                });
            },
          },
          {
            key: "updateOverlay",
            value: function () {
              var t = this;
              this.overlayGuides.map(function (e) {
                var i = e.units[t.state.currentIndex];
                se[e.type](i, e.overlay);
              });
            },
          },
          {
            key: "onLeftArrow",
            value: function () {
              this.setCurrentDataPoint(this.state.currentIndex - 1);
            },
          },
          {
            key: "onRightArrow",
            value: function () {
              this.setCurrentDataPoint(this.state.currentIndex + 1);
            },
          },
          {
            key: "getDataPoint",
            value: function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.state.currentIndex,
                e = this.state;
              return {
                index: t,
                label: e.xAxis.labels[t],
                values: e.datasets.map(function (e) {
                  return e.values[t];
                }),
              };
            },
          },
          {
            key: "setCurrentDataPoint",
            value: function (t) {
              var e = this.state;
              (t = parseInt(t)) < 0 && (t = 0),
                t >= e.xAxis.labels.length && (t = e.xAxis.labels.length - 1),
                t !== e.currentIndex &&
                  ((e.currentIndex = t),
                  a(this.parent, "data-select", this.getDataPoint()));
            },
          },
          {
            key: "addDataPoint",
            value: function (t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : this.state.datasetLength;
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "addDataPoint",
                this
              ).call(this, t, e, n),
                this.data.labels.splice(n, 0, t),
                this.data.datasets.map(function (t, i) {
                  t.values.splice(n, 0, e[i]);
                }),
                this.update(this.data);
            },
          },
          {
            key: "removeDataPoint",
            value: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : this.state.datasetLength - 1;
              this.data.labels.length <= 1 ||
                (Wt(
                  i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                  "removeDataPoint",
                  this
                ).call(this, t),
                this.data.labels.splice(t, 1),
                this.data.datasets.map(function (e) {
                  e.values.splice(t, 1);
                }),
                this.update(this.data));
            },
          },
          {
            key: "updateDataset",
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0;
              (this.data.datasets[e].values = t), this.update(this.data);
            },
          },
          {
            key: "updateDatasets",
            value: function (t) {
              this.data.datasets.map(function (e, i) {
                t[i] && (e.values = t[i]);
              }),
                this.update(this.data);
            },
          },
        ]),
        i
      );
    })(fe),
    Ce = (function (t) {
      function i(t, e) {
        _t(this, i);
        var n = jt(
          this,
          (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, e)
        );
        return (
          (n.type = "donut"), (n.initTimeout = 0), (n.init = 1), n.setup(), n
        );
      }
      return (
        Ht(i, t),
        zt(i, [
          {
            key: "configure",
            value: function (t) {
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "configure",
                this
              ).call(this, t),
                (this.mouseMove = this.mouseMove.bind(this)),
                (this.mouseLeave = this.mouseLeave.bind(this)),
                (this.hoverRadio = t.hoverRadio || 0.1),
                (this.config.startAngle = t.startAngle || 0),
                (this.clockWise = t.clockWise || !1),
                (this.strokeWidth = t.strokeWidth || 30);
            },
          },
          {
            key: "calc",
            value: function () {
              var t = this;
              Wt(
                i.prototype.__proto__ || Object.getPrototypeOf(i.prototype),
                "calc",
                this
              ).call(this);
              var e = this.state;
              this.radius =
                this.height > this.width
                  ? this.center.x - this.strokeWidth / 2
                  : this.center.y - this.strokeWidth / 2;
              var n = this.radius,
                a = this.clockWise,
                s = e.slicesProperties || [];
              (e.sliceStrings = []), (e.slicesProperties = []);
              var r = 180 - this.config.startAngle;
              e.sliceTotals.map(function (i, o) {
                var l = r,
                  u = (i / e.grandTotal) * 360,
                  h = u > 180 ? 1 : 0,
                  c = a ? -u : u,
                  p = (r += c),
                  f = d(l, n),
                  v = d(p, n),
                  g = t.init && s[o],
                  y = void 0,
                  m = void 0;
                t.init
                  ? ((y = g ? g.startPosition : f), (m = g ? g.endPosition : f))
                  : ((y = f), (m = v));
                var b =
                  360 === u
                    ? N(y, m, t.center, t.radius, t.clockWise, h)
                    : D(y, m, t.center, t.radius, t.clockWise, h);
                e.sliceStrings.push(b),
                  e.slicesProperties.push({
                    startPosition: f,
                    endPosition: v,
                    value: i,
                    total: e.grandTotal,
                    startAngle: l,
                    endAngle: p,
                    angle: c,
                  });
              }),
                (this.init = 0);
            },
          },
          {
            key: "setupComponents",
            value: function () {
              var t = this.state,
                e = [
                  [
                    "donutSlices",
                    {},
                    function () {
                      return {
                        sliceStrings: t.sliceStrings,
                        colors: this.colors,
                        strokeWidth: this.strokeWidth,
                      };
                    }.bind(this),
                  ],
                ];
              this.components = new Map(
                e.map(function (t) {
                  var e = yt.apply(void 0, It(t));
                  return [t[0], e];
                })
              );
            },
          },
          {
            key: "calTranslateByAngle",
            value: function (t) {
              var e = this.radius,
                i = this.hoverRadio,
                n = d(t.startAngle + t.angle / 2, e);
              return "translate3d(" + n.x * i + "px," + n.y * i + "px,0)";
            },
          },
          {
            key: "hoverSlice",
            value: function (t, i, n, a) {
              if (t) {
                var s = this.colors[i];
                if (n) {
                  it(
                    t,
                    this.calTranslateByAngle(this.state.slicesProperties[i])
                  ),
                    (t.style.stroke = m(s, 50));
                  var r = e(this.svg),
                    o = a.pageX - r.left + 10,
                    l = a.pageY - r.top - 10,
                    u =
                      (this.formatted_labels && this.formatted_labels.length > 0
                        ? this.formatted_labels[i]
                        : this.state.labels[i]) + ": ",
                    h = (
                      (100 * this.state.sliceTotals[i]) /
                      this.state.grandTotal
                    ).toFixed(1);
                  this.tip.setValues(o, l, { name: u, value: h + "%" }),
                    this.tip.showTip();
                } else
                  it(t, "translate3d(0,0,0)"),
                    this.tip.hideTip(),
                    (t.style.stroke = s);
              }
            },
          },
          {
            key: "bindTooltip",
            value: function () {
              this.container.addEventListener("mousemove", this.mouseMove),
                this.container.addEventListener("mouseleave", this.mouseLeave);
            },
          },
          {
            key: "mouseMove",
            value: function (t) {
              var e = t.target,
                i = this.components.get("donutSlices").store,
                n = this.curActiveSliceIndex,
                a = this.curActiveSlice;
              if (i.includes(e)) {
                var s = i.indexOf(e);
                this.hoverSlice(a, n, !1),
                  (this.curActiveSlice = e),
                  (this.curActiveSliceIndex = s),
                  this.hoverSlice(e, s, !0, t);
              } else this.mouseLeave();
            },
          },
          {
            key: "mouseLeave",
            value: function () {
              this.hoverSlice(
                this.curActiveSlice,
                this.curActiveSliceIndex,
                !1
              );
            },
          },
        ]),
        i
      );
    })(ve),
    Oe = { bar: Te, line: Te, percentage: Ae, heatmap: Le, pie: Pe, donut: Ce },
    Me = function t(e, i) {
      return _t(this, t), St(i.type, e, i);
    },
    De = Object.freeze({
      Chart: Me,
      PercentageChart: Ae,
      PieChart: Pe,
      Heatmap: Le,
      AxisChart: Te,
    }),
    Ne = {};
  return (
    (Ne.NAME = "Frappe Charts"),
    (Ne.VERSION = "1.2.0"),
    (Ne = Object.assign({}, Ne, De))
  );
})();
//# sourceMappingURL=frappe-charts.min.iife.js.map
