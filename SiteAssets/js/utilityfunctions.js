var CKO = CKO || {};
CKO.FORMS = CKO.FORMS || {};
CKO.CSOM = CKO.CSOM || {};
CKO.CSOM.TERMSETS = CKO.CSOM.TERMSETS || {};
CKO.REST = CKO.REST || {};
CKO.GLOBAL = CKO.GLOBAL || {};
CKO.GLOBAL.ACTIONS = CKO.GLOBAL.ACTIONS || {};
CKO.GLOBAL.VARIABLES = CKO.GLOBAL.VARIABLES || {};
var SLASH = "/";
var test = null;
var user, ctxz, web, list;
var parr = [];
var farr = [];
var filearray = [];
var dsn;

CKO.GLOBAL.VARIABLES = {
    SLASH: "/",
    response: [],
    waitdlg: null, // potential use of different notification mechanism
    status: null, // potential use of different notification mechanism
    controlnumber: null,  // Used for passing a control number in your functions.
    sitecollection: null,
    data: null,
    json: null,
    total: 0,
    count: 0,
    currentuser: { // used to staore data for logged in user
        id: null,
        login: null,
        org: null,
        type: null
    }
}

$(document).ready(function () {
    tp1 = new String(window.location.protocol);
    tp2 = new String(window.location.host);
    tp3 = new String(window.location.pathname);
    test = new String(window.location);
    if (test.indexOf('Lists/Recommendations') > 0) {
        $("#idHomePageNewItem").attr('onclick', '').attr('href', '').click(function (e) {
            e.preventDefault();
            zurl = fixurl('/Pages/NewRecommendation.aspx?IsDlg=1');
            window.location = zurl;
        });
        $(".ms-itmhover").each(function (e) {
            $(this).find("td.ms-vb-icon").find("a").attr("onclick", "").addClass("editLink");
        });
        $(".editLink").on("click", function (e) {
            e.preventDefault();
            tp4 = String($(this).attr("href"));
            tp4 = tp4.substring(tp4.indexOf("ID="));
            tp4 = tp4.split("=");
            zurl = fixurl('/Lists/Recommendations/EditForm.aspx?ID=' + tp4[1] + '&IsDlg=1');
            CKODialog(zurl, 'Edit Recommendation', '1100', '800', 'NotificationCallback');
        });
    }
    if (test.indexOf("ako") > 0) {
        $("#searchcontainer").hide();
        $(".navbar-right").hide();
    }
});

function logit(msg) { // global console logging function
    if (typeof console != "undefined") {
        console.log(msg + " AT: " + new Date());
    }
}

