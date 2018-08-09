var CKO = CKO || {};
CKO.PAGES = CKO.PAGES || {};

CKO.PAGES.NewRecommendationForm = function () {

    function Init(site) {
        CKODialog(site + "/Lists/Recommendations/NewForm.aspx?IsDlg=1", "New Recommendation", 1100, 800, "NotificationCallback");
    }

    return {
        Init: Init
    };
};

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Pages_NewRecommendationForm.js');