
//收藏
var wwwurl = 'http://www.cncn.com';
//var wwwurl = 'http://192.168.1.5/';

//验证码
function showcode() {
	  	if (gt("code_verify").innerHTML ==''){
			gt("code_verify").innerHTML = '<img src="'+wwwurl+'/checksum.php" align="absmiddle">';
			gt("code_text").innerHTML =''
		}
}

function fav_line(id){
  	//window.external.addFavorite(document.location.href, document.title);
  	window.open(wwwurl+'/member/fav.php?id='+id,'fav_window');
}

function num_change(flag){
	if(flag==1){
		if(gt("adult_num").value==-1){
			gt("adult_num").style.display='none';
			gt("adult_num_text").style.display='';
			gt("adult_num_text").focus();
		}else{
			gt("adult_num").style.display='';
			gt("adult_num_text").style.display='none';
		}
	}else if(flag==2){
		if(gt("child_num").value==-1){
			gt("child_num").style.display='none';
			gt("child_num_text").style.display='';
			gt("child_num_text").focus();
		}else{
			gt("child_num").style.display='';
			gt("child_num_text").style.display='none';
		}
	}
} 

function login_dis_fun(){
	if (gt('login_dis').style.display=='block'){
		gt('login_dis').style.display="none";
	}else{
		gt('login_dis').style.display="block";
	}
}

//新子页面js

//线路选价格类型
function get_date_price(type_id,x,y,z){
	$("input[name='type_id']").val(type_id);
	var line_id = gt("line_id").value;
	$('#li_date_type'+type_id).addClass("selected").siblings().removeClass("selected");

	if($("#price_span")){
		if(x){
			$("#price_span").html(x);
		}else{
			$("#price_span").html('');
		}
	}
	//特价促销
	if(gt("sale_price") && gt("discount").value>0){
		y = y-gt("discount").value;
		gt("sale_price").innerHTML = y;
	}
	$("#price_cncn_span").html('<em>'+y+'</em>元起');
	if($("#price_cncn_child_span")){
		if(z){
			$("#price_cncn_child_span").html('儿童价：<em>'+z+'</em>元起');
		}else{
			$("#price_cncn_child_span").html('');
		}
	}
	$("input[name='adult_price']").val(y);
	$("input[name='child_price']").val(z);


    //if (is_wuyi==1) {
        //$(".key").removeClass('key2');
    //}else{
        $("input[name='start_time']").val('请选择出发日期');
        $("#child_message").html('');
    //}
	
    $("#date_loading").html('<img src="http://s.cncnimg.cn/images/loading.gif" style="display:block;width:28px;height:28px;margin:10px auto 10px auto;" title="加载中">');

	var url = "/ajax_line.php?inajax=1&action=line_price&line_id=" + line_id +"&type_id=" + type_id;
	$.get(url, true,function(data) {
		var arr = data.split('$$$');
		$("#expire_day").val(arr[0]);
		$("#date_price_data").val(arr[2]);
        price_d = parseInt(arr[3]);
        if(price_d>0){
	        $("#price_cncn_span").html('<em>'+price_d+'</em>元起');
        }
		$('#J_date_table').find('.month_row').remove();
		fn_price();
		var expire_day = arr[0];
		var calendar_end = arr[1];
		if($('.month_row').length > 1){
            $('.pre_month').parents('#J_date_table').addClass('more');
        }else{
            $('.pre_month').parents('#J_date_table').removeClass('more');
        }
		/*if (date_comptime(calendar_end,expire_day)>0){
		}else{
			$('.pre_month').parents('#J_date_table').removeClass('more');
		}*/
		$('.month_row').hide();
	    $('.month_row').eq(0).show();
	})
	
	wuyi_disconunt_1();//五一折扣
}

