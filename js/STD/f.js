/*******************************************************************************
 *
 *      Product           : Stockspots
 *      ServiceModulePart : Portal
 *      Object            : f (javascript file)
 *
 ******************************************************************************/

/*******************************************************************************
 *
 *      Function          : mP_GetParameterByName
 *      Description       : Get a specific parameter value
 *
 ******************************************************************************/

function f_mP_GetParameterByName(p_name) {
    p_name = p_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + p_name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function f_mP_OnError(p_error) {
    f_mShowMessage("error", "Error", p_error, g_return_url);
}

function f_mP_StartLoading(p_section) {
    oUI_mStartProgress(p_section);
}

/*******************************************************************************
 *
 *      Function          : mP_StopLoading
 *      Description       : Stop the loading of a page section
 *
 ******************************************************************************/

function f_mP_StopLoading(p_section) {
    oUI_mStopProgress(p_section);
}

/*******************************************************************************
 *
 *      Listener          : load
 *      Description       : Prepare all components
 *
 ******************************************************************************/

warningTemplate = '<i class="k-icon k-i-warning k-stockspots-warning"></i>';
addTemplate = '<i class="k-icon k-i-plus k-stockspots-add"></i>';

$(window).bind("load",function(){


    $('.form-line').each(function(){

        if ($(this).attr('oFieldType') === 'Password') {
            $(this).append('<input id="' + $(this).attr('oFieldId') + '" type="password" class="k-textbox k-text" style="width: 100%;" ' + $(this).attr('oFieldState') + '> <label class="form-label trn">' + g_oTranslator.get($(this).attr('oFieldTitle')) + '</label>');
            oField_mInitializeTextInput($(this).attr('oFieldId'));
        }

        if ($(this).attr('oFieldType') === 'TextInput') {
            if($(this).attr('oFieldLabel') === "false"){
                $(this).append('<input id="' + $(this).attr('oFieldId') + '" type="text" class="k-textbox k-text" style="width: 100%;" ' + $(this).attr('oFieldState') + '>');
            }else{
                $(this).append('<input id="' + $(this).attr('oFieldId') + '" type="text" class="k-textbox k-text" style="width: 100%;" ' + $(this).attr('oFieldState') + '> <label class="form-label trn">' + g_oTranslator.get($(this).attr('oFieldTitle')) + '</label>');
            }
            oField_mInitializeTextInput($(this).attr('oFieldId'));
        }

        if ($(this).attr('oFieldType') === 'TextArea') {
            $(this).append('<textarea rows="1" id="' + $(this).attr('oFieldId') + '" class="k-textbox k-text" placeholder="" style="width: 100%;" ' + $(this).attr('oFieldState') + '></textarea><label class="form-label trn">' + g_oTranslator.get($(this).attr('oFieldTitle')) + '</label>');
        }

        if ($(this).attr('oFieldType') === 'CheckBox') {
            $(this).append('<input type="checkbox" id="' + $(this).attr('oFieldId') + '" class="k-checkbox" ' + $(this).attr('oFieldState') + '><label class="k-checkbox-label trn" for="' + $(this).attr('oFieldId') + '">' + g_oTranslator.get($(this).attr('oFieldTitle')) + '</label>');
            oField_mInitializeCheckBox($(this).attr('oFieldId'));
        }

        if ($(this).attr('oFieldType') === 'DatePicker') {
            $(this).append('<input id="' + $(this).attr('oFieldId') + '" type="text" style="width: 100%;"> <label class="form-label trn" ' + $(this).attr('oFieldState') + '>' + g_oTranslator.get($(this).attr('oFieldTitle')) + '</label>');
            oField_mInitializeDatePicker($(this).attr('oFieldId'));
        }

        if ($(this).attr('oFieldType') === 'DateTimePicker') {
            $(this).append('<input id="'+ $(this).attr('oFieldId') +'" class="k-datetimepicker" type="text" style="width: 100%;"> <label class="form-label trn">'+ g_oTranslator.get($(this).attr('oFieldTitle')) +'</label>');
            oField_mInitializeDateTimePicker($(this).attr('oFieldId'));
            if ($(this).attr('oFieldState') === 'disabled') {
                $('#' + $(this).attr('oFieldId')).data('kendoDateTimePicker').enable(false);
            }
        }

        if ($(this).attr('oFieldType') === 'DateRangePicker') {
            $(this).append('<div id="'+ $(this).attr('oFieldId') +'" title="'+ g_oTranslator.get($(this).attr('oFieldTitle')) +'" class="k-daterangepicker"></div><label class="form-label trn">'+ g_oTranslator.get($(this).attr('oFieldTitle')) +'</label>');
            oField_mInitializeDateRangePicker($(this).attr('oFieldId'));
            if ($(this).attr('oFieldState') === 'disabled') {
                $('#' + $(this).attr('oFieldId')).data('kendoDateRangePicker').enable(false);
            }
        }

        if ($(this).attr('oFieldType') === 'DropDownList') {
            if($(this).attr('oFieldTitle') === '' || $(this).attr('oFieldTitle') === undefined){
                $(this).addClass('no_label');
                $(this).append('<select id="'+ $(this).attr('oFieldId') +'" class="k-dropdown" style="width: 100%;"></select>');
                oField_mInitializeDropDownList($(this).attr('oFieldId'), $(this).attr('oFieldList'), $(this).attr('oFieldFilter'),'');
            } else {
                $(this).addClass('no-round-plain');
                $(this).append('<select id="' + $(this).attr('oFieldId') +'" class="k-dropdown" style="width: 100%;"></select><label class="form-label label-select trn">'+ g_oTranslator.get($(this).attr('oFieldTitle')) +'</label>');
                oField_mInitializeDropDownList($(this).attr('oFieldId'), $(this).attr('oFieldList'), $(this).attr('oFieldFilter'), $(this).attr('oFieldPlaceHolder'));
            }

            if($(this).attr('oFieldState') === 'disabled'){
                $('#' + $(this).attr('oFieldId')).data('kendoDropDownList').enable(false);
            }
        }

        if ($(this).attr('oFieldType') === 'MultiSelect') {
            $(this).addClass('no-round-plain');
            $(this).append('<select id="'+ $(this).attr('oFieldId') +'" class="k-multiselect" style="width: 100%;"></select>  <label class="form-label label-select trn">'+ g_oTranslator.get($(this).attr('oFieldTitle')) +'</label>');
            oField_mInitializeMultiSelect($(this).attr('oFieldId'), $(this).attr('oFieldList'));
        }

        if ($(this).attr('oFieldType') === 'UploadFile') {

            $(this).append('<form method="post" action="'+ $(this).attr('oFieldAction') +'" style="width:150px">'+
                '<div class="demo-section k-content">'+
                    '<input name="files" id="'+ $(this).attr('oFieldId') +'" type="file" aria-label="files" />'+
                    '<p style="padding-top: 1em; text-align: center">'+
                    '    <button type="submit" class="k-button k-primary">Submit</button>'+
                    '</p>'+
                '</div>'+
            '</form>');
            oField_mInitializeUploadFile($(this).attr('oFieldId'));
        }
    });

    $('.fld_required').each(function () {
        $(this).find('.form-label').after(warningTemplate);
        /* select */
        $(this).find('.k-dropdown-wrap').find('.k-select').css({'margin-right':'20px'});
        /* multi select */
        $(this).find('.k-multiselect-wrap').find('.k-clear-value').css({'margin-right':'20px'});
        /* datatime */
        $(this).find('.k-datetimepicker').find('.k-select').css({'margin-right':'26px'});
        /* listener */
        var col = $(this).parents().find('.form-line');
        // $(col).find(':input').addClass('errorWarning');
        // $(col).find('select').addClass('errorWarning');

    });

    $('.fld_add').each(function () {
        $(this).find('.form-label').after(addTemplate);
        /* select */
        $(this).find('.k-dropdown-wrap').find('.k-select').css({ 'margin-right': '20px' });
        /* multi select */
        $(this).find('.k-multiselect-wrap').find('.k-clear-value').css({ 'margin-right': '20px' });
        /* datatime */
        $(this).find('.k-datetimepicker').find('.k-select').css({ 'margin-right': '26px' });
        /* listener */
        var col = $(this).parents().find('.form-line');
        // $(col).find(':input').addClass('errorWarning');
        // $(col).find('select').addClass('errorWarning');

    });
   
     $(document).trigger('mP_FinalizeLoading');
    
});

$(document).on('change', '.k-dropdown', function () {
    if ($(this).parent() !== null) {
        if ($(this).parent().parent() !== null) {
            if ($(this).parent().parent().hasClass("k-grid-pager")) {
                localStorage.rows_to_show = Number($(this).parent().parent().context.innerText);
            }
        }

    }
});

/*******************************************************************************
 *
 *      Listener          : required input
 *      Description       : Build the menu on a page for different roles
 *
 ******************************************************************************/

$(document).on('mP_mOnChangeField', function (e, data) {
    var _value;
    if (data.type === 'select') {
        _value = $('#' + data.id).data('kendoDropDownList').value();
        if (_value !== '' && _value !== ' ' && _value !== null) {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-warning').addClass('k-i-check');
        }
        else {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-check').addClass('k-i-warning');
        }
    }
    else if (data.type === 'multiselect') {
        _value = $('#' + data.id).data('kendoMultiSelect').value();
        if (_value.length > 0) {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-warning').addClass('k-i-check');
        }
        else {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-check').addClass('k-i-warning');
        }
    }
    else if (data.type === 'datetimepicker') {
        _value = $('#' + data.id).data('kendoDateTimePicker').value();
        if(_value !== '' && _value !== ' ' && _value !== null ){
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-warning').addClass('k-i-check');
        }
        else {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-check').addClass('k-i-warning');
        }
    }
    else if (data.type === 'text') {
        _value = $('#' + data.id).val();
        if(_value !== '' && _value !== ' ' && _value !== null) {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-warning').addClass('k-i-check');
        }
        else {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-check').addClass('k-i-warning');
        }
    }
    else if (data.type === 'checkbox') {
        _value = $('#' + data.id).is(':checked');
        if (_value === true) {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-warning').addClass('k-i-check');
        }
        else {
            $('#' + data.id).parents('.form-line').find('.k-stockspots-warning').removeClass('k-i-check').addClass('k-i-warning');
        }
    }
});



/*******************************************************************************
 *
 *      Function          : mP_HandleError
 *      Description       : Handle an error
 *
 ******************************************************************************/

function mP_HandleError(jqXHR, textStatus, errorThrown, p_title) {
    var h_errortext = "";
    if (errorThrown === "Bad Gateway") {
        h_errortext = document.getElementById('lbl_message_errortext').textContent + " " + jqXHR.status + " " + document.getElementById('lbl_message_bad_gateway').textContent;
    }
    else h_errortext = document.getElementById('lbl_message_errortext').textContent + " " + jqXHR.status + " " + errorThrown;
    Swal.fire({
        type: "error",
        title: g_oTranslator.get(p_title),
        text: g_oTranslator.get(h_errortext)
    });
}

function f_mKendoFilterStandard(){
    return {
        cell: {
            operator: "contains",
            template: function (args) {
                args.element.css("width", "100%").addClass("k-textbox").keydown(function (e) {
                    setTimeout(function () {
                        $(e.target).trigger("change");
                    });
                });
            },
            showOperators: true
        }
    }
}


/*******************************************************************************
 *
 *      Function          : f_mNavigateTo
 *      Description       : Navigate to another window
 *
 ******************************************************************************/

function f_mNavigateTo(p_window, p_parameters) {
    var h_url = p_window;
    if (p_parameters !== "") h_url = h_url + "?" + p_parameters;
    window.location.href = h_url;
}

/*******************************************************************************
 *
 *      Function          : f_mShowMessage
 *      Description       : Open dialog box
 *
 ******************************************************************************/

function f_mShowMessage(p_type, p_title, p_message, p_url_target = null) {

    const dialog = $('<div id="dialog"></div>');

    dialog.kendoDialog({
        width: "100%",
        maxWidth: 400,
        title: g_oTranslator.get(p_title),
        closable: false,
        modal: true,
        content: g_oTranslator.get(p_message),
        actions: [
            {
                text: g_oTranslator.get('OK'), primary: true, action: function () {
                    if (p_url_target !== null && p_url_target !== "") {
                        window.location.href = p_url_target;
                    }
                }
            }
        ]
    });
    dialog.data("kendoDialog").open();
    dialog.data("kendoDialog").center();
}

/*******************************************************************************
 *
 *      Function          : f_mShowConfirmation
 *      Description       : Open dialog box
 *
 ******************************************************************************/

function f_mShowQuestion(p_title, p_message, p_callBackFunction, p_callBackFunctionCancel) {

    const dialog = $('<div id="dialog"></div>');

    dialog.kendoDialog({
        width: "100%",
        maxWidth: 400,
        title: g_oTranslator.get(p_title),
        closable: false,
        modal: false,
        content: g_oTranslator.get(p_message),
        actions: [
            { text: g_oTranslator.get('Cancel'), primary: true, action: p_callBackFunctionCancel },
            { text: g_oTranslator.get('OK'), primary: true, action: p_callBackFunction }
        ]
    });
    dialog.data("kendoDialog").open();
    dialog.data("kendoDialog").center();
}
