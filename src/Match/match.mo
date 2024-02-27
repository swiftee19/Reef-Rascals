import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import model "model";

actor {
    let users = HashMap.HashMap<Principal, model.User>(5, Principal.equal, Principal.hash);

    public func register(key : Principal, email: Text, password : Text) : async Text {
    var user: ?model.User = users.get(key); 

        switch(users.get(key)) {
            case(null) {
                let account: model.User = model.User(key, email, password);
                users.put(key, account);
                return "success";
            };
            case(?User) {
                return "failure";
            };
        };
    };

    // public func login(key : Principal, password : Text) : async Text {
    //     var user: ?model.User = users.get(key);
    //     switch(user) {
    //         case(?User) {
    //             var user: model.User = User;
    //             if(user.password == password) {
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
};
