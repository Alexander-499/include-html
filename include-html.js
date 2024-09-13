function includeHTML() {
  var z, i, element, file, xmlHttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    element = z[i];
    file = element.getAttribute("data-include");
    if (file) {
      xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) { element.innerHTML = this.responseText; }
          if (this.status == 404) { element.innerHTML = "Page not found."; }
          element.removeAttribute("data-include");
          includeHTML();
          document.dispatchEvent(new Event('html-included')); // Trigger custom event
        }
      }
      xmlHttp.open("GET", file, true);
      xmlHttp.send();
      return;
    }
  }
}

includeHTML();