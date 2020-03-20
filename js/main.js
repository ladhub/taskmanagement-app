var carstate =
{
    queue: []
};
localStorage.setItem("cardstatus", JSON.stringify(carstate));

function allowDrop(ev) {
    var t = ev.target;
    if (t.classList.contains("task-card-container")) {
        ev.preventDefault();
    }
    return false;
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var statusid = ev.target.id;
    var restoredQueue = JSON.parse(localStorage.getItem('cardstatus'));
    restoredQueue.queue.push({
        id: data,
        name: statusid
    });
    localStorage.setItem('cardstatus', JSON.stringify(restoredQueue));
}

$(document).ready(function () {

    $('#savebtn').click(function () {
        var tasktitle = $("#taskTitle").val();
        var taskdescription = $("#taskDescription").val();
        event.preventDefault();
        var usernames = $("input:checkbox:checked").map(function () {
            return this.value;
        }).toArray();

        if (tasktitle == " " || taskdescription == " " || usernames.length <= 0) {
            $(".error").show();
            return false;
        } else {
            $(".error").hide();
            $("#taskTitle, #taskDescription").val(" ");
            $("input:checkbox:checked").prop("checked", false);
            $("#addTaskModal").modal('hide');
            console.log(tasktitle, taskdescription, usernames);
            var cardId = Math.floor(Math.random() * (100 - 1 + 1)) + 1
            $("#todoContainer").append('<div id="' + cardId + '" class="card-wrapper" draggable="true" ondragstart="drag(event)"> <div id="removecard" >X</div><div class="cw-title">' + tasktitle + '</div><div class="cw-descr">' + taskdescription + '</div><div class="cw-user"><i class="fas fa-user-check"></i> ' + usernames + '</div></div>');
            var restoredQueue = JSON.parse(localStorage.getItem('cardstatus'));
            restoredQueue.queue.push({
                id: cardId,
                name: "todoContainer"
            });
            localStorage.setItem('cardstatus', JSON.stringify(restoredQueue));
        }
    });

    $('#closebtn').click(function () {
        $(".error").hide();
        $("#taskTitle, #taskDescription").val(" ");
        $("input:checkbox:checked").prop("checked", false);
    });

    $('.hero-task-container').delegate("#removecard", "click", function () {
        $(this).parent().remove();
    });
});