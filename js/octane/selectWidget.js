// refactor in future as similar to SelectAutoCompleteWidget()
// constructor
function SelectWidget(selector)
{
    this.widgetSelector             = selector;
    this.widgetNode                 = $(this.widgetSelector);
    this.ajaxMethodType             = 'GET';

    this.minimumInputLength         = 3;
    this.widgetsToTrigger           = [];
    this.url                        = null;
    this.oldValue                   = null;
    this.selectOnPreloaded          = false; // means what is loaded, will be shown on list, otherwise only select
    this.loadFirstIfOnly            = true; // means it will select first value it the only on list
    this.isHidden                   = false;
    this.isDisabledWhenLoaded       = false;
    this.userFriendlyUrls           = false;

    if(typeof this.widgetNode === 'undefined'){
        console.warn("No widget node for " + selector);
        return this;
    }

    this.fieldName = typeof this.widgetNode.attr('name') !== 'undefined' && this.widgetNode.attr('name').length > 0
        ? this.widgetNode.attr('name')
        : Math.random().toString(36).substring(7);

    this.loaderName                 = 'lds-ellipsis' + '-' + this.fieldName.replace('_','-');
    this.loaderIsOff                = true;

    // can be overridden after
    this.setLoaderName(this.loaderName)
        .setStyles(GLOBAL_JS.LOADER_COLOR, GLOBAL_JS.INP_LFT, GLOBAL_JS.INP_TOP);

    this.currentEntity    = {};
    this.callbackFunction = function(){return false;};
    return this;
}

// set loader name that will be identified to on and off
SelectWidget.prototype.setLoaderName = function(name)
{
    let INSTANCE = this;
    INSTANCE.loaderName = name;

    return INSTANCE;
};

// loader on
SelectWidget.prototype.loaderOn = function()
{
    let INSTANCE = this;
    if(INSTANCE.isHidden){
        return INSTANCE;
    }

    if(INSTANCE.loaderIsOff){
        INSTANCE.widgetNode.css({'opacity' : '.5'});
        let loaderHtml = '<div class="' + INSTANCE.loaderName + '"><div></div><div></div><div></div><div></div></div>';
        INSTANCE.widgetNode.parent().append(loaderHtml);
        INSTANCE.loaderIsOff = false;
    }

    return INSTANCE;
};

// loader off
SelectWidget.prototype.loaderOff = function()
{
    let INSTANCE = this;
    if(INSTANCE.isHidden){
        return INSTANCE;
    }

    $('.' + INSTANCE.loaderName)
        .fadeOut(INSTANCE.fadeOutTime)
        .remove();
    INSTANCE.widgetNode.css({'opacity' : '1'});
    INSTANCE.loaderIsOff = true;

    return INSTANCE;
};

// if hidden then no loader
SelectWidget.prototype.makeHidden = function()
{
    let INSTANCE = this;
    INSTANCE.isHidden = true;

    return INSTANCE;
};

// enable field
SelectWidget.prototype.enableNode = function()
{
    let INSTANCE = this;
    INSTANCE.widgetNode.prop('disabled', false);

    return INSTANCE;
};

// disable field
SelectWidget.prototype.disableNode = function()
{
    let INSTANCE = this;
    INSTANCE.widgetNode.prop('disabled', true);

    return INSTANCE;
};

// set styles e.g.: for loader
SelectWidget.prototype.setStyles = function(bgColor, leftDistance, topDistance)
{
    var INSTANCE = this;
    var style = document.createElement('style');
    let loaderClass = INSTANCE.loaderName;

    if(typeof leftDistance === 'undefined' || leftDistance.length === 0){
        leftDistance = '48%'
    }

    if(typeof topDistance === 'undefined' || topDistance.length === 0){
        topDistance = '40%'
    }

    var positioning1 = 'position:absolute;width:80px;left:' + leftDistance + ';top:' + topDistance + ';';
    var positioning2 = 'display:table;margin:15% auto;position:relative;width:80px;height:80px';

    style.innerHTML = `
.` + loaderClass + `{` + positioning1 + `}
.` + loaderClass + ` div{position:absolute;top:33px;width:13px;height:13px;border-radius:50%;background:` + bgColor + `;animation-timing-function:cubic-bezier(0,1,1,0)}
.` + loaderClass + ` div:nth-child(1){left:8px;animation:` + loaderClass + `1 .6s infinite}.` + loaderClass + ` div:nth-child(2){left:8px;animation:` + loaderClass + `2 .6s infinite}
.` + loaderClass + ` div:nth-child(3){left:32px;animation:` + loaderClass + `2 .6s infinite}.` + loaderClass + ` div:nth-child(4){left:56px;animation:` + loaderClass + `3 .6s infinite}
@keyframes ` + loaderClass + `1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes ` + loaderClass + `3{0%{transform:scale(1)}100%{transform:scale(0)}}
@keyframes ` + loaderClass + `2{0%{transform:translate(0,0)}100%{transform:translate(24px,0)}}`;

    document.head.appendChild(style);

    return INSTANCE;
};

