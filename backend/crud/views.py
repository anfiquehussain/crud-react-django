from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def Home(request):
    return HttpResponse(
        "<center>Home word <br> <a href='/admin/'>Admin</a>"
        "<br> <a href='/create/'>Create</a><br>"
        "<a href='/display/'>Display</a><br>"
        "<a href='/update_product/'>Update</a><br>"
        "<a href='/delete/'>Delete</a></center>"
    )


@api_view(['POST'])
def Create(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def Display(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def update_product(request):

    if request.method == 'POST':
        product_id = request.data.get('product_id')
        name = request.data.get('name')
        price = request.data.get('price')
        description = request.data.get('description')
        image = request.data.get('image')
        if product_id:
            product = get_object_or_404(Product, id=product_id)
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.save()
            return Response({'message': 'Product updated successfully', 'product_id': product_id})
        return Response({'error': 'No product ID provided'}, status=400)
    return Response({'error': 'Only POST method is allowed'}, status=405)


@csrf_exempt
@api_view(['POST'])
def Delete(request):
    if request.method == 'POST':
        product_id = request.data.get('product_id')
        if product_id:
            product = get_object_or_404(Product,id=product_id)
            product.delete()
    
    return Response("Delete word")
