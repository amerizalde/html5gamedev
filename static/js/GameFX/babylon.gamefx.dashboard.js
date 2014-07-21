var BABYLON;
(function (BABYLON) {
    (function (GameFX) {
        // Display HTML elements on top of canvas game
        var Dashboard = (function () {
            var that;
            function Dashboard() {
                that = this;
                this.renderCanvas = document.getElementById("renderCanvas");
                if (this.renderCanvas != null) {
                    this.renderCanvas.style.display = "none";
                }
                this.loadingText = document.getElementById("loadingText");
                if (this.loadingText != null) {
                    this.loadingText.style.webkitTransform = "translateX(0px)";
                    this.loadingText.style.transform = "translateX(0px)";
                }
            }

            Dashboard.prototype.loading = function (evt) {
                if (that.loadingText != null) {
                    that.loadingText.innerHTML = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";
                }
                
            };
            
            Dashboard.prototype.endGame = function () {
                if (that.loadingText != null) {
                    that.loadingText.innerHTML = "End Game";
                    that.loadingText.style.webkitTransform = "translateX(0px)";
                    that.loadingText.style.transform = "translateX(0px)";
                }
                if (that.renderCanvas != null) {
                    that.renderCanvas.style.display = "none";
                }
            }


            Dashboard.prototype.endLoading = function () {
                if (that.loadingText != null) {
                    that.loadingText.style.webkitTransform = "";
                    that.loadingText.style.transform = "";
                }
                if (that.renderCanvas != null) {
                    that.renderCanvas.style.display = "block";
                }
            }

            return Dashboard;
        })()
        GameFX.Dashboard = Dashboard;
    })(BABYLON.GameFX || (BABYLON.GameFX = {}));
    var GameFX = BABYLON.GameFX;
})(BABYLON || (BABYLON = {}));
