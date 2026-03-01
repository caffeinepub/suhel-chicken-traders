import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  type Product = {
    name : Text;
    price : Nat;
    available : Bool;
  };

  module Product {
    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      switch (Nat.compare(product1.price, product2.price)) {
        case (#equal) {
          Text.compare(product1.name, product2.name);
        };
        case (order) { order };
      };
    };
  };

  let products = Map.empty<Text, Product>();

  public shared ({ caller }) func addOrUpdateProduct(name : Text, price : Nat, available : Bool) : async () {
    let product : Product = {
      name;
      price;
      available;
    };
    products.add(name, product);
  };

  public shared ({ caller }) func removeProduct(name : Text) : async () {
    if (not products.containsKey(name)) {
      Runtime.trap("Product not found");
    };
    products.remove(name);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getAvailableProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.available });
  };

  public query ({ caller }) func getSortedProductsByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };
};
