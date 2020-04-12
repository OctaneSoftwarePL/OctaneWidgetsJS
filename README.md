# OctaneWidgetsJS
Auto complete select, standard select and custom input based on select2 with custom events and easy configuration, with dependencies and self-work flow.
Able to pass triggered children on parent value by just one array!

#### Simple. Easy. Fast.

Mainly. Attached example is just an example in order to show how this works. 
As an example start typing country: United States, states will be loaded when loader is off.
In order to make request longer to be able to show loader at all - external source of states used.
Select Countries and select States are connected, also input age changes on Input year select.

## Core explanation:
#### 1. Regular select widget without autocomplete, but pre-loaded data

initialize widget

```JS
function SelectWidget(selector){};
```

sets custom loader name (set in the constructor but can be overridden as well)

```JS
SelectWidget.prototype.setLoaderName = function(name){};
```

shows loader

```JS
SelectWidget.prototype.loaderOn = function(){};
```

hides loader

```JS
SelectWidget.prototype.loaderOff = function(){};
```

sets field as hidden then no loader is triggered

```JS
SelectWidget.prototype.makeHidden = function(){};
```

makes field enabled (turns off disable attribute)

```JS
SelectWidget.prototype.enableNode = function(){};
```

makes field disabled

```JS
SelectWidget.prototype.disableNode = function(){};
```

set styles (also for loader, used in the constructor but can be overridden)

```JS
SelectWidget.prototype.setStyles = function(bgColor, leftDistance, topDistance){};
```

sets flag “select on preload“

```JS
SelectWidget.prototype.selectOnPreLoaded = function(selectOnly){};
```

sets url used in ajax call on parent field

```JS
SelectWidget.prototype.setUrl = function(url){};
```

load values and makes an ajax call on url for parent_id

```JS
SelectWidget.prototype.loadValues = function(parent_id){};
```

preloads item preset value and loads item for list dependant on that value if needed (e.g. to be able to select it on list among other values)

```JS
SelectWidget.prototype.preloadItem = function(value){};
```

populates values on list from given response and if value was already preset and exists within response, selects it

```JS
SelectWidget.prototype.populateValuesFromResponse = function(response, previousValue){};
```

loads entity as object in order to use its values later 
(e.g. on other select, can load entity values for further use, 
like selecting some select, triggers load of other properties etc.)

```JS
SelectWidget.prototype.loadEntityData = function(id, onSuccessCallback){};
```

triggers select on node

```JS
SelectWidget.prototype.selectValuesFromResponse = function(value){};
```

sets child widgets to be triggered by name into the property (differ it from calling, this is something different)

```JS
SelectWidget.prototype.setWidgetsToTriggerByNames = function(arrayOfNames){};
```

sets custom callback function after triggering has been done

```JS
SelectWidget.prototype.setCallbackOnTrigger = function(callbackFunction){};
```

sets “on click“ event

```JS
SelectWidget.prototype.setOnClick = function(){};
```

triggers click/change

```JS
SelectWidget.prototype.triggered = function(event){};
```

triggers children set in “setWidgetsToTriggerByNames()“

```JS
SelectWidget.prototype.triggerChildren = function(parentValue){};
```

sets flag “isDisabledWhenLoaded“ on true or false (false by default)

```JS
SelectWidget.prototype.disableWhenLoaded = function(isDisabledWhenLoaded){};
```

used when ajax call returns with success

```JS
SelectWidget.prototype.runSuccessfulResponse = function(response){};
```

used when ajax call returns with an error or not expected result

```JS
SelectWidget.prototype.runErrorResponse = function(exception){};
```


#### 2. Autocomplete select widget without pre-loaded data

initialize widget

```JS
function SelectAutoCompleteWidget(selector){};
```

sets custom loader name (set in the constructor but can be overridden as well)

```JS
SelectAutoCompleteWidget.prototype.setLoaderName = function(name){};
```

shows loader

```JS
SelectAutoCompleteWidget.prototype.loaderOn = function(){};
```

hides loader

