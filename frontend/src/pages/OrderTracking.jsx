import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch order details from API
    const fetchOrder = async () => {
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrder(null);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const trackingSteps = [
    { status: 'processing', label: 'Order Confirmed', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getCurrentStep = () => {
    if (!order) return 0;
    const steps = ['processing', 'shipped', 'out-for-delivery', 'delivered'];
    return steps.indexOf(order.status) + 1;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package className="h-24 w-24 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
        <Link to="/orders" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Order Status</h2>
            
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(getCurrentStep() / trackingSteps.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="relative flex justify-between">
                {trackingSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index < getCurrentStep();
                  const isCurrent = index === getCurrentStep() - 1;
                  
                  return (
                    <div key={step.status} className="text-center">
                      <div className={`relative z-10 w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-sm font-semibold">{step.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Delivery Address</p>
                  <p className="text-gray-600">{order.shippingAddress?.street}</p>
                  <p className="text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                  <p className="text-gray-600">{order.shippingAddress?.country}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Contact</p>
                  <p className="text-gray-600">+1 234 567 8900</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">customer@example.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">Have questions about your order? Contact our customer support.</p>
            <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;