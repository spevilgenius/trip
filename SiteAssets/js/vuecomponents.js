var SLASH = "/";
var tp1 = new String(window.location.protocol);
var tp2 = new String(window.location.host);
var site = tp1 + SLASH + SLASH + tp2 + _spPageContextInfo.webServerRelativeUrl;
//var recommendations = [];
// #region 
//var DashboardLayoutTemplate = "";
//DashboardLayoutTemplate += "<div class='container-fluid dashboard'>";
//DashboardLayoutTemplate += "    <div class='row'>";
//DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-8 padlr5'>";
//DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByDate'>";
//DashboardLayoutTemplate += "                <div class='panel-heading'>Recommendations By Date</div>";
//DashboardLayoutTemplate += "                <div class='panel-body'>";
//DashboardLayoutTemplate += "                    <recommendations-table></recommendations-table>";
//DashboardLayoutTemplate += "    	        <\/div>";
//DashboardLayoutTemplate += "    	    <\/div>";
//DashboardLayoutTemplate += "    	<\/div>";
//DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-4 padlr5'>";
//DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByStatus'>";
//DashboardLayoutTemplate += "                <div class='panel-heading'>Recommendations By Status</div>";
//DashboardLayoutTemplate += "                <div class='panel-body'>";
//DashboardLayoutTemplate += "                    <recommendations-by-status></recommendations-by-status>";
//DashboardLayoutTemplate += "    	        <\/div>";
//DashboardLayoutTemplate += "    	    <\/div>";
//DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByOrg'>";
//DashboardLayoutTemplate += "                <div class='panel-heading'>Recommendations By Tasked Org</div>";
//DashboardLayoutTemplate += "                <div class='panel-body'>";
//DashboardLayoutTemplate += "                    <recommendations-by-org></recommendations-by-org>";
//DashboardLayoutTemplate += "    	        <\/div>";
//DashboardLayoutTemplate += "    	    <\/div>";
//DashboardLayoutTemplate += "    	<\/div>";
//DashboardLayoutTemplate += "    <\/div>";
//DashboardLayoutTemplate += "<\/div>";
// #endregion
// #region DashboardLayoutTemplate
var DashboardLayoutTemplate = "";
DashboardLayoutTemplate += "<div class='container-fluid dashboard'>";
DashboardLayoutTemplate += "    <div class='row'>";
DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-8 padlr5'>";
DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByDate'>";
DashboardLayoutTemplate += "                <div class='panel-heading'>Recommendations By Date</div>";
DashboardLayoutTemplate += "                <div class='panel-body'>";
DashboardLayoutTemplate += "                    <recommendations-table></recommendations-table>";
DashboardLayoutTemplate += "    	        <\/div>";
DashboardLayoutTemplate += "    	    <\/div>";
DashboardLayoutTemplate += "    	<\/div>";
DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-4 padlr5'>";
DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsSummary'>";
DashboardLayoutTemplate += "                <div class='panel-heading'>Recommendations</div>";
DashboardLayoutTemplate += "                <div class='panel-body'>";
DashboardLayoutTemplate += "                    <recommendations-summary></recommendations-summary>";
DashboardLayoutTemplate += "    	        <\/div>";
DashboardLayoutTemplate += "    	    <\/div>";
DashboardLayoutTemplate += "    	<\/div>";
DashboardLayoutTemplate += "    <\/div>";
DashboardLayoutTemplate += "    <div class='row'>";
DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-4 padlr5'>";
DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByStatus'>";
DashboardLayoutTemplate += "                <div class='panel-heading'>Active Recommendations By Status</div>";
DashboardLayoutTemplate += "                <div class='panel-body'>";
DashboardLayoutTemplate += "                    <recommendations-by-status></recommendations-by-status>";
DashboardLayoutTemplate += "    	        <\/div>";
DashboardLayoutTemplate += "    	    <\/div>";
DashboardLayoutTemplate += "    	<\/div>";
DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-4 padlr5'>";
DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlRecsByOrg'>";
DashboardLayoutTemplate += "                <div class='panel-heading'>Active Recommendations By Lead</div>";
DashboardLayoutTemplate += "                <div class='panel-body'>";
DashboardLayoutTemplate += "                    <recommendations-by-org></recommendations-by-org>";
DashboardLayoutTemplate += "    	        <\/div>";
DashboardLayoutTemplate += "    	    <\/div>";
DashboardLayoutTemplate += "    	<\/div>";
DashboardLayoutTemplate += "    	<div class='col-xs-12 col-sm-12 col-md-12 col-lg-4 padlr5'>";
DashboardLayoutTemplate += "            <div class='panel panel-black' id='pnlImpRecsByOrg'>";
DashboardLayoutTemplate += "                <div class='panel-heading'>Implemented Recommendations By Lead</div>";
DashboardLayoutTemplate += "                <div class='panel-body'>";
DashboardLayoutTemplate += "                    <recommendations-implemented-by-org></recommendations-implemented-by-org>";
DashboardLayoutTemplate += "    	        <\/div>";
DashboardLayoutTemplate += "    	    <\/div>";
DashboardLayoutTemplate += "    	<\/div>";
DashboardLayoutTemplate += "    <\/div>";
DashboardLayoutTemplate += "<\/div>";
// #endregion
// #region RecommendationsTableTemplate
var RecommendationsTableTemplate = "";
RecommendationsTableTemplate += "<table id='tblRecommendations' class='recommendationtable' cellspacing='0' cellpadding='0' class='table table-bordered table-hover'>"
RecommendationsTableTemplate += "<thead><tr><th>Topic</th><th>Date Received</th><th title='In Days'>Age</th><th>AI2 Category</th><th>Lead</th><th>Status</th></tr>";
RecommendationsTableTemplate += "</thead><tbody>";
RecommendationsTableTemplate += "<tr id='LoadingRow'><td colspan='7'>";
RecommendationsTableTemplate += "<table style='height:100%;width:100%;'>";
RecommendationsTableTemplate += "<tr><td align='center'><img src='/_layouts/images/gears_an.gif' /></td></tr>";
RecommendationsTableTemplate += "<tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.</div></td></tr>";
RecommendationsTableTemplate += "</table>";
RecommendationsTableTemplate += "</td></tr>";
RecommendationsTableTemplate += "<tr v-for='rec in recs'>";
RecommendationsTableTemplate += "<td><a class='topiclink' v-bind:id='rec.Id' @click='editRec(rec.Id)'>{{rec.Topic}}</a></td>";
RecommendationsTableTemplate += "<td>{{formatDate(rec.Created)}}</td>";
RecommendationsTableTemplate += "<td>{{getAge(rec.Created)}}</td>";
RecommendationsTableTemplate += "<td>{{rec.TagsValue}}</td>";
RecommendationsTableTemplate += "<td>{{rec.TaskedOrganizationLeadValue}}</td>";
RecommendationsTableTemplate += "<td>{{rec.RecommendationStatusValue}}</td></tr>";
RecommendationsTableTemplate += "</tbody></table>";
// #endregion
// #region RecommendationsByStatusTemplate
var RecommendationsByStatusTemplate = "";
RecommendationsByStatusTemplate += "<div id=\"RBSChart\">";
RecommendationsByStatusTemplate += "    <table style=\"height:100%;width:100%;\">";
RecommendationsByStatusTemplate += "        <tr><td align='center'><img src='\/_layouts\/images\/gears_an.gif' \/><\/td><\/tr>";
RecommendationsByStatusTemplate += "        <tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.<\/div><\/td><\/tr>";
RecommendationsByStatusTemplate += "    <\/table>";
RecommendationsByStatusTemplate += "<\/div>";
// #endregion
// #region RecommendationsByOrgTemplate
var RecommendationsByOrgTemplate = "";
RecommendationsByOrgTemplate += "<div id=\"RBOChart\">";
RecommendationsByOrgTemplate += "    <table style=\"height:100%;width:100%;\">";
RecommendationsByOrgTemplate += "        <tr><td align='center'><img src='\/_layouts\/images\/gears_an.gif' \/><\/td><\/tr>";
RecommendationsByOrgTemplate += "        <tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.<\/div><\/td><\/tr>";
RecommendationsByOrgTemplate += "    <\/table>";
RecommendationsByOrgTemplate += "<\/div>";
// #endregion
// #region ImplementedByOrgTemplate
var ImplementedByOrgTemplate = "";
ImplementedByOrgTemplate += "<div id=\"IBOChart\">";
ImplementedByOrgTemplate += "    <table style=\"height:100%;width:100%;\">";
ImplementedByOrgTemplate += "        <tr><td align='center'><img src='\/_layouts\/images\/gears_an.gif' \/><\/td><\/tr>";
ImplementedByOrgTemplate += "        <tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.<\/div><\/td><\/tr>";
ImplementedByOrgTemplate += "    <\/table>";
ImplementedByOrgTemplate += "<\/div>";
// #endregion
// #region RECSummaryTemplate
var RECSummaryTemplate = "<div id='RecSummary'>";
RECSummaryTemplate += "    <table style=\"height:100%;width:100%;\">";
RECSummaryTemplate += "        <tr><td align='center'><img src='\/_layouts\/images\/gears_an.gif' \/><\/td><\/tr>";
RECSummaryTemplate += "        <tr><td align='center'><div style='margin-top: 10px; font-size: 16px;'>Getting Data...Please wait.<\/div><\/td><\/tr>";
RECSummaryTemplate += "    <\/table>";
RECSummaryTemplate += "</div>"
// #endregion
// #region AI2Options
var AI2Options = "<option></option>";
AI2Options += "<option>Acquisition</option>";
AI2Options += "<option>Communications</option>";
AI2Options += "<option>Cyber</option>";
AI2Options += "<option>Equipping</option>";
AI2Options += "<option>Finance</option>";
AI2Options += "<option>Intelligence</option>";
AI2Options += "<option>Leader Development</option>";
AI2Options += "<option>Logistics</option>";
AI2Options += "<option>Military and Civilian Manning</option>";
AI2Options += "<option>Medical</option>";
AI2Options += "<option>Network</option>";
AI2Options += "<option>Readiness</option>";
AI2Options += "<option>Research / Development / Engineering</option>";
AI2Options += "<option>Security</option>";
AI2Options += "<option>Training</option>";
AI2Options += "<option>Warfighting</option>";
AI2Options += "<option>Z – Other</option>";
AI2Options += "</select>";
// #endregion

