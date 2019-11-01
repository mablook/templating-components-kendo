
/*******************************************************************************
 *
 *      Product           : Marcelo Bossle
 *      ServiceModulePart : Portal
 *      Object            : g (javascript file)
 *
 ******************************************************************************/

/*******************************************************************************
 *
 *      g ATTRIBUTES
 *
 ******************************************************************************/

/*******************************************************************************
 *
 *      g PRIVATE METHODS
 *
 ******************************************************************************/

/*******************************************************************************
 *
 *      g PUBLIC METHODS
 *
 ******************************************************************************/

function g_mInitialize() {

    // app_type sets the target environment
    // - dev: development against Visual Studio
    // - tst: run against the test server
    // - prd: run against live (forbidden, only for exceptions)
    var app_type = "tst";
    
    // use this functions if you want to set kendo culture
    $.getScript("js/messages/kendo.messages." + localStorage.scs_Culture + ".min.js?v=20191001");
    $.getScript("js/cultures/kendo.culture." + localStorage.scs_Culture + ".min.js?v=20191001")
        .done(function (script, textStatus) {
            kendo.culture(localStorage.scs_Culture);
        });
}

function g_KendoMultiSelectTrigger(id){
    var _value = $(id).data('kendoMultiSelect').value();
    var data = [{ id : id , value: _value }];
    $(document).trigger('mP_mOnChangeField', data);
}


/*******************************************************************************
 *
 *      Function          : mP_CountPropValue
 *      Description       : COunt prop != value
 *
 ******************************************************************************/

function g_mCountPropValue( p_data, p_prop, p_value ) {
    let n_count = 0;
    for (var i = 0; i < p_data.length; i++) {
        if (p_data[i].hasOwnProperty(p_prop)) {
            if (p_data[i][p_prop] === p_value) {
                n_count++;
            }
        }
    }
    return n_count;
}

/*******************************************************************************
 *
 *      Function          : g_mNavigateTo
 *      Description       : Send to URL
 *
 ******************************************************************************/

function g_mNavigateTo(p_window, p_parameters) {
    var h_url = p_window;
    if (p_parameters !== "") h_url = h_url + "?" + p_parameters;
    window.location.href = h_url;
}

