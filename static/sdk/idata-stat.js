!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define(t)
      : (n.Idata = t());
})(this, function () {
  function n() {
    (this.concurrency = 4),
      (this.queue = []),
      (this.tasks = []),
      (this.activeCount = 0);
    var n = this;
    (this.push = function (t) {
      this.tasks.push(
        new Promise(function (e, o) {
          var r = function () {
            n.activeCount++ ,
              t()
                .then(function (n) {
                  e(n);
                })
                .then(function () {
                  n.next();
                });
          };
          n.activeCount < n.concurrency ? r() : n.queue.push(r);
        })
      );
    }),
      (this.all = function () {
        return Promise.all(this.tasks);
      }),
      (this.next = function () {
        n.activeCount-- , n.queue.length > 0 && n.queue.shift()();
      });
  }
  function t() {
    (this.request = []),
      (this.updata = !1),
      (this.push = function (n) {
        this.request.length >= 8 && !this.updata && ((this.updata = !0), e()),
          this.request.length >= 10
            ? (this.request.shift(), this.request.push(n))
            : this.request.push(n);
      }),
      (this.concat = function () {
        this.request.map(function (n) {
          wx.Queue.push(n);
        }),
          (this.request = []);
      });
  }
  function e() {
    "function" == typeof gn &&
      "" === G &&
      gn().then(function (n) {
        28 === n.length && ((G = n), wx.setStorageSync("idatastat_op", n));
      });
  }
  function o(n) {
    this.app = n;
  }
  function r(n) {
    (j = S()), (W = n), (ln = n.scene), (this.idatastat = new o(this));
  }
  // get userInfo
  function getUserInfo(reqData) {
    if ("" !== tn) {
      reqData.header.udp = tn;
      sendLog(reqData);
    } else {
      wx.getSetting({
        withCredentials: !0,
        success: function (n) {
          if (n.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              withCredentials: !0,
              success: function (n) {
                tn = _(n);
                K = y(n.userInfo.avatarUrl.split("/"));
                reqData.header.udp = tn;
                sendLog(reqData);
              }
            })
          } else {
            sendLog(reqData);
          }
        }
      })
    }
  }
  function i(n) {
    z = getsid();
    startTime = Date.now();
    e();
    var t;
    (t = n.scene != ln),
      (ln = n.scene),
      (V = 0),
      (W = n),
      (F = n.query.idata_share_src),
      (X = n.query.idatasrc || ""),
      (Y = n.query.idata_share_src),
      fn || ($ = !1),
      (fn = !1),
      ((0 !== Q && Date.now() - Q > 3e4) || t) &&
      (hn || ((T = S()), (N = Date.now()), (wn = 0))),
      0 !== Q && Date.now() - Q < 3e4 && (rn = !0),
      n.query.idata_share_src && "1044" == n.scene && n.shareTicket
        ? wx.getShareInfo({
          shareTicket: n.shareTicket,
          success: function (n) {
            (nn = n), A("fromShare", "fromShare", JSON.stringify(n));
          }
        })
        : n.query.idata_share_src && A("fromShare", "fromShare"),
      bc = "boot";
      q("app", "show");
  }
  function s() {
    e(),
    (Q = Date.now()),
    bc = "close";
    removesid();
    q("app", "hide");
  }
  function a(n) {
    bc = "error";
    Z++ , A("error", "error", n);
  }
  function u(n) {
    un = n;
  }
  function c() {
    (dn = Date.now()),
      (sn = B ? this.$mp.page.route : this.route),
      D("page", "show"),
      (rn = !1);
  }
  function f() {
    (an = sn), (wn = Date.now() - dn);
  }
  function h() {
    (an = sn), (wn = Date.now() - dn);
  }
  function l() {
    A("pulldownrefresh", "pulldownrefresh", {
      url: sn
    });
  }
  function p() {
    A("reachbottom", "reachbottom", {
      url: sn
    });
  }
  function d(n) {
    hn = !0;
    var t = m(n.path),
      e = {};
    for (var o in W.query) "idata_share_src" === o && (e[o] = W.query[o]);
    var r = "";
    if (
      ((r =
        n.path.indexOf("?") == -1
          ? n.path + "?"
          : n.path.substr(0, n.path.indexOf("?")) + "?"),
        "" !== t)
    )
      for (var o in t) e[o] = t[o];
    e.idata_share_src
      ? e.idata_share_src.indexOf(z) == -1 &&
      e.idata_share_src.length < 200 &&
      (e.idata_share_src = e.idata_share_src + "," + z)
      : (e.idata_share_src = z);
    for (var i in e) i.indexOf("idata") == -1 && (r += i + "=" + e[i] + "&");
    return (
      (n.path = r + "idata_share_src=" + e.idata_share_src),
      A("share", "share", n),
      n
    );
  }
  function w() {
    function n() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return n() + n() + n() + n() + n() + n() + n() + n();
  }
  function getResData(n) {
    var headerFields = ["platform", "app_ver", "resolution", "os_release", "model", "net_type", "language", "sdk_ver", "appid", "lat", "lng", "client_ts", "uuid", "scene", "udp", "duid"]
    var bodyFields = ["id", "type", "udmap", "sid", "ts", "index"]
    var header = {}
    var eventItem = {}
    for (var e in n) {
      if (headerFields.indexOf(e) != -1) {
        header[e] = n[e]
      }
      if (bodyFields.indexOf(e) != -1) {
        eventItem[e] = n[e]
      }
    }

    if (bc === "boot") {
      bc = "";
      return {
        header: header,
        body: [{
          boot: [{
            sid: n.sid,
            ts: n.ts
          }]
        }]
      }
    }

    if (bc === "close") {
      bc = "";
      return {
        header: header,
        body: [{
          close: [{
            sid: n.sid,
            ts: n.ts,
            dur: Date.now() - startTime
          }]
        }]
      }
    }

    if (bc === "error") {
      bc = "";
      return {
        header: header,
        body: [{
          error: [{
            sid: n.sid,
            ts: n.ts,
            msg: n.udmap
          }]
        }]
      }
    }

    return {
      header: header,
      body: [{
        event: [eventItem]
      }]
    }
  }
  function sendLog(reqData) {
    reqData = encodeURIComponent(AES.encrypt(JSON.stringify(reqData), secret));
    function t() {
      return new Promise(function (t, e) {
        "" === E || (o.ai = E);
        // idata_config
        var debug = H.debug;
        var product = "salog";
        if (debug) {
          product = "testsalog";
        }
        var size = reqData.length;
        var url = api_base +
          "/log?product=" +
          product +
          "&appid=" +
          H.appid +
          "&size=" +
          size +
          "&platform=applet&source=daas&pv=1.2"
        wx.request({
          url: url,
          data: reqData,
          method: "POST",
          success: function (n) {
            t(200 == n.statusCode ? "" : "status error");
          },
          fail: function () {
            t("fail");
          }
        });
      });
    }
    V++ ,
      (n.at = T),
      // (n.uu = z),
      (n.v = C),
      // (n.ak = H.appid.replace(/(\t)|(\s)/g, "")),
      // (n.wsr = W),

      (n.ifo = $),
      (n.rq_c = V),
      (n.ls = j),
      (n.te = b),
      (n.et = Date.now()),
      (n.st = Date.now()),
      builtInConfig.useOpen
        ? "" === G
          ? pn.push(t)
          : (wx.Queue.push(t), pn.concat())
        : wx.Queue.push(t);
  }
  function g(n) {
    // idata_config
    n.sdk_ver = C
    n.appid = H.appid
    n.client_ts = Date.now()
    n.scene = W
    n.duid = G
    n.uuid = G
    n.ts = Date.now()
    n.index = count
    n.sid = z
    count++

    var reqData = getResData(n)

    console.log('reqData', reqData)
    getUserInfo(reqData)
  }
  function v() {
    var n = {};
    for (var t in en) n[t] = en[t];
    return n;
  }
  function y(n) {
    for (var t = "", e = 0; e < n.length; e++)
      n[e].length > t.length && (t = n[e]);
    return t;
  }
  function S() {
    return "" + Date.now() + Math.floor(1e7 * Math.random());
  }
  function _(n) {
    var t = {};
    for (var e in n) "rawData" != e && "errMsg" != e && "userInfo" == e && (t = n[e]);
    return t;
  }
  function m(n) {
    if (n.indexOf("?") == -1) return "";
    var t = {};
    return (
      n
        .split("?")[1]
        .split("&")
        .forEach(function (n) {
          var e = n.split("=")[1];
          t[n.split("=")[0]] = e;
        }),
      t
    );
  }
  function x(n) {
    for (var t in n) if ("object" == typeof n[t] && null !== n[t]) return !0;
    return !1;
  }
  function q(n, t) {
    var e = v();
    (e.ev = n),
      (e.id = n),
      (e.type = t),
      (e.life = t),
      (e.ec = Z),
      (e.dr = Date.now() - N),
      X && ((e.qr = X), (e.sr = X)),
      F && (e.usr = F),
      g(e);
  }
  function D(n, t) {
    var e = v();
    (e.ev = n),
      (e.life = t),
      (e.pp = sn),
      (e.pc = an),
      (e.dr = Date.now() - N),
      hn && (e.so = 1),
      (hn = !1),
      un && "{}" != JSON.stringify(un) && (e.ag = un),
      X && ((e.qr = X), (e.sr = X)),
      F && (e.usr = F),
      rn && (e.ps = 1),
      (e.id = n),
      (e.type = t),
      on
        ? (e.pdr = wn)
        : ((cn = sn), (on = !0), (e.ifp = on), (e.fp = sn), (e.pdr = 0)),
      g(e);
  }
  function A(n, t, e) {
    var o = v();
    if (e) {
      o.udmap = e;
    }
    (o.id = n), (o.type = t), g(o);
  }
  function M(n, t, e) {
    if (n[t]) {
      var o = n[t];
      n[t] = function (n) {
        e.call(this, n, t), o.call(this, n);
      };
    } else
      n[t] = function (n) {
        e.call(this, n, t);
      };
  }
  function I(n) {
    var t = {};
    for (var e in n)
      "onLaunch" !== e &&
        "onShow" !== e &&
        "onHide" !== e &&
        "onError" !== e &&
        (t[e] = n[e]);
    return (
      (t.onLaunch = function (t) {
        r.call(this, t),
          "function" == typeof n.onLaunch && n.onLaunch.call(this, t);
      }),
      (t.onShow = function (t) {
        i.call(this, t),
          n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
      }),
      (t.onHide = function () {
        s.call(this),
          n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
      }),
      (t.onError = function (t) {
        a.call(this, t),
          n.onError &&
          "function" == typeof n.onError &&
          n.onError.call(this, t);
      }),
      t
    );
  }
  function P(n) {
    var t = {};
    for (var e in n)
      "onLoad" !== e &&
        "onShow" !== e &&
        "onHide" !== e &&
        "onUnload" !== e &&
        "onPullDownRefresh" !== e &&
        "onReachBottom" !== e &&
        "onShareAppMessage" !== e &&
        (t[e] = n[e]);
    return (
      (t.onLoad = function (t) {
        u.call(this, t),
          "function" == typeof n.onLoad && n.onLoad.call(this, t);
      }),
      (t.onShow = function (t) {
        c.call(this), "function" == typeof n.onShow && n.onShow.call(this, t);
      }),
      (t.onHide = function (t) {
        f.call(this), "function" == typeof n.onHide && n.onHide.call(this, t);
      }),
      (t.onUnload = function (t) {
        h.call(this),
          "function" == typeof n.onUnload && n.onUnload.call(this, t);
      }),
      (t.onReachBottom = function (t) {
        p(),
          n.onReachBottom &&
          "function" == typeof n.onReachBottom &&
          n.onReachBottom.call(this, t);
      }),
      (t.onPullDownRefresh = function (t) {
        l(),
          n.onPullDownRefresh &&
          "function" == typeof n.onPullDownRefresh &&
          n.onPullDownRefresh.call(this, t);
      }),
      n.onShareAppMessage &&
      "function" == typeof n.onShareAppMessage &&
      (t.onShareAppMessage = function (t) {
        var e = n.onShareAppMessage.call(this, t);
        return (
          void 0 === e
            ? ((e = {}), (e.path = this.route), (e.url = sn))
            : (void 0 === e.path && (e.path = this.route), (e.url = sn)),
          d.call(this, e)
        );
      }),
      t
    );
  }
  function L(n) {
    return App(I(n));
  }
  function O(n) {
    return Page(P(n));
  }
  function R(n) {
    return (B = !0), I(n);
  }
  function k(n) {
    return P(n);
  }
  function getsid() {
    var n = "";
    try {
      n = wx.getStorageSync("idatastat_uuid");
    } catch (t) {
      n = "uuid_getstoragesync";
    }
    if (n) $ = !1;
    else {
      n = w();
      try {
        wx.setStorageSync("idatastat_uuid", n), ($ = !0);
      } catch (n) {
        wx.setStorageSync("idatastat_uuid", "uuid_getstoragesync");
      }
    }
    return n;
  }
  function removesid() {
    wx.removeStorageSync("idatastat_uuid")
  }
  var H = require("./idata-stat-conf");
  var AES = require("./aes");
  var secret = "abcdefgabcdefg12";
  var count = 1;
  var api_base = "https://log.iflytek.com";
  var builtInConfig = {
    useOpen: true
  };
  void 0 === wx.Queue && ((wx.Queue = new n()), wx.Queue.all()),
    builtInConfig.useOpen &&
    console.warn(
      "请上传用户的openid，如果不上传用户opendid则不会上报数据。"
    );
  var C = "7.3.2",
    U = "log",
    b = "wx",
    E = (function () {
      return void 0 === wx.getAccountInfoSync
        ? ""
        : wx
          .getAccountInfoSync()
          .miniProgram.appId.split("")
          .map(function (n) {
            return n.charCodeAt(0) + 9;
          })
          .join("-");
    })(),
    B = !1,
    T = S(),
    j = "",
    N = Date.now(),
    Q = 0,
    J = "",
    G = (function () {
      var n = "";
      try {
        n = wx.getStorageSync("idatastat_op");
      } catch (n) { }
      return n;
    })(),
    K = "",
    V = 0,
    W = "",
    $ = "",
    z = "",
    startTime = "",
    F = "",
    X = "",
    Y = "",
    Z = 0,
    nn = "",
    tn = "",
    en = {},
    on = !1,
    rn = !1,
    sn = "",
    an = "",
    un = "",
    cn = "",
    fn = !0,
    hn = !1,
    ln = "",
    pn = new t(),
    dn = 0,
    wn = 0,
    bc = "",
    gn = "";
  (wx.idatastat = new o(""));
  try {
    var vn = wx.getSystemInfoSync();
    (en.model = vn.model),
      (en.resolution = vn.windowWidth + '*' + vn.windowHeight),
      (en.language = vn.language),
      (en.app_ver = vn.version),
      (en.platform = vn.platform),
      (en.platform = 'Applets_' + vn.system.split(' ')[0]),
      (en.os_release = vn.system.split(' ')[1]);
  } catch (n) { }
  wx.getNetworkType({
    success: function (n) {
      en.nt = n.networkType;
    }
  }),
    wx.getSetting({
      success: function (n) {
        n.authSetting["scope.userLocation"]
          ? wx.getLocation({
            type: "wgs84",
            success: function (n) {
              (en.lat = n.latitude),
                (en.lng = n.longitude);
            }
          })
          : H.getLocation &&
          wx.getLocation({
            type: "wgs84",
            success: function (n) {
              (en.lat = n.latitude),
                (en.lng = n.longitude);
            }
          });
      }
    }),
    (o.prototype.sendEvent = function (n, t) {
      if ("string" != typeof n) {
        console.error("事件id必须为String类型");
      } else {
        if ("object" == typeof t) {
          A(n, "custom", t)
        } else {
          console.error("事件信息必须为Object类型");
        }
      }
    }),
    (o.prototype.bindUser = function (t) {
      // idata_config
      if ("object" == typeof t) {
        A('user_login', "account", t)
      } else {
        console.error("绑定信息必须为Object类型");
      }
    }),
    (o.prototype.unbindUser = function (t) {
      // idata_config
      if ("object" == typeof t) {
        A('user_logout', "account", t)
      } else {
        console.error("解绑信息必须为Object类型");
      }
    }),
    (o.prototype.sendOpenid = function (n) {
      if ("" === n || !n || 28 !== n.length)
        return void console.error("openID不能为空");
      (G = n), wx.setStorageSync("idatastat_op", n);
    });
  return H.plugin
    ? { App: L, Page: O, MpvueApp: R, MpvuePage: k }
    : (function (n) {
      !(function () {
        var n = App,
          t = Page,
          e = Component;
        (App = function (t) {
          M(t, "onLaunch", r),
            M(t, "onShow", i),
            M(t, "onHide", s),
            M(t, "onError", a),
            n(t);
        }),
          (Page = function (n) {
            var e = n.onShareAppMessage;
            M(n, "onLoad", u),
              M(n, "onUnload", h),
              M(n, "onShow", c),
              M(n, "onHide", f),
              M(n, "onReachBottom", p),
              M(n, "onPullDownRefresh", l),
              void 0 !== e &&
              null !== e &&
              (n.onShareAppMessage = function (n) {
                if (void 0 !== e) {
                  var t = e.call(this, n);
                  return (
                    void 0 === t
                      ? ((t = {}), (t.path = sn), (t.url = sn))
                      : (void 0 === t.path && (t.path = sn), (t.url = sn)),
                    d(t)
                  );
                }
              }),
              t(n);
          }),
          (Component = function (n) {
            try {
              var t = n.methods.onShareAppMessage;
              M(n.methods, "onLoad", u),
                M(n.methods, "onUnload", h),
                M(n.methods, "onShow", c),
                M(n.methods, "onHide", f),
                M(n.methods, "onReachBottom", p),
                M(n.methods, "onPullDownRefresh", l),
                void 0 !== t &&
                null !== t &&
                (n.methods.onShareAppMessage = function (n) {
                  if (void 0 !== t) {
                    var e = t.call(this, n);
                    return (
                      void 0 === e
                        ? ((e = {}), (e.path = sn), (e.url = sn))
                        : (void 0 === e.path && (e.path = sn), (e.url = sn)),
                      d(e)
                    );
                  }
                }),
                e(n);
            } catch (t) {
              e(n);
            }
          });
      })();
    })();
});
