$(document).ready(function() {
    var toDoItems = []
    //function to write out list items to DOM
    // for loop
    // pass the value of the loop into your write out function
    $('#submitButton').on('click', function(event) {
        var toDo = $("#userInput").val();
        writeToDo(toDo);
        submitUserInput();
    });


    // $('#userInput').keydown(function(event){
    //     var keycode = (event.keycode ? event.keycode : event.which);
    //     if(keycode == '13'){
    //         var toDo = $("#userInput").val();
    //         writeToDo(toDo);  
    //     }
    // });

    function writeToDo(toDo) {
        if (toDo) {
            $('#toDoList').append(`
                <div class="alert alert-secondary taskList" id="toDoItem" role="toDoItem">
                    <div class="row">
                        <div class="col-10">
                            <p id="toDoText">
                                ${toDo}
                            </p>
                        </div>
                        <div class="col-2 ">
                            <button type="button" class="btn deletebtn btn-success float-right" id="${toDo}">Complete</button>
                        </div>
                    </div>
                </div>`
            );
    }
    }

    function submitUserInput(){
        toDoItems.push($('#userInput').val());
        console.log(toDoItems);

    }

    $(document).on('click', 'button.deletebtn', function (toDo) {
        $(this).closest('.taskList').remove();
        return false;

    });

    // function deleteToDo(){
    //     $('#toDO').on('click', function(event) {

    // });





});
