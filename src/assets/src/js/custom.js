$(document).ready(function () {
  $("#owl-carousel-header").owlCarousel({
    loop: false,
    margin: 30,
    dots: true,
    nav: true,
    items: 2,
    slideBy: 2,
    mouseDrag: false,
    touchDrag: false,
    animateIn: "fadeIn", // add this
    animateOut: "fadeOut", // and this
  });
});

jQuery(document).ready(function () {
  jQuery(".icon-rocket, .slide-form-close, .show-form").click(function () {
    jQuery("body").toggleClass("show_form");
  }),
    jQuery(".toggle_nav, .toggle-close").click(function () {
      jQuery("body").toggleClass("show_menu");
    }),
    jQuery(window).on("load scroll", function (t) {
      jQuery(window).scrollTop() >= 100
        ? jQuery("header").addClass("fixed-header")
        : jQuery("header").removeClass("fixed-header");
    }),
    $(function () {
      var t = $(window).scrollTop(),
        e = window.innerHeight,
        o = window.innerWidth,
        i = "scene",
        a = i + "--active",
        n = i + "--ended";
      function r(t) {
        var o = t.data("elDom").getBoundingClientRect();
        o.top > e
          ? (t.find(".scene").removeClass(a), t.find(".scene").removeClass(n))
          : o.bottom < 0
          ? (t.find(".scene").addClass(n), t.find(".scene").removeClass(a))
          : (o.top <= 0 && t.find(".scene").addClass(a),
            o.top > 0 && t.find(".scene").removeClass(a),
            o.bottom <= e && t.find(".scene").addClass(n),
            o.bottom > e && t.find(".scene").removeClass(n));
      }
      $(window).on("resize", function () {
        (e = window.innerHeight), (o = window.innerWidth);
      });
      var s = $(".horizontal-scroll-section"),
        l = s.find(".trigger");
      s.each(function (t, e) {
        var i,
          a,
          n,
          s,
          l,
          c,
          d = $(this);
        $(this).data("elDom", $(this).get(0)),
          (a = (i = $(this)).attr("class")),
          (s = (n = i.find("." + a + "__content-wrapper")).get(0)),
          i.data("contentWrapper", n),
          i.data("contentWrapperDom", s),
          (l = i.data("contentWrapperDom").scrollWidth),
          i.data("contentWrapperScrollWidth", l),
          (c = i.data("contentWrapperScrollWidth") - o),
          i.data("rightMax", Number(-c)),
          i.data("initalized", !1),
          i.css("height", i.data("contentWrapperScrollWidth")),
          i.data("outerHeight", i.outerHeight()),
          i.data("offsetTop", i.offset().top),
          i.data("initalized", !0),
          i.data("transformX", "0"),
          i.addClass(i.attr("class") + "--init"),
          r($(this)),
          $(window).on("resize", function () {
            var t, e;
            (e = (t = d).data("contentWrapperDom").scrollWidth),
              t.data("contentWrapperScrollWidth", e),
              (rightMaxMinus = -(rightMax = t.data("contentWrapperScrollWidth") - o)),
              t.data("rightMax", Number(rightMaxMinus)),
              t.css("height", t.data("contentWrapperScrollWidth")),
              t.data("outerHeight", t.outerHeight()),
              t.data("offsetTop", t.offset().top),
              t.data("transformX") <= t.data("rightMax") &&
                t.data("contentWrapper").css({ transform: "translate3d(" + t.data("rightMax") + "px, 0, 0)" }),
              r(d);
          });
      }),
        l.each(function (t, e) {
          var o, i, a, n;
          (o = $(this)),
            (i = $(this).closest(".horizontal-scroll-section")),
            (a = o.parent().position().left),
            (n = (n = o.data("triggerOffset")) || 0.5),
            o.data("triggerOffset", n),
            o.data("triggerPositionLeft", -a),
            o.data("triggerSection", i);
        }),
        $(window).on("scroll", function () {
          (t = $(window).scrollTop()),
            s.each(function (i, a) {
              var n, s;
              (n = $(this)),
                (s = Math.max(
                  (s = Math.min(
                    0,
                    (s =
                      (-(t - n.data("offsetTop")) / (n.data("outerHeight") - (e - o))) *
                      n.data("contentWrapperScrollWidth"))
                  )),
                  n.data("rightMax")
                )),
                n.data("transformX", Number(s)),
                1 == n.data("initalized") &&
                  n.data("contentWrapper").css({ transform: "translate3d(" + n.data("transformX") + "px, 0, 0)" }),
                r($(this));
            }),
            l.each(function (t, e) {
              var o;
              (o = $(this)).data("triggerSection").data("transformX") <=
              o.data("triggerPositionLeft") * o.data("triggerOffset")
                ? o.data("triggerSection").addClass(o.data("class"))
                : !1 !== o.data("remove-class") && o.data("triggerSection").removeClass(o.data("class"));
            });
        });
    }),
    // jQuery(document).ready(function () {
    //     var t = jQuery("#sync1"),
    //         e = jQuery("#sync2"),
    //         o = "/hire-umbraco-developer" === window.location.pathname ? 9 : 7;
    //     t
    //         .on("initialized.owl.carousel changed.owl.carousel", function (t) {
    //             if (t.namespace) {
    //                 var e = t.relatedTarget;
    //                 $(".slider-counter").text(e.relative(e.current()) + 1 + "/" + e.items().length);
    //             }
    //         })
    //         .owlCarousel({
    //             items: 1,
    //             nav: !0,
    //             autoplay: !1,
    //             dots: !1,
    //             loop: !0,
    //             touchDrag: !1,
    //             mouseDrag: !1,
    //             responsiveClass: !0,
    //             responsive: { 0: { item: 1, autoplay: !1 }, 600: { items: 1, autoplay: !1 } },
    //             responsiveRefreshRate: 200,
    //             navText: [
    //                 '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
    //                 '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>',
    //             ],
    //         })
    //         .on("changed.owl.carousel", function (t) {
    //             var o = t.item.count - 1,
    //                 i = Math.round(t.item.index - t.item.count / 2 - 0.5);
    //             i < 0 && (i = o), i > o && (i = 0), e.find(".owl-item").removeClass("current").eq(i).addClass("current");
    //             var a = e.find(".owl-item.active").length - 1,
    //                 n = e.find(".owl-item.active").first().index();
    //             i > e.find(".owl-item.active").last().index() && e.data("owl.carousel").to(i, 100, !0), i < n && e.data("owl.carousel").to(i - a, 100, !0);
    //         }),
    //         e
    //             .on("initialized.owl.carousel", function () {
    //                 e.find(".owl-item").eq(0).addClass("current");
    //             })
    //             .owlCarousel({ items: o, dots: !1, loop: !1, touchDrag: !1, mouseDrag: !1, slideBy: o, responsiveRefreshRate: 100 })
    //             .on("changed.owl.carousel", function (e) {
    //                 var o = e.item.index;
    //                 t.data("owl.carousel").to(o, 100, !0);
    //             }),
    //         e.on("click", ".owl-item", function (e) {
    //             e.preventDefault();
    //             var o = jQuery(this).index();
    //             t.data("owl.carousel").to(o, 300, !0);
    //         });
    // }),
    jQuery(document).ready(function () {
      var t = jQuery("#sync1"),
        e = jQuery("#sync2"),
        o = "/hire-strapi-developer" === window.location.pathname ? 7 : 5;
      t
        .on("initialized.owl.carousel changed.owl.carousel", function (t) {
          if (t.namespace) {
            var e = t.relatedTarget;
            $(".slider-counter").text(e.relative(e.current()) + 1 + "/" + e.items().length);
          }
        })
        .owlCarousel({
          items: 1,
          nav: !0,
          autoplay: !1,
          dots: !1,
          loop: !0,
          touchDrag: !1,
          mouseDrag: !1,
          responsiveClass: !0,
          responsive: { 0: { item: 1, autoplay: !1 }, 600: { items: 1, autoplay: !1 } },
          responsiveRefreshRate: 200,
          navText: [
            '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
            '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>',
          ],
        })
        .on("changed.owl.carousel", function (t) {
          var o = t.item.count - 1,
            i = Math.round(t.item.index - t.item.count / 2 - 0.5);
          i < 0 && (i = o), i > o && (i = 0), e.find(".owl-item").removeClass("current").eq(i).addClass("current");
          var a = e.find(".owl-item.active").length - 1,
            n = e.find(".owl-item.active").first().index();
          i > e.find(".owl-item.active").last().index() && e.data("owl.carousel").to(i, 100, !0),
            i < n && e.data("owl.carousel").to(i - a, 100, !0);
        }),
        e
          .on("initialized.owl.carousel", function () {
            e.find(".owl-item").eq(0).addClass("current");
          })
          .owlCarousel({
            items: o,
            dots: !1,
            loop: !1,
            touchDrag: !1,
            mouseDrag: !1,
            slideBy: o,
            responsiveRefreshRate: 100,
          })
          .on("changed.owl.carousel", function (e) {
            var o = e.item.index;
            t.data("owl.carousel").to(o, 100, !0);
          }),
        e.on("click", ".owl-item", function (e) {
          e.preventDefault();
          var o = jQuery(this).index();
          t.data("owl.carousel").to(o, 300, !0);
        });
    }),
    $(".slider-horizontal").owlCarousel({
      loop: !0,
      margin: 0,
      nav: !0,
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } },
    }),
    window.matchMedia("(max-width: 767PX)").matches &&
      (jQuery(".faq__section .sidebar .title, .blog-drop-down a").click(function () {
        jQuery(".faq__section .sidebar .sidebar_main ul, .blog__section ul.blog_cat_list").toggle();
      }),
      jQuery(".faq__section .sidebar .sidebar_main ul li a, .blog__section ul.blog_cat_list a").click(function () {
        var t = jQuery(this).html();
        jQuery(".faq__section .sidebar .title, .blog-drop-down a").html(t),
          jQuery(".faq__section .sidebar .sidebar_main ul, .blog__section ul.blog_cat_list").hide();
      }),
      jQuery(document).bind("click", function (t) {
        jQuery(t.target).parents().is(".sidebar_main, .blog-drop-down") ||
          jQuery(".faq__section .sidebar .sidebar_main ul, .blog__section ul.blog_cat_list").hide();
      })),
    $(".accordion-wrapper .btn-wrapper button").click(function () {
      $(this).parent().siblings().slideToggle("slide"),
        $(this).parent().parent().toggleClass("active"),
        $(this).parent().parent().siblings().removeClass("active"),
        $(this).parent().parent().siblings().children(".collepsing-div").slideUp("medium");
    }),
    $(".hire-looking-slider")
      .on("initialized.owl.carousel changed.owl.carousel", function (t) {
        if (t.namespace) {
          var e = t.relatedTarget;
          $(".slider-counter").text(e.relative(e.current()) + 1 + "/" + e.items().length);
        }
      })
      .owlCarousel({ items: 1, loop: !0, margin: 0, nav: !0, animateOut: "fadeOut", animateIn: "fadeIn" }),
    $(".counting").each(function () {
      var t = $(this),
        e = t.attr("data-count");
      $({ countNum: t.text() }).animate(
        { countNum: e },
        {
          duration: 3e3,
          easing: "linear",
          step: function () {
            t.text(Math.floor(this.countNum));
          },
          complete: function () {
            t.text(this.countNum);
          },
        }
      );
    });
  var t = $("#backtotop");
  $(window).scroll(function () {
    $(window).scrollTop() > 300 ? t.addClass("show") : t.removeClass("show");
  }),
    t.on("click", function (t) {
      t.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "300");
    }),
    1024 > $(window).width() &&
      (jQuery("#navbarSupportedContent .dropdown-toggle").click(function () {
        jQuery("#navbarSupportedContent .dropdown.position-static").removeClass("show"),
          jQuery("#navbarSupportedContent .dropdown.position-static").addClass("open_slide_menu"),
          jQuery("body").addClass("toggle_slidemenu_open"),
          jQuery(this).parents("#navbarSupportedContent .dropdown.position-static").addClass("show");
      }),
      jQuery("#navbarSupportedContent .left-section .title-text").click(function () {
        jQuery("#navbarSupportedContent .dropdown.position-static").removeClass("open_slide_menu show"),
          jQuery("#navbarSupportedContent .dropdown-toggle").removeClass("show"),
          jQuery("#navbarSupportedContent .dropdown-menu.container").removeClass("show"),
          jQuery("body").removeClass("toggle_slidemenu_open");
      }),
      jQuery("#navbarSupportedContent .dropdown-toggle").click(function () {
        $(".navbar-collapse ").addClass("show-menu-list");
      }),
      jQuery(".navbar-toggler").click(function () {
        $("body").toggleClass("show-menu");
      })),
    // $("#nav-tabContent #nav-home .accordion-body .row .col-md-6 .tab-box").on("click", function () {
    //     window.location.href = "ui-ux-designer.html";
    // }),
    $(".blog-listing .tab-menu .container ul li ").on("click", function () {
      var t = $(this).attr("data-rel");
      return (
        $(".blog-listing .tab-menu .container ul li a").removeClass("active"),
        $(".blog-listing .tab-menu .container ul li ").removeClass("active"),
        $(this).addClass("active"),
        $("#" + t)
          .fadeIn("slow")
          .siblings(".tab-box")
          .hide(),
        !1
      );
    }),
    $("#blog-title-all-blogs").on("click", function () {
      $(".blog-title-all-blogs").css("display", "flex");
    }),
    $("#blog-title-digital-experience").on("click", function () {
      $(".blog-title-all-blogs").css("display", "none"), $(".blog-title-digital-experience").css("display", "flex");
    }),
    $("#blog-title-content-experience").on("click", function () {
      $(".blog-title-all-blogs").css("display", "none"), $(".blog-title-content-experience").css("display", "flex");
    }),
    $("#blog-title-headless").on("click", function () {
      $(".blog-title-all-blogs").css("display", "none"), $(".blog-title-headless").css("display", "flex");
    });
  $("#blog-title-user-experience").on("click", function () {
    $(".blog-title-all-blogs").css("display", "none"), $(".blog-title-user-experience").css("display", "flex");
  });

  var e = $(".slide-count"),
    o = $(".slider ");
  o.length &&
    (o.on("init reInit afterChange", function (t, o, i, a) {
      e.text((i || 0) + 1 + "/" + o.slideCount);
    }),
    o.slick({ infinite: !0, dots: !1, arrows: !0, autoplay: !1, autoplaySpeed: 3e3, fade: !0, fadeSpeed: 1e3 })),
    $(document).ready(function () {
      ScrollTrigger.defaults({ markers: !1 });
      var t = gsap.utils.toArray(".point"),
        e = gsap.utils.toArray(".indicator"),
        o = 100 * t.length;
      gsap.set(".indicators", { display: "flex" });
      var i = gsap.timeline({
        duration: t.length,
        scrollTrigger: { trigger: ".philosophie", start: "top center", end: "+=" + o + "%", scrub: !0, id: "points" },
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: ".philosophie .philosophie-slider",
          start: "top top",
          end: "+=" + o + "%",
          scrub: !0,
          pin: ".philosophie .philosophie-slider",
          pinSpacing: !0,
          id: "pinning",
          markers: !1,
        },
      }),
        t.forEach(function (o, a) {
          gsap.set(o, { position: "absolute", top: 0 }),
            i.to(e[a], { borderColor: "#E97777" }, a),
            i.from(o.querySelector(".slider-right"), { autoAlpha: 0 }, a),
            i.from(o.querySelector(".slider-left"), { color: "#313131", autoAlpha: 0, translateY: 100 }, a),
            i.addLabel("position-" + a),
            a != t.length - 1 &&
              (i.to(e[a], { borderColor: "#fff" }, a + 0.75),
              i.to(o.querySelector(".slider-left"), { autoAlpha: 0, translateY: -400 }, a + 0.75),
              i.to(o.querySelector(".slider-right"), { autoAlpha: 0 }, a + 0.75));
        }),
        e.forEach(function (t, e) {
          t.addEventListener("click", function () {
            gsap.to(window, { duration: 1, scrollTo: i.scrollTrigger.labelToScroll(`position-${e}`) });
          });
        });
    });
}),
  $(".nav-link").click(function () {
    $(".nav-link.show").length > 0 ? $("body").addClass("scroll-stop") : $("body").removeClass("scroll-stop");
  }),
  $(document).click(function () {
    $(".nav-link.show").length > 0 ? $("body").addClass("scroll-stop") : $("body").removeClass("scroll-stop");
  }),
  $(document).ready(function () {
    $(function () {
      $(".equalheight").matchHeight(),
        $(".equalheight1").matchHeight(),
        $(".equalheight2").matchHeight(),
        $(".equalheight3").matchHeight(),
        $(".equalheight4").matchHeight(),
        $(".equalheight5").matchHeight(),
        $(".equalheight6").matchHeight();
    });
  });
