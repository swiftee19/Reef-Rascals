import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import model "model";

actor {
    let users = HashMap.HashMap<Principal, model.User>(5, Principal.equal, Principal.hash);

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
                    tokens = user.tokens;
                    rascals = Array.append<model.Rascal>(user.rascals, [rascal]);
                    defense = user.defense;
                });
                return "success";
            };
        }
    };

    public func addToDefense(key : Principal, rascal : model.Rascal) : async Text {
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
                    rascals = user.rascals;
                    defense = Array.append<model.Rascal>(user.defense, [rascal]);
                });
                return "success";
            };
        }
    };

    public func removeFromDefense(key : Principal, rascal : model.Rascal) : async Text {
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
                    rascals = user.rascals;
                    defense = Array.filter<model.Rascal>(user.defense, func x = x.id != rascal.id );
                });
                return "success";
            };
        }
    };

    var default_rascal: [model.Rascal] = [
        {
            id = "tdawdad";
            name = "Phanter";
            level = 1;
            rarity = "Common";
            tribe = "beast";
            imageUrl = "testo";
            health = 100;
            attack = 10;
            speed = 10;
        },
        {
            id = "tdawdad";
            name = "Phantom";
            level = 1;
            rarity = "Rare";
            tribe = "Shadow";
            imageUrl = "testo";
            health = 100;
            attack = 10;
            speed = 10;
        },
        {
            id = "tdawdad";
            name = "Pinka";
            level = 1;
            rarity = "Epic";
            tribe = "Pig";
            imageUrl = "testo";
            health = 100;
            attack = 10;
            speed = 10;
        },
        {
            id = "tdawdad";
            name = "Pinka";
            level = 1;
            rarity = "Legendary";
            tribe = "Pig";
            imageUrl = "testo";
            health = 100;
            attack = 10;
            speed = 10;
        }
    ];
};
