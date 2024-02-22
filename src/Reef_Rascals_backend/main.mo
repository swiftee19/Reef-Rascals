import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";

actor {
  type User = {
  email : Text;
  name : Text;
  age : Nat;
  password : Text;
  money : Nat;
  rascal : [Rascals];
};

type Rascals = {
  name : Text;
  health : Nat;
  attack : Nat;
  rarity : Text;
  price : Nat;
};

  let users = HashMap.HashMap<Text, User>(5, Text.equal, Text.hash);

  public func addUser(email: Text, name: Text, age: Nat, password: Text) : async Result.Result<(), Text>{
    switch (users.get(email)) {
      case(null) {
          let user: User = {
            email = email;
            name = name;
            age = age;
            password = password;
            money = 100;
            rascal = [];
          };
          users.put(email, user);
          return #ok();
      };
      case(?User) {
        return #err("User already exists");
      };
    }
  };

  public func getUser(email: Text) : async ?User {
    let user = users.get(email);
    if (user != null) {
      return user;
    } else {
      return null;
    }
  }
};
