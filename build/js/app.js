(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = (window.$);

/**
 * svganimations.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
    var docElem = window.document.documentElement;
	
	var svgs = Array.prototype.slice.call( document.querySelectorAll( '.line-drawing' ) );

    window.requestAnimFrame = function(){
        return (
            window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback){
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();

    window.cancelAnimFrame = function(){
        return (
            window.cancelAnimationFrame       || 
            window.webkitCancelAnimationFrame || 
            window.mozCancelAnimationFrame    || 
            window.oCancelAnimationFrame      || 
            window.msCancelAnimationFrame     || 
            function(id){
                window.clearTimeout(id);
            }
        );
    }();

    function SVGEl( el ) {
        this.el = el;
        // this.image = this.el.previousElementSibling;
        this.current_frame = 0;
        this.total_frames = 300;
        this.path = [];
        this.length = [];
        this.handle = 0;
        this.init();
    }

    SVGEl.prototype.init = function() {
        var self = this;
        [].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
            self.path[i] = path;
            var l = self.path[i].getTotalLength();
            self.length[i] = l;
            self.path[i].style.strokeDasharray = l + ' ' + l; 
            self.path[i].style.strokeDashoffset = l;
        } );
    };

    SVGEl.prototype.render = function() {
        if( this.rendered ) return;
        this.rendered = true;
        this.draw();
    };

    SVGEl.prototype.draw = function() {
        var self = this,
            progress = this.current_frame/this.total_frames;
        if (progress > 1) {
            window.cancelAnimFrame(this.handle);
            $('.container').addClass('filled');
        } else {
            this.current_frame++;
            for(var j=0, len = this.path.length; j<len;j++){
                this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
            }
            this.handle = window.requestAnimFrame(function() { self.draw(); });
        }
    };

    function getViewportH() {
        var client = docElem.clientHeight,
            inner = window.innerHeight;
         
        if( client < inner )
            return inner;
        else
            return client;
    }
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
 
    // http://stackoverflow.com/a/5598797/989439
    function getOffset( el ) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if ( !isNaN( el.offsetTop ) ) {
                offsetTop += el.offsetTop;
            }
            if ( !isNaN( el.offsetLeft ) ) {
                offsetLeft += el.offsetLeft;
            }
        } while ( el = el.offsetParent );
 
        return {
            top : offsetTop,
            left : offsetLeft
        };
    }
 
    function inViewport( el, h ) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom = elTop + elH;
            // if 0, the element is considered in the viewport as soon as it enters.
            // if 1, the element is considered in the viewport only when it's fully inside
            // value in percentage (1 >= h >= 0)
            h = h || 0;
 
        return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
    }
    
    function init() {
		var svgArr = [];

        // the svgs already shown...
        svgs.forEach( function( el, i ) {
            var svg = new SVGEl( el );
            svgArr[i] = svg;
            setTimeout(function( el ) {
                return function() {
                    if( inViewport( el.parentNode ) ) {
                        svg.render();
                    }
                };
            }( el ), 250 ); 
        } );
    }

    init();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9EbWl0cnkvcHJvamVjdHMvZml2ZXNwYWNlL2FuaW0tc3ZnL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL0RtaXRyeS9wcm9qZWN0cy9maXZlc3BhY2UvYW5pbS1zdmcvc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh3aW5kb3cuJCk7XG5cbi8qKlxuICogc3ZnYW5pbWF0aW9ucy5qcyB2MS4wLjBcbiAqIGh0dHA6Ly93d3cuY29kcm9wcy5jb21cbiAqXG4gKiB0aGUgc3ZnIHBhdGggYW5pbWF0aW9uIGlzIGJhc2VkIG9uIGh0dHA6Ly8yNHdheXMub3JnLzIwMTMvYW5pbWF0aW5nLXZlY3RvcnMtd2l0aC1zdmcvIGJ5IEJyaWFuIFN1ZGEgKEBicmlhbnN1ZGEpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqIFxuICogQ29weXJpZ2h0IDIwMTMsIENvZHJvcHNcbiAqIGh0dHA6Ly93d3cuY29kcm9wcy5jb21cbiAqL1xuICAgIHZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0XG5cdHZhciBzdmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcubGluZS1kcmF3aW5nJyApICk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8IFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHwgXG4gICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8IFxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fCBcbiAgICAgICAgICAgIGZ1bmN0aW9uKC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9KCk7XG5cbiAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSAgICAgICB8fCBcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcbiAgICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSAgICB8fCBcbiAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICB8fCBcbiAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lICAgICB8fCBcbiAgICAgICAgICAgIGZ1bmN0aW9uKGlkKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9KCk7XG5cbiAgICBmdW5jdGlvbiBTVkdFbCggZWwgKSB7XG4gICAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgICAgLy8gdGhpcy5pbWFnZSA9IHRoaXMuZWwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5jdXJyZW50X2ZyYW1lID0gMDtcbiAgICAgICAgdGhpcy50b3RhbF9mcmFtZXMgPSAzMDA7XG4gICAgICAgIHRoaXMucGF0aCA9IFtdO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IFtdO1xuICAgICAgICB0aGlzLmhhbmRsZSA9IDA7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIFNWR0VsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgW10uc2xpY2UuY2FsbCggdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCAncGF0aCcgKSApLmZvckVhY2goIGZ1bmN0aW9uKCBwYXRoLCBpICkge1xuICAgICAgICAgICAgc2VsZi5wYXRoW2ldID0gcGF0aDtcbiAgICAgICAgICAgIHZhciBsID0gc2VsZi5wYXRoW2ldLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgICAgICBzZWxmLmxlbmd0aFtpXSA9IGw7XG4gICAgICAgICAgICBzZWxmLnBhdGhbaV0uc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gbCArICcgJyArIGw7IFxuICAgICAgICAgICAgc2VsZi5wYXRoW2ldLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBsO1xuICAgICAgICB9ICk7XG4gICAgfTtcblxuICAgIFNWR0VsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoIHRoaXMucmVuZGVyZWQgKSByZXR1cm47XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9O1xuXG4gICAgU1ZHRWwucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRfZnJhbWUvdGhpcy50b3RhbF9mcmFtZXM7XG4gICAgICAgIGlmIChwcm9ncmVzcyA+IDEpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltRnJhbWUodGhpcy5oYW5kbGUpO1xuICAgICAgICAgICAgJCgnLmNvbnRhaW5lcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9mcmFtZSsrO1xuICAgICAgICAgICAgZm9yKHZhciBqPTAsIGxlbiA9IHRoaXMucGF0aC5sZW5ndGg7IGo8bGVuO2orKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRoW2pdLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBNYXRoLmZsb29yKHRoaXMubGVuZ3RoW2pdICogKDEgLSBwcm9ncmVzcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oYW5kbGUgPSB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbigpIHsgc2VsZi5kcmF3KCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFZpZXdwb3J0SCgpIHtcbiAgICAgICAgdmFyIGNsaWVudCA9IGRvY0VsZW0uY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgaW5uZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICBcbiAgICAgICAgaWYoIGNsaWVudCA8IGlubmVyIClcbiAgICAgICAgICAgIHJldHVybiBpbm5lcjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGNsaWVudDtcbiAgICB9XG4gXG4gICAgZnVuY3Rpb24gc2Nyb2xsWSgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcDtcbiAgICB9XG4gXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTU5ODc5Ny85ODk0MzlcbiAgICBmdW5jdGlvbiBnZXRPZmZzZXQoIGVsICkge1xuICAgICAgICB2YXIgb2Zmc2V0VG9wID0gMCwgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICggIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gZWwub2Zmc2V0VG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAhaXNOYU4oIGVsLm9mZnNldExlZnQgKSApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGVsLm9mZnNldExlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKCBlbCA9IGVsLm9mZnNldFBhcmVudCApO1xuIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wIDogb2Zmc2V0VG9wLFxuICAgICAgICAgICAgbGVmdCA6IG9mZnNldExlZnRcbiAgICAgICAgfTtcbiAgICB9XG4gXG4gICAgZnVuY3Rpb24gaW5WaWV3cG9ydCggZWwsIGggKSB7XG4gICAgICAgIHZhciBlbEggPSBlbC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxlZCA9IHNjcm9sbFkoKSxcbiAgICAgICAgICAgIHZpZXdlZCA9IHNjcm9sbGVkICsgZ2V0Vmlld3BvcnRIKCksXG4gICAgICAgICAgICBlbFRvcCA9IGdldE9mZnNldChlbCkudG9wLFxuICAgICAgICAgICAgZWxCb3R0b20gPSBlbFRvcCArIGVsSDtcbiAgICAgICAgICAgIC8vIGlmIDAsIHRoZSBlbGVtZW50IGlzIGNvbnNpZGVyZWQgaW4gdGhlIHZpZXdwb3J0IGFzIHNvb24gYXMgaXQgZW50ZXJzLlxuICAgICAgICAgICAgLy8gaWYgMSwgdGhlIGVsZW1lbnQgaXMgY29uc2lkZXJlZCBpbiB0aGUgdmlld3BvcnQgb25seSB3aGVuIGl0J3MgZnVsbHkgaW5zaWRlXG4gICAgICAgICAgICAvLyB2YWx1ZSBpbiBwZXJjZW50YWdlICgxID49IGggPj0gMClcbiAgICAgICAgICAgIGggPSBoIHx8IDA7XG4gXG4gICAgICAgIHJldHVybiAoZWxUb3AgKyBlbEggKiBoKSA8PSB2aWV3ZWQgJiYgKGVsQm90dG9tKSA+PSBzY3JvbGxlZDtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcblx0XHR2YXIgc3ZnQXJyID0gW107XG5cbiAgICAgICAgLy8gdGhlIHN2Z3MgYWxyZWFkeSBzaG93bi4uLlxuICAgICAgICBzdmdzLmZvckVhY2goIGZ1bmN0aW9uKCBlbCwgaSApIHtcbiAgICAgICAgICAgIHZhciBzdmcgPSBuZXcgU1ZHRWwoIGVsICk7XG4gICAgICAgICAgICBzdmdBcnJbaV0gPSBzdmc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCBlbCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBpblZpZXdwb3J0KCBlbC5wYXJlbnROb2RlICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdmcucmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSggZWwgKSwgMjUwICk7IFxuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgaW5pdCgpOyJdfQ==
