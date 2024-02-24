import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Types "Types";
import helper "helper";

actor {
  let users = HashMap.HashMap<Principal, Types.Account>(5, Principal.equal, Principal.hash);

  public func addUser(key : Principal, email: Text, password : Text) : async Result.Result<Types.Account, Text> {
    var user: ?Types.Account = users.get(key); 

    switch(users.get(key)) {
      case(null) {
        let account: Types.Account = {
          owner = key;
          email = email;
          password = password;
          tokens = 100;
          rascals = [];
        };
        users.put(key, account);
        return #ok(account);
      };
      case(?Account) {
        return #err("User already exists");
      };
    };
  };

  public func getUser(key : Principal) : async Result.Result<Types.Account, Text> {
    switch(users.get(key)) {
      case(null) {
        return #err("User not found");
      };
      case(?Account) {
        return #ok(Account);
      };
    };
  };

  public func login(key: Principal, password: Text) : async Result.Result<Types.Account, Text> {
    switch(users.get(key)) {
      case(null) {
        return #err("User not found");
      };
      case(?Account) {
        if (Account.password == password) {
          return #ok(Account);
        } else {
          return #err("Invalid password");
        };
      };
    };
  };

   public func gacha(key: Principal) : async Result.Result<Types.Rascal, Text> {
    var check: ?Types.Account = users.get(key);
    let rascal: Types.Rascal = await helper.getRandomRascal();

    switch(check) {
      case(null) {
        return #err("User not found");
      };
      case(?Account) {
        var user = Account;
        if (Account.tokens > 0) {
          users.put(user.owner, {
            owner = Account.owner;
            email = Account.email;
            password = Account.password;
            tokens = Account.tokens - 1;
            rascals = Array.append<Types.Rascal>(Account.rascals, [rascal]);
          });
          return #ok(rascal);
        } else {
          return #err("Not enough tokens");
        };
      };
    };
  };
};