var RecommendationsTable = {
    template: RecommendationsTableTemplate,
    data: function () {
        return {
            recommendations: [],
            recs: []
        }
    },
    created: function () {
        this.getTableData(null);
    },
    methods: {
        getTableData: function (zurl) {
            if (zurl === null) {
                zurl = site + "/_vti_bin/listdata.svc/Recommendations?";
                zurl += "$select=Id,Created,RecommendationStatusValue,Topic,TaskedOrganizationLeadValue,TagsValue";
                zurl += "&$orderby=Created";
                zurl += "&$filter=(not substringof('Implemented', RecommendationStatusValue))";
            }
            logit("RECOMMENDATIONS URL: " + zurl);
            var vm = this;
            jQuery.ajax({
                url: zurl,
                method: "GET",
                headers: { 'accept': 'application/json; odata=verbose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    vm.recommendations = vm.recommendations.concat(data.d.results);
                    if (data.d.__next) {
                        zurl = data.d.__next;
                        vm.getTableData(zurl);
                    }
                    else {
                        vm.recommendations = jQuery.parseJSON(JSON.stringify(vm.recommendations));
                        vm.recs = vm.recommendations;
                    }
                }
            });
        },
        formatDate: function (d) {
            return d === null ? "" : moment(d).format("MM-DD-YYYY");
        },
        getAge: function (d) {
            var a = moment();
            var b = moment(d);
            var age = a.diff(b, 'days');// + " days";
            return age;
        },
        editRec: function (id) {
            zurl = fixurl('/Lists/Recommendations/EditForm.aspx?ID=' + id + '&IsDlg=1');
            CKODialog(zurl, 'Edit Recommendation', '1100', '800', 'NotificationCallback');
        }
    },
    updated: function () {
        this.$nextTick(function () {
            $("#LoadingRow").remove();

            $('#tblRecommendations thead th').each(function () {
                var title = $('#tblRecommendations thead th').eq($(this).index()).text();
                if (title.indexOf("AI2") >= 0) {
                    $(this).html(title + '<br/><select style="width: 85%;">' + AI2Options + '</select>');
                }
                else {
                    $(this).html(title + '<br/><input type="text" placeholder="Search" style="width: 85%;" />');
                }
            });

            var rectable = $("#tblRecommendations").DataTable({
                scrollY: "300px",
                "order": [[1, "asc"]]
            });

            rectable.columns().eq(0).each(function (colIdx) {
                var zhtml = $(this).html();
                $('input', rectable.column(colIdx).header()).on('keyup change', function () {
                    rectable
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });

                $('select', rectable.column(colIdx).header()).on('change', function () {
                    rectable
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });

                $('input', rectable.column(colIdx).header()).on('click', function (e) {
                    e.stopPropagation();
                });

                $('select', rectable.column(colIdx).header()).on('click', function (e) {
                    e.stopPropagation();
                });
            });
        });
    }
}

