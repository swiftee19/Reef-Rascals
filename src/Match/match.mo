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

    public func getUser(key : Principal) : async [model.User] {
        var userArray: [model.User] = [];
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?user) {
                userArray := Array.append<model.User>(userArray, [user]);
                return userArray;
            };
            case(null) {
                return userArray;
            };
        };
    };

    public func getAllUser() : async [model.User] {
        var userArray: [model.User] = [];
        for ((key, value) in users.entries()) {
            userArray := Array.append<model.User>(userArray, [value]);
        };
        return userArray;
    };

    public func getOpponents(user: model.User) : async [model.User] {
        var userArray: [model.User] = [];
        for ((key, value) in users.entries()) {
            userArray := Array.append<model.User>(userArray, [value]);
        };
        userArray := Array.filter<model.User>(userArray, func (x) {
            x.id != user.id;
        });
        return userArray;
    };

    public func register(user: model.User) : async Text {
        var check: ?model.User = users.get(user.id);
        switch(check) {
            case(null) {
                users.put(user.id, user);
                return "success";
            };
            case(?user) {
                return "user already exists";
            };
        };
    };

    // public func login(key : Principal, password : Text) : async Text {
    //     var user: ?model.User = users.get(key);
    //     switch(user) {
    //         case(?User) {
    //             var user: model.User = User;
    //             if(user.pri == password) {
    //                 return "success";
    //             } else {
    //                 return "failure";
    //             };
    //         };
    //         case(null) {
    //             return "failure";
    //         };
    //     };
    // };

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
