var _ = function(param) {
        return document.getElementById(param);
};

window.addEventListener("DOMContentLoaded", function() {
    // animates the circle
    var circle = document.getElementById('circle');
    var X = 0;  // animation parameters
    var Y = 0;

    setInterval(
        function() {
            X += .04;
            Y += .05;
            circle.style.top = Math.sin(Math.sin(X)*4)*13 + "px";
            circle.style.right  = Math.sin(Math.sin(Y)*4)*5 + "px";
        }, 20
    );

    _("calcularFactorialLento").addEventListener("click", function(){
        performance.mark("inicio");
        var fib = function(num) {
            var result = 0;
            if (num < 2) {
                result = num;
            } else {
                result = fib(num-1) + fib(num-2);
            }

            return result;
        }
        _("result").innerHTML = "El resultado es: " + fib(_("factorialDe").value);
        performance.mark("fin");
        performance.measure("tiempo", "inicio", "fin");
        console.log(performance.getEntriesByType("mark"));



    });

    _("calcularFactorialRapido").addEventListener("click",function(){
        var myWorker = new Worker("unaTareaPesada.js");

        myWorker.onmessage = function (oEvent) {
          _("result").innerHTML = "El resultado es: " + oEvent.data;
        };

        myWorker.postMessage(_("factorialDe").value);
    });
}, false);