// set flag for pre-loaded
SelectWidget.prototype.selectOnPreLoaded = function(selectOnly)
{
    let INSTANCE = this;
    INSTANCE.selectOnPreloaded = selectOnly;

    return INSTANCE;
};

// set ajax url
SelectWidget.prototype.setUrl = function(url)
{
    let INSTANCE = this;
    INSTANCE.url = url;

    return INSTANCE;
};

SelectWidget.prototype.setOldValue = function(oldValue)
{
    let INSTANCE = this;
    if(typeof oldValue !== 'undefined' && oldValue.length > 0){
        INSTANCE.oldValue = oldValue;
        INSTANCE.widgetNode.val(INSTANCE.oldValue).trigger('change');
    }

    return INSTANCE;
};

// load values for select instance (or pass data object, not only id)
SelectWidget.prototype.loadValues = function(parent_id)
{
    let INSTANCE = this;

    INSTANCE.loaderOn();
    INSTANCE.disableNode();
    //INSTANCE.widgetNode.empty(); // yes if populated later

    let url = INSTANCE.url;
    if(typeof url === 'undefined' || url === null){
        return INSTANCE;
    }

    if(typeof parent_id !== 'undefined'){
        if(INSTANCE.userFriendlyUrls){
            url = url + '/' + parent_id + '/';
        }else{
            url = url + '&id=' + parent_id + '';
        }
    }

    $.ajax({
        method     : "GET",
        url        : url,
        success    : function(response) {
            INSTANCE.runSuccessfulResponse(response);
        },
        error      : function(xhr, type, exception) {
            // alert( exception );
            INSTANCE.runErrorResponse(exception);
        },
        dataType   :"json",
        //async      : false,
        statusCode : {
            500: function(err) {
            },
            429: function(err) {
            }
        }
    }).done(function(){
        INSTANCE.enableNode();
        INSTANCE.loaderOff();

        if(INSTANCE.isDisabledWhenLoaded && INSTANCE.widgetNode.val()){
            INSTANCE.disableNode();
        }
    }).fail(function(jqXHR, textStatus, errorThrown){
        INSTANCE.onFail(jqXHR, textStatus, errorThrown);
    });

    return INSTANCE;
};

// load values for select instance (or pass data object, not only id)
SelectWidget.prototype.preloadItem = function(value)
{
    let INSTANCE = this;

    if(typeof value === 'undefined' || typeof INSTANCE.widgetNode.attr('name') === 'undefined'){
        return INSTANCE;
    }

    let loadedOptions = INSTANCE.widgetNode.find('option');

    if(loadedOptions.length === 0){
        INSTANCE.loaderOn();
        INSTANCE.disableNode();

        $.ajax({
            method  : "GET",
            url     : URLS.getItemByKeyForDropdown,
            data    : {
                f  : INSTANCE.widgetNode.attr('name'),
                v  : value
            },
            success : function(response) {
                INSTANCE.runSuccessfulResponse(response);
            },
            error   : function(xhr, type, exception) {
                INSTANCE.runErrorResponse(exception);
            },
            dataType   :"json",
            //async      : false,
            statusCode : {
                500: function(err) {
                },
                429: function(err) {
                }
            }
        }).done(function(){
            INSTANCE.enableNode();
            INSTANCE.loaderOff();
        }).fail(function(jqXHR, textStatus, errorThrown){
            INSTANCE.onFail(jqXHR, textStatus, errorThrown);
        });
    }else{
        INSTANCE.widgetNode.val(value).trigger('change');
    }

    return INSTANCE;
};

// populate loaded values for select instance (key - value)
SelectWidget.prototype.populateValuesFromResponse = function(response, previousValue)
{
    let INSTANCE = this;

    let isOnlyOne = response.length === 1;
    let selectOnlyOne = INSTANCE.loadFirstIfOnly && isOnlyOne;

    $.each(response, function (index, item) {
        let selectedValue = Number(INSTANCE.oldValue);
        if ((INSTANCE.oldValue !== null && selectedValue === item.key) || selectOnlyOne) {
            INSTANCE.widgetNode.removeAttr('disabled');
            INSTANCE.widgetNode.append((`<option value="${item.key}" selected>${item.value}</option>`));
        } else {
            INSTANCE.widgetNode.append((`<option value="${item.key}">${item.value}</option>`));
        }
    });

    let valueChanged = false;
    if(selectOnlyOne){
        INSTANCE.widgetNode.val(response[0].key).trigger('change');
        valueChanged = true;
    }else if(typeof previousValue !== 'undefined' && previousValue > 0){
        INSTANCE.widgetNode.val(previousValue).trigger('change');
        valueChanged = true;
    }

    if(previousValue !== INSTANCE.widgetNode.val()){
        INSTANCE.widgetNode.trigger('change');
        valueChanged = true;
    }

    if(valueChanged){
        INSTANCE.triggered();
        let newValue = INSTANCE.widgetNode.val();

        INSTANCE.triggerChildren(newValue);
        INSTANCE.callbackFunction();
    }

    return INSTANCE;
};