//出发日期
function display_price_type(){
	var line_id = $("input[name='line_id']").val();
	var type_id = $("input[name='type_id']").val();

	if(type_id=='' || type_id=='0' || gt('li_date_type' +(parseInt(type_id))).className != 'selected'){
	   layer.msg('请选择预订类型！', {icon:5});
	   //alert_fail("请选择预订类型！");
       return;
	}
	$("#date_loading").html('<img src="http://s.cncnimg.cn/images/loading.gif" style="display:block;width:28px;height:28px;margin:10px auto 10px auto;" title="加载中">');

    var url = "/ajax_line.php?inajax=1&action=line_price&line_id=" + line_id +"&type_id=" + type_id;
    $.get(url, true,function(data) {
        var arr = data.split('$$$');
        gt("expire_day").value = arr[0];
        gt("date_price_data").value = arr[2];
        $('#J_date_table').find('.month_row').remove();
        fn_price();
        var expire_day = arr[0];
        var calendar_end = arr[1];
        if($('.month_row').length > 1){
            $('.pre_month').parents('#J_date_table').addClass('more');
        }else{
            $('.pre_month').parents('#J_date_table').removeClass('more');
        }
        /*if (date_comptime(calendar_end,expire_day)>0){
        }else{
            $('.pre_month').parents('#J_date_table').removeClass('more');
        }*/
	    $('.month_row').hide();
	    $('.month_row').eq(0).show();
    });
	var start_time = gt('start_time').value;
	if(start_time!='' && start_time!='请选择出发日期'){
		$('#J_date_table li').each(function(){
			if($(this).data('date')){
				if($(this).data('date')==start_time){
					
				}else{
					$(this).removeClass('order_day');
				}
			}
		})
	}
    if ($('#J_date_table').is(":hidden")) {
	    $('#J_date_table').show();
    }else{
	    $('#J_date_table').hide();
    }
	$('#J_date_table').addClass('more');
}


//更多
function detail_list(type_id){
	var line_id = gt("line_id").value;
	gt("type_id").value = type_id;
	var arr = gt("price_type_arrs").value.split(',');
	for (var i=0;i<arr.length;i++){
		if (arr[i]==type_id){
			gt('li_date_type'+type_id).className= "selected";
		}else{
			gt('li_date_type'+arr[i]).className= "";
		}
	}
	$("#date_loading").html('<img src="http://s.cncnimg.cn/images/loading.gif" style="display:block;width:28px;height:28px;margin:10px auto 10px auto;" title="加载中">');

	var url = "/ajax_line.php?inajax=1&action=line_price&line_id=" + line_id +"&type_id=" + type_id;
	$.get(url, true,function(data) {
		var arr = data.split('$$$');
		gt("expire_day").value = arr[0];
		gt("date_price_data").value = arr[2];
		$('#J_date_table').find('.month_row').remove();
		fn_price();
		var expire_day = arr[0];
		var calendar_end = arr[1];
		if (date_comptime(calendar_end,expire_day)>0){
			$('.pre_month').parents('#J_date_table').addClass('more');
		}else{
			$('.pre_month').parents('#J_date_table').removeClass('more');
		}
	})
	//gt('li_date_type' +(parseInt(type_id))).style.display = 'block';
	gt('J_date_table').style.display = 'block';
	//$('.pre_month').show();
}

//更多日期
function date_display(){//类别id，
	var line_id = gt("line_id").value;
	var type_id = gt("type_id").value;
	if(type_id=='' || type_id=='0' || gt('li_date_type' +(parseInt(type_id))).className != 'selected'){
        layer.msg('请选择预订类型！', {icon:5});
        //alert_fail("请选择预订类型！");
		return;
	}
	/*$("#date_loading").html('<img src="http://s.cncnimg.cn/images/loading.gif" style="display:block;width:28px;height:28px;margin:10px auto 10px auto;" title="加载中">');
	var url = "/ajax_line.php?inajax=1&action=line_price&line_id=" + line_id +"&type_id=" + type_id;
	$.get(url, true,function(data) {
		var arr = data.split('$$$');
		gt("expire_day").value = arr[1];//不一样
		gt("date_price_data").value = arr[2];
		$('#J_date_table').find('.month_row').remove();
		fn_price();
	
		var start_time = gt('start_time').value;
		if(start_time!='' && start_time!='请选择出发日期'){
			$('#J_date_table li').each(function(){
				if($(this).data('date')){
					if($(this).data('date')==start_time){
						$(this).addClass('order_day');
					}
				}
			})
		}
	})*/

    $('.month_row').show();
	$('.pre_month').parents('#J_date_table').removeClass('more');
}

