
/*******************************************************************************
 *
 *      Created           : Marcelo Bossle
 *      ServiceModulePart : Portal
 *      Object            : cField (javascript file)
 *
 ******************************************************************************/

function oField_mInitializeTextInput(p_id){
    $('#' + p_id).on('change', function() {
        var data = [{ id : $(this).attr('id') , value: $(this).val() , type: 'text'}];
        $(document).trigger('mP_mOnChangeField', data);
    });
    $('#' + p_id).on('keydown keyup', function() {
        var data = [{ id : $(this).attr('id') , value: $(this).val() , type: 'text'}];
        $(document).trigger('mP_mOnChangeField', data);
    });
}

/*******************************************************************************
 *
 *      Function          : mInitializeCheckBox
 *      Description       : Initialize a checkbox
 *
 ******************************************************************************/

function oField_mInitializeCheckBox(p_id){
    $('#' + p_id).on('change', function() {
        if(this.checked) {
            value = true;
        }else{
            value = false;
        }
        var data = [{ id : $(this).attr('id') , value: value , type: 'checkbox'}];
        $(document).trigger('mP_mOnChangeField', data);
    });
}

/*******************************************************************************
 *
 *      Function          : mInitializeDatePicker
 *      Description       : Initialize a date picker
 *
 ******************************************************************************/

function oField_mInitializeDatePicker(p_id) {
    $('#' + p_id).kendoDatePicker({
        culture: localStorage.scs_Culture,
        format: "dd-MM-yyyy",
        parseFormats: ["dd-MM-yyyy"],
        weekNumber: true,
        dateInput: true,
        cascade: function (e) {
            var data = [{ id : e.sender.element[0].id , value: e.sender.element[0].value}];
               $(document).trigger('mP_mOnChangeField', data);
            }
    });
    var h_field = $('#' + p_id).data("kendoDatePicker");
    h_field.value(null);
}

/*******************************************************************************
 *
 *      Function          : mInitializeRangePicker
 *      Description       : Initialize a date picker
 *
 ******************************************************************************/

function oField_mInitializeDateRangePicker(p_id) {

    var start = new Date();
    var end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 20);

    $('#' + p_id).kendoDateRangePicker({
        culture: localStorage.scs_Culture,
        format: "dd-MM-yyyy",
        range: { start: start, end: end },
        cascade: function (e) {
            var data = [{ id : e.sender.element[0].id , value: e.sender.element[0].value}];
               $(document).trigger('mP_mOnChangeField', data);
            }
    }).data("kendoDatePicker");
}

/*******************************************************************************
 *
 *      Function          : mInitializeDateTimePicker
 *      Description       : Initialize a date and time picker
 *
 ******************************************************************************/

function oField_mInitializeDateTimePicker(p_id) {
    $('#' + p_id).kendoDateTimePicker({
        culture: localStorage.scs_Culture,
        format: "dd-MM-yyyy HH:mm",
        timeFormat: "HH:mm",
        weekNumber: true,
        dateInput: false,
        cascade: function (e) {
            var data = [{ id: e.sender.element[0].id, value: e.sender.element[0].value }];
            $(document).trigger('mP_mOnChangeField', data);
        }
    });
    var h_field = $('#' + p_id).data("kendoDateTimePicker");
    h_field.value(null);
}

/*******************************************************************************
 *
 *      Function          : mInitializeDropDownList
 *      Description       : Initialize a select list
 *
 ******************************************************************************/

function oField_mInitializeDropDownList(p_id, p_list, p_filter, p_placeholder) {
    if (typeof p_filter === 'undefined') p_filter = "";
    if (typeof p_placeholder === 'undefined') p_placeholder = "Select...";
    var h_data = [];
    if (p_list !== "") {
        h_data = oLists_mGetList(p_list);
    }
    $("#" + p_id).kendoDropDownList({
        optionLabel: g_oTranslator.get(p_placeholder),
        dataTextField: "text",
        dataValueField: "value",
        dataSource: h_data,
        filter: p_filter,
        autoBind: true,
        index: 0,
        height: 350,
        noDataTemplate: g_oTranslator.get("No data found."),
        cascade: function (e) {
            var data = [{ id: e.sender.element[0].id, value: e.sender.element[0].value, type: 'select', action: 'change' }];
            $(document).trigger('mP_mOnChangeField', data);
        },
        select: function (e) {
            var data = [{ id: e.sender.element[0].id, value: e.sender.element[0].value, type: 'select', action: 'select' }];
            $(document).trigger('mP_mOnChangeField', data);
        },
        popup: {
            appendTo: "#mainForm"
        }
    });
    if (p_list === "CNT") {
        if (localStorage.scs_language === "en") $("#" + p_id).data('kendoDropDownList').value("GB");
        else if (localStorage.scs_language === "de") $("#" + p_id).data('kendoDropDownList').value("DE");
        else if (localStorage.scs_language === "fr") $("#" + p_id).data('kendoDropDownList').value("FR");
        else $("#" + p_id).data('kendoDropDownList').value("NL");
    }
    if (p_list === "LNG") {
        $("#" + p_id).data('kendoDropDownList').value(localStorage.scs_language);
    }
}

