var TRIP = TRIP || {};
TRIP.DASHBOARD = TRIP.DASHBOARD || {};
TRIP.DASHBOARD.RECOMMENDATIONS = TRIP.DASHBOARD.RECOMMENDATIONS || {};

TRIP.DASHBOARD.RECOMMENDATIONS.ListByDate = function () {
    function Init(site) {
        //loadscript(site + '/SiteAssets/js/vue.js', function () {
            loadscript(site + '/SiteAssets/js/vuecomponents.js', function () {
                new Vue({
                    el: '#Recommendations',
                    components: {
                        'recommendations-by-date': RecommendationsByDate
                    }
                })
            });
        //});
    }

    return {
        Init: Init
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('CEWP_Dashboard_Recommendations.js');