//线路预定
function view_order(ths){//x当前日期,y当前欣欣价,z当前欣欣儿童价，k类别加月份，l当天
    var self = $(ths);
    var parent_li = self.parents('li');
    var x = parent_li.data('date');
    var y = parent_li.data('youhui_price');
    var z = parent_li.data('child_price');
    arrx = x.split('-');
	gt("start_time").value = arrx[0]+'-'+arrx[1]+'-'+arrx[2];
	//特价促销
	if(gt("sale_price") && gt("discount").value>0){
		y = y-gt("discount").value;
		gt("sale_price").innerHTML = y;
	}
	if(y){
		gt("price_cncn_span").innerHTML = '<em>'+y+'</em>元';
		gt("adult_price").value = y;
	}
	if(gt("price_cncn_child_span")){
		if(z){
			gt("price_cncn_child_span").innerHTML ='儿童价：<em>'+z+'</em>元';
			gt("child_price").value = z;
            if (cg_id>0) {
                $("#child_num_span").show();
            }
		}else{
			gt("price_cncn_child_span").innerHTML ='';
			gt("child_price").value = 0;
            if (cg_id>0) {
                $("#child_num_span").hide();
            }
            if ($("input[name='child_num']").val()>0) {
                $("#child_message").html('该线路无儿童报价，具体价格请咨询旅行社');
            };
		}
	}
	gt('start_time').className= "text text110 riqi1";
	
	wuyi_disconunt_1();
}
function wuyi_disconunt_1(){//五一折扣换算
	var wuyi_discount=$('#wuyi_discount');
	if(wuyi_discount.length!=0){
		var money_wuyi=$('#price_cncn_span em').text()*(wuyi_discount.data('discount')/10);
		wuyi_discount.html(Math.round(money_wuyi));
	}
}

function check_child_price(){
    if (gt("child_price").value == 0 && $("input[name='child_num']").val()>0 && $("input[name='start_time']").val()!='请选择出发日期') {
        $("#child_message").html('该线路无儿童报价，具体价格请咨询旅行社');
    }else{
        $("#child_message").html('');
    }
}

//日历比较
function date_comptime(strDate1,strDate2)   
{   
	var date1 = new Date(strDate1.replace(/-/g, "/"));
	var date2 = new Date(strDate2.replace(/-/g, "/"));
	return date1-date2;  
} 
/*function show_share(a){
    if(a==1){
        gt("share").style.display='none';
    }else{
        gt("share").style.display='block';
    }
}*/


//提交订单
function check_order(ths){
	
	var tform = ths.form;

	var type_sel = 0;
	arr = gt("price_type_arrs").value.split(',');
	for (var i=0;i<arr.length;i++){
		if (gt('li_date_type' +(parseInt(arr[i]))).className=='selected'){
			type_sel = 1;
		}
	}
	var start_time = gt('start_time').value;
	if(start_time==''||start_time=='请选择出发日期'||type_sel==0){
		$(".key").addClass('key2');
        return false;
	}else{
		$(".key").removeClass('key2');
		$(".key .button input").removeClass('submit2');
	}
	
	/*if(tform.uid.value==''){
	
		var line_id = tform.id.value;
		var type_id = tform.type_id.value;
		var adult_num = tform.adult_num.value;
        if (tform.child_num) {
		    var child_num = tform.child_num.value;
		    var forwards = wwwurl+'/xianlu/order.php?id='+line_id+'&type_id='+type_id+'&start_time='+start_time+'&adult_num='+adult_num+'&child_num='+child_num;
        }else{
		    var forwards = wwwurl+'/xianlu/order.php?id='+line_id+'&type_id='+type_id+'&start_time='+start_time+'&adult_num='+adult_num;
        }
		
		$('#qqa').attr('href','http://s.cncnimg.cn/login/qq/oauth/?ref='+encodeURIComponent(forwards));
		$('#sinaa').attr('href','http://s.cncnimg.cn/login/sina/sina.php?ref='+encodeURIComponent(forwards));
		
		$.layer({
			type : 1,
			title : false,
			//offset:['500px','50%'],
			border : false,
			area : ['816px','300px'],
			page : {dom : '#login_box'}
		});
		return false;
	}*/

	
	tform.submit();
	
}

