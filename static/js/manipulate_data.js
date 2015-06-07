var curr_page = 1;
var total_count;
data_per_page = 5;

$(document).ready(function() {
	if (result!=''){
		result = $.parseJSON(result);
	}

$('.drop-down').change(function(){
	x = $(this).val();
	if (result!='' &&  x in result){
		data = result[x];
		curr_page = 1
		prev_next(data);
	}
	else{
		$("#pagination").css({"display":"none"});
		html__ = "<div class='no-order'><p>"+
					"Please select a Product"+ 
					" to display its data!!!</p></div>";
		$('.table_data').html(html__);
		$('.table_data').css({"display":"block"});
	}
});

$("#previous").click(function(){
	curr_page = curr_page - 1;
	x = $('.drop-down').val()
	data =result[x];
	prev_next(data);
});

$("#next").click(function(){
	curr_page = curr_page + 1;
	x = $('.drop-down').val()
	data = result[x];
	prev_next(data);
});

});

function create_table(data){
	table_html=''
	if (! $.isEmptyObject(data)){
		table_html+="<table ><thead><tr><th>Customer Name</th>"+
					"<th>Customer Phone Number</th>"+
					"<th>Total Number of Orders</th>"+
					"</tr></thead><tbody>";
		$.each(data,function(idx,obj){

			table_html += "<tr>"+
						"<td>"+obj.customer_name+"</td>"+
						"<td>"+obj.customer_ph_num+"</td>"+
						"<td>"+obj.total_orders+"</td>"+
						"</tr>";

		});
		table_html += "<tbody></table>";
	}
	else{
		$("#pagination").css({"display":"none"});
		table_html += "<div class='no-order'><p>"+
					"There weren't any orders made"+ 
					" for this product</p></div>";
	}
	$('.table_data').html(table_html);
	$('.table_data').css({"display":"block"});
}

function prev_next(data){
	total_count = data.length;
	$("#pagination").show();
	console.log(curr_page);
	if (curr_page == 1){
		$("#previous").hide();
	}
	else {
		$("#previous").show();
	}
	if (curr_page*data_per_page>=total_count){
		$("#next").hide();
	}
	else{
		$("#next").show();
	}
	var from = (curr_page-1)*data_per_page+1;
	var to = curr_page *data_per_page;
	if (to > total_count){
		to = total_count;
	}
	html_ = "showing data "+from.toString()+
			" to "+to.toString()+" out of "+
			total_count.toString();
	$("#page-info").html(html_); 
	var sliced_data = data.slice(from-1,to);
	create_table(sliced_data)
}