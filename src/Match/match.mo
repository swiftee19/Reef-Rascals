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

    public query func getUser(key : Principal) : async Result.Result<model.User, Text>{
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?User) {
                return #ok(User);
            };
            case(null) {
                return #err("no user found");
            };
        };
    };

    public query func getUserRascals(key : Principal) : async [model.Rascal] {
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?User) {
                return User.rascals;
            };
            case(null) {
                return [];
            };
        };
    };

    public query func getUserDefense(key : Principal) : async [model.Rascal] {
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?User) {
                return User.defense;
            };
            case(null) {
                return [];
            };
        };
    };

    public query func getUserSell(key : Principal) : async [model.Rascal] {
        var user: ?model.User = users.get(key);
        switch(user) {
            case(?User) {
                return User.sell;
            };
            case(null) {
                return [];
            };
        };
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
                    sell = user.sell;
                });
                return "success";
            };
        }
    };

    public func removeRascalFromUser(key : Principal, rascal : model.Rascal) : async Text {
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
                    rascals = Array.filter<model.Rascal>(user.rascals, func x = x.id != rascal.id );
                    defense = user.defense;
                    sell = user.sell;
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
                    sell = user.sell;
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
                    sell = user.sell;
                });
                return "success";
            };
        }
    };

    public func addToSell(key : Principal, rascal : model.Rascal) : async Text {
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
                    defense = user.defense;
                    sell = Array.append<model.Rascal>(user.sell, [rascal]);
                });
                return "success";
            };
        }
    };

    public func removeFromSell(key : Principal, rascal : model.Rascal) : async Text {
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
                    defense = user.defense;
                    sell = Array.filter<model.Rascal>(user.sell, func x = x.id != rascal.id );
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
            price = 50;
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
            price = 100;
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
            price = 200;
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
            price = 300;
        }
    ];
};