//验证用户名
function checkusername() {

	var truename = trim(gt('truename').value);
	var cu = gt('checkusername');
	var unLen = truename.replace(/[^\x00-\xff]/g, "**").length;
	
	if(unLen < 4 || unLen > 15) {
	  cu.innerHTML = unLen < 4 ? '联系人小于4个字符' : '联系人超过 15 个字符';
	  return false;
	}else {
	  cu.innerHTML ='';
	}
}

//下订单手机注册
function checkcode() {

	/*var truename = gt('truename').value;
	var cu = gt('checkusername');
	var unLen = truename.replace(/[^\x00-\xff]/g, "**").length;
	
	if(unLen < 4 || unLen > 15) {
	  	cu.innerHTML = unLen < 4 ? '用户名小于4个字符' : '用户名超过 15 个字符';
	  	return false;
	}else {
	  	cu.innerHTML ='';
	}*/
	
	var mobiletel = gt('mobiletel').value;
	var checkcode = gt('checkcode').value;
	
	//ajaxresponse2('checkusername', 'action=checkcode&truename=' + truename+'&mobiletel='+mobiletel+'&checkcode='+checkcode);
	ajaxresponse2('check_msg', 'action=checkcode&mobiletel='+mobiletel+'&checkcode='+checkcode);
	
	return true;
}
function ajaxresponse2(objname, data) {
    var url = "/mobile_check.php?"+data;
	$.post(url, true,function(data) {
	        var obj = gt(objname);
	        obj.style.display = '';
	        var arr = data.split('||');
	        if(arr[0] == 'succeed') {
	        	obj.innerHTML = '';
				gt('name_mobile').value = arr[1];
				gt('form_order').submit();
      		} else {
      			if(data == 'mobile_code_error'){
      				gt('check_msg').innerHTML = '手机或验证码有误';
      			}else{
      				obj.innerHTML = data;
      			}
      			return false;
      		}
	});
}

function ajax_login(){
		
	var username = gt('username').value;
	var password = gt('password').value;
	var cu = gt('check_user_login');
	
	var unLen = username.replace(/[^\x00-\xff]/g, "**").length;
	var psLen = password.replace(/[^\x00-\xff]/g, "**").length;
	
	if(unLen ==0 || psLen == 0) {
	  	cu.innerHTML = '用户名或密码不能为空';
	  	return false;
	}else {
	  	cu.innerHTML ='';
	}
	
	$.post("/ajax_login.php?action=login&username="+username, {"password":password},function(data) {
	        if(data == 'succeed') {
	        	cu.innerHTML = '';
				gt('form_order').submit();
      		} else {
      			cu.innerHTML = data;
      			return false;
      		}
	});
	
	return true;
}

$('.fa_riqi a').click(function(){
	$('.date_table').show()
});
$(".J_PanelCloser").click(function(){
	$(this).parents("#key_css").removeClass("key2");
	$('#submit_button').removeClass('submit2')
}) 

$('.date_table s.close').click(function(){
	$(this).parents('.date_table').hide();
	toTopHeight = $("#tab_fxd").offset().top;
})


function removeDuplicatedItem(ar) {
    var ret = [];
    ar.forEach(function(e, i, ar) {
        if (ar.indexOf(e) === i) {
            ret.push(e);
        	//console.log(e);
        }
    });
    return ret;
}