/*******************************************************************************
 *
 *      Function          : mInitializeMultiSelect
 *      Description       : Initialize a select list
 *
 ******************************************************************************/

function oField_mInitializeMultiSelect(p_id, p_list, p_placeholder = 'Select...'){
    $("#" + p_id).kendoMultiSelect({
        optionLabel: g_oTranslator.get(p_placeholder),
        dataTextField: "text",
        dataValueField: "value",
        autoBind: true,
        autoClose: false,
        height: 350,
        index: 0,
        change: function(e){
            var data = [{ id : e.sender.element[0].id , value: e.sender.element[0].value , type: 'multiselect'}];
            $(document).trigger('mP_mOnChangeField', data);
        }
    });
}

/*******************************************************************************
 *
 *      Function          : mInitializeGrid
 *      Description       : Initialize a grid
 *
 ******************************************************************************/

var p_button_default = [{name: 'excel', text: 'Excel'}, {name: 'pdf', text: 'PDF'}];
var aggregate = [{ field: "col_amount", aggregate: "sum" }];

function oField_mInitializeGrid(p_id, p_columns, p_data, p_button = p_button_default, p_aggregate = '') {
    var h_rows_to_show = localStorage.rows_to_show;
    if (Number(h_rows_to_show) < 1) h_rows_to_show = 10;
    $('#' + p_id).kendoGrid({
        columns: p_columns,
        dataSource: {
            data: p_data,
            schema: {
                model: {
                    id: ""
                }
            },
            pageSize: Number(h_rows_to_show),
            aggregate: p_aggregate
        },
        filterable: {
            mode: "row"
        },
        editable: "inline",
        pageable: {
            pageSizes: [10, 15, 25, 50, 100, 250]
        },
        persistSelection: true,
        scrollable: false,
        sortable: {
            mode: "multiple",
            allowUnsort: true,
            showIndexes: true
        },
        toolbar: p_button,
        excel: {
            fileName: "export.xlsx"
        },
        noRecords: true,
        messages: {
            noRecords: g_oTranslator.get("No data found.")
        },
        pdf: {
            fileName: "export.pdf"
        }
    });
}

function oField_mInitializeGridByDataSource(p_id, p_columns, p_datasource) {
    $('#' + p_id).kendoGrid({
        columns: p_columns,
        dataSource: p_datasource,
        editable: "inline",
        persistSelection: true,
        scrollable: false,
        messages: {
            noRecords: g_oTranslator.get("No data found.")
        }
    });
}

function oField_mGridSetNumberOfRowsToShow(e) {
    console.log(e);
//    localStorage.rows_to_show = p_rows;
}

/*******************************************************************************
 *
 *      Function          : mInitializeUploadFile
 *      Description       : Initialize an upload file
 *
 ******************************************************************************/

function oField_mInitializeUploadFile(p_id) {
    $('#' + p_id).kendoUpload({
        async: {
        autoUpload: false
        },
        select: function(e) {
            console.log(e.sender.element[0].id , e.sender.element[0].value , 'fileupload');
        var data = [{ id : e.sender.element[0].id , value: e.sender.element[0].value , type: 'fileupload'}];
           $(document).trigger('mP_mOnChangeField', data);
        }
    },);
}

/*******************************************************************************
 *
 *      Function          : mSetRequired
 *      Description       : Set a field to required
 *
 ******************************************************************************/

function oField_mSetRequired(p_id) {
    $('#' + p_id).addClass('fld_required');
    $('#' + p_id).find('.form-label').after(warningTemplate);
    /* select */
    $('#' + p_id).find('.k-dropdown-wrap').find('.k-select').css({ 'margin-right': '20px' });
    /* multi select */
    $('#' + p_id).find('.k-multiselect-wrap').find('.k-clear-value').css({ 'margin-right': '20px' });
    /* datatime */
    $('#' + p_id).find('.k-datetimepicker').find('.k-select').css({ 'margin-right': '26px' });
}

/*******************************************************************************
 *
 *      Function          : mSetGridColumnEditable
 *      Description       : Set a grid column editable
 *
 ******************************************************************************/

