this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!DOCTYPE html>\n<html>\n<head>\n    <title>Login</title>\n    <meta charset="UTF-8">\n    <meta name="description" content="" />\n    <meta name="keywords" content="" />\n    <link rel="stylesheet" href="style.css">\n    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\n</head>\n<body>\n    <div class="header">\n        Busqueda\n    </div>\n    <div class="content">\n        <form method="GET" action="http://127.0.0.1:1337/user">\n            <div>\n                <input type="search" name="name" placeholder="Buscar..." required/>\n            </div>\n            <div>\n                <input type="number" name="age" placeholder="Edad" required/>\n            </div>\n            <div>\n                <input type="tel" name="phone" placeholder="Telefono" required/>\n            </div>\n            \n            <span class="vaciar">\n                <input type="reset" value="Vaciar">\n            </span>\n            <span class="boton">\n                <input type="submit" value="Buscar">\n            </span>\n        </form>\n    </div>\n    <div class="footer">\n        Made with &lt;3 from CABA\n    </div>\n    <script type="text/javascript">\n        $("form").submit(function(e){\n           var promise = $.getJSON(this.action,this.serialize, function(resp){\n               console.log(resp);\n           });\n           return false;\n        });\n    </script>\n</body>\n</html>\n';

}
return __p
};
