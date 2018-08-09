var CKO = CKO || {};
CKO.AJAX = CKO.AJAX || {};
CKO.FORMS = CKO.FORMS || {};
CKO.FORMS.RECOMMENDATIONS = CKO.FORMS.RECOMMENDATIONS || {};

CKO.FORMS.RECOMMENDATIONS.VARIABLES = {
    newform: null,
    site: null,
    loc: String(window.location),
    waitmsg: null,
    errortext: "Please fill out the fields: ",
    ctx: null,
    ako: false,
    html: "",
    recommendations: [],
    ranksource: null
};

CKO.FORMS.RECOMMENDATIONS.NewForm = function () {

    var v = CKO.FORMS.RECOMMENDATIONS.VARIABLES;

    function Init(site) {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            CKO.FORMS.OVERRIDES().Init(site);
            FormLoaded(site);
        }, "sp.js");
    }

    function FormLoaded(site) {
        v.site = site;
        loadCSS(v.site + '/SiteAssets/css/CEWP_Forms_RecommendationForms.css');
        //loadCSS(v.site + '/SiteAssets/css/jquery.dataTables.min.css');
        loadCSS(v.site + '/SiteAssets/css/jquery.qtip.css');

        $("input").addClass("form-control");
        $("select").addClass("form-control");
        $("textarea").addClass("form-control");
        window.setTimeout(function () {
            $("div[role='textbox']").addClass("form-control");
            $("div[role='textbox']").css(
                { 'height': '34px' },
                { 'padding': '6px 6px' },
                { 'font-size': '13px' },
                { 'line-height': 1 },
                { 'color': '#555555' },
                { 'background-color': '#ffffff' },
                { 'background-image': 'none' },
                { 'border': '1px solid #cccccc !important' },
                { 'border-radius': '4px' },
                { '-webkit-box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075)' },
                { 'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075)' },
                { '-webkit-transition': 'border-color ease -in -out .15s, box-shadow ease -in -out .15s' },
                { '-o-transition': 'border-color ease -in -out .15s, box-shadow ease -in -out .15s' },
                { 'transition': 'border-color ease -in -out .15s, box-shadow ease -in -out .15s' }
            );
        }, 3000);

        $("#btnSave").on("click", function () {
            SaveRecommendation();
        });

        $("#btnCancel").on("click", function () {
            Cancel();
        });
        
        $(".ms-cui-group").each(function () {
            switch ($(this).attr("id")) {
                case "Ribbon.ListForm.Edit.Commit":
                    $(this).css({ "display": "none" });
                    break;

                case "Ribbon.ListForm.Edit.Actions":
                    $(this).css({ "display": "none" });
                    break;
            }
        });

        // Go get the 50 latest recommendations and display in tab
        v.html = "";
        loadscript(v.site + '/SiteAssets/js/jquery.qtip.min.js', function () {
            LoadRecommendations();
        });
    }

    function LoadRecommendations() {
        v.recommendations = [];
        var urlString = v.site + "/_vti_bin/listdata.svc/Recommendations?";
        urlString += "$select=Id,Topic,RecommendationStatusValue,ProblemStatement,RecommendedSolution,TagsValue,Created";
        //urlString += "&$filter=(DirectiveStatusValue eq 'InProgress')";
        urlString += "&$orderby=Created&$top=100";
        logit(urlString);

        jQuery.ajax({
            url: urlString,
            method: "GET",
            headers: { 'accept': 'application/json; odata=verbose' },
            error: function (jqXHR, textStatus, errorThrown) {
                logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
            },
            success: function (data) {
                var results = data.d;
                var j = jQuery.parseJSON(JSON.stringify(results));
                v.html += "<table id='tblRecommendations' class='display'>";
                v.html += "<thead><tr><th>Reform Topic</th><th>Status</th><th>Tag</th><th>Created</th></tr></thead>";
                v.html += "<tbody>";
                for (i = 0; i < j.length; i++) {
                    //var phtml = "";
                    var phtml = "<div class='row' style='margin-bottom: 10px;'><div class='col-xs-3' style='font-size:12px;'>Reform Topic</div><div class='col-xs-9' style='font-size:12px;'><span class='popvalue'>";
                    phtml += j[i]["Topic"];
                    phtml += "</span></div></div>";
                    phtml += "<div class='row' style='margin-bottom: 10px;'><div class='col-xs-3' style='font-size:12px;'>Problem Statement</div><div class='col-xs-9' style='font-size:12px;'><span class='popvalue'>";
                    phtml += j[i]["ProblemStatement"];
                    phtml += "</span></div></div>";
                    phtml += "<div class='row' style='margin-bottom: 10px;'><div class='col-xs-3' style='font-size:12px;'>Recommended Solution</div><div class='col-xs-9' style='font-size:12px;'><span class='popvalue'>";
                    phtml += j[i]["RecommendedSolution"];
                    phtml += "</span></div></div>";

                    v.html += "<tr><td><a class='topiclink' id='" + j[i]["Id"] + "'>" + j[i]["Topic"]; + "</a>";
                    v.html += "<div class='divPop' style='display: none;'>" + phtml + "</div>";
                    v.html += "</td><td>";
                    v.html += j[i]["RecommendationStatusValue"];
                    v.html += "</td><td>";
                    v.html += j[i]["TagsValue"];
                    v.html += "</td><td>";
                    v.html += moment(j[i]["Created"]).add(8, "hours").format("MM-DD-YYYY");
                    v.html += "</td></tr>";
                }
                v.html += "</tbody></table>";
                $("#tabRecs").html("").append(v.html);

                $("#tblRecommendations").DataTable();

                $(".topiclink").on('click', function () {
                    var phtml = $(this).parent().find(".divPop").html();
                    $("#TRIPModalBody").html('').append(phtml);
                    $("#TRIPModalTitle").html('Topic Information');
                    $("#TRIPModal").modal({
                        "backdrop": true,
                        "keyboard": false,
                        "show": true
                    });
                });
            }
        });
    }

    function iFrameLoaded(id, src, appendTo) {
        var deferred = $.Deferred(),
            iframe = $("<iframe style='height: 500px; width: 800px; display: none;'></iframe>").attr({
                "id": id,
                "src": src
            });

        iframe.load(deferred.resolve);
        iframe.appendTo("#" + appendTo);

        deferred.done(function () {
            console.log("iframe loaded: " + id);
        });

        return deferred.promise();
    }

    function changeme(obj) {
        switch (obj.id) {
            case "ddRank":
                $("input[title*='Rank']").val($("#ddRank option:selected").val());
                break;
        }
    }

    function SaveRecommendation() {
        $("#FormError").remove();
        v.errortext = "Please fill out the fields: ";
        var goon = true;

        if ($("input[title='Topic Required Field']").val() === "") {
            goon = false;
            v.errortext += "Topic ";
        }

        if ($("input[title='FirstName Required Field']").val() === "") {
            goon = false;
            v.errortext += "First Name ";
        }

        if ($("input[title='LastName Required Field']").val() === "") {
            goon = false;
            v.errortext += "Last Name ";
        }

        if ($("select[title='Personnel Category Required Field']").val() === "") {
            goon = false;
            v.errortext += "Personnel Category ";
        }

        if ($("select[title='Organization Required Field']").val() === "") {
            goon = false;
            v.errortext += "Organization ";
        }

        if ($("input[title='WorkPhone Required Field']").val() === "") {
            goon = false;
            v.errortext += "Work Phone ";
        }

        if ($("input[title='MilitaryEmail Required Field']").val() === "") {
            goon = false;
            v.errortext += "Military Email ";
        }

        if ($("textarea[title*='Problem Statement Required Field']").val().trim().length <= 5) {
            goon = false;
            v.errortext += "Problem Statement ";
        }

        if ($("textarea[title*='Recommended Solution Required Field']").val().trim().length <= 5) {
            goon = false;
            v.errortext += "Recommended Solution ";
        }

        if (goon === true) {
            $(window).on('unload', function () {
                var returndata = [];
                returndata[0] = "AddRecommendation";
                returndata[1] = "Recommendation Added";
                returndata[2] = v.site + "/Pages/ThankYou.aspx";
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
            });
            $("input[id*='SaveItem']").trigger('click');
        }
        else {
            var ehtml = "<li id='FormError' class='ms-cui-group' style='width: 400px; background-color: red;'>";
            ehtml += "<div class='container-fluid' style='padding: 36px; text-align: center; color: black; font-size: 16px;'>";
            ehtml += v.errortext + "</div></li>";
            $("ul[id='Ribbon.ListForm.Edit']").append(ehtml);
            v.errortext = "Please fill out the fields: ";
        }
    }

    function Cancel() {
        var returndata = [];
        returndata[0] = "CancelRecommendation";
        returndata[1] = "Operation Cancelled";
        returndata[2] = v.site + "/Pages/Cancelled.aspx?IsDlg=1";
        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, returndata);
        //SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
    }

    return {
        Init: Init,
        changeme: changeme
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_NewRecommendationForm.js');