function fn_price(){
    var new_date = function(str) { 
        var date = new Date(); 
        date.setUTCFullYear(parseInt(str[0],10), parseInt(str[1],10) - 1, parseInt(str[2],10)); 
        date.setUTCHours(-8, 0, 0, 0); 
        //return date.getTime(); 
        return date;
    }
    var stop_bubble = function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
    //事件代理
    $('#J_date_table').on('click','li',function(event){
        if(!$(this).hasClass('disable')){
            stop_bubble(event);
            $('#J_date_table').hide();
            toTopHeight = $("#tab_fxd").offset().top;
            $('#start_time').val($(this).data('date'));
            if (parseInt($(this).data('kucun'))>0) {
                $('#kucun').html('库存：' + '<em>' + parseInt($(this).data('kucun')) +'</em>');
            };
            if($(this).parents('.key').hasClass('key2')){
                $("#submit_button").addClass('submit2');
            }else{
                $("#submit_button").addClass('submit1');
            }
            
            //$('#price_cncn_span em').html($(this).data('youhui_price'));
            //$('#price_cncn_child_span').html($(this).data('child_price'));
            /*alert($(this).data('date'));
            alert($(this).data('youhui_price'))*/
            $(this).addClass('order_day')
			$('.error_tip').hide();
		}
    })

    //表格html生成，依赖今天的日期，今后3个月的价格数据
    var earlier_date = parseInt($('#earlier_date').val(), 10);
    var today = $('#today').val();
    var expire_day = $('#expire_day').val();
    var today_arr = today.split('-');
    // console.log(today_arr);
    today_arr[0] = parseInt(today_arr[0], 10);
    today_arr[1] = parseInt(today_arr[1], 10);
    today_arr[2] = parseInt(today_arr[2], 10);
    var expire_day_arr = expire_day.split('-');
    expire_day_arr[0] = parseInt(expire_day_arr[0], 10);
    expire_day_arr[1] = parseInt(expire_day_arr[1], 10);
    expire_day_arr[2] = parseInt(expire_day_arr[2], 10);
    var new_date_today = new_date(today_arr);
    var new_date_expire_day = new_date(expire_day_arr);
    var data_arr = $('#date_price_data').val();
    data_arr = data_arr ? data_arr.split(',') : [];


    for (var i = 0; i < data_arr.length; i++) {
        var arr = data_arr[i].split('|');
        //{'date_1380447009460':[2600,1200]}
        data_arr['date_' + new_date(arr[0].split('-')).getTime()] = arr[1].split('-');
    }
    var html = '';
    var section_month_template = $('#date_price_template').html();
    //判断今天是否月末最后一天，是的话就只排列3个月份的表格
    var y_m_arr = []; //构建月份表格[[2013,11],[2013,12]]
    //将日期对象往前加一天，看月份数字是否变化，例如3月31号加一天就成了4月1号了，从3变到4
    // new_date_today.setDate(new_date_today.getDate() + 1);
    // if(new_date_today.getMonth() - parseInt(today_arr[1],10) === -1){
    // y_m_arr.push([new_date_today.getFullYear(),new_date_today.getMonth()+1])
    // }
    /*y_m_arr.push([new_date_today.getFullYear(),new_date_today.getMonth()+1]);*/
    //对今天的date对象重置
    new_date_today = new_date(today_arr);
    new_date_today.setDate(15); //避免出现月头和月尾，月头，如果月尾是31号那么在setMonth+1后可能会出现跳月的现象
    new_date_today.setMonth(new_date_today.getMonth() + 1); //月份+1

    /*while(
        new_date_today.getTime() < new_date_expire_day.getTime() &&
        new_date_today.getMonth() !== new_date_expire_day.getMonth()
    ){
        y_m_arr.push([new_date_today.getFullYear(),new_date_today.getMonth()+1]);
        new_date_today.setMonth(new_date_today.getMonth() + 1);//月份+1
    }*/


    // if (!(today_arr[0] === expire_day_arr[0] && today_arr[1] === expire_day_arr[1])) {
        var p_ym_arr = $('#date_price_data').val();
        p_ym_arr = p_ym_arr ? p_ym_arr.split(',') : [];
        //console.log(year_arr);
        for (var i = 0; i < p_ym_arr.length; i++) {
            p_ym_arr[i] = p_ym_arr[i].substring(0, 7);
        }
        var m_arr = removeDuplicatedItem(p_ym_arr);
        //console.log(m_arr);

        for (var i = 0; i < m_arr.length; i++) {
            var year = parseInt(m_arr[i].substring(0, 4));
            var month = parseInt(m_arr[i].substring(5, 7));
            y_m_arr.push([year, month]);
        }
    // }



    //对今天的date对象重置
    new_date_today = new_date(today_arr);
    for (var i = 0; i < y_m_arr.length; i++) {
        var lis = '';
        var from = new_date([y_m_arr[i][0], y_m_arr[i][1], 1]);
        var hd_is_display = 'style="display:none;"';
        //判断循环的月份是否是今天的月份
        /*if (today_arr[0] === y_m_arr[i][0] && today_arr[1] === y_m_arr[i][1]) {
            from = new_date_today;
            hd_is_display = '';
        }*/
        var to = new_date([y_m_arr[i][0], y_m_arr[i][1] + 1, 1]);
        to.setDate(to.getDate() - 1);
        //判断循环的月份是否是结束日的月份
        if (expire_day_arr[0] === y_m_arr[i][0] && expire_day_arr[1] === y_m_arr[i][1]) {
            to = new_date_expire_day;            
        }
        //对月始补全
        var week = from.getDay();
        var complete_start_date = new_date([from.getFullYear(), from.getMonth() + 1, from.getDate()]); //克隆from
        complete_start_date.setDate(complete_start_date.getDate() - week - 1);
        /*if(to.getDate() - from.getDate() < 7){
            complete_start_date.setDate(complete_start_date.getDate() - 7);
            week = week+7;
        }*/
        for (k = 0; k < week; k++) {
            complete_start_date.setDate(complete_start_date.getDate() + 1);
            // console.log(complete_start_date.getDate());
            if (complete_start_date.getMonth() + 1 === y_m_arr[i][1]) {
                lis += '<li class="disable"><div class="li_wrap"><p>' + complete_start_date.getDate() + '</p></div></li>';
            } else {
                lis += '<li class="disable"><div class="li_wrap"><p>' + complete_start_date.getDate() + '</p></div></li>';
            }

        }
        var temp_today = new_date(today_arr);
        temp_today.setDate(temp_today.getDate() + earlier_date - 1);
        for (j = from; j <= to; j.setDate(j.getDate() + 1)) {
            var date_text = j.getFullYear() + '-' + (j.getMonth() + 1) + '-' + j.getDate();
            var price = data_arr['date_' + j.getTime()]
            var price_date_string = '';
            if (price) {
                price_date_string = 'data-youhui_price="' + price[0] + '" data-child_price="' + price[1] + '" data-kucun="' + price[2] + '"';
            }

            //是否在有效期内
            if (j > temp_today && price) {
                lis += '<li data-date="' + date_text + '" ' + price_date_string + '>';
            } else {
                lis += '<li class="disable no_price" data-date="' + date_text + '" ' + price_date_string + '>';
            }
            //是否节日
            if (false) {
                lis += '<div class="li_wrap jieri">';
            } else {
                lis += '<div class="li_wrap">';
            }
            lis += '<p>' + j.getDate() + '</p>';
            //是否今天
            if (j.toString() === new_date(today_arr).toString()) {
                lis += '<p>今天</p>';
            }
            //当前日期是否有价格
            if (j > temp_today) {
                if (price) {
                    if(price[2]>0){
                    	if (price[2]<11) {
                            lis += '<em>余' + price[2] + '</em><a class="price" href="javascript:;" >' + price[0] + '<s>元</s></a>'
                        }else{
                            lis += '<em>充足</em><a class="price" href="javascript:;" >' + price[0] + '<s>元</s></a>'
                        }
                    }else{
                        lis += '<a class="price" href="javascript:;" >' + price[0] + '<s>元</s></a>'
                    }
                } else {
                    lis += ''
                }
            }
            //'<i class="jieri_tit">中秋节</i>'
            lis += '</div>'
            lis += '</li>'
        }
        html += section_month_template.replace('$year', y_m_arr[i][0])
            .replace('$month', y_m_arr[i][1])
            .replace('$lis', lis)
            .replace('$is_display', hd_is_display);
    }
    $('#J_date_table').find('.month_row').remove();
    $('#J_date_table').append(html);   
    $("#J_date_table li").off().hover(function(){
        if(!$(this).hasClass('disable')){
            $(this).addClass("hov");
        }
    },function(){
        $(this).removeClass("hov");
    });
    //$('.month_row').eq(0).addClass('show');
}

