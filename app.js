// Our constructor function
var Flipper = function() {
    function Flipper(node, currentTime, nextTime) {
          this.isFlipping = false;
          this.duration = 600;
          this.flipNode = node;
          this.frontNode = node.querySelector(".front"); // Gets the front element
          this.backNode = node.querySelector(".back"); // Gets the back element
          this.setFrontTime(currentTime); // Our methods 
          this.setBackTime(nextTime); // Method
    }
    Flipper.prototype.setFrontTime = function (time) {
        this.frontNode.dataset.number = time;
    };
    Flipper.prototype.setBackTime = function (time) {
        this.backNode.dataset.number = time; 
    };
    Flipper.prototype.flipDown = function (currentTime, nextTime) {
        var _this = this;

        if (this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add("running");
        setTimeout(function() {
            _this.flipNode.classList.remove("running");
            _this.isFlipping = false;
            _this.setFrontTime(nextTime);

        }, this.duration)
    };
    return Flipper;
}();

var getTimeFromDate = function (date) {
    return date.toTimeString().slice(0, 8).split(":").join("");
};


// Our Count 
var flips = document.querySelectorAll(".flip");
var now = new Date();
var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
var nextTimeStr = getTimeFromDate(now);
var Flippers = Array.from(flips).map(function(flip, i) { // Grabs all Flips
    return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]);
})
setInterval(function() {
    var now = new Date();
    var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    var nextTimeStr = getTimeFromDate(now);

    for (var i = 0; i < Flippers.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]){
            continue;
        }
        Flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
}, 1000);