function oField_mSetGridColumnEditable(p_grid, p_column, p_column_name, p_column_name_mark, p_type = 'text') {
    var h_edit_column = '<div>'
        + '<input type="text" name="' + p_column_name + '" ' + p_column_name_mark + '="#= ' + p_column_name_mark + ' #" class="k-textbox k-text grid-edit-column" value="#= ' + p_column_name + ' #" style="width: 100%;" /> '
        + '</div>';
    if (p_type === 'number') {
        h_edit_column = '<div>'
            + '<input type="number" name="' + p_column_name + '" ' + p_column_name_mark + '="#= ' + p_column_name_mark + ' #" class="k-textbox k-text grid-edit-column number-type" value="#= ' + p_column_name + ' #" style="width: 100%;" /> '
            + '</div>';
    }
    var h_options = p_grid.getOptions();
    h_options.columns[p_column].template = h_edit_column;
    p_grid.setOptions(h_options);
}

/*******************************************************************************
 *
 *      Function          : mSetGridColumnEditable
 *      Description       : Set a grid column editable
 *
 ******************************************************************************/

function oField_mGetSelectedRowsFromGrid(p_name_grid, p_name_item) {
    var grid = $("#" + p_name_grid).data("kendoGrid");
    var sel = $("input:checked", grid.tbody).closest("tr");
    var items = [];
    $.each(sel, function (idx, row) {
        var item = grid.dataItem(row);
        items.push(item[p_name_item]);
    });
    return items;
}

/*******************************************************************************
 *
 *      Function          : oField_mSetValue
 *      Description       : Set a field value
 *
 ******************************************************************************/

function oField_mSetValue(i, v, s) {
    var _this = $('#' + i);
    var data;
    if (_this.hasClass('k-text')) {
        if (v !== null) {
            _this.val(v);
            data = [{ id: i, value: v, type: 'text' }];
            $(document).trigger('mP_mOnChangeField', data);
        }
        if (s === 'enabled') {
            $(_this).removeAttr("disabled");
        }
        else if (s === 'disabled') {
            $(_this).attr("disabled", true);
        }
    }
    else if (_this.hasClass('k-dropdown')) {
        _this.data('kendoDropDownList').value(v);
        if (s === 'enabled') { _this.data('kendoDropDownList').enable(true) } else if (s === 'disabled') { _this.data('kendoDropDownList').enable(false); }
        data = [{ id: i, value: v, type: 'select' }];
        $(document).trigger('mP_mOnChangeField', data);
    }
    else if (_this.hasClass('k-multiselect')) {
        _this.data('kendoMultiSelect').value(v);
        if (s === 'enabled') { _this.data('kendoMultiSelect').enable(true) } else if (s === 'disabled') { _this.data('kendoMultiSelect').enable(false); }
         data = [{ id: i, value: v, type: 'multiselect' }];
        $(document).trigger('mP_mOnChangeField', data);
    }
    else if (_this.hasClass('k-datetimepicker')) {
        if (v !== null && v !== "") {
            _this.data('kendoDateTimePicker').value(oTransform_mToDateTime(v));
        }
        if (s === 'enabled') { _this.data('kendoDateTimePicker').enable(true); }
        else if (s === 'disabled') _this.data('kendoDateTimePicker').enable(false);

        data = [{ id: i, value: v, type: 'datetimepicker' }];
        $(document).trigger('mP_mOnChangeField', data);

    }
    else if (_this.hasClass('k-checkbox')) {
        if (s === 'enabled') $(_this).removeAttr("disabled");
        else if (s === 'disabled') $(_this).attr("disabled", true);
        if (v === 'true' || v === true) $(_this).prop("checked", true).trigger("change");
        else if (s === 'disabled') $(_this).prop("checked", false).trigger("change");
        data = [{ id: i, value: v, type: 'checkbox' }];
        $(document).trigger('mP_mOnChangeField', data);
    }
    else if (_this.hasClass('k-button')) {
        if (s === 'enabled') $(_this).removeAttr("disabled");
        else if (s === 'disabled') $(_this).attr("disabled", true);
    }
}

/*******************************************************************************
 *
 *      Function          : mP_Get
 *      Description       : Get value more easily
 *
 ******************************************************************************/

function oField_mGetValue(i) {
    var _this = $('#' + i);

    if (_this.hasClass('k-text')) {
        return $(_this).val();
    } else if (_this.hasClass('k-dropdown')) {
        return $(_this).data('kendoDropDownList').value();
    } else if (_this.hasClass('k-multiselect')) {
        return $(_this).data('kendoMultiSelect').value();
    } else if (_this.hasClass('k-datetimepicker')) {
        return $(_this).data('kendoDateTimePicker').value();
    } else if (_this.hasClass('k-checkbox')) {
        return $(_this).prop("checked", true);
    }

}