function EncodeHTML(str) {
    return String(str).replace(/"/g, '&quot;').replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function DecodeHTML(str) {
    return String(str).replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

// jQuery plugin to read data passed in a querystring
(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

/*
* SPSTools_Notify ---- Notification Module
* Version 1.0.0
* Requires jQuery 1.7.1 or greater
* Copyright (c) 2011 Daniel Walker
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

    // String constants
    var SLASH = "/";
    var loctest, bcss, cx, cy, ptop, pleft;
    var tp0, tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8, tp9; // Various tmeporary variables
    //var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';
    var pos = 'fixed';
    var dx = 320;
    var dy = 320;
    var zidx = 5000;
    var defaultcss = "position:absolute;background:#ffffff;width:350px;height:120px;padding:10px;color:#000000;font-size:16px;text-align:center;vertical-align:middle;display:none;";

    $.fn.SPSTools_Notify = function (options) {
        var notifyopts = $.extend({}, defaults, options);
        zidx += 1;
        switch (notifyopts.type) {
            case "markerinfo":

                break;

            case "fadealert": //========================================================================================== Alert ========
                $("#SPSTools_Notify").html("").append(notifyopts.content);
                var height = $("#SPSTools_Notify").height();
                var width = $("#SPSTools_Notify").width();
                var lv = cx - (width / 2) + "px";
                var tv = cy - (height / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #ffff00 solid', left: lv, top: tv }).show().click(function () {
                    $(this).fadeOut("3500", function () {
                        $(this).html("");
                    });
                });
                break;

            case 'okalert':
                var ahtml = '<div id="okalert"><div class="panel panel-warning">';
                ahtml += '<div class="panel-heading" style="display: flex; justify-content: center;"><h3 class="panel-title">ALERT</h3></div>';
                ahtml += '<div class="panel-body">' + notifyopts.content + '</div>';
                ahtml += '<div class="panel-footer" style="display: flex; justify-content: center;"><input type="button" value="OK" id="alert_ok"/></div></div></div>';
                $("#SPSTools_Notify").html("").append(ahtml);
                $("#alert_ok").click(function () {
                    $("#SPSTools_Notify").fadeOut("2000", function () { $(this).html(""); });
                });
                var height = $("#SPSTools_Notify").height();
                var width = $("#SPSTools_Notify").width();
                var lv = cx - (width / 2) + "px";
                var tv = cy - (height / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #000000 solid', left: lv, top: tv }).show();
                break;

            case 'choice':
                $("#SPSTools_Notify").html("").append(notifyopts.content);
                for (i = 0; i < notifyopts.buttons.length; i++) {
                    $("#SPSTools_Notify").append("<input type='button' value='" + notifyopts.buttons[i] + "' id='btn_" + i + "'/>&nbsp;");
                    $("#btn_" + i).click(function () {
                        notifyopts.selbutton = $(this).val();
                        $("#SPSTools_Notify").fadeOut("500", function () { $(this).html(""); notifyopts.callback(notifyopts.selbutton); });
                    });
                }
                h = $("#SPSTools_Notify").height();
                w = $("#SPSTools_Notify").width();
                lv = cx - (w / 2) + "px";
                tv = cy - (h / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #000000 solid', left: lv, top: tv }).show();
                break;

            case 'yesno':
                $("#SPSTools_Notify").html("").append(notifyopts.content);
                $("#SPSTools_Notify").append("<input type='button' class='btn btn-success' value='Yes' id='alert_yes'/>&nbsp;<input type='button' class='btn btn-danger' value='No' id='alert_no'/>");
                $("#alert_yes").click(function () {
                    $("#SPSTools_Notify").fadeOut("4000", function () { $(this).html(""); notifyopts.callback("Yes"); });
                });
                $("#alert_no").click(function () {
                    $("#SPSTools_Notify").fadeOut("4000", function () { $(this).html(""); notifyopts.callback("No"); });
                });
                var height = $("#SPSTools_Notify").height();
                var width = $("#SPSTools_Notify").width();
                var lv = cx - (width / 2) + "px";
                var tv = cy - (height / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #000000 solid', left: lv, top: tv }).show();
                break;

            case 'XML':
                $("#SPSTools_Notify").html("").append("<textarea id='textarea1' cols='100' rows='20'></textarea>");
                $("#textarea1").val(notifyopts.content);
                $("#SPSTools_Notify").append("<input type='button' value='OK' id='alert_ok'/>");
                $("#alert_ok").click(function () {
                    $("#SPSTools_Notify").fadeOut("4000", function () { $("#SPSTools_Notify").html(""); });
                });
                var height = $("#SPSTools_Notify").height();
                var width = $("#SPSTools_Notify").width();
                var lv = cx - (width / 2) + "px";
                var tv = cy - (height / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #ffff00 solid', left: lv, top: tv }).show();
                break;

            case 'wait':
                var waitMessage = "<table width='100%' align='center'><tr><td align='center'><img src='/_layouts/images/gears_an.gif'/></td></tr>";
                waitMessage += "<tr><td align='center'><div id='waitdiv' style='margin-top: 10px; font-size: 16px;'></div></td></tr></table>";
                $("#SPSTools_Notify").html("").append(waitMessage);
                $("#waitdiv").html(notifyopts.content);
                var height = $("#SPSTools_Notify").height();
                var width = $("#SPSTools_Notify").width();
                var lv = cx - (width / 2) + "px";
                var tv = cy - (height / 2) - 100 + "px";
                $("#SPSTools_Notify").css({ border: '2px #000000 solid', left: lv, top: tv }).show();
                break;

            case 'showloading':
                var tmpa = notifyopts.container;
                var tmpb = ($("#" + tmpa).height());
                var tmpc = ($("#" + tmpa).width());
                var tcss = "position: absolute;background: #ffffff;"
                tcss += "height:" + tmpb + ";";
                tcss += "width:" + tmpc + ";";
                tcss += "left: 50%;top: 50%;transform: translate(-50%, -50%);padding: 10px;";
                tcss += "color: #000000;margin: auto;font-family: 'Segoe UI';font-size: 16px;text-align: center;vertical-align: middle;display: block;";
                var waitMessage = "<div style='" + tcss + "'><table width='100%' height='100%' align='center'><tr><td align='center'><img src='/_layouts/images/gears_an.gif'/></td></tr>";
                waitMessage += "<tr><td align='center'>" + notifyopts.content + "</td></tr></table></div>";
                $("#" + tmpa).html("").append(waitMessage);
                break;
            	
            case 'hideloading':
            	var tmpa = notifyopts.container;
            	$("#loading_" + tmpa).hide();
            	break;
        }
    };

    $(document).ready(function () {
        cx = ($(window).width()) / 2;
        cy = ($(window).height()) / 2;
        var notifycss = "position:absolute;background:#ffffff;width:400px;height:120px;padding:10px;color:#000000;z-index:5000;font-size:16px;text-align:center;vertical-align:middle;display:none;";
        $("body").append("<div id='SPSTools_Notify' style=" + notifycss + " />");
        $("body").append("<canvas id='SPSTools_Canvas' style='position:absolute;top:0;height:90px;display:none;' />");
        SP.SOD.executeOrDelayUntilScriptLoaded(function(){
	        var tp1, tp2, tp3, tp4, tp5, tp6, tp7;
	        tp1 = new SP.ClientContext.get_current();
	        tp2 = tp1.get_site();
	        tp3 = tp2.get_rootWeb();
	        tp1.load(tp3);
	        tp1.executeQueryAsync(function(){
	        	var stop = "stop";
	        	tp6 = new String(window.location.protocol);
    			tp7 = new String(window.location.host);
    			CKO.GLOBAL.VARIABLES.sitecollection = tp6 + SLASH + SLASH + tp7 + tp3.get_serverRelativeUrl();
	        	logit(CKO.GLOBAL.VARIABLES.sitecollection);
	        },
	        function(sender, args){
	        	logit("Error getting site: " + args.get_message());
			});
		}, "sp.js");
	        
    });

    var defaults = {
        type: '',                                       // Type of Notification(alert, yesno, xml, wait)
        content: '',                                    // html of the Notification. Can be plain text or simple html
        wait: false,                                    // Leave it open until closed. 
        buttons: [],                                    // choice buttons for choice alert type
        selbutton: '',
        id: 'notify',                                         // ID of the notification div
        style: defaultcss,                              // css attributes to style the notification
        container: 'body',                              // Where to place the notification on the page
        textareaid: 'txtar1',                                 // ID of the text area for the XML notification type
        callback: null                                  // Function to run when complete
    };
})(jQuery);

function logError(list, msg) {
    var deferred = jQuery.Deferred();
    var ctx = new SP.ClientContext.get_current();
    var web = ctx.get_web();
    var zlist = ctx.get_web().get_lists().getByTitle(list);
    var ici = new SP.ListItemCreationInformation();
    var error = zlist.addItem(ici);
    error.set_item('Message', msg);
    error.update();
    ctx.load(error);
    ctx.executeQueryAsync(
        function () {
            logit("Error Message Logged: " + msg);
        }, function (sender, args) {
            logit("Could not log error to list. " + args.get_message());
        }
    );
}

function loadCSS(url) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = url;
    head.appendChild(style);
    logit("CSS File Loaded: " + url);
}

function loadscript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.documentElement.insertBefore(script, document.documentElement.firstChild);
}

function fixurl(burl) { // global url fix. Pass in a relative url to create full url.
    tp1 = new String(window.location.protocol);
    tp2 = new String(window.location.host);
    tp3 = L_Menu_BaseUrl;
    var nurl = tp1 + SLASH + SLASH + tp2 + tp3 + burl;
    return nurl;
}

function fixurl2(burl) { // global url fix. Pass in a relative url to create full url.
    tp1 = new String(window.location.protocol);
    tp2 = new String(window.location.host);
    tp3 = _spPageContextInfo.webServerRelativeUrl;
    var nurl = tp1 + SLASH + SLASH + tp2 + tp3 + burl;
    //logit(nurl);
    return nurl;
}

function dateformat(dtf, type) { // Used for date conversions. More formats can be added to use the short or long month names or format as needed.
    function pad(n) { return n < 10 ? '0' + n : n }
    var marr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var sarr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dtr = "";
    switch (type) {
        case "isoshort": // for use in fullcalendar.io js files
            var d = new Date(parseInt(dtf.substr(6)));
            var os = (d.getTimezoneOffset() / 60); // timezone offset in hours
            // SharePoint dates are in UTC format and stored as ticks but don't carry the timezone offset!
            // But the browser and code will automatically add or subtract the timezone which will in EST subtract 4 or 5 hours making the date a day earlier.
            // So we need to add time to this (2 times the offset just to be sure!)
            dtr = moment(d).add(os * 2, 'h').format('YYYY-MM-DD');
            break;

        case "isoshortdate": // US shortdate format for use in fullcalendar.io js files
            var d = new Date(dtf); // just in tick format
            var os = (d.getTimezoneOffset() / 60); // timezone offset in hours
            // SharePoint dates are in UTC format and stored as ticks but don't carry the timezone offset!
            // But the browser and code will automatically add or subtract the timezone which will in EST subtract 4 or 5 hours making the date a day earlier.
            // So we need to add time to this (2 times the offset just to be sure!)
            dtr = moment(d).add(os * 2, 'h').format('MM/DD/YYYY');
            break;

        case "isofull": // Use on Date only fields when converting from old REST format without a time component
            var d = new Date(parseInt(dtf.substr(6))); // just in tick format
            var os = (d.getTimezoneOffset() / 60); // timezone offset in hours
            // SharePoint dates are in UTC format and stored as ticks but don't carry the timezone offset!
            // But the browser and code will automatically add or subtract the timezone which will in EST subtract 4 or 5 hours making the date a day earlier.
            // So we need to add time to this (3 times the offset just to be sure! This should be enough to ensure the stored offset keeps it on the same day.)
            dtr = moment(d).add(os * 3, 'h').format();
            logit("isofull: " + dtr);
            break;

        case "isodefault": // Use on Date only fields when inserting a new date
            var d = new Date(dtf); // just in tick format
            var os = (d.getTimezoneOffset() / 60); // timezone offset in hours
            // SharePoint dates are in UTC format and stored as ticks but don't carry the timezone offset!
            // But the browser and code will automatically add or subtract the timezone which will in EST subtract 4 or 5 hours making the date a day earlier.
            // So we need to add time to this (3 times the offset just to be sure! This should be enough to ensure the stored offset keeps it on the same day.)
            dtr = moment(d).add(os * 3, 'h').format();
            break;

        case "short":
            var d = new Date(dtf);
            dtr = sarr[d.getMonth()] + "-" + d.getDate() + "-" + d.getFullYear();
            break;

        case "shortdate":
            var d = new Date(dtf);
            dtr = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            break;

        case "shortdate1":
            var d = new Date(parseInt(dtf.substr(6)));
            dtr = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            break;

        case "modified":
            var d = new Date(dtf);
            dtr = marr[d.getMonth()] + " " + d.getDate() + ", " + GetPrettyTime(d);
            break;

        case "modifiedoffset":
            var d = new Date(dtf);
            dtr = marr[d.getMonth()] + " " + d.getDate() + ", " + GetPrettyTimeOffset(d);
            break;
    }
    return dtr;
}

function resizeModalDialog() {  // Used to correctly resize the SharePoint modal dialog when called from code.
    SP.SOD.executeOrDelayUntilScriptLoaded(_resizeModalDialog, 'sp.ui.dialog.js');
}

function _resizeModalDialog() {  // Used to correctly resize the SharePoint modal dialog when called from code. 
    var dlg = SP.UI.ModalDialog.get_childDialog();
    if (dlg != null) {
        if (!dlg.$S_0 && dlg.get_$Z_0()) {
            dlg.autoSize();
            var xPos, yPos, //x & y co-ordinates to move modal to...      
            win = SP.UI.Dialog.get_$1(), // the very bottom browser window object      
            xScroll = SP.UI.Dialog.$24(win), // browser x-scroll pos      
            yScroll = SP.UI.Dialog.$26(win); // browser y-scroll pos      
            xPos = ((SP.UI.Dialog.$1d(win) - dlg.$2_0.offsetWidth) / 2) + xScroll;
            if (xPos < xScroll + 10) {
                xPos = xScroll + 10;
            }
            yPos = ((SP.UI.Dialog.$1c(win) - dlg.$2_0.offsetHeight) / 2) + yScroll;
            if (yPos < yScroll + 10) {
                yPos = yScroll + 10;
            }
            dlg.$T_0 = xPos;
            dlg.$U_0 = yPos;
            dlg.$m_0(dlg.$T_0, dlg.$U_0);
            dlg.$H_0.style.width = Math.max(dlg.$6_0.offsetWidth - 64, 0) + 'px';
            logit("WIDTH CALCULATION = " + Math.max(dlg.$6_0.offsetWidth - 64, 0) + "px");
            dlg.$2B_0();
        }
    }
}

function CKODialog(url, title, width, height, callbackType) {
    var options = SP.UI.$create_DialogOptions();
    options.url = url;
    options.title = title;
    options.width = width;
    options.height = height;
    if (callbackType == 'NotificationCallback') {
        options.dialogReturnValueCallback = NotificationCallback;
    }
    else if (callbackType == 'SilentCallback') {
        options.dialogReturnValueCallback = SilentCallback;
    }
    else if (callbackType == 'RefreshCallback') {
        options.dialogReturnValueCallback = RefreshCallback;
    }
    formopen = true;
    SP.UI.ModalDialog.showModalDialog(options);
}

function NotificationCallback(dialogResult, returnValue) {
    if (dialogResult == SP.UI.DialogResult.OK) {
        //SP.UI.Notify.addNotification('Operation Succeeded', false);
        switch (returnValue[0]) {
            case "Draft":
                window.location = returnValue[1];
                break;

            case "Refresh":
                SP.UI.Notify.addNotification(returnValue[1], false);
                window.location = window.location;
                break;

            case "AddRecommendation":
                SP.UI.Notify.addNotification(returnValue[1], false);
                window.location = returnValue[2];
                break;

            case "CancelRecommendation":
                SP.UI.Notify.addNotification(returnValue[1], false);
                window.location = returnValue[2];
                break;

            case "DirectiveTitle":
                CKO.GLOBAL.ACTIONS.UpdateActionTitle(returnValue[1], returnValue[2]);
                break;

            case "AddSkill":
                SP.UI.Notify.addNotification(returnValue[1], false);
                var action = returnValue[2];
                switch (action) {
                    case "NewForm":
                        CKO.FORMS.DIRECTIVES.NewForm().GetSkills(); // Function must exist on the page that called the dialog
                        break;

                    case "EditForm":
                        CKO.FORMS.DIRECTIVES.EditForm().GetSkills(returnValue[3]); // Function must exist on the page that called the dialog
                        break;
                }
                break;

            case "GoToUrl": // This is used if save and continue was used from the home page to go to the AMOFormsList list
                window.location = returnValue[1];
                break;

            case "CopyFiles": // Will be used in different copy scenarios
                var action = returnValue[1];
                switch (action) {
                    case "DocSet":
                        $().SPSTools_Notify({ type: 'wait', content: 'Copying Files to Document Set...' });
                        var type = returnValue[2];
                        var docset = returnValue[3]; // This should be the new doc set name
                        var cn = returnValue[4];
                        // now we can get the files to copy into this new doc set.
                        // TODO: Eventually move the names of the source and destination libraries to the dialog page and add to return values so this can be more universal
                        if (type != "Empty") {
                            GetDocSetFiles(docset, type, cn, "Templates", "StaffActions");
                        }
                        else {
                            GotoDocSet(docset, cn);
                        }
                        break;
                }
                break;
        }
    }
    else if (dialogResult == SP.UI.DialogResult.cancel) {
        SP.UI.Notify.addNotification('Operation Canceled', false);
    }
    else if (dialogResult == SP.UI.DialogResult.invalid) {
        SP.UI.Notify.addNotification('Operation invalid', false);
    }
}

function SilentCallback(dialogResult, returnValue) { }

function RefreshCallback(dialogResult, returnValue) {
    SP.UI.Notify.addNotification('Operation Succeeded', false);
    if (test.indexOf("?") > 0) {
        tp1 = test.substring(0, test.indexOf("?"));
        window.location = tp1;
    }
    else {
        SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK);
    }
}

function HideFormRows(rows) {
    for (var z = 0; z <= rows.length - 1; z++) {
        var thisRow = $("nobr").filter(function () {
            // Ensures we get a match whether or not the field is required (if required, the nobr contains a span also)
            return $(this).contents().eq(0).text() === rows[z];
        }).closest("tr");
        thisRow.hide();
        var thisRow = $(".ms-formlabel").filter(function () {
            // Ensures we get a match whether or not the field is required (if required, the nobr contains a span also)
            return $(this).contents().eq(0).text() === rows[z];
        }).closest("tr");
        thisRow.hide();
    }
}

function GotoDocSet(ds, cn) {
    $().SPSTools_Notify({ type: 'wait', content: 'Redirecting To Document Set...' });
    CKO.GLOBAL.VARIABLES.controlnumber = cn;
    userID = _spPageContextInfo.userId;
    var requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=(CreatedById eq " + userID + ") and (ControlNumber eq '" + CKO.GLOBAL.VARIABLES.controlnumber + "')";
    var requestHeaders = {
        "accept": "application/json;odata=verbose"
    };

    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: function (data) {
            if (data.d.results.length > 0) {
                // Get the id of the item
                var id = data.d.results[0].Id;
                $("#SPSTools_Notify").fadeOut("2500", function () {
                    $("#SPSTools_Notify").html("");
                });
                window.location = "https://portal.ndu.edu/coo/AdminActions/StaffActions/Forms/StaffAction/docsethomepage.aspx?ID=" + id + "&FolderCTID=0x0120D5200013B8FD71893B2B40AF2F065AF09012520064EB76582012844E8173AC3CB61A9190&List=03e8e4fa-2390-46f6-a016-ec59a2e32924&RootFolder=%2Fcoo%2FAdminActions%2FStaffActions%2F" + ds;
            }
        },
        error: function () { logit("Get Doc Set For User Failed."); }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/// <summary>   Gets document set files and stores them in filearray variable. </summary>
///
/// <remarks>   Daniel R Walker Ctr, 3/9/2017. </remarks>
///
/// <param name="ds">   The document set name. </param>
/// <param name="t">    The type ("Directives", "Memorandum" etc..). </param>
/// <param name="cn">   The control number. </param>
/// <param name="src">  Source library that contains the files. </param>
/// <param name="dest"> Destination library for the files. </param>
///
/// <returns> The document set files in the filearray variable. </returns>
////////////////////////////////////////////////////////////////////////////////////////////////////

function GetDocSetFiles(ds, t, cn, src, dest) {
    // TODO: Update to be more universal. Currently the "StaffActionType" is hardcoded specifically to support StaffActions process.
    dsn = ds; // dsn = doc set name and is the name of the docset which is technically a folder in the StaffActions list.
    CKO.GLOBAL.VARIABLES.controlnumber = cn;
    logit("CopyDocSetFiles ds: " + ds + ", t: " + t);
    $.when(CKO.CSOM.GetLibraryItems.getfilesfiltered("current", "Templates", ["FileLeafRef", "Title", "LinkFilename", "EncodedAbsUrl", "DocIcon", "Id"], "StaffActionType", t)).then(function (files) {
        var enumerator = files.getEnumerator();
        var cnt = files.get_count();
        logit("Copy File Count: " + cnt);
        var total = 0;
        while (enumerator.moveNext()) {
            var item = enumerator.get_current();
            var fid = item.get_id(); // fid is the item id and is used to get the actual "file"
            filearray.push({
                fileid: fid,
                sourcelib: src,
                destinationlib: dest,
                docsetname: dsn
            });
        }
        CopyDocSetFiles("Retrieved Files. Preparing to copy...");
    }, function (sender, args) { logit("Get Templates Failed, " + args.get_message()); });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/// <summary>   Copies the document set files retrieved by GetDocSetFiles and stored in the filearray variable. </summary>
///
/// <remarks>   Daniel R Walker Ctr, 3/9/2017. </remarks>
///
/// <param name="msg">  The message. </param>
///
/// <returns>   . </returns>
////////////////////////////////////////////////////////////////////////////////////////////////////

function CopyDocSetFiles(msg) {
    // Assumes an array of file data objects exists in the filearray variable.
    // After the files are copied, navigate to the home page for the created document set.
    if (msg != null) { logit(msg); }  // used to log messages to the console as the files are copied.
    var item;

    function handleError(msg) {
        // Just move on for now
        if (msg != null) { logit("handleError: " + msg); }  // used to log messages to the console if there is an error. TODO: Alert the user?
        CopyDocSetFiles(null);
    }

    if (filearray.length > 0) { // There are files to be copied
        logit("filearray length: " + filearray.length);
        item = filearray.pop();
        var ctx = SP.ClientContext.get_current();
        var web = ctx.get_web();
        var currentLib = web.get_lists().getByTitle(item.sourcelib);
        var listitem = currentLib.getItemById(item.fileid);
        var file = listitem.get_file();
        ctx.load(file);
        ctx.executeQueryAsync(
            function () {
                if (file != null) {
                    var destFileUrl = fixurl('/' + item.destinationlib + '/' + item.docsetname + '/' + item.docsetname + ' - ' + file.get_name());
                    file.copyTo(destFileUrl, true);
                    ctx.executeQueryAsync(
                        function () { CopyDocSetFiles(file.get_name() + " Copied"); },
                        function (sender, args) {
                            logit("Calling Error Handler");
                            handleError(args.get_message());
                        }
                    );
                }
                else {
                    logit("404 FILE NOT FOUND!!!");
                }
            },
            function (sender, args) {
                logit("Error while getting the file. Calling Error Handler.");
                handleError(args.get_message());
            }
        );
    }
    else {
        logit("All Files Copied");
        $().SPSTools_Notify({ type: 'wait', content: 'Files Copied. Redirecting To Document Set...' });
        userID = _spPageContextInfo.userId;
        var requestUri = "https://portal.ndu.edu/coo/AdminActions/_vti_bin/ListData.svc/StaffActions?$filter=(CreatedById eq " + userID + ") and (ControlNumber eq '" + CKO.GLOBAL.VARIABLES.controlnumber + "')";
        var requestHeaders = {
            "accept": "application/json;odata=verbose"
        };

        $.ajax({
            url: requestUri,
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            success: function (data) {
                if (data.d.results.length > 0) {
                    // Get the id of the item
                    var id = data.d.results[0].Id;
                    $("#SPSTools_Notify").fadeOut("2500", function () {
                        $("#SPSTools_Notify").html("");
                    });
                    window.location = "https://portal.ndu.edu/coo/AdminActions/StaffActions/Forms/StaffAction/docsethomepage.aspx?ID=" + id + "&FolderCTID=0x0120D5200013B8FD71893B2B40AF2F065AF09012520064EB76582012844E8173AC3CB61A9190&List=03e8e4fa-2390-46f6-a016-ec59a2e32924&RootFolder=%2Fcoo%2FAdminActions%2FStaffActions%2F" + dsn;
                }
            },
            error: function () { logit("Get Doc Set For User Failed."); }
        });
    }
}

CKO.GLOBAL.ACTIONS.UpdateActionTitle = function (parentid, newtitle) {
    $().SPSTools_Notify({ type: 'wait', content: 'Directive Title Changed. Updating Actions...Please wait...' });
    var v = CKO.GLOBAL.VARIABLES;
    v.data = [];
    CKO.GLOBAL.ACTIONS.GetAllActions(null, parentid, newtitle);
};

CKO.GLOBAL.ACTIONS.GetAllActions = function (zurl, parentid, newtitle) {
    var v = CKO.GLOBAL.VARIABLES;
    if (zurl === null) {
        var urlString = "https://hq.tradoc.army.mil/sites/OCKO/PMT/_vti_bin/listdata.svc/Actions?";
        urlString += "$select=Id,Title,DateCompleted,ParentID";
        urlString += "&$filter=";
        urlString += "(ParentID eq '" + parentid + "')";
        zurl = urlString;
    }
    logit("URL: " + zurl);

    jQuery.ajax({
        url: zurl,
        method: "GET",
        headers: { 'accept': 'application/json; odata=verbose' },
        error: function (jqXHR, textStatus, errorThrown) {
            //to do implement logging to a central list
            logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
        },
        success: function (data) {
            var v = CKO.GLOBAL.VARIABLES;
            v.data = v.data.concat(data.d.results);
            if (data.d.__next) {
                zurl = data.d.__next;
                CKO.GLOBAL.ACTIONS.GetAllActions(zurl, parentid, newtitle);
            }
            else {
                var results = v.data;
                v.json = jQuery.parseJSON(JSON.stringify(results));
                CKO.GLOBAL.ACTIONS.AllActionsLoaded(parentid, newtitle);
            }
        }
    });
}

CKO.GLOBAL.ACTIONS.AllActionsLoaded = function (parentid, newtitle) {
    var v = CKO.GLOBAL.VARIABLES;
    var j = v.json;
    v.total = j.length;
    for (var i = 0; i < j.length; i++) {
        var getitemdata = {};
        getitemdata.itemId = j[i]["Id"];
        getitemdata.ParentID = j[i]["ParentID"];
        getitemdata.Title = newtitle;
        CKO.GLOBAL.ACTIONS.getActionItemById("https://hq.tradoc.army.mil/sites/OCKO/PMT", "Actions", getitemdata.itemId).success(CKO.GLOBAL.ACTIONS.getActionItemByIdSuccess.bind(getitemdata));
    }
};

CKO.GLOBAL.ACTIONS.getActionItemById = function (webUrl, listName, itemId) {
    var url = webUrl + "/_vti_bin/listdata.svc/" + listName + "(" + itemId + ")";

    return $.ajax({
        url: url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" }
    });
};

CKO.GLOBAL.ACTIONS.getActionItemByIdSuccess = function (data) {
    var getitemdata = this;
    var updateitemdata = {};
    updateitemdata.itemId = getitemdata.itemId;
    updateitemdata.ParentID = getitemdata.ParentID;
    updateitemdata.Title = getitemdata.Title
    updateitemdata.url = data.d.__metadata.uri;
    updateitemdata.etag = data.d.__metadata.etag;
    var itemprops = {
        "Title": updateitemdata.Title
    };
    // now we can update the item with the parent id
    CKO.GLOBAL.ACTIONS.updateActionItem("https://hq.tradoc.army.mil/sites/OCKO/PMT", "Actions", updateitemdata.itemId, itemprops, updateitemdata.url, updateitemdata.etag).success(CKO.GLOBAL.ACTIONS.updateActionItemSuccess.bind(updateitemdata));
}

CKO.GLOBAL.ACTIONS.updateActionItem = function(webUrl, listName, itemId, itemProperties, url, tag) {
    var itemprops = JSON.stringify(itemProperties);
    return $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        processData: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "If-Match": tag
        },
        data: JSON.stringify(itemProperties)
    });
}

CKO.GLOBAL.ACTIONS.updateActionItemSuccess = function (data) {
    var v = CKO.GLOBAL.VARIABLES;
    var updateitemdata = this;
    v.count += 1;
    if (v.count === v.total) {
        $("#SPSTools_Notify").fadeOut("2500", function () {
            $("#SPSTools_Notify").html("");
        });
        window.location = window.location;
    }
}

// The REST calls rock

CKO.REST.GetActionItems = function () {
    var g = CKO.GLOBAL.VARIABLES;

    var getitemsbyidandpasstoelement = function (site, userid, element) {
        var deferred = jQuery.Deferred();
        var urlString = site + "/_vti_bin/listdata.svc/Actions?";
        urlString += "$select=Id,Title,Expended,PMTUser/Id,ActionComments,Enabler,DateCompleted,EffortTypeValue,EndOfWeek";
        urlString += "&$expand=PMTUser";
        urlString += "&$filter=((PMTUser/Id eq " + userid + ") and (DateCompleted ge datetime'" + moment().subtract(31, 'days').format('YYYY-MM-DD[T]HH:MM:SS[Z]') + "'))";
        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                var err = textStatus + ", " + errorThrown;
                //logit ("CKO.REST.GetActionItems Error: " + err);
                deferred.reject(err, element);
            },
            success: function (data) {
                deferred.resolve(data, element);
            }
        });
        return deferred.promise();
    };

    var getitemssucceeded = function (caller, data, args) {
        
    };

    return {
        getitemsbyidandpasstoelement: getitemsbyidandpasstoelement,
        getitemssucceeded: getitemssucceeded
    }
}();

CKO.REST.GetListItems = function () {
    var g = CKO.GLOBAL.VARIABLES;

    var getitems = function (qurl) {
        var ajax = jQuery.ajax({
            url: qurl,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                var err = textStatus + ", " + errorThrown;
                return ("CKO.REST.GetListItems Error: " + err);
            },
            success: function (data) {
                //g.response = g.response.concat(data.d.results);
                return data;
                //if (data.d.__next) {
                //    CKO.REST.GetListItems.getitems(data.d.__next);
                //}
                //else {
                //    return g.response;
                //}
            }
        });
        return ajax.promise();
    };

    return {
        getitems: getitems
    }
}();

CKO.REST.ListItems = function () {
    var g = CKO.GLOBAL.VARIABLES;

    var getitems = function (qurl) {
        var ajax = jQuery.ajax({
            url: qurl,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                var err = textStatus + ", " + errorThrown;
                return ("CKO.REST.GetListItems Error: " + err);
            },
            success: function (data) {
                //g.response = g.response.concat(data.d.results);
                return data;
                //if (data.d.__next) {
                //    CKO.REST.GetListItems.getitems(data.d.__next);
                //}
                //else {
                //    return g.response;
                //}
            }
        });
        return ajax.promise();
    };

    var addItems = function (listName, itemProperties) {
        var iprops = JSON.stringify(itemProperties);
        //logit("props: " + iprops);
        var ajax = $.ajax({
            url: fixurl2("/_vti_bin/listdata.svc/" + listName),
            type: "POST",
            processData: false,
            contentType: "application/json;odata=verbose",
            data: iprops,
            headers: {
                "Accept": "application/json;odata=verbose"
            },
            success: function (data) {
                return data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var err = "CKO.REST.ListItems.addItems Error: " + textStatus + ", " + errorThrown;
                return err;
            }
        });
        return ajax.promise();
    }

    return {
        getitems: getitems,
        addItems: addItems
    }
}();

// The CSOM functions are all promise based functions that use the various SharePoint CSOM actions to get various types of data.
CKO.CSOM.GetUserInfo = function () {
    var isuseringroup = function (groupName) {
        var found = false;
        var p = jQuery.Deferred();
        var result = jQuery.Deferred();
        p = $().SPServices({
            operation: "GetGroupCollectionFromUser",
            userLoginName: $().SPServices.SPGetCurrentUser()
        });

        p.done(function () {
            //logError("ErrorLog", p.responseText);
            if ($(p.responseText).find("Group[Name='" + groupName + "']").length == 1) {
                found = true;
                result.resolve(found);
            }
            else {
                result.resolve(found);
            }
        });
        return result.promise();
    };

    var getUserInfoById = function (site, id, loc, version) {
        var deferred = jQuery.Deferred();
        var zctx;
        if (site == "current") {
            zctx = new SP.ClientContext.get_current();
        }
        else {
            zctx = new SP.ClientContext(site);
        }

        switch (version) {
            case "2010":
                var caml = new SP.CamlQuery();
                caml.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/>' + '<Value Type=\'Number\'>' + id + '</Value></Eq>' + '</Where></Query><RowLimit>1</RowLimit></View>');
                var userInfoList = zctx.get_web().get_siteUserInfoList();
                var items = userInfoList.getItems(caml);
                zctx.load(items);
                zctx.executeQueryAsync(
                    Function.createDelegate(this, function () { deferred.resolve(items, loc, version); }),
                    Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
                );
                break;

            default:
                var ui = zctx.get_web().getUserById(id);
                zctx.load(ui);
                zctx.executeQueryAsync(
                    Function.createDelegate(this, function () { deferred.resolve(ui, loc, version); }),
                    Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
                );
                break;
        }
        return deferred.promise();
    };

    return {
        isuseringroup: isuseringroup,
        getUserInfoById: getUserInfoById
    };
}();

CKO.CSOM.GetActionItems = function () {
    var getitemsbyuseridandpasstoelement = function (site, list, userid, startdate, element) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ID'/></OrderBy><Where><And><Eq><FieldRef Name='PMTUser' LookupId='TRUE' /><Value Type='Integer'>" + userid + "</Value></Eq><Geq><FieldRef Name='DateCompleted' /><Value Type='DateTime'>" + startdate + "</Value></Geq></And></Where></Query>";
        var fields = ["Title", "Expended", "EffortType", "DateCompleted", "PMTUser"];
        var inc = "Include(";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='ID'/>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getitemsbyuseridandpasstoelement: getitemsbyuseridandpasstoelement
    };
}();

CKO.CSOM.Lists = function () {
    var createlist = function (site, listdata, index) {
        var deferred = jQuery.Deferred();
        var ctx, web, lci, list;
        lci = new SP.ListCreationInformation();
        switch (site) {
            case "root":
                ctx = new SP.ClientContext.get_current();
                web = ctx.get_site().get_rootWeb();
                break;

            case "current":
                ctx = new SP.ClientContext.get_current();
                web = ctx.get_web();
                break;

            default:
                ctx = new SP.ClientContext(site);
                web = ctx.get_web();
                break;
        }
        // use info from listdata object to create list
        lci.set_title(listdata.ListTitle);
        lci.set_templateType(listdata.ListTemplateType);
        list = web.get_lists().add(lci);
        ctx.load(web);
        ctx.load(list);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(list, index); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        createlist: createlist
    }

}();

CKO.CSOM.SiteColumns = function () {
    var addcolumntosite = function (column, index) {
        // columns should be passed in as JSON
        var deferred = jQuery.Deferred();
        var zctx, zweb, fieldxml, field, fields, choices, fieldchoices;
        // In this case it won't matter where we are because the get_rootWeb gets the site collection root
        zctx = new SP.ClientContext.get_current();
        zweb = zctx.get_site().get_rootWeb();
        fields = zweb.get_fields();
        if (column.FieldType === 'Choice' || column.FieldType === 'MultiChoice') {
            choices = column.ChoiceList;
            choices = choices.split(",");
            fieldchoices = "<CHOICES>";
            if (choices.length > 0) {
                for (var i = 0; i < choices.length; i++) {
                    fieldchoices += "<CHOICE>" + choices[i] + "</CHOICE>";
                }
                fieldchoices += "</CHOICES>";
            }
        }
        fieldxml = "<Field Type='";
        fieldxml += column.FieldType;
        fieldxml += "' ID='{";
        fieldxml += column.FieldID;
        fieldxml += "}' Name='";
        fieldxml += column.FieldTitle;
        fieldxml += "' StaticName='";
        fieldxml += column.FieldTitle;
        fieldxml += "' DisplayName='";
        fieldxml += column.FieldDisplayName;
        if (column.Required == 'true') {
            fieldxml += "' Required='TRUE'";
        }
        else { fieldxml += "'"; }
        switch (column.FieldType) {
            case "DateTime":
                fieldxml += " Format='" + column.FieldFormat + "'";
                break;

            case "Choice":
                fieldxml += " Format='" + column.FieldFormat + "'";
                break;

            case "URL":
                fieldxml += " Format='" + column.FieldFormat + "'";
                break;

            case "User":
                fieldxml += " List='" + column.List + "'";
                fieldxml += " ShowField='" + column.ShowField + "'";
                fieldxml += " UserSelectionMode='" + column.UserSelectionMode + "'";
                fieldxml += " UserSelectionScope='" + column.UserSelectionScope + "'";
                break;
        }
        fieldxml += " Group='AllCustomColumns'>";
        
        if (column.FieldType == "Choice" || column.FieldType == "MultiChoice") {
            fieldxml += fieldchoices + "</Field>";
            logit("FIELDXML: " + fieldxml);
            field = zctx.castTo(fields.addFieldAsXml(fieldxml, false, SP.AddFieldOptions.AddFieldInternalNameHint | SP.AddFieldOptions.AddFieldCheckDisplayName), SP.FieldChoice);
        }
        else {
            fieldxml += "</Field>";
            logit("FIELDXML: " + fieldxml);
            field = fields.addFieldAsXml(fieldxml, false, SP.AddFieldOptions.AddFieldInternalNameHint | SP.AddFieldOptions.AddFieldCheckDisplayName);
        }

        field.update();
        zctx.load(field);
        zctx.load(fields);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(field, index); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var addcolumntolist = function (site, column, list) {
        var deferred = jQuery.Deferred();
        var ctx, web, field, listfields, listfield; //field = column
        ctx = new SP.ClientContext.get_current();
        web = ctx.get_site().get_rootWeb();
        //field = web.get_fields().getById(column);
        field = web.get_fields().getByInternalNameOrTitle(column);
        listfields = list.get_fields();
        listfield = listfields.add(field);
        listfield.update();
        list.update();
        ctx.load(list);
        ctx.load(listfield);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listfield, list); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    }

    return {
        addcolumntosite: addcolumntosite,
        addcolumntolist: addcolumntolist
    }
}();

CKO.CSOM.AddListItems = function () {
    var additemswitharrays = function (site, list, fields, fieldtypes, values, element) {
        var deferred = jQuery.Deferred();
        var ctx, list, listitem, ici;
        switch (site) {
            case "parent":
                ctx = new SP.ClientContext.get_current();
                list = ctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                ctx = new SP.ClientContext.get_current();
                list = ctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                ctx = new SP.ClientContext(site);
                list = ctx.get_web().get_lists().getByTitle(list);
                break;
        }
        ici = new SP.ListItemCreationInformation();
        listitem = list.addItem(ici);
        for (var z = 0; z < fields.length; z++) {
            switch (fieldtypes[z]) {
                case "Date":
                    listitem.set_item(fields[z], new Date(values[z]));
                    break;

                case "Text":
                    listitem.set_item(fields[z], values[z]);
                    break;

                case "User":
                    listitem.set_item(fields[z], SP.FieldUserValue.fromUser(values[z]));
                    break;

                case "Choice":
                    listitem.set_item(fields[z], values[z]);
                    break;
            }
        }
        listitem.update();
        ctx.load(listitem);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        additemswitharrays: additemswitharrays
    };
}();

CKO.CSOM.GetListItems = function () {
    var getitems = function (site, list) {
        var xml = "<View><RowLimit>100</RowLimit></View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        		zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };
    
    var getitemsordered = function (site, list, field) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + field + "'/></OrderBy></Query></View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        		zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemsfiltered = function (site, list, filterfield, filtervalue) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ID'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + filtervalue + "</Value></Eq></Where></Query></View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        		zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemsfilteredandpasstoelement = function (site, list, filterfield, filtervalue, element) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='Title'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + filtervalue + "</Value></Eq></Where></Query></View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        		zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };
    
    var getitemsfilteredorderedandpasstoelement = function (site, list, filterfield, filtervalue, order, element) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + order + "'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + filtervalue + "</Value></Eq></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + order + "'/>";
        xml += "<FieldRef Name='" + filterfield + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        		zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemsfilteredorderedandpassfieldstoelement = function (site, list, filterfield, filtervalue, order, element, fields) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + order + "'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + filtervalue + "</Value></Eq></Where></Query>";
        var inc = "Include(";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + order + "'/>";
        xml += "<FieldRef Name='" + filterfield + "'/>";
        xml += "<FieldRef Name='ID'/>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items, inc);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemsfilteredcomplex = function (site, list, xml, inc) { //pass in customized xml statement
        var deferred = jQuery.Deferred();        
        var zctx, zlist;
        switch(site){
        	case "parent":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
        		break;
        		
        	case "current":
        		zctx = new SP.ClientContext.get_current();
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        		
        	default:
        	    zctx = new SP.ClientContext(site);
        		zlist = zctx.get_web().get_lists().getByTitle(list);
        		break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        //zctx.load(items, inc);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getfileicon = function (file, icon, element) {
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var web = ctx.get_web();
        icon = web.mapToIcon(file, '', SP.Utilities.IconSize.Size16);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(icon, element); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getitems: getitems,
        getitemsordered: getitemsordered,
        getitemsfiltered: getitemsfiltered,
        getitemsfilteredandpasstoelement: getitemsfilteredandpasstoelement,
        getitemsfilteredorderedandpasstoelement: getitemsfilteredorderedandpasstoelement,
        getitemsfilteredorderedandpassfieldstoelement: getitemsfilteredorderedandpassfieldstoelement,
        getitemsfilteredcomplex: getitemsfilteredcomplex,
        getfileicon: getfileicon
    };
}();

CKO.CSOM.GetLibraryItems = function () {
    var getfilesfiltered = function (site, library, fields, filterfield, filtervalue) {
        var inc = "Include(";
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='ID'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + filtervalue + "</Value></Eq></Where></Query>";
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='" + filterfield + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var ctx;
        if (site == "current") {
            ctx = new SP.ClientContext.get_current();
        }
        else {
            ctx = new SP.ClientContext(site);
        }
        var zlib = ctx.get_web().get_lists().getByTitle(library);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var files = zlib.getItems(caml);
        ctx.load(files, inc);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(files); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getfilesfilteredcomplex = function (library, xml, inc) { //pass in customized xml statement
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var zlib = ctx.get_web().get_lists().getByTitle(library);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var files = zlib.getItems(caml);
        ctx.load(files, inc);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(files); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getfilesfilteredcomplex2 = function (library, xml, inc, tblid) { //pass in customized xml statement
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var zlib = ctx.get_web().get_lists().getByTitle(library);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var files = zlib.getItems(caml);
        ctx.load(files, inc);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(files, tblid); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getfileicon = function (file, icon, doctype) {
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var web = ctx.get_web();
        icon = web.mapToIcon(file, '', SP.Utilities.IconSize.Size16);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(icon, doctype); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getfilesfiltered: getfilesfiltered,
        getfilesfilteredcomplex: getfilesfilteredcomplex,
        getfilesfilteredcomplex2: getfilesfilteredcomplex2,
        getfileicon: getfileicon
    };
}();

CKO.CSOM.GetLookupData = function () {
    var getvalues = function (site, list, field) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + field + "'/></OrderBy><Where><IsNotNull><FieldRef Name='" + field + "'/></IsNotNull></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + field + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getvalueswithfields = function (site, list, field, fields) {
        var inc = "Include(";
        var xml = "<View><Method Name='Read List' />";
        xml += "<ViewFields>";
        for (var z = 0; z <= fields.length - 1; z++) {
            xml += "<FieldRef Name='" + fields[z] + "'/>";
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        logit("CAML from query: " + caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getvaluescurrentsite = function (list, field) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + field + "'/></OrderBy><Where><IsNotNull><FieldRef Name='" + field + "'/></IsNotNull></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + field + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var zlist = ctx.get_web().get_lists().getByTitle(list);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        ctx.load(items);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getvaluesfiltered = function (site, list, field, filterfield, filterselect) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + field + "'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>" + jQuery("#" + filterselect + " option:selected").text() + "</Value></Eq></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + field + "'/>";
        xml += "<FieldRef Name='" + filterfield + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(list);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(list);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getvaluesfiltered2 = function (site, lookuplist, orderby, filterfield, filtertag, tagtype, cascadeto) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + orderby + "'/></OrderBy><Where><Eq><FieldRef Name='" + filterfield + "' /><Value Type='Text'>";
        switch (tagtype) {
            case "select":
                xml += jQuery("#" + filtertag + " option:selected").text() + "</Value></Eq></Where></Query>";
                break;

            case "text":
                xml += jQuery("#" + filtertag).val() + "</Value></Eq></Where></Query>";
                break;
        }
        
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + orderby + "'/>";
        xml += "<FieldRef Name='" + filterfield + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        logit("getvaluesfiltered2 xml = " + xml);
        var deferred = jQuery.Deferred();
        var zctx, zlist;
        switch (site) {
            case "parent":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_site().get_rootWeb().get_lists().getByTitle(lookuplist);
                break;

            case "current":
                zctx = new SP.ClientContext.get_current();
                zlist = zctx.get_web().get_lists().getByTitle(lookuplist);
                break;

            default:
                zctx = new SP.ClientContext(site);
                zlist = zctx.get_web().get_lists().getByTitle(lookuplist);
                break;
        }
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        zctx.load(items);
        zctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, filterfield, cascadeto); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getvalues: getvalues,
        getvalueswithfields: getvalueswithfields,
        getvaluesfiltered: getvaluesfiltered,
        getvaluesfiltered2: getvaluesfiltered2,
        getvaluescurrentsite: getvaluescurrentsite
    };
}();

CKO.CSOM.FillDropdowns = function (items, field, dropdowns) {
    var opts = "<option selected value='Select...'>Select...</option>";
    var enumerator = items.getEnumerator();
    var unique = "";
    while (enumerator.moveNext()) {
        var li = enumerator.get_current();
        if (li.get_item(field) != unique) {
            opts += "<option value='" + li.get_item(field) + "'>" + li.get_item(field) + "</option>";
            unique = li.get_item(field);
        }
    }
    for (var z = 0; z <= dropdowns.length; z++) {
        jQuery("#" + dropdowns[z]).html("").append(opts);
        jQuery("#" + dropdowns[z]).attr("loaded", "true");
    }
};

CKO.CSOM.FillDropdowns2 = function (items, field, dropdown, source) {
    var opts = ""; //  "<option selected value='Select...'>Select...</option>";
    var enumerator = items.getEnumerator();
    var unique = "";
    while (enumerator.moveNext()) {
        var li = enumerator.get_current();
        if (li.get_item(field) != unique) {
            var val = String($("input[title^='" + source + "']").val());
            if (val == li.get_item(field)) {
                opts += "<option selected value='" + li.get_item(field) + "'>" + li.get_item(field) + "</option>";
            }
            else {
                opts += "<option value='" + li.get_item(field) + "'>" + li.get_item(field) + "</option>";
            }
            unique = li.get_item(field);
        }
    }
    jQuery("#" + dropdown).html("").append(opts);
};

CKO.CSOM.FillDropdownsMergeFields = function (items, fields, separator, tf, tfv, dropdowns) {
    var opts = "<option selected value='Select...'>Select...</option>";
    var enumerator = items.getEnumerator();
    var unique = "";
    while (enumerator.moveNext()) {
        var li = enumerator.get_current();
        var opt = li.get_item(tf);
        var optandsep = "";
        for (var y = 0; y < fields.length; y++) {
            if (tfv == false && fields[y] == tf) {
                // don't add the textfield (tf) to the value part of the dropdown
            }
            else {
                if (optandsep == "") {
                    optandsep += li.get_item(fields[y]);
                }
                else {
                    optandsep += separator + li.get_item(fields[y]);
                }
            }
            //if (y == 0) {
            //    if (tfv == false && fields[y] == tf) {
            //        // don't add the textfield (tf) to the value part of the dropdown
            //    }
            //    else {
            //        optandsep += li.get_item(fields[y]);
            //    }
            //}
            //else {
            //    if (tfv == false && fields[y] == tf) {
            //        // don't add the textfield (tf) to the value part of the dropdown
            //    }
            //    else {
            //        if (optandsep.substr(0,1) == "-") { 
            //            optandsep += li.get_item(fields[y]);
            //        }
            //        else {
            //            optandsep += separator + li.get_item(fields[y]);
            //        }
            //    }
            //}
        }
        opts += "<option value='" + optandsep + "'>" + opt + "</option>";
    }
    for (var z = 0; z < dropdowns.length; z++) {
        jQuery("#" + dropdowns[z]).html("").append(opts);
        jQuery("#" + dropdowns[z]).attr("loaded", "true");
    }
};

CKO.CSOM.GetListItemByID = function () {
    var getitem = function (list, id) {
        var deferred = jQuery.Deferred();
        ctxu = new SP.ClientContext.get_current();
        var zlist = ctxu.get_web().get_lists().getByTitle(list);
        var listitem = zlist.getItemById(id, "Include(EncodedAbsUrl, ContentType)");
        var ctype = listitem.get_contentType();
        ctxu.load(listitem);
        ctxu.load(ctype);
        ctxu.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem, ctype); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitembysite = function (site, list, id) {
        var deferred = jQuery.Deferred();
        ctxu = new SP.ClientContext.get_current();
        var zlist = ctxu.get_web().get_lists().getByTitle(list);
        var listitem = zlist.getItemById(id, "Include(EncodedAbsUrl, ContentType)");
        var ctype = listitem.get_contentType();
        ctxu.load(listitem);
        ctxu.load(ctype);
        ctxu.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem, ctype); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemwithcustomfields = function (list, id, fields) {
        var deferred = jQuery.Deferred();
        ctxu = new SP.ClientContext.get_current();
        var zlist = ctxu.get_web().get_lists().getByTitle(list);
        // build out fields to include
        var inc = "Include(EncodedAbsUrl, ContentType, ";
        for (var z = 0; z <= fields.length - 1; z++) {
            if (z == fields.length - 1) {
                inc += fields[z] + ")";
            }
            else {
                inc += fields[z] + ", ";
            }
        }
        logit(" getitemwithcustomfields inc = " + inc);
        var listitem = zlist.getItemById(id, inc);
        var ctype = listitem.get_contentType();
        ctxu.load(listitem);
        ctxu.load(ctype);
        ctxu.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem, ctype); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemandreturnfields = function (list, id) {
        var deferred = jQuery.Deferred();
        ctxu = new SP.ClientContext.get_current();
        var zlist = ctxu.get_web().get_lists().getByTitle(list);
        var fields = zlist.get_fields();
        var listitem = zlist.getItemById(id, "Include(FileRef)");
        ctxu.load(listitem);
        ctxu.load(fields, 'Include(Title,InternalName,FieldTypeKind,ReadOnlyField)');
        ctxu.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem, fields); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemsite = function (site, list, id) {
        var deferred = jQuery.Deferred();
        ctxu = new SP.ClientContext(site);
        var zlist = ctxu.get_web().get_lists().getByTitle(list);
        var listitem = zlist.getItemById(id, "Include(EncodedAbsUrl)");
        ctxu.load(listitem);
        ctxu.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(listitem); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getitem: getitem,
        getitemwithcustomfields: getitemwithcustomfields,
        getitemandreturnfields: getitemandreturnfields,
        getitemsite: getitemsite
    };
}();

CKO.CSOM.GetListItemByKey = function () { // Assumes only one item will have this unique value that is not the ID
    var getitem = function (list, key, keyvalue) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + key + "'/></OrderBy><Where><Eq><FieldRef Name='" + key + "' /><Value Type='Text'>" + keyvalue + "</Value></Eq></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + key + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "<FieldRef Name='EncodedAbsUrl'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var zlist = ctx.get_web().get_lists().getByTitle(list);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        ctx.load(items);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    var getitemandpassdata = function (list, key, keyvalue, data) {
        var xml = "<View><Method Name='Read List' /><Query><OrderBy><FieldRef Name='" + key + "'/></OrderBy><Where><Eq><FieldRef Name='" + key + "' /><Value Type='Text'>" + keyvalue + "</Value></Eq></Where></Query>";
        xml += "<ViewFields>";
        xml += "<FieldRef Name='" + key + "'/>";
        xml += "<FieldRef Name='ID'/>";
        xml += "<FieldRef Name='EncodedAbsUrl'/>";
        xml += "</ViewFields>";
        xml += "</View>";
        var deferred = jQuery.Deferred();
        var ctx = new SP.ClientContext.get_current();
        var zlist = ctx.get_web().get_lists().getByTitle(list);
        var caml = new SP.CamlQuery();
        caml.set_viewXml(xml);
        var items = zlist.getItems(caml);
        ctx.load(items);
        ctx.executeQueryAsync(
			Function.createDelegate(this, function () { deferred.resolve(items, data); }),
			Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
		);
        return deferred.promise();
    };

    return {
        getitem: getitem,
        getitemandpassdata: getitemandpassdata
    };
}();

CKO.FORMS.VARIABLES = {
    template: null,
    loc: String(window.location)
}

CKO.FORMS.OVERRIDES = function () {
    var v = CKO.FORMS.VARIABLES;

    function Init() {
        v.template = document.querySelector("[data-role='form']");
        if (!v.template) {
            // should not get here, but just in case
            alert("No template defined! Using standard form");
        }
        else {
            if (v.loc.indexOf("NewForm.aspx") > 0 || v.loc.indexOf("EditForm.aspx") > 0 || v.loc.indexOf("DispForm.aspx") > 0) {
                $(".ms-formtable").hide();
                $(".ms-formtoolbar").hide();
                overrideform();
            }
            else {
                logit("Not a form page!");
            }
        }
    }

    function overrideform() {
        // loop through the template fields and clone the original SharePoint drawn form controls
        $("div[data-field]").each(function (z) {
            var field = $(this).attr("data-field");
            var target = $(this);
            $("td.ms-formbody").each(function (idx) {
                if (this.innerHTML.indexOf('FieldName="' + field + '"') !== -1) {
                    $(this).contents().appendTo(target);
                }
            });
        });

        $("div[data-role='form']").show();
    }

    return {
        Init: Init
    }
}

// The termset functions assume that you are passing a context (createTermsetDialog/getTermsetByNme) and have already loaded SP.Taxonomy.js or using hack in 2010
/*
CKO.CSOM.TERMSETS.TermSetDialog = function (termset, termsetid, termstoreid, tcfield, tcdiv, field, fieldid) {
    var tagUI = $("#" + tcdiv);
    if (tagUI) {
        tagUI['InputFieldId'] = tcfield;
        tagUI['SspId'] = termstoreid;
        tagUI['TermSetId'] = termsetid;
        tagUI['IsMulti'] = false;
        tagUI['AllowFillIn'] = false;
        tagUI['WidthCSS'] = 'ms-taxonomy-width';
        tagUI['JavascriptOnValidation'] = "";
        tagUI['Lcid'] = 1033;
        tagUI['IsSpanTermSets'] = false;
        tagUI['IsSpanTermStores'] = false;
        tagUI['IsIgnoreFormatting'] = false;
        tagUI['IsIncludeDeprecated'] = false;
        tagUI['IsIncludeUnavailable'] = false;
        tagUI['IsIncludeTermSetName'] = false;
        tagUI['IsAddTerms'] = false;
        tagUI['IsIncludePathData'] = false;
        tagUI['IsUseCommaAsDelimiter'] = true;
        tagUI['Disable'] = false;
        tagUI['ExcludeKeyword'] = false;
        tagUI['WebServiceUrl'] = _spPageContextInfo.webServerRelativeUrl + 'u002f_vti_binu002fTaxonomyInternalService.json';
        tagUI['FieldName'] = field;
        tagUI['FieldId'] = fieldid;
        tagUI['DisplayPickerButton'] = true;
    }

    var _emmTaggingLoadCall;
    if (_emmTaggingLoadCall == null) {
        _emmTaggingLoadCall = true;
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            SP.SOD.registerSod('scriptforwebtaggingui.js', site + "/_layouts/scriptforwebtaggingui.js");
            EnsureScriptFunc("scriptforwebtaggingui.js", 'Microsoft.SharePoint.Taxonomy.ScriptForWebTaggingUI.taggingLoad', function () {
                Microsoft.SharePoint.Taxonomy.ScriptForWebTaggingUI.resetEventsRegistered();
            });
            EnsureScriptFunc("scriptforwebtaggingui.js", 'Microsoft.SharePoint.Taxonomy.ScriptForWebTaggingUI.onLoad', function () {
                Microsoft.SharePoint.Taxonomy.ScriptForWebTaggingUI.onLoad(tcdiv);
            });
        }, "sp.js");
    }
};

CKO.CSOM.TERMSETS.createTermsetDialog2010 = function (termset, framehtml, height, width, title, element) {
    var tsdialog = '<div id="TSModal" class="modal tsmodal">';
    tsdialog += '<div class="modal-vertical-alignment-helper">';
    tsdialog += '<div class="modal-dialog modal-vertical-align-center">';
    tsdialog += '<div class="modal-content modal-content-inherit">';
    tsdialog += '<div class="panel panel-info">';
    tsdialog += '<div class="panel-heading"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">';
    tsdialog += '�</button><h3 class="panel-title" id="TSModalTitle"></h3></div>';
    tsdialog += '<div class="panel-body">';
    tsdialog += '<div class="container-fluid" id="TSModalBody">';
    tsdialog += framehtml;
    tsdialog += '</div>';
    tsdialog += '</div></div></div></div></div></div>';

    $("body").append(tsdialog);

    $("#TSModal").on('shown.bs.modal', function (e) {
        $(".tsmodal").css({ height: height + "px" });
        $(".tsmodal").css({ width: width + "px" });
    });

    $("#TSModalTitle").html("").append("Select Term");
    $("#TSModal").modal({
        "backdrop": true,
        "keyboard": false,
        "show": true
    });
    var stop = "stop";
};

CKO.CSOM.TERMSETS.createTermsetDialog = function (termsetname, ctx, height, width, title, element) {
    var tsdialog = '<div id="TSModal" class="modal tsmodal">';
    tsdialog += '<div class="modal-vertical-alignment-helper">';
    tsdialog += '<div class="modal-dialog modal-vertical-align-center">';
    tsdialog += '<div class="modal-content modal-content-inherit">';
    tsdialog += '<div class="panel panel-info">';
    tsdialog += '<div class="panel-heading"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">';
    tsdialog += '�</button><h3 class="panel-title" id="TSModalTitle"></h3></div>';
    tsdialog += '<div class="panel-body">';
    tsdialog += '<div class="container-fluid" id="TSModalBody"></div>';
    tsdialog += '</div></div></div></div></div></div>';

    $("body").append(tsdialog);

    $("#TSModal").on('shown.bs.modal', function (e) {
        $(".tsmodal").css({ height: height + "px" });
        $(".tsmodal").css({ width: width + "px" });
    });



    $.when(CKO.CSOM.TERMSETS.getTermSetByName(termsetname, ctx, element)).then(function (terms, element) {
        CKO.CSOM.TERMSETS.makeTermTree(terms, element, function (tree, element) {
            $("#TSModalTitle").html("").append("Select Term");
            $("#TSModal").modal({
                "backdrop": true,
                "keyboard": false,
                "show": true
            });
            var stop = "stop";
        });
    }, function (sender, args) { logit("getTermSetByName Failed, " + args.get_message()); });
};
*/
CKO.CSOM.TERMSETS.getTermSetByName = function (name, ctx, element) {
    var deferred = $.Deferred();
    var taxonomysession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
    //var termstore = taxonomysession.getDefaultSiteCollectionTermStore();
    //var termsets = termstore.getTermSetsByName(name, "1033");
    var termsets = taxonomysession.getTermSetsByName(name, "1033");
    var termset = termsets.getByName(name);
    var terms = termset.getAllTerms();
    syctx.load(terms);
    syctx.executeQueryAsync(
        function () { deferred.resolve(terms, element); },
        function (sender, args) { deferred.reject(sender, args); }
    );
    return deferred.promise();
};

CKO.CSOM.TERMSETS.makeTermTree = function (terms, element, callback) {
    var tenum = terms.getEnumerator();
    tree = {
        term: terms,
        children: []
    };
    while (tenum.moveNext()) {
        var currentterm = tenum.get_current();
        var currenttermpath = currentterm.get_pathOfTerm().split(';');
        var children = tree.children;
        for (var i = 0; i < currenttermpath.length; i++) {
            var found = false;
            for (var k = 0; k < children.length; k++) {
                if (children[k].name === currenttermpath[i]) {
                    found = true;
                    break;
                }
            }
            var term = found ? children[k] : { name: currenttermpath[i], children: [] };
            if (i === currenttermpath.length - 1) {
                term.term = currentterm;
                term.name = currentterm.get_name();
                term.startswith = currentterm.get_name().substring(0, 1);
                term.guid = currentterm.get_id().toString();
            }
            if (found) {
                children = term.children;
            }
            else {
                children.push(term);
                if (i !== currenttermpath.length - 1) {
                    children = term.children;
                }
            }
        }
    }
    tree = CKO.CSOM.TERMSETS.sortTree(tree);

    callback(tree, element);
};

CKO.CSOM.TERMSETS.sortTree = function (tree) {
    var sortOrder = null;
    if (tree.children.length && tree.term.get_customSortOrder) {
        if (tree.children.length && tree.term.get_customSortOrder()) {
            sortOrder = tree.term.get_customSortOrder();
        }

        if (sortOrder) {
            sortOrder = sortOrder.split(':');
            tree.children.sort(function (a, b) {
                var indexA = sortOrder.indexOf(a.guid);
                var indexB = sortOrder.indexOf(b.guid);
                if (indexA > indexB) {
                    return 1;
                } else if (indexA < indexB) {
                    return -1;
                }
                return 0;
            });
        }
        else {
            tree.children.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
    }

    for (var v = 0; v < tree.children.length; v++) {
        tree.children[v] = CKO.CSOM.TERMSETS.sortTree(tree.children[v]);
    }

    return tree;
};

CKO.CSOM.TERMSETS.drawTerm = function (term, type) {
    html = '';
    switch (type) {

        case "footer":
            html += '<div class="' + term.class + '" id="' + term.divid + '">';
            if (term.children && term.children.length) {
                html += '<ul class="nnsfooterlistcol">';
                for (var h = 0; h < term.children.length; h++) {
                    html += CKO.CSOM.TERMSETS.drawTerm(term.children[h], "footerchild");
                }
                html += '</ul>';
            }
            html += '</div>';
            break;

        case "footerchild":
            html += '<li><a href="' + term.url + '">' + term.name + '</a></li>';
            break;
    }
    return html;
};