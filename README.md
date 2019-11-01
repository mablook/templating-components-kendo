# Modeling Components for use with kendo js
### improve functions to make larger pages easier and keep code cleaner

Creating templates functions in javascript to make it easy and clean to build html pages using "kendo".
To make the construction of the pages cleaner, we decided to create a template system so that the business engineer can simply create inputs in a simpler way.

*Imagine a window with 100 inputs each costs at least 6 lines*

**Instead of using the traditional method to call an input, and create it on the page itself, as before:**

        <div class="form-group col-12"> <!-- line -->
            <div class="form-line fld_required"> <!-- style -->
                <input id="sog_data" type="text" class="form-control"> <!-- input -->
                <label class="form-label trn">Name</label> <!-- label -->
            </div>
        </div>
               
*now i only need 3*               
               
**Now we have functions that are loaded and read the context of the page using custom data labels to create the elements:**

      <div class="row col-7"> <!-- row -->
          <div class="form-group col-12"> <!-- col -->
              <div class="form-line " oFieldId="pro_data" oFieldType="DropDownList" oFieldTitle="Select an organization"></div>
          </div>
          <div class="form-group col-12">
              <div class="form-line " oFieldId="_categories" oFieldType="DropDownList" oFieldTitle="Product groups" multiple="multiple"></div>
          </div>
          <div class="form-group col-12">
              <div class="form-line " oFieldId="_services" oFieldType="MultiSelect" oFieldTitle="Wanted services" multiple="multiple"></div>
          </div>
          <div class="form-group col-12">
              <div class="form-line " oFieldId="_securities" oFieldType="MultiSelect" oFieldTitle="Needed security" multiple="multiple"></div>
          </div>
          <div class="form-group col-12">
              <div class="form-line " oFieldId="_certifications" oFieldType="MultiSelect" oFieldTitle="Needed certifications" multiple="multiple"></div>
          </div>
      </div>


1 Parameters:
  - using this class **fld_required** to indicate if the input is required
  - **oFieldId** set input ID
  - **oFieldType** input type needs to be created types
  - **oFieldTitle** set label text
  - **oFieldList** pass OBJECT or ARRAY if input is dropdown or multiselect ...
  - **multiple** if it is possible multiple choice
  
*Types avaliable: Password,TextInput,TextArea,CheckBox,DatePicker,DateTimePicker,DateRangePicker,DropDownList,MultiSelect,UploadFile*

### And why not use the same logic to create an entire grid, making the code clean and easy

In HTML I just need it

    <!-- Main -->
    <section id="oSectionMain" class="container-fluid clearfix">
        <div class="row with-margin">
            <div id="oEntities" style="width:100%"></div>
        </div>
    </section>

Now in the JS page I call

     oField_mInitializeGrid("oEntities", h_columns, p_data);
     // oField_mInitializeGrid(id to set, columns setup in kendo, data response from rest call);
                 
                 
And if a need set another's buttons or aggregate options in grid

      var p_button_default = [{name: 'excel', text: 'Excel'}, {name: 'pdf', text: 'PDF'}];
      var aggregate = [{ field: "col_amount", aggregate: "sum" }];
      oField_mInitializeGrid("oEntities", h_columns, p_data, p_button_default, aggregate);
      
After all entries are done, I trigger mP_mOnChangeField
Now my DOM is ready and easier to manipulate

        $(document).on('mP_FinalizeLoading', function (e) {
        ...
        });

The same happens if I need to set a value on an input, sometimes I need to check this value first or monitor the state, so I created the function to set value on any type of input.

      oField_mSetValue('inputid', response.someData);
      oField_mSetValue('inputid', response.someData, "disabled"); // or change state
      
Or get value

      oField_mGetValue(inputID)
      
Or get value for Grid

      oField_mGetSelectedRowsFromGrid(gridId, itemName) 
      
Or set some column in Kendo Grid editable

    oField_mSetGridColumnEditable(p_grid, p_column, p_column_name, p_column_name_mark, p_type = 'text')
    
