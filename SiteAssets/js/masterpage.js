jQuery(document).ready(function ($) {
    test = new String(window.location);
    if (test.indexOf("ako") > 0) { } else {
        //var tp1 = String(jQuery("#welcomeMenuBox").find("a[title='Open Menu']").text()); // >=2013
        var tp1 = String(jQuery("span[title='Open Menu']").closest("span").text()); // =2010
        //tp1 = tp1.substring(0, tp1.indexOf("Use")); // >=2013
        tp1 = tp1.replace("Site Actions", ""); // =2010
        jQuery("#Nav-UserNameLink").html("").append(tp1 + " ");
        shtml = "";
        try {
            jQuery("menu[id*='PersonalActionMenu'] ie\\:menuitem").each(function () {
                shtml += "<li><a href='#' onclick=\"" + jQuery(this).attr('onmenuclick') + "\"; >" + jQuery(this).attr('text') + "</a></li>";
            });
            jQuery("#Nav-UserNameDD").html("").append(shtml);
        }
        catch (e) { }
        shtml = "";

        try {
            jQuery("menu[id*='SiteActions'] ie\\:menuitem").each(function () {
                shtml += "<li><a href='#' onclick=\"" + jQuery(this).attr('onmenuclick') + "\"; >" + jQuery(this).attr('text') + "</a></li>";
            });
            jQuery("#Nav-SiteActionsDD").html("").append(shtml);
        
        }
        catch (e) {
            jQuery("#Nav-SiteActionsDD").parent().hide();
        }

        var navurl = fixurl("/SiteAssets/html/SiteNavigation.html");
        var scripturl = fixurl("/SiteAssets/js/webslidemenu.js");
        var navscript = fixurl("/SiteAssets/js/SiteNavigation.js");
        logit("NAVURL: " + navurl);
        jQuery("#SiteNavigation").load(navurl, function () {
            loadCSS(fixurl('/SiteAssets/css/webslidemenu.css'));
            loadCSS(fixurl('/SiteAssets/css/font-awesome.css'));
            loadscript(scripturl, function () {
                loadscript(navscript, function () {
                    $("#SiteNavigation").show();
                });
            });
        });
    }
});