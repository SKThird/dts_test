
$("#attachment").change(function(){
    //var form_data = new FormData($('#form1')[0]);
    //form_data.append('bugs_id', $('#bugs_id').val());
    var form_data = new FormData();
    form_data.append('bugs_id', $('#bugs_id').val());
    form_data.append('attachment', $('#attachment')[0].files[0]);
    //alert($("#bugs_id").val());
    //alert(form_data);
    //$('#form1')是个list，所以要得到form必须用下标取
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: form_data,
        contentType: false,
        processData: false,
        success: function(fileinfo){
            table = '<tr class="trattach">' +
                    '<td> <div class="form-group "><span class="label label-info">'+ fileinfo.filename +'</span></div></td>' +
                    '<td> <div class="form-group "><button class="btn btn-warning" type="button" name="'+ fileinfo.symlink +'" >删除</button></div></td></tr>';
            $('#listattach').append(table);
            //$('#attachmentdiv').append(ss);
        },
        error: function(){
            alert("该文件无法上传。文件大小超过 16M！");
        },
    });
});

$("#attachmentdiv2").on("click", "button", function(){
    //"div[id^='attachmentdiv']" 给div元素，所有以attachment开头的添加事件

    //删除bug edit时的附件
    //获取当前点击的元素
    var pic = $(this);
    $.post("/delete/"+ pic.attr("name"),
        function(){ pic.parent().remove()}
    ).error(function() { alert("删除失败 ！！"); });
});

$("#listattach").on("click", "button", function(){
    //给tbody元素，所有tr添加事件
    //删除bug新增加的附件
    //获取当前点击的元素
    var pic = $(this);
    $.post("/delete/"+ pic.attr("name"),
        function(){ pic.parents("tr.trattach").remove()}
    ).error(function() { alert("删除失败！"); });
});

/*
事件委托的方法。后续统一使用on方法
this 在不同的上下文中作用不同。
this 与$(this)不同，this是html对象，$(this)是jquery对象
$("#attachmentdiv").delegate("a","click",function(){
    //$("p").append('click');
    //alert($(this).attr('name'));
    var ss = $(this);
    $.ajax({
        url: '/delete/'+$(this).attr('name'),
        type: 'get',
        //data: $(this).attr('id'),
        contentType: false,
        processData: false,
        success: function(){
            alert(this);
            ss.parent().remove();
        },
    }).error(function() { alert("error323"); });
});
*/


