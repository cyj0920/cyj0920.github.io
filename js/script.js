/**
 * Kyle's Blog JavaScript
 * Features: Search, Share, TOC, Back to Top, Code Copy, Mobile Nav, Fancybox
 */

(function($) {
  'use strict';

  // ============================================
  // Search Functionality
  // ============================================
  var $searchWrap = $('#search-form-wrap');
  var isSearchAnim = false;
  var searchAnimDuration = 200;

  var startSearchAnim = function() {
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback) {
    setTimeout(function() {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-search-btn').on('click', function(e) {
    e.preventDefault();
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function() {
      $('.search-form-input').focus();
    });
  });

  // Close search on background click
  $searchWrap.on('click', function(e) {
    if (e.target === this) {
      $searchWrap.removeClass('on');
    }
  });

  // Close search on Escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $searchWrap.hasClass('on')) {
      $searchWrap.removeClass('on');
    }
  });

  // ============================================
  // Social Share
  // ============================================
  $('body')
    .on('click', function() {
      $('.article-share-box.on').removeClass('on');
    })
    .on('click', '.article-share-link', function(e) {
      e.stopPropagation();

      var $this = $(this);
      var url = $this.attr('data-url');
      var encodedUrl = encodeURIComponent(url);
      var id = 'article-share-box-' + $this.attr('data-id');
      var title = $this.attr('data-title') || document.title;
      var offset = $this.offset();

      if ($('#' + id).length) {
        var $box = $('#' + id);
        if ($box.hasClass('on')) {
          $box.removeClass('on');
          return;
        }
      } else {
        var html = [
          '<div id="' + id + '" class="article-share-box">',
            '<input class="article-share-input" value="' + url + '" readonly>',
            '<div class="article-share-links">',
              '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"><span class="fa fa-twitter"></span></a>',
              '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"><span class="fa fa-facebook"></span></a>',
              '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"><span class="fa fa-linkedin"></span></a>',
            '</div>',
          '</div>'
        ].join('');

        var $box = $(html);
        $('body').append($box);
      }

      $('.article-share-box.on').removeClass('on');

      $('#' + id).css({
        top: offset.top + 35,
        left: offset.left
      }).addClass('on');
    })
    .on('click', '.article-share-box', function(e) {
      e.stopPropagation();
    })
    .on('click', '.article-share-input', function() {
      $(this).select();
    });

  // ============================================
  // Table of Contents (TOC)
  // ============================================
  function generateTOC() {
    var $article = $('.article-entry');
    if (!$article.length) return;

    var $headings = $article.find('h2, h3');
    if ($headings.length < 2) return;

    var tocHtml = '<div id="toc-wrap"><div id="toc-title">目录</div><ul id="toc">';
    var headingCount = 0;

    $headings.each(function() {
      var $heading = $(this);
      var level = parseInt($heading.prop('tagName').charAt(1));
      var text = $heading.text();
      var id = 'heading-' + headingCount++;

      $heading.attr('id', id);
      tocHtml += '<li class="toc-level-' + level + '"><a href="#' + id + '" data-target="#' + id + '">' + text + '</a></li>';
    });

    tocHtml += '</ul></div>';
    $('body').append(tocHtml);

    setTimeout(function() {
      $('#toc-wrap').addClass('visible');
    }, 100);

    // Smooth scroll
    $('#toc').on('click', 'a', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');
      var $target = $(target);
      
      if ($target.length) {
        var offset = $target.offset().top - 80;
        $('html, body').animate({
          scrollTop: offset
        }, 400);
      }
    });

    // Highlight current section
    var headingPositions = [];
    
    function updateHeadingPositions() {
      headingPositions = [];
      $headings.each(function() {
        var $heading = $(this);
        headingPositions.push({
          id: $heading.attr('id'),
          top: $heading.offset().top - 100
        });
      });
    }

    function highlightCurrentHeading() {
      var scrollTop = $(window).scrollTop();
      var currentId = null;

      for (var i = headingPositions.length - 1; i >= 0; i--) {
        if (scrollTop >= headingPositions[i].top) {
          currentId = headingPositions[i].id;
          break;
        }
      }

      if (currentId) {
        $('#toc a').removeClass('active');
        $('#toc a[href="#' + currentId + '"]').addClass('active');
      }
    }

    updateHeadingPositions();

    var ticking = false;
    $(window).on('scroll.toc', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          highlightCurrentHeading();
          ticking = false;
        });
        ticking = true;
      }
    });

    $(window).on('resize.toc', function() {
      updateHeadingPositions();
      highlightCurrentHeading();
    });
  }

  if ($('.article-entry').length && $('.article-entry h2, .article-entry h3').length >= 2) {
    generateTOC();
  }

  // ============================================
  // Back to Top Button
  // ============================================
  function initBackToTop() {
    var $btn = $('<button id="back-to-top" title="返回顶部">↑</button>');
    $('body').append($btn);

    var toggleVisible = function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 300) {
        $btn.addClass('visible');
      } else {
        $btn.removeClass('visible');
      }
    };

    var ticking = false;
    $(window).on('scroll.backtotop', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          toggleVisible();
          ticking = false;
        });
        ticking = true;
      }
    });

    $btn.on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
    });
  }

  initBackToTop();

  // ============================================
  // Code Copy Button
  // ============================================
  function initCodeCopy() {
    $('.article-entry pre, .article-entry .highlight').each(function() {
      var $pre = $(this);
      var $btn = $('<button class="code-copy-btn">复制</button>');
      
      $btn.on('click', function() {
        var code = $pre.find('code').text() || $pre.text();
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(function() {
            $btn.text('已复制!');
            setTimeout(function() {
              $btn.text('复制');
            }, 2000);
          }).catch(function() {
            $btn.text('失败');
            setTimeout(function() {
              $btn.text('复制');
            }, 2000);
          });
        } else {
          var $textarea = $('<textarea>').val(code).appendTo('body').select();
          try {
            document.execCommand('copy');
            $btn.text('已复制!');
          } catch (err) {
            $btn.text('失败');
          }
          $textarea.remove();
          setTimeout(function() {
            $btn.text('复制');
          }, 2000);
        }
      });

      $pre.append($btn);
    });
  }

  initCodeCopy();

  // ============================================
  // Image Lightbox (Fancybox)
  // ============================================
  $('.article-entry').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt || '';
      if (alt) {
        $(this).after('<span class="caption">' + alt + '</span>');
      }

      $(this).wrap('<a href="' + this.src + '" data-fancybox="gallery" data-caption="' + alt + '"></a>');
    });

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox({
      buttons: ['zoom', 'slideShow', 'fullScreen', 'download', 'close'],
      loop: true,
      protect: true
    });
  }

  // ============================================
  // Mobile Navigation
  // ============================================
  var $container = $('#container');
  var isMobileNavAnim = false;
  var mobileNavAnimDuration = 200;

  var startMobileNavAnim = function() {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function() {
    setTimeout(function() {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('#main-nav-toggle').on('click', function(e) {
    e.preventDefault();
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  // Close mobile nav when clicking on overlay
  $(document).on('click', function(e) {
    if ($container.hasClass('mobile-nav-on') && !$(e.target).closest('#mobile-nav').length && !$(e.target).is('#main-nav-toggle')) {
      $container.removeClass('mobile-nav-on');
    }
  });

  // Close mobile nav when clicking a link
  $('#mobile-nav a').on('click', function() {
    $container.removeClass('mobile-nav-on');
  });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  $('a[href^="#"]').on('click', function(e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 400);
    }
  });

  // ============================================
  // External Links Open in New Tab
  // ============================================
  $('.article-entry a').each(function() {
    var href = $(this).attr('href');
    if (href && href.indexOf('http') === 0 && href.indexOf(location.hostname) === -1) {
      $(this).attr('target', '_blank').attr('rel', 'noopener noreferrer');
    }
  });

  // ============================================
  // Initialize
  // ============================================
  $(document).ready(function() {
    $('body').addClass('loaded');
  });

})(jQuery);