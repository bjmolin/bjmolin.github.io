(function() {
    window.myFunction = function() {
        var menu = document.getElementById("mobileMenu");
        if (!menu) return;
        if (menu.classList.contains("w3-show")) {
            menu.classList.remove("w3-show");
            menu.classList.add("w3-hide");
        } else {
            menu.classList.remove("w3-hide");
            menu.classList.add("w3-show");
        }
    };

    function setupOutsideClose() {
        if (window._navOutsideSetup) return;
        window._navOutsideSetup = true;

        document.addEventListener("click", function(event) {
            var nav = document.getElementById("navi");
            var menu = document.getElementById("mobileMenu");
            if (!nav || !menu) return;
            if (!nav.contains(event.target) && menu.classList.contains("w3-show")) {
                menu.classList.remove("w3-show");
                menu.classList.add("w3-hide");
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupOutsideClose);
    } else {
        setupOutsideClose();
    }
})();