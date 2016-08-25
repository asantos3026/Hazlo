$(function() {

      var checkbox = $("#trigger")
      var hidden = $("#hidden_fields")
      var populate = $("#populate")

      hidden.hide()

      checkbox.change(function() {
        if (checkbox.is(':checked')) {
          hidden.show();
          populate.val("Dude, this input got populated!")
        } 
        else {
          hidden.hide()
          $("#hidden_field").val("")
        }
      })

})