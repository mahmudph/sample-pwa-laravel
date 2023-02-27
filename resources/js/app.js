import "./bootstrap";
import "./registerSW";
import Jquery from "jquery";
import dt from "datatables.net";
import selet2 from "select2";

import "bootstrap";

window.$ = Jquery;
window.jQuery = Jquery;
window.$.DataTable = dt;
window.$.select2 = selet2;
selet2();