```JS
SelectAutoCompleteWidget.prototype.loaderOff = function(){};
```

sets field as hidden then no loader is triggered

```JS
SelectAutoCompleteWidget.prototype.makeHidden = function(){};
```

makes field enabled (turns off disable attribute)

```JS
SelectAutoCompleteWidget.prototype.enableNode = function(){};
```

makes field disabled

```JS
SelectAutoCompleteWidget.prototype.disableNode = function(){};
```

set styles (also for loader, used in the constructor but can be overridden)

```JS
SelectAutoCompleteWidget.prototype.setStyles = function(bgColor, leftDistance, topDistance){};
```

sets flag “select on preload“

```JS
SelectAutoCompleteWidget.prototype.selectOnPreLoaded = function(selectOnly){};
```

sets url used in ajax call on parent field

```JS
SelectAutoCompleteWidget.prototype.setUrl = function(url){};
```

load values and makes an ajax call on url for parent_id

```JS
SelectAutoCompleteWidget.prototype.loadValues = function(parent_id){};
```

preloads item preset value and loads item for list dependant on that value if needed (e.g. to be able to select it on list among other values)

```JS
SelectAutoCompleteWidget.prototype.preloadItem = function(value){};
```

sets autocomplete process results function in case of change for given url

```JS
SelectAutoCompleteWidget.prototype.prepareAutoCompleteListener = function(){};
```

not implemented as method above is enough

```JS
SelectAutoCompleteWidget.prototype.processAutoCompleteValues = function(data){};
```

populates values on list from given response and if value was already preset and exists within response, selects it

```JS
SelectAutoCompleteWidget.prototype.populateValuesFromResponse = function(response){};
```

loads entity as object in order to use its values later 

```JS
SelectAutoCompleteWidget.prototype.loadEntityData = function(id, onSuccessCallback){};
```

values for further use, like selecting someWidget, 
triggers load of other properties etc.)

```JS
SelectAutoCompleteWidget.prototype.selectValuesFromResponse = function(value){};
```

sets child widgets to be triggered by name into the property (differ it from calling, this is something different)

```JS
SelectAutoCompleteWidget.prototype.setWidgetsToTriggerByNames = function(arrayOfNames){};
```

sets custom callback function after triggering has been done

```JS
SelectAutoCompleteWidget.prototype.setCallbackOnTrigger = function(callbackFunction){};
```

sets “on click“ event

```JS
SelectAutoCompleteWidget.prototype.setOnClick = function(){};
```

triggers click/change

```JS
SelectAutoCompleteWidget.prototype.triggered = function(event){};
```

triggers children set in “setWidgetsToTriggerByNames()“

```JS
SelectAutoCompleteWidget.prototype.triggerChildren = function(parentValue){};
```

sets flag “isDisabledWhenLoaded“ on true or false (false by default)

```JS
SelectAutoCompleteWidget.prototype.disableWhenLoaded = function(isDisabledWhenLoaded){};
```

used when ajax call returns with success

```JS
SelectAutoCompleteWidget.prototype.runSuccessfulResponse = function(response){};
```

used when ajax call returns with an error or not expected result

```JS
SelectAutoCompleteWidget.prototype.runErrorResponse = function(exception, type){};
```


#### 3. Input widget

initialize widget

```JS
function InputWidget(selector){};
```

sets custom loader name (set in the constructor but can be overridden as well)

```JS
InputWidget.prototype.setLoaderName = function(name){};
```

shows loader

```JS
InputWidget.prototype.loaderOn = function(){};
```

hides loader

```JS
InputWidget.prototype.loaderOff = function(){};
```

sets field as hidden then no loader is triggered

```JS
InputWidget.prototype.makeHidden = function(){};
```

makes field enabled (turns off disable attribute)

```JS
InputWidget.prototype.enableNode = function(){};
```

makes field disabled

```JS
InputWidget.prototype.disableNode = function(){};
```

set styles (also for loader, used in the constructor but can be overridden)

```JS
InputWidget.prototype.setStyles = function(bgColor, leftDistance, topDistance){};
```

