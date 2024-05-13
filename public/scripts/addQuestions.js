

$j(document).ready(function () {
    $j("#add_option").click(function () {
        var options = $j(".options");
        var option_id = $j("#total_option").val();
        var option_container = $j("#option_container");
        const new_option = '<div class="input-group options mt-4 mb-2" id="' + option_id + '_container"><div class="input-group-prepend"><span class="input-group-text"><input type="radio" value="' + option_id + '" id="correct_' + option_id + '" name="correctAnswer"></span></div><input type="text" id="optin_' + option_id + '" name="option" placeholder="Option ' + option_id + '" class="form-control"><span class="input-group-append"><button type="button" id="'+option_id+'" class="btn btn-danger btn-flat remove_option">Delete </button></span></div>';
        option_container.append(new_option);
        $j("#total_option").val(parseInt(option_id) + 1);
    });

    
});

$j(document).on('click', '.remove_option', function () {
    var element_id = $j(this).attr("id");
    $j("#"+element_id + "_container").remove();

});