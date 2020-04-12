
const URLS = {
    'getCountries'  : window.location.href + "/ajax.php?t=c",
    'getStates'     : window.location.href + "/ajax.php?t=s",
};

const GLOBAL_JS = {};

$(document).ready( function () {

    let $selectTwo = $('.select2');
    $selectTwo.select2(
        {
            placeholder : $(this).data('placeholder'),
            theme: "default custom-select", //select2 select2-container select2-container--default
        }
    ).data('select2').$dropdown.addClass('custom-select');

    $selectTwo.on('change', function(e) {
        $(e.currentTarget).parent().find(".select2-selection__rendered").attr('title', "Choose");
    });

    // $('.select2').on("change", function (e) {
    //     $(e.target).siblings('.select2-container').addClass('custom-select');
    //     console.log($(e.target).siblings('.select2-container'));
    // });

    GLOBAL_JS.LOADER_COLOR = '#139c9b';
    GLOBAL_JS.INP_TOP      = '15px';
    GLOBAL_JS.INP_LFT      = '30%';

    // 1. country will load states
    GLOBAL_JS.countryWidget = new SelectAutoCompleteWidget('select[name="country"]');
    GLOBAL_JS.countryWidget
        .setUrl(URLS.getCountries)
        .setOldValue("0")
        .prepareAutoCompleteListener();

    // 2. state by country
    GLOBAL_JS.stateWidget = new SelectWidget('select[name="state"]');
    GLOBAL_JS.stateWidget
        .setUrl(URLS.getStates);
    //.prepareAutoCompleteListener();

    // 3. year will calculate age
    GLOBAL_JS.yearWidget = new SelectWidget('select[name="year"]');

    // 4. months will load days
    GLOBAL_JS.monthWidget = new SelectWidget('select[name="month"]');

    // 5. days depends on month
    GLOBAL_JS.dayWidget = new SelectWidget('select[name="day"]');

    // 6. age input
    GLOBAL_JS.ageWidget = new InputWidget('input[name="age"]');
    GLOBAL_JS.ageWidget
        .disableNode();


    // OTHER
    // Prepare triggers for children
    GLOBAL_JS.countryWidget.setWidgetsToTriggerByNames(['state']);
    //GLOBAL_JS.yearWidget.setWidgetsToTriggerByNames(['age']);

    // Prepare event listeners (needed even if has any callback below)
    GLOBAL_JS.countryWidget.setOnClick();
    GLOBAL_JS.yearWidget.setOnClick();
    GLOBAL_JS.monthWidget.setOnClick();

    // Triggers with callback
    GLOBAL_JS.countryWidget.setCallbackOnTrigger(function(){
        let INSTANCE = this;
        console.log("some custom callback after being triggered");
    });

    GLOBAL_JS.yearWidget.setCallbackOnTrigger(function(){
        let INSTANCE = this;
        if(typeof INSTANCE.widgetNode !== 'undefined' && INSTANCE.widgetNode.val() > 0){
            let chosenYear = INSTANCE.widgetNode.val();
            let currentDate = new Date();

            GLOBAL_JS.ageWidget.loaderOn();
            GLOBAL_JS.ageWidget.widgetNode.val(parseInt(currentDate.getFullYear()) - parseInt(chosenYear));
            GLOBAL_JS.ageWidget.loaderOff();
        }
    });

    // THIS IS JUST AN EXAMPLE, Feb length is general
    GLOBAL_JS.monthWidget.setCallbackOnTrigger(function(){
        let INSTANCE = this;
        if(typeof INSTANCE.widgetNode !== 'undefined' && INSTANCE.widgetNode.val() > 0 && typeof GLOBAL_JS.dayWidget !== 'undefined'){
            GLOBAL_JS.dayWidget.loaderOn();

            let chosenMonth = parseInt(INSTANCE.widgetNode.val());
            let dayOptions  = GLOBAL_JS.dayWidget.widgetNode.find('option').remove();

            let monthsWithThirtyOne = [1,3,5, 7, 8, 10, 12];
            let options = '';

            if(chosenMonth === 2){
                options = generateDayOptions(28);
            }else if(monthsWithThirtyOne.indexOf(chosenMonth) > -1){
                options = generateDayOptions(31);
            }else{
                options = generateDayOptions(30);
            }

            GLOBAL_JS.dayWidget.widgetNode.html(options);
            GLOBAL_JS.dayWidget.loaderOff();

        }
    });

    function generateDayOptions(upToDayIncluding) {
        let html = '';
        for (let i = 0; i < upToDayIncluding; i++) {
            let day = i + 1;

            if(day <= upToDayIncluding){
                html += '<option value="' + day + '">' + day + "</option>";
            }
        }

        return html;
    }

});