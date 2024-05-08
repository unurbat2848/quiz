

$j(document).ready(function () {
    $j("#add_option").click(function () {
        var options =$j(".options");
        var option_id = options.length;
        var option_container = $j("#option_container");
        const new_option = '<div class="input-group options mt-4 mb-2"><div class="input-group-prepend"><span class="input-group-text"><input type="radio" value="'+option_id+'" id="correct_'+option_id+'" name="correctAnswer"></span></div><input type="text" id="optin_'+option_id+'" name="option" placeholder="Option '+option_id+'" class="form-control"></div>';
        option_container.append(new_option);
    });
});