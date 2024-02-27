import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import model "model";

actor {
    let users = HashMap.HashMap<Principal, model.User>(5, Principal.equal, Principal.hash);

    public func register(key : Principal, email: Text, password : Text) : async Text {
    var user: ?model.User = users.get(key); 

        switch(users.get(key)) {
            case(null) {
                let account: model.User = model.newUser(key, email, password);
                users.put(key, account);
                return "success";
            };
            case(?User) {
                return "failure";
            };
        };
    };

    public func login(key : Principal, password : Text) : async Text {
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?User) {
                var user: model.User = User;
                if(user.password == password) {
                    return "success";
                } else {
                    return "failure";
                };
            };
            case(null) {
                return "failure";
            };
        };
    };

    public func addRascalToUser(key : Principal, rascal : model.Rascal) : async Text {
        var check: ?model.User = users.get(key);

        switch(check) {
            case(null) {
                return "no user found";
            };
            case(?user) {
                users.put(user.principal, {
                    principal = user.principal;
                    username = user.username;
                    password = user.password;
                    rank = user.rank;
                    tokens = user.tokens - 1;
                    rascals = Array.append<model.Rascal>(user.rascals, [rascal]);
                });
                return "success";
            };
        }

    };
};
