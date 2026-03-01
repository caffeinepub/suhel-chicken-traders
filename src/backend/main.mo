
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";


actor {
  public type Product = {
    name : Text;
    price : Nat;
    stockQty : Nat;
    freshToday : Bool;
  };

  public type OrderItem = {
    productName : Text;
    weightGrams : Nat;
    price : Nat;
  };

  public type PaymentMethod = {
    #upI;
    #cod;
  };

  public type OrderStatus = {
    #pending;
    #accepted;
    #rejected;
  };

  public type CustomerOrder = {
    customerName : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
    totalAmount : Nat;
    paymentMethod : PaymentMethod;
    timestamp : Int;
    status : OrderStatus;
  };

  // Helper module for Product comparison
  module ProductHelper {
    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      switch (Nat.compare(product1.price, product2.price)) {
        case (#equal) { Text.compare(product1.name, product2.name) };
        case (order) { order };
      };
    };
  };

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Nat, CustomerOrder>();
  var nextOrderId = 0;

  //-- Admin Functions --//
  public shared ({ caller }) func addOrUpdateProduct(name : Text, price : Nat, stockQty : Nat, freshToday : Bool) : async () {
    let product : Product = {
      name;
      price;
      stockQty;
      freshToday;
    };
    products.add(name, product);
  };

  //-- Customer Functions --//
  public query ({ caller }) func getAvailableProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func placeOrder(customerName : Text, phone : Text, address : Text, items : [OrderItem], paymentMethod : PaymentMethod) : async (Nat, Text) {
    let totalAmount = items.foldLeft(0, func(acc, item) { acc + item.price });

    let order : CustomerOrder = {
      customerName;
      phone;
      address;
      items;
      totalAmount;
      paymentMethod;
      timestamp = Time.now();
      status = #pending;
    };

    let orderId = nextOrderId;
    orders.add(orderId, order);
    nextOrderId += 1;
    (orderId, "Order placed successfully!");
  };

  public query ({ caller }) func getAllOrders() : async [(Nat, CustomerOrder)] {
    orders.toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist") };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };
};