// loads other data
SelectWidget.prototype.loadEntityData = function(id, onSuccessCallback)
{
    let INSTANCE = this;
    if(INSTANCE.currentEntity.length > 0){
        console.info("Entity already loaded for " + INSTANCE.fieldName);
        return false;
    }

    $.ajax({
        method  : "GET",
        url     : URLS.getEntityById,
        data    : {
            'id'   : id,
            'name' : INSTANCE.fieldName,
        },
        success : function(response) {
            if(typeof response[0] !== 'undefined'){
                onSuccessCallback(response[0]);
            }
        },
        error   : function(xhr, type, exception) {
            onSuccessCallback({});
        },
        dataType   :"json",
        //async      : false,
        statusCode : {
            500: function(err) {
            },
            429: function(err) {
            }
        }
    }).done(function(data, textStatus, jqXHR){
        GLOBAL_JS.rateTypeWidget.loaderOff();
    }).fail(function(jqXHR, textStatus, errorThrown){
        INSTANCE.onFail(jqXHR, textStatus, errorThrown);
    });
};

// select loaded value on pre-loaded list
SelectWidget.prototype.selectValuesFromResponse = function(value)
{
    let INSTANCE = this;

    if(typeof value === 'undefined'){
        value = INSTANCE.widgetNode.val();
    }

    INSTANCE.widgetNode.val(value).trigger('change');
    return INSTANCE;
};

// set widgets that should be triggered
SelectWidget.prototype.setWidgetsToTriggerByNames = function(arrayOfNames)
{
    let INSTANCE = this;

    arrayOfNames.forEach(function(itemName, index){
        for (let [widgetName, widgetObject] of Object.entries(GLOBAL_JS)) {
            if(typeof widgetObject.widgetSelector !== 'undefined'){
                if(widgetObject.widgetNode.attr('name') === itemName){
                    INSTANCE.widgetsToTrigger.push(widgetObject);
                }
            }
        }
    });

    return INSTANCE;
};

// set callback that should be triggered
SelectWidget.prototype.setCallbackOnTrigger = function(callbackFunction)
{
    let INSTANCE = this;
    INSTANCE.callbackFunction = callbackFunction;
    return INSTANCE;
};

// prepare listener
SelectWidget.prototype.setOnClick = function()
{
    let INSTANCE = this;
    let eventName = "select2:select"; //"change"
    INSTANCE.widgetNode.on(eventName, function(event) {
        event.preventDefault();
        INSTANCE.triggered(event);
    });

    return INSTANCE;
};

// when triggered
SelectWidget.prototype.triggered = function(event)
{
    let valueFromEvent = null;
    if(typeof event !== 'undefined'){
        event.preventDefault();
        valueFromEvent = $(event.currentTarget).val()
    }

    let INSTANCE      = this;
    let selectedValue = valueFromEvent;

    if(typeof selectedValue === 'undefined' || selectedValue === null){
        //console.warn(INSTANCE.widgetSelector + ": Cannot load children for selected value.");
    }else{
        INSTANCE.triggerChildren(selectedValue);
    }
    INSTANCE.callbackFunction();

    return INSTANCE;
};

// trigger children
SelectWidget.prototype.triggerChildren = function(parentValue)
{
    let INSTANCE = this;

    for (let [widgetName, widgetObject] of Object.entries(INSTANCE.widgetsToTrigger)) {
        widgetObject.loadValues(parentValue); //not always int
    }

    return INSTANCE;
};

// disable after callback
SelectWidget.prototype.disableWhenLoaded = function(isDisabledWhenLoaded)
{
    let INSTANCE = this;
    INSTANCE.isDisabledWhenLoaded = isDisabledWhenLoaded;
    return INSTANCE;
};

// run this on ajax success
SelectWidget.prototype.runSuccessfulResponse = function(response)
{
    let INSTANCE = this;

    if (response.length === 0) {
        return false;
    }

    if(INSTANCE.selectOnPreloaded){
        INSTANCE.selectValuesFromResponse(response.value)
    }else{
        let previousValue = INSTANCE.widgetNode.val();
        INSTANCE.widgetNode.empty();
        INSTANCE.populateValuesFromResponse(response, previousValue)
    }
};

// run this on ajax error
SelectWidget.prototype.runErrorResponse = function(exception)
{
    let INSTANCE = this;
    //console.log('runErrorResponse on SelectWidget:', exception);
};

// run this on ajax error,
SelectWidget.prototype.onFail = function(jqXHR, textStatus, errorThrown)
{
    let INSTANCE = this;

    if(!GLOBAL_JS.AJAX_FAILED){
        window.stop();
        console.error("Catched " + textStatus + ": " + errorThrown);
        GLOBAL_JS.AJAX_FAILED = true;

        let message = "Error!";
        if(typeof TRANS[jqXHR.status] !== 'undefined' && TRANS[jqXHR.status].length > 0){
            message = TRANS[jqXHR.status];
        }
        alert(message); //or confirm and reload page
    }

    INSTANCE.widgetNode.val(null);
    INSTANCE.loaderOff();
};