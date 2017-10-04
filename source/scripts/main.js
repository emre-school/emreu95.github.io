console.log("Hey");

//source: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

function openModal(){
    tray.classList.remove("invisible");
}

function closeModal(){
    tray.classList.add("invisible");
}


/* smooth scrolling inspired form: https://github.com/callmecavs/jump.js/tree/9152ba0a314645e3d3676361e215cf949cec9a23/src */
class Jump {

    jump(target, options = {duration: 500}) {
        this.start = window.pageYOffset;

        this.options = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || function (t, b, c, d) {
                // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        };

        this.distance = typeof target === 'string'
            ? this.options.offset + document.querySelector(target).getBoundingClientRect().top
            : target;

        this.duration = typeof this.options.duration === 'function'
            ? this.options.duration(this.distance)
            : this.options.duration;

        requestAnimationFrame(time => this._loop(time))
    }

    _loop(time) {
        if (!this.timeStart) {
            this.timeStart = time
        }

        this.timeElapsed = time - this.timeStart;
        this.next = this.options.easing(this.timeElapsed, this.start, this.distance, this.duration);

        window.scrollTo(0, this.next);

        this.timeElapsed < this.duration
            ? requestAnimationFrame(time => this._loop(time))
            : this._end();
    }

    _end() {
        window.scrollTo(0, this.start + this.distance);

        typeof this.options.callback === 'function' && this.options.callback();
        this.timeStart = false;
    }
}

window.onload = function () {
    var tray = document.getElementById('tray');

    document.getElementById("modalClick").addEventListener("click", openModal);

    document.getElementsByClassName("close")[0].addEventListener("click", closeModal);

    const navLib = new Jump();

    Array.from(document.getElementsByClassName("navLink")).forEach((link) => {
        console.log("hi");
        link.onclick = () => {
            let options = {
                duration: 500
            };
            navLib.jump(link.getAttribute("href"), options);
            return false;
        };
    });

    var paths = ['assets/1.jpg', 'assets/2.jpg', 'assets/3.jpg'];
    var index = 0;
    var carousel = document.getElementById("carouselImage");
    var prevButt = document.getElementById("carousel-previous");
    var nextButt = document.getElementById("carousel-next");

    function renderImage(){
      var path = paths[index.mod(paths.length)];
      carousel.setAttribute("src", path);
    }
    renderImage();
    prevButt.addEventListener("click",() => {index--; renderImage();})
    nextButt.addEventListener("click",() => {index++; renderImage();})
}

window.addEventListener("scroll", () => {
    let adventures = document.getElementById("portrait1"), adventuresLink = document.getElementById("mc");
    let video = document.getElementById("videoTray"), videoLink = document.getElementById("vt");
    let carousel = document.getElementById("carouseltray"), carouselLink = document.getElementById("ct");
    let contact = document.getElementById("carousel-next"), contactLink = document.getElementById("ft");
    let removeAllHighlights = () => {
        adventuresLink.classList.remove("loca");
        videoLink.classList.remove("loca");
        carouselLink.classList.remove("loca");
        contactLink.classList.remove("loca");
    };

    if (adventures.getBoundingClientRect().bottom > 0)  {
        removeAllHighlights();
        adventureLink.classList.add("loca");
    } else if (video.getBoundingClientRect().bottom > 0)  {
        removeAllHighlights();
        videoLink.classList.add("loca");
    } else if (carousel.getBoundingClientRect().bottom > 0)  {
        removeAllHighlights();
        carouselLink.classList.add("loca");
    } else if (contact.getBoundingClientRect().bottom > 0)  {
        removeAllHighlights();
        contactLink.classList.add("loca");
    }
});