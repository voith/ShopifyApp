from django.shortcuts import render_to_response
from django.template import RequestContext
import shopify
from shopify_app.decorators import shop_login_required
from datetime import date,timedelta
import json

@shop_login_required
def index(request):
    one_yr_back = (date.today() - timedelta(days = 365)).\
                    isoformat()# filter orders 12 months older from today
    products = shopify.Product.find()
    orders = shopify.Order.find(query='',\
            processed_at_min=one_yr_back ,order="created_at DESC")
    customers = shopify.Customer.find()
    product_lst, result = get_customer_orders(products,\
                                        customers,orders)
    print product_lst
    print result
    return render_to_response('index.html', {
        'products': product_lst,
        'result':result,
    }, context_instance=RequestContext(request))


def get_customer_orders(products,customers,orders):
    result = {}
    product_lst = []
    for pro_inst in products:
        product = pro_inst.to_dict()
        product_lst.append(product)
        result.setdefault(product['id'],[])
        for cust_inst in customers:
            customer = cust_inst.to_dict() 
            total_order = 0
            for ord_inst in orders:
                order = ord_inst.to_dict()
                if customer['id'] == order['customer']['id']:
                    for item in order['line_items']:
                        if product['id'] == item['product_id']:
                            total_order += 1
                            break
            if total_order > 0:
                result[product['id']].append({
                     'customer_name': ' '.join([customer['first_name'],\
                                            customer['last_name']]),
                     'customer_ph_num': customer['default_address']['phone'] if \
                                        customer['default_address']['phone'] else '',
                     'total_orders':total_order,
                    })
    return product_lst,json.dumps(result)