var out = !1;
$(".share-icon").click(function () {
  (out = !out),
    $(".social-open", this).toggleClass("d-none"),
    $(".social-close", this).toggleClass("d-block"),
    $(this).toggleClass("open"),
    !0 === out
      ? ($(".social-open").css({ left: "68px", top: "38px" }),
        $(".facebook-icon").css({ left: "0", top: "-48px" }),
        $(".instagram-icon").css({ left: "40px", top: "-38px" }),
        $(".twitter-icon").css({ left: "72px", top: "-16px" }),
        $(".linkedin-icon").css({ left: "86px", top: "17px" }))
      : $(".social-open, .facebook-icon, .instagram-icon, .twitter-icon, .linkedin-icon").css({
          left: "10px",
          bottom: "10px",
          top: "0",
        });
}),
  $(document).on("scroll", function () {
    $(".indicator").each(function (t) {
      let e = $(".indicator")[t],
        o = $(".indicator")[t - 1],
        i = $(".indicator")[t + 1];
      "border-color: rgb(233, 119, 119);" == $(".indicator")[t].attributes.style?.value &&
        (t > 0 && o.classList.remove("scrolled"),
        t < 2 && i.classList.remove("scrolled"),
        (t = 2),
        $(".indicator")[0].classList.remove("scrolled"),
        e.classList.add("scrolled"),
        $(".indicator").length == 4 && t < 3 && i.classList.remove("scrolled"));
    });
  }),
  (function () {
    let t = document.querySelector(".new_timeline.horizontal-slider-main");
    function e(t) {
      t?.addEventListener("wheel", (e) => {
        let o = e.deltaY;
        0 === t.scrollLeft && o < 0
          ? window.scrollBy({ bottom: -window.innerHeight })
          : t.scrollLeft === t.scrollWidth - t.clientWidth && o > 0
          ? window.scrollBy({ bottom: window.innerHeight, behavior: "smooth" })
          : ((t.scrollLeft += o), e.preventDefault());
      });
    }
    window.addEventListener("load", function () {
      e(t);
    }),
      e(t);
  })(),
  (function (t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "undefined" != typeof module && module.exports
      ? (module.exports = t(require("jquery")))
      : t(jQuery);
  })(function (t) {
    var e = -1,
      o = -1,
      i = function (t) {
        return parseFloat(t) || 0;
      },
      a = function (e) {
        var o = t(e),
          a = null,
          n = [];
        return (
          o.each(function () {
            var e = t(this),
              o = e.offset().top - i(e.css("margin-top")),
              r = n.length > 0 ? n[n.length - 1] : null;
            null === r ? n.push(e) : 1 >= Math.floor(Math.abs(a - o)) ? (n[n.length - 1] = r.add(e)) : n.push(e),
              (a = o);
          }),
          n
        );
      },
      n = function (e) {
        var o = { byRow: !0, property: "height", target: null, remove: !1 };
        return "object" == typeof e
          ? t.extend(o, e)
          : ("boolean" == typeof e ? (o.byRow = e) : "remove" === e && (o.remove = !0), o);
      },
      r = (t.fn.matchHeight = function (e) {
        var o = n(e);
        if (o.remove) {
          var i = this;
          return (
            this.css(o.property, ""),
            t.each(r._groups, function (t, e) {
              e.elements = e.elements.not(i);
            }),
            this
          );
        }
        return (
          (this.length <= 1 && !o.target) || (r._groups.push({ elements: this, options: o }), r._apply(this, o)), this
        );
      });
    (r.version = "0.7.0"),
      (r._groups = []),
      (r._throttle = 80),
      (r._maintainScroll = !1),
      (r._beforeUpdate = null),
      (r._afterUpdate = null),
      (r._rows = a),
      (r._parse = i),
      (r._parseOptions = n),
      (r._apply = function (e, o) {
        var s = n(o),
          l = t(e),
          c = [l],
          d = t(window).scrollTop(),
          u = t("html").outerHeight(!0),
          p = l.parents().filter(":hidden");
        return (
          p.each(function () {
            var e = t(this);
            e.data("style-cache", e.attr("style"));
          }),
          p.css("display", "block"),
          s.byRow &&
            !s.target &&
            (l.each(function () {
              var e = t(this),
                o = e.css("display");
              "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"),
                e.data("style-cache", e.attr("style")),
                e.css({
                  display: o,
                  "padding-top": "0",
                  "padding-bottom": "0",
                  "margin-top": "0",
                  "margin-bottom": "0",
                  "border-top-width": "0",
                  "border-bottom-width": "0",
                  height: "100px",
                  overflow: "hidden",
                });
            }),
            (c = a(l)),
            l.each(function () {
              var e = t(this);
              e.attr("style", e.data("style-cache") || "");
            })),
          t.each(c, function (e, o) {
            var a = t(o),
              n = 0;
            if (s.target) n = s.target.outerHeight(!1);
            else {
              if (s.byRow && a.length <= 1) return void a.css(s.property, "");
              a.each(function () {
                var e = t(this),
                  o = e.attr("style"),
                  i = e.css("display");
                "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                var a = { display: i };
                (a[s.property] = ""),
                  e.css(a),
                  e.outerHeight(!1) > n && (n = e.outerHeight(!1)),
                  o ? e.attr("style", o) : e.css("display", "");
              });
            }
            a.each(function () {
              var e = t(this),
                o = 0;
              (s.target && e.is(s.target)) ||
                ("border-box" !== e.css("box-sizing") &&
                  ((o += i(e.css("border-top-width")) + i(e.css("border-bottom-width"))),
                  (o += i(e.css("padding-top")) + i(e.css("padding-bottom")))),
                e.css(s.property, n - o + "px"));
            });
          }),
          p.each(function () {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null);
          }),
          r._maintainScroll && t(window).scrollTop((d / u) * t("html").outerHeight(!0)),
          this
        );
      }),
      (r._applyDataApi = function () {
        var e = {};
        t("[data-match-height], [data-mh]").each(function () {
          var o = t(this),
            i = o.attr("data-mh") || o.attr("data-match-height");
          e[i] = i in e ? e[i].add(o) : o;
        }),
          t.each(e, function () {
            this.matchHeight(!0);
          });
      });
    var s = function (e) {
      r._beforeUpdate && r._beforeUpdate(e, r._groups),
        t.each(r._groups, function () {
          r._apply(this.elements, this.options);
        }),
        r._afterUpdate && r._afterUpdate(e, r._groups);
    };
    (r._update = function (i, a) {
      if (a && "resize" === a.type) {
        var n = t(window).width();
        if (n === e) return;
        e = n;
      }
      i
        ? -1 === o &&
          (o = setTimeout(function () {
            s(a), (o = -1);
          }, r._throttle))
        : s(a);
    }),
      t(r._applyDataApi),
      t(window).bind("load", function (t) {
        r._update(!1, t);
      }),
      t(window).bind("resize orientationchange", function (t) {
        r._update(!0, t);
      });
  });

if ($("#progress").length > 0) {
  $(document).on("scroll", function () {
    var t = (100 * $(document).scrollTop()) / ($(document).height() - $(window).height());
    $("div#progress").css("width", t + "%"),
      $(".indicator").each(function (t) {
        let e = $(".indicator")[t],
          o = $(".indicator")[t - 1],
          i = $(".indicator")[t + 1];
        "border-color: rgb(233, 119, 119);" == $(".indicator")[t].attributes.style.value &&
          (t > 0 && o.classList.remove("scrolled"),
          t < 2 && i.classList.remove("scrolled"),
          (t = 2) && $(".indicator")[0].classList.remove("scrolled"),
          e.classList.add("scrolled"));
      });
  });
}

let abc = document.getElementsByClassName("banner-js");
for (var i = 0; i < abc.length; i++) {
  var src = abc[i].getAttribute("data-img-src");

  abc[i].style.backgroundImage = "url('" + src + "')";
}
