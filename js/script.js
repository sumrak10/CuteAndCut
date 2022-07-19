document.addEventListener("DOMContentLoaded", () => {
    window.animationTicks = {
        tick1: 0,
        rotateSubmitButton: 0
      };

    document.getElementById("submit").addEventListener("click", () => {
        if (document.getElementById("submit").classList.contains("cut-url")) {
            var re = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
            if (re.test(document.getElementById("url").value)){
                var req = getXmlHttp();
                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        if(req.status == 200) {
                            // success
                            document.getElementById("url").value = req.responseText;
                            document.getElementById("submit-icon").src = "static/copy.svg";
                            document.getElementById("submit").classList.remove("cut-url");
                            document.getElementById("submit").classList.add("copy-url");
                            rotateSubmitButton();
                        } else {
                            // error
                            console.log("error");
                        }
                    }
                }
                req.open('POST', 'cuteurl.php'); 
                var data = new FormData();
                data.append("url",document.getElementById("url").value);
                req.send(data);
            } else {
                animate(50,4,() => {
                    if (window.animationTicks.tick1 % 2){
                        document.getElementById("url").style.transform = "rotate(1deg)";
                    } else {
                        document.getElementById("url").style.transform = "rotate(-1deg)";
                    }
                    window.animationTicks.tick1++;
                }, () => {
                    document.getElementById("url").style.transform = "rotate(0deg)";
                    window.animationTicks.tick1 = 0;
                });
            }
        } else if (document.getElementById("submit").classList.contains("copy-url")) {
            let url = document.getElementById("url");
            url.select();    
            document.execCommand("copy");
            let txt = document.getElementById("url").value;
            document.getElementById("url").value = "";
            document.getElementById("url").value = txt;

            document.getElementsByClassName("copytoclipboard")[0].style.display = "flex";
            document.getElementsByClassName("copytoclipboard")[0].style.filter = "opacity(1)";
            setTimeout(() => { document.getElementsByClassName("copytoclipboard")[0].style.filter = "opacity(0)"; }, 1000);
            setTimeout(() => { document.getElementsByClassName("copytoclipboard")[0].style.display = "none"; }, 1000);
            
            rotateSubmitButton();

            document.getElementById("submit-icon").src = "static/clear.svg";
            document.getElementById("submit").classList.remove("copy-url");
            document.getElementById("submit").classList.add("clear-url");
        } else if (document.getElementById("submit").classList.contains("clear-url")) {
            document.getElementById("url").value = "";
            rotateSubmitButton();
            document.getElementById("submit-icon").src = "static/cut.svg";
            document.getElementById("submit").classList.remove("clear-url");
            document.getElementById("submit").classList.add("cut-url");
        }
    });
});
function rotateSubmitButton() {
    if (window.animationTicks.rotateSubmitButton == 0) {
        document.getElementById("submit").style.transform = "rotate(360deg)";
        window.animationTicks.rotateSubmitButton = 360;
    } else {
        document.getElementById("submit").style.transform = "rotate(0deg)";
        window.animationTicks.rotateSubmitButton = 0;
    }
}
function animate(interval,times, func, endfunc) {
    func();
    let timerId = setInterval(() => (func()), interval);
    setTimeout(() => { clearInterval(timerId)}, interval*(times-1));
    setTimeout(() => { endfunc(); }, interval*times);
}
function getXmlHttp(){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}