var RecSummaryTable = {
    template: RECSummaryTemplate,
    data: function () {
        return {
            recommendations: [],
        }
    },
    created: function () {
        this.getTableData(null);
    },
    methods: {
        getTableData: function (zurl) {
            if (zurl === null) {
                zurl = site + "/_vti_bin/listdata.svc/Recommendations?";
                zurl += "$select=Id,Created,RecommendationStatusValue";
            }
            logit("SUMMARY URL: " + zurl);
            var rs = this;
            jQuery.ajax({
                url: zurl,
                method: "GET",
                headers: { 'accept': 'application/json; odata=verbose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    rs.recommendations = rs.recommendations.concat(data.d.results);
                    if (data.d.__next) {
                        zurl = data.d.__next;
                        rs.getTableData(zurl);
                    }
                    else {
                        rs.recommendations = jQuery.parseJSON(JSON.stringify(rs.recommendations));
                        rs.drawTable(rs.recommendations);
                    }
                }
            });
        },
        drawTable: function (recs) {
            var total = 0, active = 0, imp = 0, notimp = 0;
            for (i = 0; i < recs.length; i++) {
                var status = recs[i]["RecommendationStatusValue"];
                status = status.split(":")[0];
                switch (status) {
                    case "Implemented":
                        imp += 1;
                        total += 1;
                        break;

                    case "Not Implemented":
                        notimp += 1;
                        total += 1;
                        break;

                    default:
                        active += 1;
                        total += 1;
                        break;
                }
            }
            var html = "<div class='container-fluid'>";
            html += "<div class='row summaryrow'><div class='col-xs-6 summarytext'>Active:</div><div class='col-xs-6'><span class='summaryvalue'>";
            html += active;
            html += "</span></div></div>";
            html += "<div class='row summaryrow'><div class='col-xs-6 summarytext'>Implemented:</div><div class='col-xs-6'><span class='summaryvalue'>";
            html += imp;
            html += "</span></div></div>";
            html += "<div class='row summaryrow'><div class='col-xs-6 summarytext'>Not Implemented:</div><div class='col-xs-6'><span class='summaryvalue'>";
            html += notimp;
            html += "</span></div></div>";
            html += "<div class='row summaryrow'><div class='col-xs-6 summarytext'>Total:</div><div class='col-xs-6'><span class='summaryvalue'>";
            html += total;
            html += "</span></div></div>";
            html += "</div>"
            $("#RecSummary").html("").append(html);
        }
    }
}