sets url used in ajax call on parent field

```JS
InputWidget.prototype.setUrl = function(url){};
```

populate values given from response

```JS
InputWidget.prototype.populateValuesFromResponse = function(responseValue){};
```

preloads item on list

```JS
InputWidget.prototype.preloadItem = function(value){};
```

triggers field (changes its value) and it’s children depending on loaded value

```JS
InputWidget.prototype.triggered = function(event){};
```

triggers children by parent’s value

```JS
InputWidget.prototype.triggerChildren = function(parentValue){};
```

sets flag “isDisabledWhenLoaded“ on true or false (false by default)

```JS
InputWidget.prototype.disableWhenLoaded = function(isDisabledWhenLoaded){};
```

sets childer fields to be triggered on parent change by their name

```JS
InputWidget.prototype.setWidgetsToTriggerByNames = function(arrayOfNames){};
```

sets callback function after parent field triggered

```JS
InputWidget.prototype.setCallbackOnTrigger = function(callbackFunction){};
```

used when ajax call returns with success

```JS
InputWidget.prototype.runSuccessfulResponse = function(response){};
```

used when ajax call returns with an error or not expected result

```JS
InputWidget.prototype.runErrorResponse = function(exception){};
```


## Usage examples:
  Example flow:

  First you need to define global settings like main variable and urls:
  
```JS
  const GLOBAL_JS = {};
  const URLS = {
    'getExamplestuffOne' : "{{URL::route('urlToGetExamplestuffOne')}}",
    'getExamplestuffTwo' : "{{URL::route('getExamplestuffTwo')}}",
  };
```

  Property `GLOBAL_JS` will be used to store widgets instances for global access within view from any place, URLS will be storing urls in order not to set them thousand times in code.
  
  Everything is happening within:
  
```JS
  $(document).ready( function () {
    //...
  });
```

  Widget’s fields are based on ```JS
Select2`, so on ready it has to be initialized on every related field:

```JS
  $('.select2').select2({
    placeholder : $(this).data('placeholder'),
  });
```

  Since there is no general loader in css, loader for each field is defined “in fly” (yes, that needs improvement but there was no time to do so), so the general color of loader has to be set:

```JS
  GLOBAL_JS.LOADER_COLOR = '#139c9b'; // general color for each loader
  GLOBAL_JS.INP_TOP      = '30%';     // general space if not overriden
  GLOBAL_JS.INP_BTM      = '-18px';   // general space if not overriden
  GLOBAL_JS.IS_EDIT      = view === 'edit' && method === 'PUT'; // needed to disable fields
```
SelectAutoCompleteWidget: AutoComplete select on some_select_id field example:

```JS
  GLOBAL_JS.someWidget = new SelectAutoCompleteWidget('select[name="some_select_id"]');
  GLOBAL_JS.someWidget
    .setUrl(URLS.getSomeStuff)
    .disableWhenLoaded(GLOBAL_JS.I_WANT_THIS_TO_BE_DISABLED_WHEN_LOADED)
    .prepareAutoCompleteListener();
```
  Triggers entity data to be loaded on change (if children to trigger set / look below).
  Load full entity data on select change and get values from callback after success.
You can trigger either inputs that has been defined as widget  (someOtherWidget) or simple form inputs (not-widget-input)
```JS
  GLOBAL_JS.someWidget.setCallbackOnTrigger(function(){
      let INSTANCE = this;
    
      INSTANCE.loadEntityData(INSTANCE.widgetNode.val(), function(loadedEntityData){
      INSTANCE.widgetSelector.currentEntity = loadedEntityData;
      
      if(typeof loadedEntityData.id !== 'undefined'){
        GLOBAL_JS.someOtherWidget.widgetNode.val(loadedEntityData.some_value).trigger('change');
        GLOBAL_JS.someOtherWidget.triggered();
      }
  
      if(typeof loadedEntityData.some_value !== 'undefined')
        $('input[name=not-widget-input]').val(loadedEntityData.some_value).trigger('change');
  
    });
  });
```