if($('.table_date').length>0){
	fn_price();
}


$(function(){
	// 浮动体
	var toTopHeight = $("#tab_fxd").offset().top;
	$(window).scroll(function() {
		s();
	});
	s();
	h($('.sectionBox .section'));
	function s(){
		
		if($('#J_date_table').css('display') == 'block'){
			return false;
		}else{
			if( $(document).scrollTop() > toTopHeight){
				$("#tab_fxd").addClass("fxd");	
			}else{
				$("#tab_fxd").removeClass("fxd");		
			}
		}
	}
	// 滚动定位
	function h(id){
		var arr = [];
		id.each(function(i){
			arr.push(id.eq(i).offset().top-$("#tab_fxd").height()-1);
		});
		for(var i = 0;i<arr.length;i++){
			if($(document).scrollTop() > arr[i]){
				tab1(i,'on');
			}
		}
	}
	function tab1(index,clas){
		$('#tab_fxd li').removeClass(clas).eq(index).addClass(clas);
	}
	$(window).scroll(function(){
		h($('.sectionBox .section'));
	});
	$("#tab_fxd li").click(function(e){
		e.preventDefault();
		var index = ($("#tab_fxd li")).index($(this));
		if($(this).closest(".box").is(".fxd")){
			var goTo = $('.section').eq(index).offset().top;
		}
		else{
			var goTo = $('.section').eq(index).offset().top-43;
		}
		//console.log(goTo);
		$("html, body").animate({
			scrollTop: goTo
		}, 500);
	});

	// 滚动定位
	// function h(id){
	// 	var arr = [];
	// 	id.each(function(i){
	// 		arr.push(id.eq(i).offset().top/*-$('#tab').height()*/-1);
	// 	})
	// 	//console.log(arr)
	// 	for(var i = 0;i<arr.length;i++){
	// 		if($(document).scrollTop() > arr[i]){
	// 			tab1(i,'on');
	// 			//console.log(i)
	// 		}
	// 	}
	// }
	// function tab1(index,clas){
	// 	$('#tab_fxd li').removeClass(clas).eq(index).addClass(clas);
	// }
	// $(window).scroll(function(){
	// 	h($('.sectionBox .section'));
	// });
	// $("#tab_fxd li").click(function(e){
	// 	e.preventDefault();
	// 	var index = ($("#tab_fxd li")).index($(this));
	// 	var goTo = $('.sectionBox .section').eq(index).offset().top;
	// 	$("html, body").animate({
	// 		scrollTop: goTo
	// 	}, 500);
	// });


	// 五一专题活动
	$('.dj_quan').hover(function(){
		$(this).find('.detail_frame').show();
	},function(){
		$(this).find('.detail_frame').hide();
	});


	$.CNCN.hover_class(".pic_bottom .mobile_con", "hov");

});

// 自定义编辑前台输出
/*$(function(){
	function editor_con(i){
		var self = $(i);
		var html = self.html();
		html = Editor_cncn.prototype.contentDecode(html,true);
		self.html(html);
		self.css('visibility','visible')
	}
	
	if($('.editor_tese').length>0){
		editor_con('.editor_tese');
	}
	if($('.editor_scheduling .J_day_editor').length>0){
		$('.editor_scheduling .J_day_editor').each(function(){
			editor_con(this);
		})
		$('.editor_scheduling').css('visibility','visible')	
	}else{
		$('.editor_scheduling').css('visibility','visible')	
	}	
	if($('.editor_remark').length>0){
		editor_con('.editor_remark');
	}	
	if($('.editor_fuwu').length>0){
		editor_con('.editor_fuwu');
	}	

})*/