var RecommendationsByStatus = {
    template: RecommendationsByStatusTemplate,
    data: function () {
        return {
            recommendations: []
        }
    },
    created: function () {
        this.getTableData(null);
    },
    methods: {
        getTableData: function (zurl) {
            if (zurl === null) {
                zurl = site + "/_vti_bin/listdata.svc/Recommendations?";
                zurl += "$select=Id,RecommendationStatusValue";
                zurl += "&$filter=(not substringof('Implemented', RecommendationStatusValue))";
            }
            logit("RBS URL: " + zurl);
            var rbs = this;
            jQuery.ajax({
                url: zurl,
                method: "GET",
                headers: { 'accept': 'application/json; odata=verbose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    rbs.recommendations = rbs.recommendations.concat(data.d.results);
                    if (data.d.__next) {
                        zurl = data.d.__next;
                        rbs.getTableData(zurl);
                    }
                    else {
                        rbs.recommendations = jQuery.parseJSON(JSON.stringify(rbs.recommendations));
                        rbs.drawPieChart(rbs.recommendations);
                    }
                }
            });
        },
        drawPieChart: function (recs) {
            var stats = ['New', 'Initial Review', 'Task Order', 'Pending Final Review', 'Pending Implementation'];
            var chartdata = [];
            for (i = 0; i < stats.length; i++) {
                chartdata.push({
                    'name': stats[i],
                    'y': 0
                });
            }
            for (i = 0; i < recs.length; i++) {
                var status = recs[i]["RecommendationStatusValue"];
                status = status.split(":")[0];
                for (k = 0; k < chartdata.length; k++) {
                    if (chartdata[k].name === status) {
                        chartdata[k]['y'] += 1;
                    }
                }
            }
            Highcharts.chart('RBSChart', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Active Recommendations By Status'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Status',
                    colorByPoint: true,
                    data: chartdata
                }]
            });
        }
    },
    updated: function () {
        this.$nextTick(function () {
            
        })
    }
}

