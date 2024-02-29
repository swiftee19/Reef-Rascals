import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import model "model";

actor {
    let users = HashMap.HashMap<Principal, model.User>(5, Principal.equal, Principal.hash);
    var rascalMarket:[model.Rascal] = [];

    public query func getAllUser() : async [model.User] {
        var userArray: [model.User] = [];
        for ((key, value) in users.entries()) {
            userArray := Array.append<model.User>(userArray, [value]);
        };
        return userArray;
    };

    public func register(key : Principal, email: Text, password : Text) : async Text {
    var user: ?model.User = users.get(key); 

        switch(users.get(key)) {
            case(null) {
                let account: model.User = model.newUser(key, email, password);
                users.put(key, account);
                return "success";
            };
            case(?User) {
                return "already exist";
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

    public func updateUser(key : Principal, user : model.User) : async Text {
        var check: ?model.User = users.get(key);

        switch(check) {
            case(null) {
                return "no user found";
            };
            case(?user) {
                users.put(user.id, user);
                return "success";
            };
        }
    };

    public func sellRascal(rascal : model.Rascal) : async Text {
        var check: ?model.User = users.get(rascal.owner);

        switch(check) {
            case(null) {
                return "no user found";
            };
            case(?user) {
                let newRascals = Array.filter<model.Rascal>(user.rascals, func (x) {
                    x.id != rascal.id;
                });
                let newUSer = { user with rascals = newRascals };
                users.put(user.id, user);
                rascalMarket := Array.append<model.Rascal>(rascalMarket, [rascal]);
                return "success";
            };
        };
    };

    public func getMarket() : async [model.Rascal] {
        return rascalMarket;
    };

    public func removeFromMarket(rascal : model.Rascal) : async Text {
        rascalMarket := Array.filter<model.Rascal>(rascalMarket, func (x) {
            x.id != rascal.id;
        });
        return "success";
    };
};
