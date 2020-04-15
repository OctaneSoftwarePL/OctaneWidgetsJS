// constructor
function InputWidget(selector)
{
    this.widgetSelector             = selector;
    this.widgetNode                 = $(this.widgetSelector);
    this.ajaxMethodType             = 'GET';
    this.url                        = null;
    this.oldValue                   = null;

    this.widgetsToTrigger           = [];

    this.fieldName                  = this.widgetNode.attr('name').length > 0
        ? this.widgetNode.attr('name')
        : Math.random().toString(36).substring(7);

    this.loaderName                 = 'lds-ellipsis' + '-' + this.fieldName.replace('_','-');
    this.loaderIsOff                = true;
    this.isHidden                   = false;
    this.isDisabledWhenLoaded       = false;
    this.userFriendlyUrls           = false;

    // can be overridden after
    this.setLoaderName(this.loaderName)
        .setStyles(GLOBAL_JS.LOADER_COLOR, GLOBAL_JS.INP_LFT, GLOBAL_JS.INP_TOP);

    this.currentEntity    = {};
    this.callbackFunction = function(){return false;};

    return this;
}

// set loader name that will be identified to on and off
InputWidget.prototype.setLoaderName = function(name)
{
    let INSTANCE = this;
    INSTANCE.loaderName = name;

    return INSTANCE;
};

// loader on
InputWidget.prototype.loaderOn = function()
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
InputWidget.prototype.loaderOff = function()
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
InputWidget.prototype.makeHidden = function()
{
    let INSTANCE = this;
    INSTANCE.isHidden = true;

    return INSTANCE;
};

// enable field
InputWidget.prototype.enableNode = function()
{
    let INSTANCE = this;
    INSTANCE.widgetNode.prop('disabled', false);

    return INSTANCE;
};

// disable field
InputWidget.prototype.disableNode = function()
{
    let INSTANCE = this;
    INSTANCE.widgetNode.prop('disabled', true);

    return INSTANCE;
};

// set styles e.g.: for loader
InputWidget.prototype.setStyles = function(bgColor, leftDistance, topDistance)
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

// set ajax url
InputWidget.prototype.setUrl = function(url)
{
    let INSTANCE = this;
    INSTANCE.url = url;

    return INSTANCE;
};

InputWidget.prototype.setOldValue = function(oldValue)
{
    let INSTANCE = this;
    if(typeof oldValue !== 'undefined' && oldValue.length > 0){
        INSTANCE.oldValue = oldValue;
        INSTANCE.widgetNode.val(INSTANCE.oldValue).trigger('change');
    }

    return INSTANCE;
};

// load values means actually load one value
InputWidget.prototype.loadValues = function(id)
{
    let INSTANCE = this;

    INSTANCE.loaderOn();
    INSTANCE.disableNode();

    let url = INSTANCE.url;
    if(typeof url === 'undefined' || url === null){
        return INSTANCE;
    }

    if(typeof id !== 'undefined'){
        if(INSTANCE.userFriendlyUrls){
            url = url + '/' + id + '/';
        }else{
            url = url + '&id=' + id + '';
        }
    }

    $.ajax({
        method     : "GET",
        url        : url,
        success    : function(response) {
            INSTANCE.runSuccessfulResponse(response);
        },
        error      : function(xhr, type, exception) {
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
    }).done(function(data, textStatus, jqXHR){
        INSTANCE.enableNode();
        INSTANCE.loaderOff();

        if(INSTANCE.isDisabledWhenLoaded && INSTANCE.widgetNode.val()){
            INSTANCE.disableNode();
        }
        INSTANCE.checkRequests();
    }).fail(function(jqXHR, textStatus, errorThrown){
        INSTANCE.onFail(jqXHR, textStatus, errorThrown);
    });

    return INSTANCE;
};

// populate loaded value (ONE VALUE, can be int 0)
InputWidget.prototype.populateValuesFromResponse = function(responseValue)
{
    let INSTANCE = this;

    let valueChanged = false;
    if(typeof responseValue !== 'undefined' && responseValue !== null){
        INSTANCE.widgetNode.val(responseValue).trigger('change');
        valueChanged = true;
    }

    if(valueChanged){
        let newValue = INSTANCE.widgetNode.val();

        INSTANCE.triggerChildren(newValue);
        INSTANCE.callbackFunction();
    }

    return INSTANCE;
};

// load values for select instance (or pass data object, not only id)
InputWidget.prototype.preloadItem = function(value)
{
    let INSTANCE = this;

    INSTANCE.loaderOn();
    INSTANCE.disableNode();
    INSTANCE.widgetNode.val(value);
    INSTANCE.enableNode();
    INSTANCE.loaderOff();

    return INSTANCE;
};

// when triggered
InputWidget.prototype.triggered = function(event)
{
    if(typeof event !== 'undefined') event.preventDefault();

    let INSTANCE   = this;
    let inputValue = INSTANCE.widgetNode.val();

    if(typeof inputValue === 'undefined' || inputValue === 'undefined'){
        console.warn(INSTANCE.widgetSelector + ": Cannot load children for selected value.");
    }else{
        INSTANCE.triggerChildren(inputValue);
    }
    INSTANCE.callbackFunction();

    return INSTANCE;
};

// trigger children
InputWidget.prototype.triggerChildren = function(parentValue)
{
    let INSTANCE = this;

    for (let [widgetName, widgetObject] of Object.entries(INSTANCE.widgetsToTrigger)) {
        widgetObject.loadValues(parentValue); //not always int
    }

    return INSTANCE;
};

// disable after callback
InputWidget.prototype.disableWhenLoaded = function(isDisabledWhenLoaded)
{
    let INSTANCE = this;
    INSTANCE.isDisabledWhenLoaded = isDisabledWhenLoaded;
    return INSTANCE;
};

// set widgets that should be triggered
InputWidget.prototype.setWidgetsToTriggerByNames = function(arrayOfNames)
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
InputWidget.prototype.setCallbackOnTrigger = function(callbackFunction)
{
    let INSTANCE = this;
    INSTANCE.callbackFunction = callbackFunction;
    return INSTANCE;
};

// run this on ajax success
InputWidget.prototype.runSuccessfulResponse = function(response)
{
    let INSTANCE = this;

    if (response.length === 0) {
        return false;
    }

    INSTANCE.populateValuesFromResponse(response);
};

// run this on ajax error
InputWidget.prototype.runErrorResponse = function(exception)
{
    let INSTANCE = this;
    INSTANCE.widgetNode.val(null);
};

// run this on ajax error,
InputWidget.prototype.onFail = function(jqXHR, textStatus, errorThrown)
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

// check requests
InputWidget.prototype.checkRequests = function()
{
    let INSTANCE = this;
    //checkResources();
};