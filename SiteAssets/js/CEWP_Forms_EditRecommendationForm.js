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
    title: "",
    action: jQuery.QueryString["Action"],
    id: jQuery.QueryString["ID"]
}

CKO.FORMS.RECOMMENDATIONS.EditForm = function () {

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

        //$("#idAttachmentsRow").appendTo($("#CustomAttachments"));
        
        $("#btnSave").on("click", function () {
            SaveRecommendation();
        });

        $("#btnCancel").on("click", function () {
            Cancel();
        });

        try {
            SP.UI.UIUtility.setInnerText(parent.document.getElementById("dialogTitleSpan"), "Recommendation: " + $("input[title='Topic Required Field']").val());
        }
        catch (e) { /* do nothing */ }

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

        // Go Get The Attachments and display them
       
        GetAttachments(v.id);
        
    }

    function GetAttachments(itemId) {
        $().SPServices({
            operation: "GetAttachmentCollection",
            listName: "Recommendations",
            ID: v.id,
            completefunc: function (xData, Status) {
                var output = "";
                $(xData.responseXML).find("Attachments > Attachment").each(function (i, el) {
                    var $node = $(this),
                    filePath = $node.text(),
                    arrString = filePath.split("/"),
                    fileName = arrString[arrString.length - 1];
                    output += "<tr><td colspan='2'><a href='" + filePath + "' target='_blank'>" + fileName + "</a></td>";
                    output += "<td><button type='button' data-path='" + filePath + "' data-id='" + v.id + "' class='btn btn-danger btndeleteattachment'>Delete</button></td></tr>";
                });

                // add controls to add attachments

                output += "<tr><td><input class='ms-fileinput form-control' id='AttachFile' type='file'/></td>";
                output += "<td><button type='button' class='btn btn-success btnattach'>Attach</button></td><td><button type='button' class='btn btn-danger btncancelattach'>Cancel</button>"

                $("#CustomAttachments").html(output);

                $(".btndeleteattachment").on("click", function () {
                    DeleteAttachment($(this).attr("data-id"), $(this).attr("data-path"));
                });

                $(".btnattach").on("click", function () {

                    input = document.getElementById('AttachFile');
                    if (!input) {
                        alert("Um, couldn't find the fileinput element.");
                    }
                    else if (!input.files) {
                        alert("This browser doesn't seem to support the `files` property of file inputs.");
                    }

                    var file = input.files[0];
                    AttachFile(file);
                });

                $(".btncancelattach").on("click", function () {
                    $("#AttachFile").replaceWith($("#AttachFile").clone());
                });
            }
        });
    };

    function AttachFile(file) {
        getFileBuffer(file).then(function (buffer) {
            var binary = "";
            var bytes = new Uint8Array(buffer);
            var i = bytes.byteLength;
            while (i--) {
                binary = String.fromCharCode(bytes[i]) + binary;
            }

            $().SPServices({
                operation: "AddAttachment",
                listName: "Recommendations",
                listItemID: v.id,
                fileName: file.name,
                attachment: btoa(binary)
            });

            window.setTimeout(function () {
                GetAttachments(v.id);
            }, 2000);
        });
    }

    function getFileBuffer(file) {
        var deferred = $.Deferred();
        var reader = new FileReader();
        reader.onload = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(file);
        return deferred.promise();
    }

    function DeleteAttachment(itemId, filePath) {
        $().SPServices({
            operation: "DeleteAttachment",
            listName: "Recommendations",
            listItemID: itemId, //list item id
            url: filePath, //url of attachment that needs to be deleted
            completefunc: function (xData, Status) {
                alert('Attachment Deleted');
                GetAttachments(v.id);
            }
        });
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

        if ($("select[title='Submitter Category Required Field']").val() === "") {
            goon = false;
            v.errortext += "Submitter Category ";
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
                returndata[0] = "Refresh";
                returndata[1] = "Recommendation Edited";
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
        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel);
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Forms_EditRecommendationForm.js');