var RecommendationsByOrg = {
    template: RecommendationsByOrgTemplate,
    data: function () {
        return {
            recommendations: []
        }
    },
    created: function () {
        this.getTableData(null);
    },
    methods: {
        getTableData: function (zurl) {
            if (zurl === null) {
                zurl = site + "/_vti_bin/listdata.svc/Recommendations?";
                zurl += "$select=Id,RecommendationStatusValue,TaskedOrganizationLeadValue";
                zurl += "&$filter=(not substringof('Implemented', RecommendationStatusValue))";
            }
            logit("RBO URL: " + zurl);
            var rbo = this;
            jQuery.ajax({
                url: zurl,
                method: "GET",
                headers: { 'accept': 'application/json; odata=verbose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    rbo.recommendations = rbo.recommendations.concat(data.d.results);
                    if (data.d.__next) {
                        zurl = data.d.__next;
                        getTableData(zurl);
                    }
                    else {
                        rbo.recommendations = jQuery.parseJSON(JSON.stringify(rbo.recommendations));
                        rbo.drawPieChart(rbo.recommendations);
                    }
                }
            });
        },
        drawPieChart: function (recs) {
            var pointdata = [];
            var chartdata = [];
            // loop the recommendations and get the unique tasked orgs
            for (i = 0; i < recs.length; i++) {
                var org = recs[i]["TaskedOrganizationLeadValue"];
                if (pointdata.indexOf(org) < 0) {
                    pointdata.push(org);
                }
            }
            for (i = 0; i < pointdata.length; i++) {
                chartdata.push({
                    'name': pointdata[i],
                    'y': 0
                });
            }
            for (i = 0; i < recs.length; i++) {
                var org = recs[i]["TaskedOrganizationLeadValue"];
                for (k = 0; k < chartdata.length; k++) {
                    if (chartdata[k].name === org) {
                        chartdata[k]['y'] += 1;
                    }
                }
            }
            Highcharts.chart('RBOChart', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Active Recommendations By Lead'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Tasked Org',
                    colorByPoint: true,
                    data: chartdata
                }]
            });
        }
    },
    updated: function () {
        this.$nextTick(function () {

        })
    }
}

var ImplementedByOrg = {
    template: ImplementedByOrgTemplate,
    data: function () {
        return {
            recommendations: []
        }
    },
    created: function () {
        this.getTableData(null);
    },
    methods: {
        getTableData: function (zurl) {
            if (zurl === null) {
                zurl = site + "/_vti_bin/listdata.svc/Recommendations?";
                zurl += "$select=Id,TaskedOrganizationLeadValue";
                zurl += "&$filter=(RecommendationStatusValue eq 'Implemented: Step 6 of 6')";
            }
            logit("IBO URL: " + zurl);
            var ibo = this;
            jQuery.ajax({
                url: zurl,
                method: "GET",
                headers: { 'accept': 'application/json; odata=veibose' },
                error: function (jqXHR, textStatus, errorThrown) {
                    logit("Error Status: " + textStatus + ":: errorThrown: " + errorThrown);
                },
                success: function (data) {
                    ibo.recommendations = ibo.recommendations.concat(data.d.results);
                    if (data.d.__next) {
                        zurl = data.d.__next;
                        getTableData(zurl);
                    }
                    else {
                        ibo.recommendations = jQuery.parseJSON(JSON.stringify(ibo.recommendations));
                        ibo.drawPieChart(ibo.recommendations);
                    }
                }
            });
        },
        drawPieChart: function (recs) {
            var pointdata = [];
            var chartdata = [];
            // loop the recommendations and get the unique tasked orgs
            for (i = 0; i < recs.length; i++) {
                var org = recs[i]["TaskedOrganizationLeadValue"];
                if (pointdata.indexOf(org) < 0) {
                    pointdata.push(org);
                }
            }
            for (i = 0; i < pointdata.length; i++) {
                chartdata.push({
                    'name': pointdata[i],
                    'y': 0
                });
            }
            for (i = 0; i < recs.length; i++) {
                var org = recs[i]["TaskedOrganizationLeadValue"];
                for (k = 0; k < chartdata.length; k++) {
                    if (chartdata[k].name === org) {
                        chartdata[k]['y'] += 1;
                    }
                }
            }
            Highcharts.chart('IBOChart', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Implemented Recommendations By Lead'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Tasked Org',
                    colorByPoint: true,
                    data: chartdata
                }]
            });
        }
    },
    updated: function () {
        this.$nextTick(function () {

        })
    }
}

var DashboardLayout = {
    template: DashboardLayoutTemplate,
    data: function () {
        return {
            msg: 'component loaded'
        }
    },
    components: {
        'recommendations-table': RecommendationsTable,
        'recommendations-by-status': RecommendationsByStatus,
        'recommendations-by-org': RecommendationsByOrg,
        'recommendations-implemented-by-org': ImplementedByOrg,
        'recommendations-summary': RecSummaryTable
    }
}
